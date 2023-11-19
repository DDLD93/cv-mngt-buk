import React, { useEffect, useState, useContext } from "react";
import { StateContext } from "../../../context/state";
// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";



// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/buk-bg.jpg";
import imageLogo from "../../../assets/images/buk-logo.png"
import { Typography } from "@mui/material";
import { Login } from "@mui/icons-material";
import MDBox from "components/MDBox";


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {login} = useContext(StateContext);


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="white"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
        
        {/* <Avatar alt="Remy Sharp" src="../../../assets/images/buk-logo.png" /> */}
          <Grid  container  justifyContent="center">
            <img src={imageLogo} alt="" srcset="" /> 
            <Typography>Bayero University Kano</Typography>
            <Typography variant="caption">Curriculum Vitae Management System</Typography>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput onChange={(e)=>setemail(e.target.value)} type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={(e)=>setpassword(e.target.value)} type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
              variant="gradient" 
              color="info" 
              fullWidth
              onClick={()=>{
                let data ={
                  email:email,
                  password:password
                }
                login(data)
              }}
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
