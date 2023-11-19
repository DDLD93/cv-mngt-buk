import { TextField } from "@mui/material";
import React from "react";
import "../section.css";

function TextArea(prop) {
  return (
    <>
      <TextField
        margin="dense"
        size="small"
        id={prop.id}
        label={prop.label}
        multiline
        fullWidth
        maxRows={prop.maxRows}
        value={prop.value}
        onChange={prop.change}
      />
    </>
  );
}
export default TextArea;
