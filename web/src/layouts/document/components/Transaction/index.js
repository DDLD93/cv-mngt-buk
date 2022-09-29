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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Typography } from "@mui/material";

function Transaction({ color, icon, name, description, value }) {
  return (
    <MDBox key={name} component="li" py={1} pr={2} mb={0}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          {/* <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon size="small"  sx={{ fontWeight: "bold",fontSize:"10px" }}>{icon}</Icon>
            </MDButton>
          </MDBox> */}
          <MDBox display="flex" flexDirection="column">
            <MDTypography sx={{fontSize:"12px"}}   variant="button" fontWeight="medium" gutterBottom>
              {name}
            </MDTypography>
            <MDTypography sx={{fontSize:"10px"}}   variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          </MDBox>
        </MDBox>
        <Typography sx={{fontSize:"10px"}}  variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </Typography>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props of the Transaction
Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Transaction;
