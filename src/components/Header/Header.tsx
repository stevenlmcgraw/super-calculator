import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@material-ui/core/styles';
import { AppState } from '../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import routes from './routeConstants';
import SearchBar from './SearchBar';
import HeaderTabs from './HeaderTabs';
import Drawer from './Drawer';

const Header = () => {

    const [activeIndexValue, setActiveIndexValue] = useState<number>(0);

    const classes = useStyles();
    const theme = useTheme();
    const { formulas } = useSelector((state: AppState) => state.formulas);

    const matches = useMediaQuery(theme.breakpoints.down("md"));    

    useEffect(() => {
      [...routes].forEach(route => {
        switch (window.location.pathname) {
          case `${route.link}`:
            if(activeIndexValue !== route.activeIndex) {
              setActiveIndexValue(route.activeIndex);
            }
            break;
        }
      });
    }, [activeIndexValue, setActiveIndexValue, formulas]);

    return (    
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
                {matches 
                    ? <Drawer activeIndexValue={activeIndexValue} setActiveIndexValue={setActiveIndexValue}/> 
                    : <HeaderTabs activeIndexValue={activeIndexValue} setActiveIndexValue={setActiveIndexValue}/>}
                <SearchBar/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;