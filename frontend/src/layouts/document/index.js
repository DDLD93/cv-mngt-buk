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
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

// Billing page components
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StepperHorizotal from "components/forms/layout";
import MDButton from "components/MDButton";
import { Divider } from "@mui/material";
import { StateContext } from "../../context/state";
import config, { baseUrl } from "../../config";
import { useNavigate } from "react-router-dom";




function Document() {
  const [isForm, setIsForm] = React.useState(false);
  const { user } = React.useContext(StateContext);

  React.useEffect(() => {
    fetch(`${baseUrl}/api/v1/form/${user._id}`).then(res => res.json())
      .then(res => {
        console.log("user >>>>", res);
      }).catch(err=>console.log({err}));
  }, [])

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
  const [doing, setDoing] = React.useState(false)
  const [errMessage, setErrMessage] = React.useState("")

  const router = useNavigate()
  const handleOpen = () => setOpen(true);


  const { notification, buttonState, setFormPost, formPost, user, } = React.useContext(StateContext);
  const handleClose = () => {
    router(-1)
    setOpen(false)
  };

  async function handleUpload() {
    setDoing(true)
    try {
      let formData = new FormData();
      formData.append("file", file)
      formData.append("userId", user?._id,)
      // setLoading(true);
      const response = await fetch(`${config.baseUrl}/api/v1/forms/upload`, {
        method: "POST",
        body: formData
      });
      setDoing(false)
      return response.json()
    } catch (error) {
      setDoing(false)
      return error.message
    }

  }


  const handleFormChange = (e) => {
    setFile(e.target.files[0])
  }
  React.useEffect(() => {
    console.log("no file")
    if (file) {
      handleUpload().then(data => {
        if (data.ok) {
          handleClose()

        } else {
          setErrMessage(data.messsage)
        }
      }).catch(error => {
        setErrMessage(error.messsage)
      })
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

            {!doing ? <>
              <IconButton sx={{ position: "absolute", left: "90%", top: "5%" }} size="small">
                <CloseIcon onClick={handleClose} color="error" fontSize="small" />
              </IconButton>
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
              <Typography color={"error"} >{errMessage}</Typography>
              <Divider />
              <Typography fontSize={11} >OR</Typography>
              <MDButton onClick={() => setIsForm(true)} disableElevation color="info" variant="text">Enter Manually</MDButton>
            </> :
              <CircularProgress thickness={1} sx={{ top: "50%", left: "0%", position: "relative" }} size={150} disableShrink />

            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

