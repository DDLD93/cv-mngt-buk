
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Transaction from "layouts/document/components/Transaction";

function Transactions() {
  return (
    <Card sx={{ height: "90%", minWidth:"450px",marginTop:1 }}>
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
            name="Netflix"
            description="27 March 2020, at 12:30 PM"
            value="- $ 2,500"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
