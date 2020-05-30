import React, { ChangeEvent } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import routes from './routeConstants';
import useStyles from './styles';
import { Link } from 'react-router-dom';

type HeaderTabsProps = {
    activeIndexValue: number;
    setActiveIndexValue: Function;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ activeIndexValue, setActiveIndexValue }) => {

    const classes = useStyles();

    const handleChangeTab = (event: ChangeEvent<{}>, 
        newValue: number) => {
            setActiveIndexValue(newValue);
    };
    
    return (      
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
}

export default HeaderTabs;
