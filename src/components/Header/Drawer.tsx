import React, { useState } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import SearchBar from './SearchBar';
import routes from './routeConstants';
import useStyles from './styles';
import { Link } from 'react-router-dom';

type DrawerProps = {
    activeIndexValue: number;
    setActiveIndexValue: Function;
}

const Drawer: React.FC<DrawerProps> = ({ activeIndexValue, setActiveIndexValue }) => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    return (
        <>
        <SwipeableDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            classes={{ paper: classes.drawer }}
        >
            <div className={classes.toolbarMargin} />
            <List disablePadding>
            <SearchBar/>
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
}
export default Drawer;
