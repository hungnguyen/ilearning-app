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
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="content"
            label="Text"
            fullWidth
            variant="standard"
            value={item.content}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="image"
            label="Image"
            fullWidth
            variant="standard"
            value={item.image}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="audio"
            label="Audio"
            fullWidth
            variant="standard"
            value={item.audio}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="ordernumber"
            label="Order number"
            fullWidth
            variant="standard"
            value={item.ordernumber}
            onChange={handleChange}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
