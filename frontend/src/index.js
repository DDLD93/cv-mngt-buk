

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import StateContextProvider from "./context/state.js";
import { SnackbarProvider, useSnackbar } from 'notistack';

import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
    <SnackbarProvider>
      <StateContextProvider maxSnack={2} >
        <App />
      </StateContextProvider>
      </SnackbarProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
