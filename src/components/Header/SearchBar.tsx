import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import useStyles from './styles';
import { AppState } from '../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

const SearchBar = () => {
    const classes = useStyles()
    const { formulas } = useSelector((state: AppState) => state.formulas)

    return (  
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
    )
};

export default SearchBar;
