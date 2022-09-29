import { Button, Container, Fab, Grid, Icon, TextField ,Typography  } from "@mui/material";
// date-fns
import uuid from 'react-uuid'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState, useContext } from "react";
import { StateContext } from "../../../context/state";

import "./section.css";



function Skills() {
  const [skill, setskill] = React.useState("");
  const [lists, setlists] = React.useState([])
  const [disabled, setdisabled] = useState(true)
  const { buttonState,setFormPost,user } = useContext(StateContext);

  
  
const color = lists.length < 1?"":"lightBlue"
var key = uuid()
 const add = () => {
    let list ={
        id:key,
        skill,
       }
        
      setlists(prev =>[...prev,list])
      
      setskill("")
        
     }  
  const deleteEntry = (e)=>{
    let id = e.target.id
     setlists(lists.filter(item => item.id !== id));
  }
  const readyState = () => {
    setFormPost({
      id:user?._id,
      data:{
        skills:lists
      }
    });
    buttonState(false)
  };


 useEffect(() => {
   if (skill=="") {
       setdisabled(true)
   }else{
    setdisabled(false) 
   }
   lists.length > 0 ? readyState() : buttonState(true);

 }, [skill,lists])
 
  
  return (
    <Container>
      <Typography color="blue" variant="caption" sx={{ display: "block"}}>
      Use this section to write about your computational skills, administrative skills, team-working
skills, time-management, communication skills and project management skills
        </Typography>
      <Grid sx={{ display: "flex", gap: 2, flexWrap: "wrap",mt:5 }}>
        <TextField 
        onChange={(e)=> setskill(e.target.value)} 
        id="organisation" 
        label="Skill" 
        variant="outlined" 
        value={skill}
        />
        <Fab size="small" color="secondary" onClick={add} disabled={disabled}  component="label" >
         <AddIcon />
          </Fab>
      </Grid>
      <Grid sx={{  mt:5,p:1.2, display: "flex",flexDirection:"row", gap: 2, flexWrap: "wrap", alignItems:"center", background:color }}>
        {lists.map((e)=>{
          return(
            <SkillList
            id={e.id}
            delete={deleteEntry}
            skill={e.skill}
            />
          )
        })}
      </Grid>
    </Container>
  );
}

export default Skills;

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const SkillList = (prop) => {
    return (
        <Grid sx={{ width: 250 }} gap={1} container alignItems="center" >
            <TextField size="small" disabled defaultValue={prop.skill} variant="outlined" />
            <Icon fontSize="50"
                style={{
                    cursor: "pointer",
                    color: "red"

                }}>
                <DeleteForeverIcon
                    id={prop.id}
                    onClick={prop.delete}
                />
            </Icon>
        </Grid>
    )
}

 
   
 

