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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Billing page components
import PaymentMethod from "layouts/document/components/PaymentMethod";
import Invoices from "layouts/document/components/Invoices";
import BillingInformation from "layouts/document/components/BillingInformation";
import Transactions from "layouts/document/components/Transactions";
import StepperHorizotal from "components/forms/layout";
import MDButton from "components/MDButton";
import { Divider } from "@mui/material";
import { StateContext } from "../../context/state";
import config from "../../config";



function Document() {
  const [isForm, setIsForm] = React.useState(false)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0}>
        {isForm ? <StepperHorizotal /> : <TransitionsModal setIsForm={setIsForm} />}

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Document;



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px none #000',
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column"

};

function TransitionsModal({ setIsForm }) {
  const [open, setOpen] = React.useState(true);
  const [file, setFile] = React.useState(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { notification, buttonState, setFormPost, formPost, user, } = React.useContext(StateContext);


  const handleFormChange = (e) => {
    setFile(e.target.files[0])
  }
  React.useEffect(async () => {
    if (file) {
      let formData = new FormData();
      formData.append("file", file)
      formData.append("userId", user?._id,)
      // setLoading(true);
      const response = await fetch(`${config.baseUrl}/api/v1/forms`, {
        method: "POST",
        body: formData
      });
      if (response.ok === true) {
        // notification("success", response.message)
      } else {
        notification("error", response.message)
      }
      // setLoading(false);
    }

    // return response.json();

  }, [file])


  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography mb={3} fontSize={15} >Upload a PDF format of your document</Typography>
            <MDButton
              sx={{ maxWidth: 120, color: "white" }}
              color="info"
              size="small"
              endIcon={<CloudUploadIcon />}
              component="label"
              variant="gradient"
            >
              Upload CV
              <input
                onChange={handleFormChange}
                name="file"
                type="file"
                hidden />
            </MDButton>
            <Divider />
            <Typography fontSize={11} >OR</Typography>
            <MDButton onClick={() => setIsForm(true)} disableElevation color="info" variant="text">Enter Manually</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

