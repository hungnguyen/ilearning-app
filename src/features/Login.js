import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import { login, accountSelector } from "../redux/account/accountSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Login({ open, onClose }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [item, setItem] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setItem({ ...item, [name]: ["checkbox"].includes(type) ? checked : value });
  };

  useEffect(() => {
    if (account.islogged) {
      onClose();
    }
  }, [account.islogged, onClose]);

  const handleLogin = () => {
    dispatch(login(item));
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {account.error !== "" && (
            <Alert severity="error">{account.error}</Alert>
          )}
          <TextField
            autoFocus
            name="username"
            label="User Name"
            fullWidth
            variant="standard"
            value={item.username}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="password"
            label="Password"
            fullWidth
            variant="standard"
            value={item.password}
            onChange={handleChange}
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
