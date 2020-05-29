import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Card, TextField, Grid, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTheme } from '@material-ui/core/styles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

import { AppState } from '../../redux/reducers/rootReducer';
import { postSiteUserLogin } from '../../redux/actions/loginRequestActions'

const useStyles = makeStyles((theme: Theme) => ({
    button: {
    justifyContent: 'center',
    height: '45px',
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    }
    },
    cardContainer: {
        position: 'absolute',
        display: "flex",
        margin: `${theme.spacing(0)} auto`,
        marginTop: '10em'
    },
    input: {
        color: theme.palette.primary.main
    },
    loginCard: {
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.palette.primary.main
    }
}));

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const { accessToken, tokenType } = useSelector((state: AppState) => state);

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const requestBody = {
        username,
        password
    }

    const handleSubmit = (event: FormEvent<{}>) => {
        dispatch(postSiteUserLogin(requestBody));
    }

    return (
        <>
        <Grid
            container
            justify="center"
            >
        <form className={classes.cardContainer}>
            <Card variant="outlined" className={classes.loginCard}>
                <CardContent>
                <Grid container justify="center" direction="column">
                <Grid item>
                        <Typography className={classes.title} gutterBottom>
                            Login!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username" 
                            placeholder="Username"
                            variant="outlined"
                            onChange={event => {setUsername(event.target.value)}}
                            InputProps={{
                                className: classes.input,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircleIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            required
                            id="password"
                            name="password"
                            label="Password" 
                            placeholder="Password" 
                            type="password"
                            variant="outlined"
                            color="primary"
                            onChange={event => {setPassword(event.target.value)}}
                            InputProps={{
                                className: classes.input,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                    </Grid>
                    <Grid item>
                        <Button
                        className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            >
                                Log Me In!
                        </Button>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </form>
        </Grid>
        </>
    );

}

export default Login;