import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
//import avatar2 from "assets/images/avatar.png";
import avatar from "../../assets/images/avatar.png";
import { SuspendDialog, EditDialog, ScrollDialog } from "components/dialouge";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import BasicModal from "components/addUserModal";
import config from "../../config"
import { useEffect, useState } from "react";
import MDBadge from "components/MDBadge";
import { Box } from "@mui/system";
import MDAvatar from "components/MDAvatar";

function Tables() {
  const [rows, setRows] = useState([])
  function fetchUsers() {
    fetch(`${config.userEndPoint}/api/v1/user`)
      .then(res => res.json())
      .then(status => {
        let rows = status.payload.map(user => {
          function statusColor() {
            if (user?.formStatus=="approved") return "success"
            if (user?.formStatus=="declined") return "error"
            if (user?.formStatus=="not submitted") return "dark"
            if (user?.formStatus=="submitted") return "warning"
            if (user?.formStatus== null) return "dark"
          }
          return {
            author: (<Author image={avatar} name={user?.fullName} email={user?.email} />),
            function: (<Job title={user?.userRole} description={user?.userRole} />),
            formStatus: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={user?.formStatus}
                  color={statusColor()}
                  variant="gradient"
                  size="sm" />
              </MDBox>
            ),
            employed: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {user?.createdAt.split("T")[0]}
              </MDTypography>
            ),
            action: (
              <Box component="div" sx={{ fontSize: "20px", display: "flex", gap: 1 }}>
                <ScrollDialog
                  userId={user?._id}
                  reFetch={fetchUsers}
                />
                {user.userRole == "admin" ? <EditDialog
                  props={user}
                /> : null}
                {user.userRole == "admin" ? <SuspendDialog
                  id={user?.id}
                /> : null}
              </Box>
            ),
          }
        })
        setRows(rows)
      })
      .catch(err => console.log(err))
  }


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );


const insertUser = (user) =>{
  setRows([...rows,{
    author: (<Author image={avatar} name={user?.fullName} email={user?.email} />),
    function: (<Job title={user?.userRole} description={user?.userRole} />),
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={user?.isSubmitted == true ?
          user?.isApproved == true ? "Approved" :
            "action needed" :
          "No submission"}
          color={user?.isSubmitted == true ?
            user?.isApproved == true ? "success" :
              "error" :
            "dark"}
          variant="gradient"
          size="sm" />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user?.createdAt.split("T")[0]}
      </MDTypography>
    ),
    action: (
      <Box component="div" sx={{ fontSize: "20px", display: "flex", gap: 1 }}>
        <ScrollDialog
          userId={user?._id}
        />
        {user.userRole == "admin" ? <EditDialog
          props={user}
        /> : null}
        {user.userRole == "admin" ? <SuspendDialog
          id={user?.id}
        /> : null}
      </Box>
    ),
  }])
}
 const  columns= [
    { Header: "user", accessor: "author", width: "45%", align: "left" },
    { Header: "Role", accessor: "function", align: "left" },
    { Header: "Form Status", accessor: "formStatus", align: "center" },
    { Header: "Created At", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]  
useEffect(() => {
  fetchUsers()
}, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                sx={{display: "flex",
                justifyContent: "space-between",
                  alignItems: "center"
                }}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  User Accounts
                </MDTypography>
                <BasicModal
                insertUser={insertUser}
                />
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                  />
                  
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
