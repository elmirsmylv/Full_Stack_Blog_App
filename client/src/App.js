import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import PenIcon from "@material-ui/icons/Create";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";
import AddPostForm from "./components/AddPostForm";
import { fetchPost } from "./actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton
              edge="store"
              className={classes.container}
              color="inherit"
            />
            <Typography
              variant="h6"
              color="secondary"
              className={classes.title}
            >
              <a href="http://localhost:3000/posts">Blog Website</a>
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleOpen}
              startIcon={<PenIcon />}
            >
              Yeni Yazi
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              <Switch>
                <Route exact path="/posts" component={PostsList} />
                <Route exact path="/posts/:id" component={PostDetails} />
              </Switch>
              <Redirect from="/" to="/posts" />
            </Router>
          </Grid>
        </Grid>
      </Container>

      <AddPostForm open={open} handleClose={handleClose} />
    </>
  );
};

export default App;
