import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Icon, TextField } from "@mui/material";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { StateContext } from "../../context/state";
import { LoadingButton } from "@mui/lab";
import MDButton from "components/MDButton";
import { PDFrender } from "components/PDF";
import TextArea from "components/forms/section/component/TextArea";
import config from "../../config";

export function SuspendDialog(prop) {
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = useState(false);
  const { notification } = useContext(StateContext);

  const action = () => {
    setloading(true);
    fetch(`http://localhost:5000/suspend/${prop.id}`)
      .then((res) => res.json())
      .then((res) => {
        res.status == "Success"
          ? notification("success", res.message)
          : notification("error", res.message);
        console.log(res)
        setOpen(false);
        setloading(false);
      })
      .catch((err) => {
        notification("error", err.message);
        console.log(err)
        setloading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Icon sx={{ cursor: "pointer" }} onClick={handleClickOpen}>
        block
      </Icon>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Account Suspension"}</DialogTitle>
        <DialogContent>
          <DialogContentText>You are about to suspend this user ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={action}
            autoFocus
            loading={loading}
            endIcon={<ArrowRightOutlinedIcon />}
            loadingPosition="end"
            variant="text"
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export function EditDialog({ fullName, manager, email, phone }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Icon sx={{ cursor: "pointer" }} onClick={handleClickOpen}>
        edit
      </Icon>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}>
        <DialogTitle sx={{ mb: 5 }} id="responsive-dialog-title">
          {"Account Modification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid sx={{ p: 2 }} gap={3} container >
              <Grid >
                <TextField defaultValue={fullName} label="Full Name" />
              </Grid>
              <Grid>
                <TextField defaultValue={manager} label="Staff Manager" />
              </Grid>
              <Grid>
                <TextField defaultValue={email} label="Email" />
              </Grid>
              <Grid>
                <TextField defaultValue={phone} label="Phone Number" />
              </Grid>

              <Grid container flexDirection="row" xs={12} item  >
                <Grid item xs={6}>
                  <TextArea sx={{ width: 50 }} label="Leave blank to auto generate" />
                </Grid>
                <Grid xs={3}>
                  <MDButton
                    variant="gradient"
                  >
                    Reset Password
                  </MDButton>

                </Grid>
              </Grid>
              <Grid xs={6} item  >
              </Grid>
              <Grid xs={6} item  >
              </Grid>


            </Grid>
          </DialogContentText>

        </DialogContent>

      </Dialog>
    </div>
  )
}
export function ScrollDialog(prop) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [fielLoading, setFielLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [work, setwork] = useState([]);
  const [memberShip, setmemberShip] = useState([]);
  const [skills, setskills] = useState([]);
  const [persoanlInfo, setpersoanlInfo] = useState([])
  const [AddInfo, setAddInfo] = useState([])
  const [filePath, setfilePath] = useState(null)

  var [form, setForm] = useState([]);
  const { user, notification } = useContext(StateContext);
  const reviewForm = () => {
    setloading(true);
    fetch(`${config.baseUrl}/api/v1/forms/approve/${prop.userId}`, {
      method: "PUT"
    })
      .then((res) => res.json())
      .then((data) => {
        data.ok == true
          ? notification("success", data.message)
          : notification("error", data.message);
        prop.reFetch()
        setloading(false);
        setOpen(false)
      })
      .catch((err) => {
        notification("error", err.message);
        setloading(false);
      });
  };
  const rejectForm = () => {
    setloading(true);
    fetch(`${config.baseUrl}/api/v1/forms/reject/${prop.userId}`, {
      method: "PUT"
    })
      .then((res) => res.json())
      .then((data) => {
        data.ok == true
          ? notification("success", data.message)
          : notification("error", data.message);
        prop.reFetch()
        setloading(false);
        setOpen(false)
      })
      .catch((err) => {
        notification("error", err.message);
        console.log(err)
        setloading(false);
      });
  };
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    setBtnLoading(true)
    fetch(`${config.baseUrl}/api/v1/forms/${prop.userId}`)
      .then((res) => res.json())
      .then((response) => {
        response.ok == true
          ? null
          : notification("error", response.message);
        let data = response.data
        if (data) {
          setBtnLoading(false)
          setfilePath(`${config.baseUrl}/${data.filePath}`)
        }
      })
      .catch((err) => {
        notification("error", err.message);
      });
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  useEffect(() => {

    filePath ? setFielLoading(false) : setFielLoading(true)
  }, [filePath])


  return (
    <div>
      <Icon sx={{ cursor: "pointer" }} onClick={handleClickOpen("body")}>
        visibility
      </Icon>

      <Dialog open={open} onClose={handleClose} scroll={scroll} maxWidth="md">
        <DialogTitle id="scroll-dialog-title">Document Preview</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText sx={{ width: 500, height: 500 }} p={3} ref={descriptionElementRef} tabIndex={-1}>



            <hr />
            {filePath ? <PDFrender
              url={filePath}
            /> : <CircularProgress thickness={1} sx={{ top: "30%", left: "30%" ,position:"absolute"}} size={200} disableShrink />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "red" }}
            variant="text"
            onClick={rejectForm}
            disabled={btnLoading}

          >
            Reject
          </Button>

          <Button
            onClick={reviewForm}
            autoFocus
            variant="text"
            disabled={btnLoading}

          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Field = (prop) => {
  return (
    <>
      <span style={{ fontSize: "12px", color: "blue", display: "block" }}>{prop.title}</span>
      <span style={{ margin: 0, padding: 0 }}>{prop.field}</span>
    </>
  );
};
const PersonalInfoRender = (person) => {
  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={2} >
                    <Field
                    title={"Title"}
                    field={"Dr"}
                    />
              </Grid> */}
      <Grid item xs={12}>
        <Field
          title={"Summary"}
          field={person?.statement}
        />
      </Grid>
      <Grid item xs={3}>

        <Field title={"Full Name"} field={person?.firstName + " " + person?.lastName + " " + person?.otherName} />

      </Grid>
      <Grid item xs={2}>
        <Field title={"Gender"} field={"Not found"} />
      </Grid>
      <Grid item xs={3}>
        <Field title={"Email"} field={person?.email} />
      </Grid>
      <Grid item xs={3}>
        <Field title={"Phone"} field={person?.phone} />
      </Grid>
      <Grid item xs={12}>
        <Field title={"Address"} field={person?.address} />
      </Grid>
    </Grid>

  );
};
const EducationHistory = (prop) => {
  return (
    <>
      <div style={{ display: "flex", gap: 30, marginTop: 5 }}>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Institute</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.institute}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Qualification</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.qualification}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Started</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.started}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Ended</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.ended}</span>
        </div>
      </div>
      <hr />
    </>
  );
};
const WorkHistory = (prop) => {
  return (
    <>
      <div style={{ display: "flex", gap: 30, marginTop: 5 }}>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Organization</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.orgnisation}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Title</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.title}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Started</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.started}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Ended</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.ended}</span>
        </div>
      </div>
      <hr />
    </>
  );
};
const Membership = (prop) => {
  return (
    <>
      <div style={{ display: "flex", gap: 30, marginTop: 5 }}>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Organization</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.orgnisation}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Title</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.title}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Started</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.started}</span>
        </div>
      </div>
      <hr />
    </>
  );
};

const Skills = (prop) => {
  return (
    <div>
      <span style={{ fontSize: "25px", display: "inline" }}>.</span>
      <span style={{ margin: 0, padding: 0 }}>{prop.skill}</span>
    </div>
  );
};

const AddInformation = (prop) => {
  return (
    <>
      <div style={{ display: "flex", gap: 70, marginTop: 5 }}>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Category</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.category}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>information</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.info}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "blue", display: "block" }}>Date</span>
          <span style={{ margin: 0, padding: 0 }}>{prop.date}</span>
        </div>
      </div>
    </>
  );
};
