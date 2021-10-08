import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unitSelector } from "../../redux/unit/unitSlice";
import { getAllAsync } from "../../redux/unit/unitAsyncThunk";
import { useHistory } from "react-router-dom";
import UpdateUnit from "./UpdateUnit";
import { Delete, Edit } from "@mui/icons-material";
import { accountSelector } from "../../redux/account/accountSlice";

export default function ListUnit() {
  const unit = useSelector(unitSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const [openUpdate, setOpenUpdate] = useState(false);
  const account = useSelector(accountSelector);

  useEffect(() => {
    if (unit.list.length === 0) {
      dispatch(getAllAsync());
    }
  }, []);

  const handleClick = (id) => {
    history.push(`/unit/${id}`);
  };

  const handleClose = () => {
    setOpenUpdate(false);
  };
  const handleOpen = () => {
    setOpenUpdate(true);
  };
  return (
    <>
      {account.islogged && (
        <Button variant="outlined" onClick={handleOpen}>
          Add
        </Button>
      )}

      <UpdateUnit open={openUpdate} onClose={handleClose} />
      <List>
        {unit.list.length > 0 &&
          unit.list.map((i) => (
            <ListItem
              disablePadding
              key={i._id}
              secondaryAction={
                account.islogged && (
                  <>
                    <IconButton edge="end" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </>
                )
              }
            >
              <ListItemButton onClick={() => handleClick(i._id)}>
                <ListItemText primary={i.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  );
}
