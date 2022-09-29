import * as React from 'react';
import { TextField } from '@mui/material';

export default function BasicSelect(prop) {
  const [focus, setFocus] = React.useState(false)
  return (
    <TextField
      value={prop.cValue}
      fullWidth
      onFocus={()=>setFocus(true)}
      onBlur={() => setFocus(false)}
      select={focus}
      label={prop.label}
      disabled={prop.isDisabled}
      size='small'
      SelectProps={{
        native: true,
      }}
      onChange={prop.changes}
    >
      {prop.list.map((li) => (
                      <option value={li.value}>
                        {li.name}
                      </option>
                    ))}
    </TextField>
  );
}