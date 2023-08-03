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
import { facultyList } from "./list.js"
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
  const [faculty, setFaculty] = useState([])
  const [department, setDepartment] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [btn, setBtn] = useState(false)
  const { notification, loadingState } = useContext(StateContext);
  // console.log("managerList><><><>>", managerList);
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
      if (response.ok === "true") {
        notification("success", response.message)
      }else{
        notification("error", response.message)
      }
      return response.json();
    } catch (error) {
      notification("error", error.message)
      return error
    }
  }
  function handleSetFaculty(e) {
    const value = e.target.value
    facultyList.forEach(li => {
      if (li.name === value) {
        setDepartmentList(li.value)
      }
    })
    setDepartment("")
    setFaculty(value)
    // setFaculty()
    // console.log("handleSetFaculty>>>>",e)
    // console.log("handleSetFaculty>>>", value)
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
        // console.log("staff adminssss>>>", r);
        setmanagerList(r?.payload)
        console.log("r.payload", r.payload)
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

  // useEffect(() => {

    // switch (role) {
    //   case "admin":
    //     if (title == null || fullName == null || email == null || phone == null || manager == null || faculty == null || department == null) {
    //       console.log("admin btn state >>>>>>>", btn);
    //       setBtn(true)
    //     }
    //     break;
    //   case "staff admin":
    //     if (title == null || fullName == null || email == null || phone == null || faculty == null || department == null) {
    //       console.log("staff admin btn state >>>>>>>", btn);
    //       setBtn(true)
    //     }
    //     break;
    //   case "staff":
    //     if (title == null || fullName == null || email == null || phone == null || manager == null) {
    //       console.log("staff btn state >>>>>>>", btn);
    //       setBtn(true)
    //     }
    //     break;

    //   default:
    //     console.log("btn state >>>>>>>", btn);
    //     setBtn(false)
    //     break;
    // }


  // }, [phone, email, role, title, manager, faculty, department, fullName])


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
                  { name: "Prof Emiratis", value: "profEmiratis" },
                  { name: "Professor", value: "professor" },
                  { name: "Dr", value: "Dr" },
                  { name: "Engr", value: "Engr" },
                  { name: "Barrista", value: "Barrista" },
                  { name: "Mr", value: "Mr" },
                  { name: "Mrs", value: "Mrs" },
                  { name: "Arc", value: "Arc" },
                  { name: "Surv", value: "Surv" },
                  { name: "Qsv", value: "Qsv" },
                  { name: "Alh", value: "Alh" },
                  { name: "Hajiya", value: "Hajiya" },
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
                  disabled={role == 'staff admin' && managerList.length && true}
                  getOptionLabel={(option) => (`${option?.department} (${option?.fullName})`)}
                  onChange={(e, v) => { setManager(v); console.log("v>>>>>><<<", v); }}
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
              <FacultySelect
                label="Faculty"
                cValue={faculty}
                changes={handleSetFaculty}
                list={facultyList}
              />
            </Grid>
            <Grid sx={{ display: role != "staff" ? "block" : "none" }} item xs={12} >
              <DepartmentSelect
                label="Department"
                cValue={department}
                changes={e => setDepartment(e.target.value)}
                list={departmentList}
              />
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


function FacultySelect(prop) {
  const [focus, setFocus] = React.useState(false)
  // console.log("FacultySelect", prop);
  // setFaculty({})
  return (
    <TextField
      value={prop.cValue}
      fullWidth
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      select={focus}
      label={prop.label}
      disabled={prop.isDisabled}
      size='small'
      SelectProps={{
        native: true,
      }}
      onChange={prop.changes}
    >
      {prop.list.map((li) => (
        <option value={li.name}>
          {li.name}
        </option>
      ))}
    </TextField>
  );
}

function DepartmentSelect(prop) {
  const [focus, setFocus] = React.useState(false)
  return (
    <TextField
      value={prop.cValue}
      fullWidth
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      select={focus}
      label={prop.label}
      disabled={prop.isDisabled}
      size='small'
      SelectProps={{
        native: true,
      }}
      onChange={prop.changes}
    >
      {prop.list.map((li) => (
        <option value={li}>
          {li}
        </option>
      ))}
    </TextField>
  );
}