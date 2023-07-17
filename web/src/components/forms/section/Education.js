import { Button, Container, Fab, Grid, Icon, TextField, Typography } from "@mui/material";
// date-fns
import uuid from "react-uuid";

import AddIcon from "@mui/icons-material/Add";
import "./section.css";
import AddButton from "./component/AddButton";
import React, { useEffect, useState, useContext } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { StateContext } from "../../../context/state";

function Education() {
  const [qualf, setqualf] = React.useState("");
  const [inst, setinst] = React.useState("");
  const [lists, setlists] = React.useState([]);
  const [disabled, setdisabled] = useState(true);
  const [focusStart, setFocusStart] = useState(false);
  const [hasValueStart, setHasValueStart] = useState("");
  const [focusEnd, setFocusEnd] = useState(false);
  const [hasValueEnd, setHasValueEnd] = useState("");

  const { buttonState, setFormPost, user } = useContext(StateContext);
  const textInputStart = React.useRef(null);
  const textInputEnd = React.useRef(null);

  const color = lists.length < 1 ? "" : "lightBlue";
  var key = uuid();
  const add = () => {
    console.log("func add ran>>>",hasValueStart);
    let list = {
      id: key,
      institution: inst,
      qualification: qualf,
      start: hasValueStart,
      end: hasValueEnd,
    };

    setlists((prev) => [...prev, list]);
    setinst("");
    setqualf("");
    setHasValueStart("")
    setHasValueEnd("")
    textInputStart.current.value = "";
    textInputEnd.current.value = "";
  };
  const deleteEntry = (e) => {
    let id = e.target.id;
    setlists(lists.filter((item) => item.id !== id));
  }
  const readyState = () => {
    setFormPost({
      id: user?._id,
      data: {
        education: lists
      }
    });
    buttonState(false)
  };


  useEffect(() => {
    if (qualf == "" || inst == "" || hasValueStart == "" || hasValueEnd == "") {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
    lists.length > 0 ? readyState() : buttonState(true);
  }, [hasValueStart, hasValueEnd, qualf, inst, lists]);

  return (
    <Container>
      <Typography color="blue" variant="caption" sx={{ display: "block" }}>
        In reverse chronological order, add the institutions where you studied, when you studied and
        outcomes.
      </Typography>
      <Grid sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 5 }}>
        <TextField
          onChange={(e) => setinst(e.target.value)}
          size="small"
          value={inst}
          id="Institution"
          label="Institution"
          variant="outlined"
        />
        <TextField
          value={qualf}
          onChange={(e) => setqualf(e.target.value)}
          size="small"
          id="Qualification"
          label="Qualification"
          variant="outlined"
        />
        <TextField
          onFocus={() => setFocusStart(true)}
          size="small"
          inputRef={textInputStart}
          onBlur={() => setFocusStart(false)}
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
          size="small"
          inputRef={textInputEnd}
          onBlur={() => setFocusEnd(false)}
          onChange={(e) => {
            if (e.target.value) setHasValueEnd(e.target.value);
            else setHasValueEnd(false);
          }}
          type={hasValueEnd || focusEnd ? "month" : "text"}
          label="Date Completed"
          variant="outlined"
        />
        {/* <AddButton
        disabled={disabled} onClick={add}
        /> */}
        <Fab size="small" color="secondary" onClick={add} disabled={disabled} component="label" >
          <AddIcon />
        </Fab>
      </Grid>
      <Grid
        sx={{
          mt: 5,
          p: 1.2,
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
            <RenderListThree
              id={e.id}
              delete={deleteEntry}
              institution={e.institution}
              qualification={e.qualification}
              start={e.start}
              end={e.end}
            />
          );
        })}
      </Grid>
    </Container>
  );
}

export default Education;

const RenderListThree = (prop) => {
  return (
    <Grid gap={1} flexWrap="nowrap" container alignItems="center" >
      <TextField size="small" disabled defaultValue={prop.institution} label="Institution" variant="outlined" />
      <TextField size="small" disabled defaultValue={prop.qualification} label="Qualification" variant="outlined" />
      <TextField size="small" disabled defaultValue={prop.start} label="Started" />
      <TextField size="small" disabled defaultValue={prop.end} label="Completed" />
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
