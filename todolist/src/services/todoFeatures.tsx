import React from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/tasks";

interface ITask{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    active: boolean;
    important: boolean;
    urgent: boolean
}

async function getAllTasks(): Promise<ITask[] | undefined>{
    try{
        const response = await axios.get(API_URL);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

async function getFilteredTasks(completed: boolean, important: boolean, urgent: boolean): Promise<ITask[] | undefined>{
    const queryParams = `?completed=${completed}&important=${important}&urgent=${urgent}`
    try{
        const response = await axios.get(`${API_URL}${queryParams}`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

async function addTask(task: ITask): Promise<void>{
    try{
        await axios.post(API_URL, task);
    }
    catch (error){
        console.log(error);
    }
}

async function updateTaskByID(task: ITask): Promise<void> {
    try{
        await axios.put(`${API_URL}/${task.id}`, task);
    }
    catch (error){
        console.log(error);
    }
}

async function markTask(id: string, status: string): Promise<void> {
    try{
        await axios.patch(`${API_URL}/${id}`, {status});
    }
    catch (error){
        console.log(error);
    }
}

async function markTaskCompleted(id: string){
    return markTask(id, 'completed');
}
async function markTaskImportant(id: string){
    return markTask(id, 'important');
}
async function markTaskUrgent(id: string){
    return markTask(id, 'urgent');
}

async function deleTaskByID(id : string): Promise<void> {
    try{
        await axios.delete(`${API_URL}/${id}`);
    }
    catch (error){
        console.log(error);
    }
}


export default {getAllTasks, getFilteredTasks, addTask, updateTaskByID, markTaskCompleted, markTaskImportant, markTaskUrgent, deleTaskByID}
