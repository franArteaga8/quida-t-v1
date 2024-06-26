import './Home.css'
import {Box, AppBar, Toolbar, Typography} from '@mui/material';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { useCookies } from 'react-cookie'
import { closeTasks, getAllOpenTasks } from '../../services/user';
import OpenTasks from '../../components/OpenTasks/OpenTasks';



const Home = () => {

  

  const [date, setDate] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [selectDate, setSelectDate] = useState('')

  const [ openTasks, setOpenTasks ] = useState([])

 /*  const [taskDay, setTaskDay] = useState([])
  const [taskWeek, setTaskWeek] = useState([])
  const [taskMonth, setTaskMonth] = useState([]) */

  const handleFormatDate = ()=>{
    const dateCurrent = new Date()
    const day = dateCurrent.getDate()
    const month = dateCurrent.getMonth() + 1
   
    const fixedMonth = month < 9 ? '0' + month.toString() : month
    const year =  dateCurrent.getFullYear()
    setDate(`${year}-${fixedMonth}-${day}`)
  }

  const { user: cookieUser } = useCookies(['user'])[0]


  
  const handleOpenTasks = async () => {
    const result = await getAllOpenTasks()
    result && setOpenTasks(result.openTasks)

  }

  const handleClose = async () => {

    openTasks && openTasks.map(async (oT) => (oT.registryTasks[0].createdAt.split('T')[0] > date) && await closeTasks(oT.listId))

  }

  useEffect(()=>{
    handleClose()
    handleFormatDate()
    handleOpenTasks()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[date])


  return (
    <Box width={'80%'} maxWidth={'1200px'} height={'100%'} overflow= {'none'}  >
      <Box textAlign={'left'}  color={'primary.main'} sx={{ marginBottom: '50px'}  }>

        <Typography variant='h5'>
          Welcome,
        </Typography>

        <Typography variant='h1'>
          {cookieUser && cookieUser.name + ' ' + cookieUser.lastname} 
        </Typography>

      
        <AppBar position="static" sx={{borderRadius:'1em', margin:'30px 0'}} >
          <Toolbar sx={{display: 'flex', justifyContent: 'center'}} >
            <LocalizationProvider dateAdapter={AdapterDayjs}  >
              <DemoContainer components={['DatePicker']} sx={{padding: '20px', borderRadius:'20px'}}  >
                <DatePicker value={dayjs(date)} onChange={(e)=> {setSelectDate(e)
                }} sx={{backgroundColor: 'secondary.main', borderRadius: '1em'}}/>
               
              </DemoContainer>
            </LocalizationProvider>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant='h3' color={'primary'} textAlign={'left'}>My Daily Tasks</Typography>

      <Box   sx={{  scrollbarWidth:'none', height:'75%', padding:'20px', marginTop: '20px', marginBottom:'100px'}}  >
       
      
      { openTasks.length > 0  ? <OpenTasks oT={openTasks}/> : <Typography variant='h5' color={'primary'} > No tasks for today</Typography>}
      
        
        
      </Box>
    
    </Box>
    
  )
}

export default Home