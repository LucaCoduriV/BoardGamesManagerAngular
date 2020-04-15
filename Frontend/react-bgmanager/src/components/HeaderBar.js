import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
  },
  title: {
      minWidth: '211px',
      marginRight: '30px',
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0.5, 2),
    paddingTop: '6px',
    position: 'absolute',
  },
  inputRoot: {
    color: 'inherit',
    width: '400px'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingTop: '10px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  buttonWrapper : {
      width: '100%',
  },
  button : {
      float: 'right',
  }
}));

export default function HeaderBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Board Games Manager
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Recherche"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <Button color="inherit" className={classes.button}>Inscription</Button>
            <Button color="inherit" className={classes.button}>Connexion</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}