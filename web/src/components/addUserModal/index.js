import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import BasicSelect from "components/forms/section/component/Select";
import { StateContext } from "../../context/state"
import config from "../../config";
import {facultyList} from "./list.js"
const style = {
  modal: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px solid #red",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  add: {
    height: 40,
    width: 40,
    borderRadius: "50%",
  },
};

export default function BasicModal({ insertUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null)
  const [title, setTitle] = useState(null);
  const [manager, setManager] = useState(null);
  const [managerList, setmanagerList] = useState([])
  let [faculty, setFaculty] = useState([])
  const [department, setDepartment] = useState([])
  const [btn, setBtn] = useState(true)
  const { notification, loadingState } = useContext(StateContext);

  async function addUser() {
    try {
      let user = {
        Title: title,
        fullName: fullName,
        email,
        phone,
        userRole: role,
        staffAdmin: role == "staff" ?
          {
            id: manager._id,
            firstName: manager.firstName,
            lastName: manager.lastName,
            otherName: manager.otherName,
            fullName: manager.fullName,
            phone: manager.phone,
            email: manager.email,
          } : null,
        faculty: faculty,
        department: department,
        password: 123456
      };
      let response = await fetch(`${config.userEndPoint}/api/v1/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return response.json();
    } catch (error) {
      return error
    }
  }
  async function getUserAdmin() {
    try {
      const response = await fetch(`${config.userEndPoint}/api/v1/user/staff admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      return error
    }
  }
  const createUser = () => {
    loadingState(true)
    addUser()
      .then((status) => {
        if (status.ok) {
          notification("success", status.message)
          loadingState(false)
          insertUser(status.payload)
          handleClose()
          return
        }
        loadingState(false)
        console.log(status)
        notification("error", status.message);
      })
      .catch((err) => {
        notification("error", err.message)
        loadingState(false)
      });
  };

  useEffect(() => {
    getUserAdmin().
      then(r => {
        setmanagerList(r?.payload)
        console.log(r.payload)
      }).
      catch(err => notification("error", err.message))
    return () => {
      setFaculty(null)
      setDepartment(null)
      setFullName(null)
      setPhone(null)
      setEmail(null)
      setRole("staff")
      setTitle(null)
      setManager(null)
    }
  }, [open])
  useEffect(() => {
    if (role != 'staff admin') {
      setFaculty(null)
      setDepartment(null)
    }
  }, [role])

  useEffect(() => {
  if(phone==null||email==null||role==""||title==null||fullName==null){ 
    setBtn(true)
  }else{
    setBtn(false)
    //if(role==="staff"&&manager)setBtn(false)
   // if(role!="staff"&&department&&faculty)setBtn(false)
  }
   
 
  }, [phone,email,role,title,manager,faculty,department,fullName])
  
  return (
    <div style={style.button}>
      <MDButton size="small" onClick={handleOpen} color="primary">
        Add User
      </MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modal}>
          <MDTypography variant="h4" sx={{ mb: 5 }}>
            Create User
          </MDTypography>
          <Grid justifyContent="center" container spacing={2}>
            <Grid item xs={3}>
              <BasicSelect
                label="Title"
                cValue={title}
                changes={e => setTitle(e.target.value)}
                list={[
                  { name: "Mal", value: "mallam" },
                  { name: "Professor", value: "professor" },
                  { name: "Dr", value: "Dr" },
                ]}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                size='small'
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                value={fullName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size='small'
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="Email Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size='small'
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                label="Phone Number"
                variant="outlined"
              />
            </Grid>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={3} >
                <BasicSelect
                  label="Role"
                  cValue={role}
                  changes={e => setRole(e.target.value)}
                  list={[
                    { name: "Staff", value: "staff" },
                    { name: "Staff Admin", value: "staff admin" },
                    { name: "Admin", value: "admin" },
                  ]}
                />
              </Grid>
              <Grid item xs={9} >
                <Autocomplete
                  size="small"
                  disabled={role == 'staff admin' && true}
                  getOptionLabel={(option) => (`${option?.staffAdmin?.department} (${option?.fullName})`)}
                  onChange={(e, v) => { setManager(v) }}
                  options={managerList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Staff Admin"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid sx={{ display: role != "staff" ? "block" : "none" }} item xs={12} >
              <BasicSelect
                label="Faculty"
                cValue={faculty}
                changes={e => setFaculty(e.target.value)}
                list={facultyList}
              />
            </Grid>
            <Grid sx={{ display: role != "staff" ? "block" : "none" }} item xs={12} >
              {/* <BasicSelect
                label="Department"
                cValue={department}
                changes={e => setDepartment(e.target.value)}
                list={faculty.}
              /> */}
            </Grid>
            <Grid item xs={12} mt={4} mb={1}>
              <MDButton disabled={btn} onClick={createUser} size='small' variant="gradient" type="submit" color="info" fullWidth>
                Create User
              </MDButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
