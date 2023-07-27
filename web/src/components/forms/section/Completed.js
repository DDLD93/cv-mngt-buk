import { Button, Grid, Paper, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import React, { useContext } from 'react'
import { StateContext } from "../../../context/state";

function Completed() {
  const { user, notification, setUser } = useContext(StateContext);
  const reset = () => {
  
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`${config.formEndPoint}/api/v1/forms/reset/${user.id}`,options).
      then(res => res.json()).
      then(data => {
        if (data.status == "success") {
          notification("success", response.message)
          return
        }
        notification("error", response.message)
      }).catch(err => {
        notification("error", err.message)
      })
      
  }

  return (
    <Grid sx={{ height: "60vh" }} flexDirection="column" justifyContent="center" alignItems="center" container >
      <MDBox
        variant="gradient"
        bgColor="white"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={5}
        mb={1}
        textAlign="center"
      >
        {!user?.formstatus == "submitted" ? (
          <>
            <Typography>Submitted</Typography>
            <Button onClick={reset} sx={{ mt: 1 }}>Update Document</Button>
          </>
        ) :
          <Typography>Submitted, awaiting approval</Typography>
        }
      </MDBox>
    </Grid>
  )
}
export default Completed