import React, { useEffect, useState,useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/_use-http-useCallback';

function App() {
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null); //. managed by useHttp
    const [tasks, setTasks] = useState([]);
    const transformTask = useCallback((data) => {
        const loadedTasks = [];

        for (const taskKey in data) {
            loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        }

        setTasks(loadedTasks);
    },[]);//'no dependencies needed because setTasks is a state updating function, which will never change.



    const { isLoading, error, sendRequest } = useHttp(
        { url: 'https://react-c749e-default-rtdb.firebaseio.com/tasks.json' },//' then we have to make sure this never changes➡️➡️ include dependencies internally
        transformTask,
    );


    //: solution 1️⃣: using useCallback                 .
    useEffect(() => {
        sendRequest();
        /**
         * '1️⃣when we call the function , in the use-http.js, two states are set, leads to the custom hook to be rerendered ,
         * '2️⃣this will trigger App() component to be reevaluate be cause we are using the custom hook in the component
         * '3️⃣the custom hook willbe called again, the sendRequest function will be called again and a new funtion is returned
         * '4️⃣useEffect will run again.
         */
    }, [sendRequest]); //! this will create an infinite loop, why?⬆️

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={sendRequest}
            />
        </>
    );
}

export default App;
