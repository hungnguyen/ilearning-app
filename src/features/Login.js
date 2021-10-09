import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  InputAdornment,
} from "@mui/material";
import { login, accountSelector } from "../redux/account/accountSlice";

import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { AccountCircle, Lock } from "@mui/icons-material";

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

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(item));
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {account.error !== "" && (
            <Alert severity="error">{account.error}</Alert>
          )}
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
              name="username"
              label="User Name"
              fullWidth
              variant="outlined"
              value={item.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              value={item.password}
              onChange={handleChange}
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleLogin} type="submit" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
