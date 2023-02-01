import React from 'react';
// import logo from './logo.svg';
import './App.css';
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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'; 
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import TaskComponent from './components/TaskComponent'

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  ////////////////// bgcolor: 'background.paper'
  return (
    <div>
      <Stack
        direction={{ xs: "column"}}
        spacing={{ xs: 1}}
        sx = {{marginLeft: '15%', width: '70%'}}
      >
    <Card sx={{ bgcolor: '#94f9e3', height: '50px', marginTop: '10%', justifyContent: 'center'}}>
      <CardContent sx = {{textAlign: 'center', fontWeight: 600, fontSize: '20px'}}>TODO LIST</CardContent>
    </Card>
    <Card sx={{ bgcolor: '#94f9e3', marginLeft: '15%', marginTop: '10%'}}>
      <CardContent>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Task List" {...a11yProps(0)} />
          <Tab label="New Task" {...a11yProps(1)} />
          <Tab label="Filter Tasks" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={value} index={0} dir={theme.direction}>
          <TaskComponent/>
        </TabPanel>


        <TabPanel value={value} index={1} dir={theme.direction}>
          <FormControl sx={{ m: 1, width: '500px'}} variant="outlined">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '500px' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" label="Title" variant="outlined" />
              <br/>
              <TextField sx = {{width: "500px"}}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
              />
              <Button sx = {{m: 1}} variant="contained">Submit</Button>
            </Box>
          </FormControl>
        </TabPanel>


        <TabPanel value={value} index={2} dir={theme.direction}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Completed" />
          <FormControlLabel control={<Checkbox />} label="Important" />
          <FormControlLabel control={<Checkbox />} label="Active" />
          <FormControlLabel control={<Checkbox />} label="Active" />
          <Button sx = {{m: 1, width:'150px'}} variant="contained">Submit</Button>
        </FormGroup>
        </TabPanel>
      </SwipeableViews>
      </CardContent>
    </Card>
    </Stack>
    </div>
  );
}

export default App;



{/* <TaskComponent
                taskTitle= "task 1"
                taskDescription= "this is a task 1"
          />
          <TaskComponent
                taskTitle= "task 2"
                taskDescription= "this is task 2"
          /> */}