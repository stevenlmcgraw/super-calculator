import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@material-ui/core/styles';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppState } from '../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

//import MenuIcon from '@material-ui/icons/Menu';
//import SearchIcon from '@material-ui/icons/Search';

// const useStyles = makeStyles((theme: Theme) => 
//     createStyles({
//           logoContainer: {
//             padding: 0,
//             "&:hover": {
//               backgroundColor: "transparent"
//             }
//           },
//           tab: {
//             ...theme.typography.tab,
//             minWidth: 10,
//             marginLeft: '25px'
//           },
//           tabContainer: {
//             marginLeft: "auto"
//           },
//           toolbarMargin: {
//             ...theme.mixins.toolbar,
//             marginBottom: "3em",
//             [theme.breakpoints.down("md")]: {
//               marginBottom: "2em"
//             },
//             [theme.breakpoints.down("xs")]: {
//               marginBottom: "1.25em"
//             }
//           },
//     })

// )

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerItem: {
    //...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tab: {
    //...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    textTransform: "none"

  },
  search: {
    backgroundColor: theme.palette.secondary.main
  },
  tabContainer: {
    marginLeft: "auto"
  },
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
})
);

const Header = ({ activeIndexValue, setActiveIndexValue }: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const { formulas } = useSelector((state: AppState) => state.formulas);
    console.log('Inside header');
    console.log(formulas);

    //const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    // const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
    // const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleChangeTab = (event: ChangeEvent<{}>, 
      newValue: number) => {
          setActiveIndexValue(newValue);
    };
  
    // const handleClick = (event: FormEvent<HTMLInputElement>) => {
    //   setAnchorEl(event.currentTarget);
    //   setOpenMenu(true);
    // };
  
    // const handleMenuItemClick = (event: FormEvent<HTMLInputElement>, 
    //   index: number) => {
    //   setAnchorEl(null);
    //   setOpenMenu(false);
    //   setActiveIndexValue(index);
    // };
  
    // const handleClose = (event: FormEvent<HTMLInputElement>) => {
    //   setAnchorEl(null);
    //   setOpenMenu(false);
    // };

    const routes = [
      { name: "Home!", link: "/", activeIndex: 0 },
      {
        name: "Sign Up!",
        link: "/signup",
        activeIndex: 1
      },
      {
        name: "Login!",
        link: "/login",
        activeIndex: 2
      }
    ];

    // const options = formulas.map((option: any) => {
    //   const firstLetter = option.displayName[0].toUpperCase();
    //   return {
    //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //     ...option,
    //   };
    // });

    const searchBar = (        
        <Autocomplete
            id="formula-search"
            options={formulas.sort((a: any, b: any) => 
                -b.displayName.localeCompare(a.displayName))}
            groupBy={(option: any) => option.category}
            getOptionLabel={(option: any) => option.displayName}
            style={{width: 300}}
            renderInput={(params: any) => 
                <TextField 
                    {...params} 
                    label="Search Me!"
                    className={classes.search}
                    color="secondary"
                    size="small"
                    variant="outlined" 
                />
            }
        />      
    );

    // value refers the index of which tab will be highlighted
    const tabs = (      
        <Tabs
          value={activeIndexValue}
          onChange={handleChangeTab}
          className={classes.tabContainer}
          indicatorColor="primary"
        >
            
            {routes.map((route, index) => (
              <Tab
                key={`${route}${index}`}
                className={classes.tab}
                component={Link}
                to={route.link}
                label={route.name}
              />
            ))}                  
                            
        </Tabs>   
    );

    const drawer = (
      <>
        <SwipeableDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{ paper: classes.drawer }}
        >
          <div className={classes.toolbarMargin} />
          <List disablePadding>
            {searchBar}
            {routes.map(route => (
              <ListItem
                divider
                key={`${route}${route.activeIndex}`}
                button
                component={Link}
                to={route.link}
                selected={activeIndexValue === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  setActiveIndexValue(route.activeIndex);
                }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        <IconButton
          className={classes.drawerIconContainer}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
        >
          <MenuIcon className={classes.drawerIcon} />
        </IconButton>
      </>
    );

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
    }, [activeIndexValue, setActiveIndexValue, routes, formulas]);

        

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
                {matches ? drawer : tabs}
                {searchBar}
            </Toolbar>
        </AppBar>
    );
}

export default Header;