import React, { useState, useEffect } from "react";
import { getAllAsync, removeAsync } from "../../redux/item/itemAsyncThunk";
import { itemSelector, select } from "../../redux/item/itemSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import {
  Box,
  MobileStepper,
  Paper,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import UpdateItem from "./UpdateItem";

import { accountSelector } from "../../redux/account/accountSlice";

export default function ListItem() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const [openUpdate, setOpenUpdate] = useState(false);
  const dispatch = useDispatch();
  const itemRed = useSelector(itemSelector);
  const [maxSteps, setMaxSteps] = useState(0);
  const [itemFilter, setItemFilter] = useState([]);
  const { id } = useParams();
  const account = useSelector(accountSelector);

  useEffect(() => {
    if (itemRed.list.length === 0) {
      dispatch(getAllAsync());
    }
  }, []);

  useEffect(() => {
    setItemFilter(itemRed.list.filter((i) => i.unitid === id));
  }, [itemRed.list, id]);

  useEffect(() => {
    setMaxSteps(itemFilter.length);
  }, [itemFilter]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    setOpenUpdate(false);
  };
  const handleOpen = () => {
    setOpenUpdate(true);
  };

  const handleEdit = () => {
    console.log(itemFilter[activeStep]._id);
    dispatch(select(itemFilter[activeStep]._id));
    setOpenUpdate(true);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn muốn xóa không?")) {
      dispatch(removeAsync(itemFilter[activeStep]._id));
      setActiveStep(activeStep - 1);
    }
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Box sx={{ marginTop: "30px" }}>
      {account.islogged && (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={handleOpen}>Add</Button>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      )}

      <UpdateItem open={openUpdate} onClose={handleClose} />
      {itemFilter.length > 0 && (
        <Box sx={{ flexGrow: 1 }}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {itemFilter.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box sx={{ height: 600, width: "100%", p: 2 }}>
                    {step.image !== undefined && step.image !== "" && (
                      <Box
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          marginBottom: "50px",
                        }}
                      >
                        <img src={step.image} alt="" width="20%" />
                      </Box>
                    )}
                    <Typography
                      variant="h3"
                      gutterBottom
                      component="div"
                      sx={{ flexGrow: 1, textAlign: "center" }}
                    >
                      {step.content}
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        marginTop: "50px",
                      }}
                    >
                      <audio controls preload="auto">
                        <source src={step.audio} type="audio/mpeg" />
                      </audio>
                    </Box>
                  </Box>
                ) : null}
              </div>
            ))}
          </SwipeableViews>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      )}
    </Box>
  );
}
