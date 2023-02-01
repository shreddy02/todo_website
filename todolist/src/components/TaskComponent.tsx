import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import IconButton from '@mui/material/IconButton';
import datafs from '../../../ZServer/jsondata/sampleData.json';
import axios from "axios";
import { useState, useEffect } from 'react';

const {getAllTasks, getFilteredTasks, addTask, updateTaskByID, markTaskCompleted, markTaskImportant, markTaskUrgent, deleTaskByID} = require('../services/todoFeatures')

//import fs from 'fs';
var fs = require('fs')
const dataFile = '../../../ZServer/jsondata/sampleData.json';


interface ITask{
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
  important: boolean;
  urgent: boolean
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  const TaskComponent = () => {

    //let tasks : ITask[] = datafs;
    // try {
    //     const dataString = fs.readFileSync(dataFile, 'utf-8');
    //     tasks = JSON.parse(dataString);
    // } catch(err) {
    //     console.error(`Error reading data file: ${err}`);
    // }



    const App = () => {
      const [data, setData] = useState([]);
    
      const getData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/tasks");
          setData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);
    
      return (
        <div>
          <h1>Tasks</h1>
          <ul>
            {data.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      );
    };






    const tasks: ITask[] = [
      {
        id: "1",
        title: "task 1",
        description: "This is task 1",
        completed: false,
        active: true,
        important: false,
        urgent: false
      },
      {
        id: "2",
        title: "task 2",
        description: "This is task 2",
        completed: false,
        active: true,
        important: false,
        urgent: false
      },
      {
        id: "3",
        title: "task 3",
        description: "This is task 3",
        completed: false,
        active: true,
        important: false,
        urgent: false
      },
    ];

    //Type T = Awaited<Promise<typeof getAllTasks>>;
    let trialdata = getAllTasks;
    console.log(trialdata)
    //console.log(tasks);

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index: number) => {
      setValue(index);
    };

    const [expand, setExpand] = React.useState(false);
    const toggleAccordion = () => {
      setExpand((prev) => !prev);
    };
    ////////////////// bgcolor: 'background.paper'
    const onRenderCell = (task: ITask) => {
      console.log(App());
      return (
        <div key = {task.id}>
          <Accordion expanded = {expand} sx = {{marginBottom: '1px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick = {toggleAccordion}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{task.title}</Typography>

              <Checkbox value = {task.completed} sx = {{marginRight: '2px', position: 'absolute', right: '30px'}} {...label} color="primary" />
              <Checkbox {...label} icon={<StarOutlineIcon />} checkedIcon={<StarIcon />} sx = {{position: 'absolute', right: '60px'}} color = "warning"/>
              <Checkbox {...label} icon={<AccessTimeIcon />} checkedIcon={<WatchLaterIcon />} sx = {{position: 'absolute', right: '90px'}} color = "warning"/>
              <IconButton aria-label="delete" color = "error" sx = {{position: 'absolute', right: '120px'}}><DeleteIcon /></IconButton>
              <IconButton aria-label="delete" color = "success" sx = {{position: 'absolute', right: '150px'}}><EditIcon /></IconButton>
              

            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {task.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )
    };


    return (
      <div>
        {tasks.map(onRenderCell)}
      </div>
    )

}

export default TaskComponent;




{/* <Checkbox {...label} icon={<DeleteOutlineIcon />} checkedIcon={<DeleteIcon />} sx = {{position: 'absolute', right: '120px'}} color = "error"/>
              <Checkbox {...label} icon={<EditIcon />} sx = {{marginRight: '2px', position: 'absolute', right: '150px'}}color="primary" /> */}


              // todo-list-website
              // A todo-list website using typescript in the front-end and back-end
              
              // Todo Website using the concept of Eisenhower matrix, where tasks are divided into four categories: Important and Urgent Important and Not Urgent Not Important and Urgent Not Important and Not Urgent
              
              // A user can add a new task, update a task, delete a task, also mark tasks as important, urgent, and completed.

