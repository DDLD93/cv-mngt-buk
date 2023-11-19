/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState,useContext } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Typography } from "@mui/material";
import PaymentMethod from "layouts/document/components/PaymentMethod";
import ProfileCard from "./component/ProfileCard";
import TimelineList from "examples/Timeline/TimelineList";
import Transaction from "layouts/document/components/Transaction";
import Transactions from "layouts/document/components/Transactions";
import { StateContext } from "context/state";




function Home() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const { user, notification } = useContext(StateContext);
  console.log(user)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={0}>
      <Grid container sx={{height:"70vh",margin:0}} spacing={0}  justifyContent="center">
        <ProfileCard
        name={user.fullName}
        email={user.email}
        gender={user.gender}
        phone={user.phone}
        faculty={user.faculty}
        department={user.department}
        staffAdmin={user.staffAdmin&&user.staffAdmin.fullName}
        formStatus={user.formStatus}
        />
         </Grid> 
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Home;
