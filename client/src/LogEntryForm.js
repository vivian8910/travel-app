import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './Api'; 

const LogEntryForm = ( {location, onClose}) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
            { error && <h3 className='error'>{error}</h3>}
            <label htmlFor='apiKey'>API_KEY</label>
            <input type='password' name='apiKey' required ref={register}/>
            <label htmlFor='title'>Title</label>
            <input name='title' required ref={register}/>
            <label htmlFor='comments'>Comments</label>
            <textarea name='comments' rows={3} ref={register}></textarea>
            <label htmlFor='description'>Description</label>
            <textarea name='description' rows={3} ref={register}></textarea>
            <label htmlFor='image'>Image</label>
            <input name='image' ref={register}/>
            <label htmlFor='visitDate'>Visit Date</label>
            <input name='visitDate' type='date' required ref={register}/>
            <button disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Create Log Entry'}
            </button>
        </form>
    );
};

export default LogEntryForm;