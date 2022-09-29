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

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/document/components/PaymentMethod";
import Invoices from "layouts/document/components/Invoices";
import BillingInformation from "layouts/document/components/BillingInformation";
import Transactions from "layouts/document/components/Transactions";
import StepperHorizotal from "components/forms/layout";

function Document() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0}>
        <StepperHorizotal/>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Document;
