import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersanalInfo from "../section/PersonalInfo";
import Education from "../section/Education";
import WorkHistory from "../section/WorkHistory";
import Membership from "../section/Membership";
import Skills from "../section/Skills";
import LoadingButton from "@mui/lab/LoadingButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Info from "../section/AdditionalInfo";
import { StateContext } from "../../../context/state";
import Completed from "../section/Completed";

const steps = [
  "Personal Info",
  "Education",
  "Work History",
  "Professioal Membership",
  "Skills",
  "Additional Information",
];

export default function StepperHorizotal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepTitle, setActiveStepTitle] = React.useState("Personal Info");
  const [completed, setCompleted] = React.useState({});
  const { disable, loading, loadingState, postData, postForm,submitForm, user, notification, postPersonalData,setUser } = useContext(StateContext);
//
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };


  const handleStep = (step, ssss) => () => {
    setActiveStep(step);
    setActiveStepTitle(ssss);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    let Next = () => {
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    }


    switch (activeStep) {
      case 0:
        postPersonalData().then((data) => {
          if(data.ok){
            Next();
            setActiveStepTitle("Education");

          }else{
            notification("error", data.message)
            loadingState(false)
          }
        }).catch((err) => {
          notification("error", err.message)
          loadingState(false)

        })
        break;
      case 1:
        postData("education-history").then((data) => {
          if(data.ok){
            Next();
            setActiveStepTitle("Work History");

          }else{
            notification("error", data.message)
            loadingState(false)
          }
         
        }).catch((err) => {
          notification("error", err.message)
          loadingState(false)

        })
        break;
      case 2:
        postData("work-history").then((data) => {
          if(data.ok){
            Next();
            setActiveStepTitle("Professioal Membership");

          }else{
            notification("error", data.message)
            loadingState(false)
          }
      
        }).catch((err) => {
          notification("error", err.message)
          loadingState(false)

        })
        break;
      case 3:
        postData("membership-history").then((data) => {
          if(data.ok){
            Next();
            setActiveStepTitle("Skills");
          }else{
            notification("error", data.message)
            loadingState(false)
          }     
        }).catch((err) => {
          notification("error", err.message)
          loadingState(false)

        })
        break;
      case 4:
        postData("skills").
          then((data) => {
            if(data.ok){
              Next();
              setActiveStepTitle("Additional Information");
            }else{
              notification("error", data.message)
              loadingState(false)
            }   
          }).catch((err) => {
            notification("error", err.message)
            loadingState(false)

          })
        break;
      case 5:
        submitForm("Additional Information").
          then((data) => {
            if(data.ok){
              localStorage.setItem("user", JSON.stringify(data.data))
              Next();
              setActiveStepTitle("submitted");
            }else{
              notification("error", data.message)
              loadingState(false)
            }  
         
          }).catch((err) => {
            notification("error", err.message)
            loadingState(false)

          })
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <Box color='info' sx={{ width: "100%" }}>
      {user?.formStatus == "submitted" || activeStepTitle == "submitted" ? <Completed /> :
        <>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step sx={{ mt: 0 }} key={label} completed={completed[index]}>
                <StepButton color="info" onClick={handleStep(index, label)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button variant="contained" onClick={handleReset}>
                    Submit
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                <h3 style={{ marginTop: "10px" }}>{activeStepTitle}</h3>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2, minHeight: 300 }}>


                  {activeStepTitle == "Personal Info" && <PersanalInfo />}
                  {activeStepTitle == "Education" && <Education />}
                  {activeStepTitle == "Work History" && <WorkHistory />}
                  {activeStepTitle == "Professioal Membership" && <Membership />}
                  {activeStepTitle == "Skills" && <Skills />}
                  {activeStepTitle == "Additional Information" && <Info />}


                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pr: 7 }}>
                  {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {
                    activeStepTitle == "Additional Information" && <Button
                    // onClick={}
                      disabled={false}
                      variant="contained"
                      size="small"
                      endIcon={<NavigateNextIcon />}
                      loadingPosition="end"
                      sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  }
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: "inline-block" }}>
                        Step { } already completed
                      </Typography>
                    ) : (
                      <LoadingButton
                        variant="contained"
                        size="small"
                        loading={loading}
                        disabled={disable}
                        endIcon={<NavigateNextIcon />}
                        loadingPosition="end"
                        onClick={handleComplete}
                      >
                        {completedSteps() === totalSteps() - 1 ? "Preview" : "Continue"}
                      </LoadingButton>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </>

      }
    </Box>
  );
}
