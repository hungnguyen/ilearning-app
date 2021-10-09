import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  select,
  unselect,
  unitSelector,
  initUnit,
} from "../../redux/unit/unitSlice";
import {
  createAsync,
  updateAsync,
  getOneAsync,
} from "../../redux/unit/unitAsyncThunk";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";

export default function UpdateUnit({ open, onClose }) {
  const dispatch = useDispatch();
  const unit = useSelector(unitSelector);
  const { id } = useParams();
  const [item, setItem] = useState(initUnit);

  useEffect(() => {
    if (id) {
      if (unit.list.length > 0) {
        dispatch(select(id));
      } else {
        dispatch(getOneAsync(id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setItem(unit.item);
  }, [unit.item]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setItem({ ...item, [name]: ["checkbox"].includes(type) ? checked : value });
  };

  const handleSave = () => {
    if (item._id) {
      dispatch(
        updateAsync({
          ...item,
          createdate: new Date(),
        })
      );
    } else {
      dispatch(
        createAsync({
          ...item,
          createdate: new Date(),
        })
      );
    }
    dispatch(unselect());
    onClose();
  };
  const handleCancel = () => {
    dispatch(unselect());
    onClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Unit</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { marginTop: 1, marginBottom: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              name="name"
              label="Name"
              fullWidth
              variant="outlined"
              value={item.name}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
