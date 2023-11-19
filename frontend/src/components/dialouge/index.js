import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
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
export function EditDialog({fullName,manager,email,phone}) {
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
        <DialogTitle sx={{mb:5}} id="responsive-dialog-title">
          {"Account Modification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid sx={{p:2}} gap={3} container >
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
                 <TextArea sx={{width:50}} label="Leave blank to auto generate"/>
                </Grid>
                <Grid xs={3}>
                <MDButton
                variant="gradient"
                >
                Reset Password
                </MDButton>

                </Grid>
              </Grid>
              <Grid xs={6}  item  >
              </Grid>
              <Grid xs={6}  item  >
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
  const [loading, setloading] = useState(false);
  const [education, seteducation] = useState([]);
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
    fetch(`${config.baseUrl}/api/v1/forms/approve/${prop.userId}`,{
      method:"PUT"
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
  const rejectForm = () => {
    setloading(true);
    fetch(`${config.baseUrl}/api/v1/forms/reject/${prop.userId}`,{
      method:"PUT"
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

    fetch(`${config.baseUrl}/api/v1/forms/${prop.userId}`)
      .then((res) => res.json())
      .then((response) => {
        let data = response.form
        if (data) {
          seteducation(data.education);
          setwork(data.employment);
          setmemberShip(data.membership);
          setskills(data.skills);
          setpersoanlInfo(data.personalInfo)
          setAddInfo(data.additionalInfo)
          setfilePath(`${config.baseUrl}/api/v1/forms${data.filePath.slice(1)}`)
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

  return (
    <div>
      <Icon sx={{ cursor: "pointer" }} onClick={handleClickOpen("body")}>
        visibility
      </Icon>
      <Dialog open={open} onClose={handleClose} scroll={scroll} maxWidth="md">
        <DialogTitle id="scroll-dialog-title">CV Data</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText p={3} ref={descriptionElementRef} tabIndex={-1}>
            <h4 style={{ marginBottom: 15 }}>Personal Information</h4>
            {PersonalInfoRender(persoanlInfo)}
            <h4 style={{ marginTop: 35 }}>Education History</h4>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {education?.map((e) => (
                  <EducationHistory
                    institute={e?.institution}
                    qualification={e?.qualification}
                    started={e?.start}
                    ended={e?.end}
                  />
                ))}
              </Grid>
            </Grid>
            <h4 style={{ marginTop: 35 }}>Work History</h4>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {work?.map((e) => (
                  <WorkHistory
                    orgnisation={e?.organisation}
                    title={e?.title}
                    started={e?.start}
                    ended={e?.end}
                  />
                ))}
              </Grid>
            </Grid>
            <h4 style={{ marginTop: 35 }}>MemberShip</h4>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {memberShip?.map((e) => (
                  <Membership
                    orgnisation={e.organisation}
                    title={e.title}
                    started={e.start}
                    ended={""}
                  />
                ))}
              </Grid>
            </Grid>
            <h4 style={{ marginTop: 35 }}>Skills</h4>
            <Grid container spacing={1} flexDirection="row">
              {skills?.map((e) => (
                <Skills
                  skill={e.skill}
                />
              ))}
            </Grid>
            <h4 style={{ marginTop: 35, marginBottom: 35 }}>Additional Information</h4>
            <Grid container spacing={1}  >
              {AddInfo?.map((e) => (
                <AddInformation
                  info={e.information}
                  category={e.category}
                  date={e.date}
                />
              ))}
            </Grid>


            <div style={{marginTop:5}} >
              <h3 style={{ margin: 20, textAlign: "center", color: "black" }}>Document Preview</h3>
              <hr />
              <PDFrender 
                url={filePath}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "red" }}
            variant="text"
            onClick={rejectForm}

          >
            Reject
          </Button>

          <Button
            onClick={reviewForm}
            autoFocus
            variant="text"
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
