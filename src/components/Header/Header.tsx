import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';
//import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        toolbarMargin: {
            ...theme.mixins.toolbar,
            marginBottom: "3em",
            [theme.breakpoints.down("md")]: {
              marginBottom: "2em"
            },
            [theme.breakpoints.down("xs")]: {
              marginBottom: "1.25em"
            }
          },
          logoContainer: {
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent"
            }
          },
    })

)

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Button
                        component={Link}
                        to="/"
                        disableRipple
                        className={classes.logoContainer}
                        >
                        Saturn Hotdog Super Calculator
                    </Button>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;