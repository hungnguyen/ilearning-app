import React, { useState, useEffect } from "react";
import { getAllAsync, removeAsync } from "../../redux/item/itemAsyncThunk";
import { itemSelector, select } from "../../redux/item/itemSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, MobileStepper, Paper, Typography, Button } from "@mui/material";
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
  return (
    <>
      {account.islogged && (
        <>
          <Button variant="outlined" onClick={handleOpen}>
            Add
          </Button>
          <Button variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}

      <UpdateItem open={openUpdate} onClose={handleClose} />
      {itemFilter.length > 0 && (
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ height: 600, width: "100%", p: 2 }}>
            {itemFilter[activeStep].image !== undefined &&
              itemFilter[activeStep].image !== "" && (
                <Box
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    marginBottom: "50px",
                  }}
                >
                  <img src={itemFilter[activeStep].image} alt="" width="100%" />
                </Box>
              )}
            <Typography
              variant="h3"
              gutterBottom
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {itemFilter[activeStep].content}
            </Typography>
            <Box sx={{ flexGrow: 1, textAlign: "center", marginTop: "50px" }}>
              <audio controls>
                <source src={itemFilter[activeStep].audio} type="audio/mpeg" />
              </audio>
            </Box>
          </Box>
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
    </>
  );
}
