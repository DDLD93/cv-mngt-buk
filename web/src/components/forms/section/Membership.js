import { Button, Container, Fab, Grid, Icon, TextField } from "@mui/material";
// date-fns
import React, { useEffect, useState, useContext, useMemo, useLayoutEffect } from "react";
import { StateContext } from "../../../context/state";
import uuid from "react-uuid";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import "./section.css";

function Membership() {
  const [organisation, setOrganisation] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [lists, setlists] = React.useState([]);
  const [disabled, setdisabled] = useState(true);
  const [focusStart, setFocusStart] = useState(false);
  const [hasValueStart, setHasValueStart] = useState("");

  const { disable, loading, formPostData, buttonState, setFormPost,user } = useContext(StateContext);

  const color = lists.length < 1 ? "" : "lightBlue";
  var key = uuid();
  const add = () => {
    let list = {
      id: key,
      organisation,
      title,
      start: hasValueStart,
    };
    setlists((prev) => [...prev, list]);
    setTitle("")
    setOrganisation("")
  };
  const deleteEntry = (e) => {
    let id = e.target.id;
    setlists(lists.filter((item) => item.id !== id));
  };
  const readyState = () => {
    setFormPost({
      id:user?._id,
      data:{
        membership:lists
      }
    });
    buttonState(false)
  };

  useEffect(() => {
    if (hasValueStart == "" || organisation == "" || title == "") {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
    lists.length > 0 ? readyState() : buttonState(true);
    return () => {
    };
  }, [organisation, title, hasValueStart, lists]);

  return (
    <Container>
      <Typography color="blue" variant="caption" sx={{ display: "block" }}>
        List any memberships you may have relevant to your research or other life activities
      </Typography>
      <Grid sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 5 }}>
        <TextField
          onChange={(e) => setOrganisation(e.target.value)}
          size="small"
          value={organisation}
          id="Institution"
          label="Organisation"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          value={title}
          id="Qualification"
          label="Title"
          variant="outlined"
        />
        <TextField
          onFocus={() => setFocusStart(true)}
          onBlur={() => setFocusStart(false)}
          size="small"
          onChange={(e) => {
            if (e.target.value) setHasValueStart(e.target.value);
            else setHasValueStart(false);
          }}
          type={hasValueStart || focusStart ? "month" : "text"}
          label="Date Started"
          variant="outlined"
        />
       <Fab size="small" color="secondary" onClick={add} disabled={disabled}  component="label" >
         <AddIcon />
      </Fab>
      </Grid>
      <Grid
        sx={{
          mt:5,
          p:1.2,
          display: "flex",
          gap: 2,
          maxWidth: 650,
          flexWrap: "wrap",
          alignItems: "center",
          background: color,
        }}
      >
        {lists.map((e) => {
          return (
            <RenderList
              id={e.id}
              delete={deleteEntry}
              orgnisation={e.organisation}
              title={e.title}
              start={e.start}
            />
          );
        })}
      </Grid>
    </Container>
  );
}

export default Membership;

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const RenderList = (prop) => {
    return (
<Grid gap={1} flexWrap="nowrap" container alignItems="center" > 
     <TextField size="small" disabled  defaultValue={prop.orgnisation}  label="Orgnisation" variant="outlined" />
     <TextField size="small" disabled  defaultValue={prop.title}  label="Title" variant="outlined" />
     <TextField size="small" disabled defaultValue={prop.start}  label="Date" />
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
