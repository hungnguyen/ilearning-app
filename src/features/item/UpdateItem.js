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
  itemSelector,
  initItem,
} from "../../redux/item/itemSlice";
import {
  createAsync,
  updateAsync,
  getOneAsync,
} from "../../redux/item/itemAsyncThunk";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";

export default function UpdateItem({ open, onClose, itemid }) {
  const dispatch = useDispatch();
  const itemRed = useSelector(itemSelector);
  const [item, setItem] = useState(initItem);
  const { id } = useParams();

  // useEffect(() => {
  //   if (itemid) {
  //     if (itemRed.list.length > 0) {
  //       dispatch(select(itemid));
  //     } else {
  //       dispatch(getOneAsync(itemid));
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setItem(itemRed.item);
  }, [itemRed.item]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setItem({ ...item, [name]: ["checkbox"].includes(type) ? checked : value });
  };

  const handleSave = () => {
    console.log(item);
    if (item._id) {
      dispatch(updateAsync(item));
    } else {
      dispatch(
        createAsync({
          ...item,
          unitid: id,
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
        <DialogTitle>Item</DialogTitle>
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
              name="content"
              label="Text"
              fullWidth
              variant="outlined"
              value={item.content}
              onChange={handleChange}
            />
            <TextField
              name="image"
              label="Image"
              fullWidth
              variant="outlined"
              value={item.image}
              onChange={handleChange}
            />
            <TextField
              name="audio"
              label="Audio"
              fullWidth
              variant="outlined"
              value={item.audio}
              onChange={handleChange}
            />
            <TextField
              name="ordernumber"
              label="Order number"
              fullWidth
              variant="outlined"
              value={item.ordernumber}
              onChange={handleChange}
              type="number"
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
