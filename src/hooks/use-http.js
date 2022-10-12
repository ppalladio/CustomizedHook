import { useState } from 'react';

//. this component should be able to deal with all kinds of requests

const useHttp = (requestConfig, applyData) => {
    //.applydata is a function that deals with the data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [tasks, setTasks] = useState([]); //. we weould want to delete this because it is too specific, we should be able to use it with any kinda data,

    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body),
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
    };

    return {
        isLoading: isLoading,
        error: error,
        sendRequest, //.when the property and the value have the same name, we can ommit the value and use just the same name once.
    };
};

export default useHttp;
