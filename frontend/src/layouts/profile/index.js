
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { StateContext } from "../../context/state";
import { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";

function Overview() {
  const { user } = useContext(StateContext)
  const [userMap, setuserMap] = useState([])
  userMap.push(user)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        {userMap.map(e => (
          <Grid mt={6} pl={2} gap={3} container sx={{ bgcolor: "#fff2", borderRadius: "10px" }} >
            <TextField
              sm={4}
              disabled
              label="Full Name"
              defaultValue={e?.fullName}
              variant="outlined"
            />
            <TextField
              sm={4}
              disabled
              label="Email Address"
              defaultValue={e?.email}
              variant="outlined"
            />
            <TextField
              sm={4}
              disabled
              label="Phone Number"
              defaultValue={e?.phone}
              variant="outlined"
            />
            <TextField
              sm={12}
              disabled
              label="Staff Manager"
              defaultValue={e?.manager}
              variant="outlined"
            />
            <TextField
              sm={12}
              disabled
              label="Account Type"
              defaultValue={e?.userRole}
              variant="outlined"
            />
            <TextField
              sm={12}
              disabled
              label="Document Status"
              defaultValue={true ? "Awaiting for Approval" : "Approved"}
              variant="outlined"
            />
          </Grid>
        ))}
          <Button color="error" sx={{width:300}} variant="contained" >LogOut</Button>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
