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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { width } from "@mui/system";
import Transactions from "layouts/document/components/Transactions";
import DocumentLogs from "../Logs";
import MDBadge from "components/MDBadge";

function ProfileCard() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card justifyContent="center" mb={2} sx={{ width: "100%" }} id="delete-account">
      <MDBox pt={2} px={2} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" flexDirection="column" >
          <MDTypography sx={{ fontSize: "13px" }} variant="button" fontWeight="medium" gutterBottom>
            {`UMAR ADAMU JERE ${`staff`}`}
          </MDTypography>
          <MDTypography sx={{ fontSize: "12px" }} variant="caption" color="text" fontWeight="regular">
            {"umar.jere@gmail.com"}
          </MDTypography>
        </MDBox>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;modify document
        </MDButton>
      </MDBox>
      <hr style={{ backgroundColor: "grey" }} />
      <div style={{ display: "flex", justifyContent: "space-around" }} >
        <Card sx={{ display:"flex",gap:"1px", height: 300, minWidth: "400px", marginTop: 1,padding:2 }}>
          <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Full Name"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"Umar Adamu Jere"}
            </MDTypography>      
            <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Gender"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"Male"}
            </MDTypography>                    
              <hr />
              <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Email"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"umar.jere@gmail.com"}
            </MDTypography>           
            <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Phone"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"07055793353"}
            </MDTypography>          
             <hr />
             <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Faculty"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"Sciences"}
            </MDTypography>           
            <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Department"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"Mathematics"}
            </MDTypography>           
            <MDTypography sx={{fontSize:"9px"}}   variant="caption" color="text" fontWeight="regular">
              {"Moderator"}
            </MDTypography>  
             <MDTypography sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">
              {"Dr Audi T Giwa"}
            </MDTypography>          
            <MDTypography mt={1} sx={{fontSize:"13px"}}   variant="p" color="black" fontWeight="bold">Status:   
                <MDBadge badgeContent={"not submitted"}
                  color={"dark"}
                  variant="gradient"
                  size="sm" /></MDTypography>
        </Card>
        <DocumentLogs />
      </div>
    </Card>
  );
}

export default ProfileCard;
