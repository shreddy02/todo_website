import express from 'express';
//import sampleData from '../jsondata/sampleData'
import fs from 'fs';
import { toEditorSettings } from 'typescript';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';


const {v4 : uuidv4} = require('uuid');

//var Express = require('express')
var bodyParser = require('body-parser');
const expressOasGenerator = require('express-oas-generator');

const app = express();
const port = 3001;
app.use('/tasks', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true}))
app.use(bodyParser());
expressOasGenerator.init(app, {});


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const taskData = require('../jsondata/sampleData.json');
const dataFile = './jsondata/sampleData.json';


interface ITask  {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
  important: boolean;
  urgent: boolean
}

let data : ITask[] = [];
try {
    const dataString = fs.readFileSync(dataFile, 'utf-8');
    data = JSON.parse(dataString);
} catch(err) {
    console.error(`Error reading data file: ${err}`);
}

const saveData = () => {
    fs.writeFileSync(dataFile, JSON.stringify(data), 'utf-8');
};

//get all tasks or tasks with filters

// expressOasGenerator.addRoute({
//     path: "/tasks",
//     method: "get",
//     summary: "Get all tasks",
//     requestBody:{
//         content:{
//             "application/json":{
//                 schema:{
//                     type: "object",
//                     properties: {
//                     task: {
//                         type: "string",
    //                 },
    //                  },
    //             },
    //         },
    //     },
    // },
    // responses: {
    //     201: {
    //       description: "tasks generated",
    //     },
    // },
    // handler: (req, res) => {
    // const completed = req.query.completed;
    // const important = req.query.important;
    // const urgent = req.query.urgent;
    // let filteredData = data;


//     const comple = (completed === "true" ? true : false);
//     const imp = (important === "true" ? true : false);
//     const urg = (urgent === "true" ? true : false);

//     if (completed){
//         filteredData = filteredData.filter(task => task.completed === comple)
//     }

//     if (important){
//         filteredData = filteredData.filter(task => task.important == imp)
//     }

//     if (urgent){
//         filteredData = filteredData.filter(task => task.urgent == urg)
//     }

//     res.json(filteredData);
//     res.status(201).send();
//     },
// })

app.get('/tasks', (req, res) => {
    //const {completed, important, urgent} = req.query;

    const completed = req.query.completed;
    const important = req.query.important;
    const urgent = req.query.urgent;
    let filteredData = data;


    const comple = (completed === "true" ? true : false);
    const imp = (important === "true" ? true : false);
    const urg = (urgent === "true" ? true : false);

    if (completed){
        filteredData = filteredData.filter(task => task.completed === comple)
    }

    if (important){
        filteredData = filteredData.filter(task => task.important == imp)
    }

    if (urgent){
        filteredData = filteredData.filter(task => task.urgent == urg)
    }

    res.json(filteredData);
});

//get task with given id
app.get('/tasks/:id', (req, res) => {
    //const id = parseInt(req.params.id, 10);
    const id = req.params.id;
    const task = data.find(task => task.id === id);
  
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    res.json(task);
});

//create new task
app.post('/tasks', (req, res) => {
    const newTask : ITask = req.body;
    //newTask.title = req.body.title;

    //newTask.id = data.length + 1;
    newTask.id = uuidv4()
    newTask.completed = false;
    newTask.important = false;
    newTask.urgent = false;
    newTask.active = true;

    data.push(newTask);
    saveData();

    res.json(newTask);
});

//update task with given id 
app.put('/tasks/:id', (req, res) => {
    //const id = parseInt(req.params.id, 10);
    const id = req.params.id;
    const taskIndex = data.findIndex(task => task.id === id);

    if (taskIndex === -1){
        return res.status(404).json({error : 'Task not found'});
    }

    const updatedTask = {...data[taskIndex], ...req.body};
    data[taskIndex] = updatedTask;
    saveData();

    res.json(updatedTask);
});

//mark or unmark tasks as completed, important, urgent
app.patch('/tasks/:id/completed', (req, res) => {
    const id = req.params.id;
    const taskIndex = data.findIndex((task) => task.id === id);
  
    if (taskIndex === -1) {
      return res.status(404).send({ message: 'Task not found' });
    }
  
    data[taskIndex].completed = !data[taskIndex].completed;
    saveData();
  
    return res.send({ message: 'Task marked as completed' });
});

app.patch('/tasks/:id/important', (req, res) => {
    const id = req.params.id;
    const taskIndex = data.findIndex((task) => task.id === id);
  
    if (taskIndex === -1) {
      return res.status(404).send({ message: 'Task not found' });
    }
  
    data[taskIndex].important = !data[taskIndex].important;
    saveData();
  
    return res.send({ message: 'Task marked as important' });
});

app.patch('/tasks/:id/urgent', (req, res) => {
    const id = req.params.id;
    const taskIndex = data.findIndex((task) => task.id === id);
  
    if (taskIndex === -1) {
      return res.status(404).send({ message: 'Task not found' });
    }
  
    data[taskIndex].urgent = !data[taskIndex].urgent;
    saveData();
  
    return res.send({ message: 'Task marked as urgent' });
});

//delete task with given id
app.delete('/tasks/:id', (req, res) => {
    //const id = parseInt(req.params.id, 10);
    const id = req.params.id;
    const taskIndex = data.findIndex(task => task.id === id);

    if (taskIndex === -1){
        return res.status(404).json({error : 'Task not found'});
    }

    data.splice(taskIndex, 1);
    saveData();

    res.json({message : 'Task deleted'});
});



//to run the code 
//node --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts