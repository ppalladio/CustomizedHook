import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null); //. managed by useHttp
  const [tasks, setTasks] = useState([]);
  const transformTask = data =>{const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);

  }
  const httpData = useHttp({url:'https://react-c749e-default-rtdb.firebaseio.com/tasks.json'}, transformTask) 

  const {isLoading,error,sendRequest} = httpData
  

  useEffect(() => {
    sendRequest();
  }, []);

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
