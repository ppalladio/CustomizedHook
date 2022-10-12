import { useState,useCallback } from 'react';

//. this component should be able to deal with all kinds of requests

const useHttp = (requestConfig, applyData) => {
    //.applydata is a function that deals with the data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [tasks, setTasks] = useState([]); //. we weould want to delete this because it is too specific, we should be able to use it with any kinda data,
/**
 * '1️⃣wrap the whole function(before return) with useCallback
 * '2️⃣another problem emerges, requestConfig,applyData are functions, essentially objects, will be recreated when the function runs again, so go back to APP.js
 *  
 * 
 */
    const sendRequest = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET', //.check if method is set manually, if not, refault valus would be GET
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body
                    ? JSON.stringify(requestConfig.body)
                    : null,
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    },[requestConfig,applyData]);

    return {
        isLoading: isLoading,
        error: error,
        sendRequest, //.when the property and the value have the same name, we can ommit the value and use just the same name once.
    };
};

export default useHttp;
