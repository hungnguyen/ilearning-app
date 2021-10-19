import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  Container,
  Zoom,
  Fab,
  IconButton,
} from "@mui/material";
import { Home, KeyboardArrowUp, Login, Logout } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Switch, Route, useHistory } from "react-router-dom";
import ListUnit from "./unit/ListUnit";
import ListItem from "./item/ListItem";
import LoginModal from "./Login";

import { useSelector, useDispatch } from "react-redux";
import { accountSelector, logout } from "../redux/account/accountSlice";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Master(props) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const history = useHistory();
  const [openLogin, setOpenLogin] = useState(false);
  const handleClose = () => {
    setOpenLogin(false);
  };
  const handleOpen = () => {
    setOpenLogin(true);
  };
  return (
    <React.Fragment>
      <LoginModal onClose={handleClose} open={openLogin} />
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/");
            }}
          >
            <Home />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            iLearning
          </Typography>
          {!account.islogged ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleOpen}
            >
              <Login />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => dispatch(logout())}
            >
              <Logout />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Switch>
          <Route exact path="/" component={ListUnit} />
          <Route path="/unit/:id" component={ListItem} />
        </Switch>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
