
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Transaction from "layouts/document/components/Transaction";

function DocumentLogs() {
  return (
    <Card sx={{ height: 300, minWidth:"470px",marginTop:1 }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography size="small" variant="h6" fontWeight="medium" textTransform="capitalize">
          History
        </MDTypography>
        </MDBox>  
      <MDBox pt={3} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_more"
            name="Mal El Mahmud Sabinus"
            description="27 March 2020, at 12:30 PM"
            value="Declined"
          />
          <Transaction
            color="info"
            icon="expand_less"
            name="Professor Diggi Musa"
            description="27 March 2020, at 04:30 AM"
            value="Approved"
          />
          <Transaction
            color="warning"
            icon="expand_less"
            name="Dr Ahmad Jakarda"
            description="27 March 2020, at 04:30 AM"
            value="pending"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default DocumentLogs;
