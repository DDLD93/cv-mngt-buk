import { React, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Button } from "@mui/material";
import TextArea from "./component/TextArea";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { StateContext } from "../../../context/state";
import MDButton from "components/MDButton";

function PersonalInfo() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [otherName, setotherName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [address, setaddress] = useState("");
  const [statement, setstatement] = useState("");
  const { buttonState, setFormPost, formPost, user, } = useContext(StateContext);

  const emailValidator = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    pattern.test(email) ? setError(null) : setError("invalid Email Input")
    setemail(email)
  }


  const handleFormChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    switch (name) {
      case "firstName":
        setfirstName(value)
        break;
      case "lastName":
        setlastName(value)
        break;
      case "surName":
        setotherName(value)
        break;
      case "phone":
        setphone(value)
        break;
      case "email":
        emailValidator(value)
        break;
      case "address":
        setaddress(value)
        break;
      case "statement":
        setstatement(value)
        break;
      // case "file":
      //   setFile(e.target.files[0])
        break;
      default:
        break;
    }
  }

  const readyState = () => {
    setFormPost({
      // file,
      data: {
        userId: user?._id,
        personalInfo: {
          firstName,
          lastName,
          otherName,
          email,
          phone,
          address,
          statement,
        }
      }
    }
    )
    console.log("personalInfo>>>", firstName,
      lastName,
      otherName,
      email,
      phone,
      address,
      statement);
    buttonState(false)
  };

  useEffect(() => {
    if (
      firstName == "" ||
      otherName == "" ||
      email == "" ||
      phone == "" ||
      address == "" ||
      statement == "" 
      // !file
    ) {
      buttonState(true);
      setFormPost(undefined);
    } else {
      readyState()
      buttonState(false);
    }
  }, [firstName, lastName, otherName, email, phone, address, statement]);

  return (
    <Container fixed>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography color="blue" variant="caption" sx={{ display: "block" }}>
          Bio data
        </Typography>
        <TextField
          onChange={handleFormChange}
          size="small"
          name="firstName"
          label="First Name"
          variant="outlined"
        />
        <TextField
          onChange={handleFormChange}
          size="small"
          name="surName"
          label="Other Name"
          variant="outlined"
        />
        <TextField
          onChange={handleFormChange}
          helperText="Optional"
          size="small"
          name="lastName"
          label="Last Name"
          variant="outlined"
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch", mt: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography color="blue" variant="caption" sx={{ display: "block", mt: 50 }}>
          Contact information
        </Typography>
        <TextField
          onChange={handleFormChange}
          size="small"
          type="email"
          error={error ? true : false}
          helperText={error ? "invalid email" : null}
          name="email"
          label="Email Address"
          variant="outlined"
        />
        <TextField
          onChange={handleFormChange}
          name="phone"
          size="small"
          type="phone"
          phone="phone"
          label="Phone Number"
          variant="outlined"
        />
        <TextField
          onChange={handleFormChange}
          multiline
          label={"Address"}
          name="address"
          size="small" />
      </Box>
      <Box
        component="form"
        sx={{ height: 30, "& > :not(style)": { m: 1, width: "25ch", mt: 1 } }}
        noValidate
        autoComplete="off">

        <Typography color="blue" variant="caption" sx={{ display: "block", mt: 20 }}>
          Personal Statement
        </Typography>
        <TextField
          onChange={handleFormChange}
          label={"Personal Statement"}
          multiline
          size="small"
          name="statement"
        />
        {/* <MDButton
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
        <span>{file ? file.name : ""}</span> */}
      </Box>
    </Container>
  );
}
export default PersonalInfo;
