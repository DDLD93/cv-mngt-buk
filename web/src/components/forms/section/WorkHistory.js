import { Button, Container, Fab, Grid, Icon, TextField } from "@mui/material";
// date-fns
import uuid from 'react-uuid'
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState, useContext } from "react";
import { StateContext } from "../../../context/state";

import "./section.css";



function WorkHistory() {
  const [organisation, setorganisation] = React.useState("")
  const [title, settitle] = React.useState("")
  const [lists, setlists] = React.useState([])
  const [disabled, setdisabled] = useState(true)
  const [focusStart, setFocusStart] = useState(null);
  const [hasValueStart, setHasValueStart] = useState("");
  const [focusEnd, setFocusEnd] = useState(null);
  const [hasValueEnd, setHasValueEnd] = useState("");
  const textInput = React.useRef(null);

  const { buttonState,setFormPost,user } = useContext(StateContext);

 
  
  
const color = lists.length < 1?"":"lightBlue"
var key = uuid()
 const add = () => {
    let list ={
        id:key,
        organisation,
        title,
        start:hasValueStart,
        end:hasValueEnd,
       }
        
      setlists(prev =>[...prev,list])
      
      settitle("")
      setorganisation("")
      textInput.current.value = null;
     
     }  
  const deleteEntry = (e)=>{
    console.log(lists)
    let id = e.target.id
     setlists(lists.filter(item => item.id !== id));
  }
  const readyState = () => {
    setFormPost({
      id:user?._id,
      data:{
        employment:lists
      }
    });    buttonState(false)
  };

 useEffect(() => {
   if (organisation==""||title==""||hasValueStart==""||hasValueEnd=="") {
     
       setdisabled(true)
   }else{
    setdisabled(false) 
   }
   lists.length > 0 ? readyState() : buttonState(true);

 
 }, [hasValueStart,hasValueEnd,organisation,title,lists])
 
  
  return (
    <Container>
      <Typography color="blue" variant="caption" sx={{ display: "block"}}>
      Add in reverse chronological order, job title, organisation and dates
        </Typography>
      <Grid sx={{ display: "flex", gap: 2, flexWrap: "wrap",mt:5 }}>
        <TextField
         onChange={(e)=> setorganisation(e.target.value)}
         inputRef={textInput}
         value={organisation}
         size="small"
          id="organisation" 
          label="Organisation" 
          variant="outlined" />
        <TextField 
        onChange={(e)=> settitle(e.target.value)} 
        inputRef={textInput}
        value={title}
        size="small"
        id="Title" 
        label="Job Title" 
        variant="outlined"
         />
        <TextField
         onFocus={() => setFocusStart(true)}
         onBlur={() => setFocusStart(false)}
         size="small"
         value={hasValueStart}
         onChange={(e) => {
          if (e.target.value) setHasValueStart(e.target.value);
          else setHasValueStart(false);
        }}
      
        type={hasValueStart || focusStart ? "month" : "text"}
          label="Date Started"
          variant="outlined"
        />
        <TextField
         onFocus={() => setFocusEnd(true)}
         onBlur={() => setFocusEnd(false)}
         size="small"
         value={hasValueEnd}
         onChange={(e) => {
          if (e.target.value) setHasValueEnd(e.target.value);
          else setHasValueEnd(false);
        }}
        type={hasValueEnd || focusEnd ? "month" : "text"}
          label="Date Completed"
          variant="outlined"
        />
        <Fab size="small" color="secondary" onClick={add} disabled={disabled}  component="label" >
         <AddIcon />
          </Fab>
      </Grid>
      <Grid sx={{  mt:5,p:1.2, display: "flex", gap: 2, maxWidth:650, flexWrap: "wrap", alignItems:"center", background:color }}>
        {lists.map((e)=>{
          return(
            <RenderListtwo
            id={e.id}
            delete={deleteEntry}
            organisation={e.organisation}
            title={e.title}
            start={e.start}
            end={e.end}

            />
          )
        })}
      </Grid>
    </Container>
  );
}
export default WorkHistory;

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const RenderListtwo = (prop) => {
    return (
<Grid gap={1} flexWrap="nowrap" container alignItems="center" > 
     <TextField size="small" disabled  defaultValue={prop.organisation}  label="Organisation" variant="outlined" />
     <TextField size="small" disabled  defaultValue={prop.title}  label="Job Title" variant="outlined" />
     <TextField size="small" defaultValue={prop.start} disabled label="Started" />
     <TextField size="small" defaultValue={prop.end} disabled label="Ended" />
     <Icon fontSize="50"
      style={{
         cursor:"pointer",
         color:"red"
         
     }}>
         <DeleteForeverIcon
         id={prop.id}
         onClick= {prop.delete}
         />
     </Icon>
        </Grid>
    )
  }
 
   
 

