// import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
    const { isLoading, error, sendRequest } = useHttp();
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const createTask = (taskText,data) => {

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    }
    const enterTaskHandler = async (taskText) => {
        sendRequest({
            url: 'https://react-http-6b4a6.firebaseio.com/tasks.json',
            method: 'POST',
            body: { text: taskText },
            headers: {
                'Content-Type': 'application/json',
            },
        },createTask.bind(null,taskText));//?????
    }

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
