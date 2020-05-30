import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { Card, TextField, Grid, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './styles';

import { 
    checkUsernameAvailability, 
    checkEmailAvailability, 
    registerNewSiteUser } 
from '../../utilities';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {
    const classes = useStyles();

    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);
    const [badUsername, setBadUsername] = useState<boolean>(true);
    const [badEmail, setBadEmail] = useState<boolean>(true);

    const requestBody = {
        username,
        email,
        password
    }

    const handleSubmit = (event: FormEvent<{}>) => {
        registerNewSiteUser(requestBody)
        .then((response: any) => {
            console.log(response.status);
            if(response.data.success) {
                setAlertMessage('Congratulations... you registered successfully!');
                setOpen(true);
            }
            else {
                setAlertMessage('Whoopsies... that did not work. Another go, perhaps?');
                setOpen(true);
            }
        })
        .catch(error => {
            if(error.status === 400) {
                console.log(error)
            }
        })
    }

    const handleCheckUsername = (username: string | null) => {
        console.log(username);
        checkUsernameAvailability(username)
        .then((response: any) => {
            if(!response.data.available) {
                setAlertMessage('Username already exists... try again!');
                setOpen(true);
                setBadUsername(true);
            }
            else {
                setBadUsername(false);
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    const handleCheckEmail = (email: string | null) => {
        checkEmailAvailability(email)
        .then((response: any) => {
            if(!response.data.available) {
                setAlertMessage('Email already exists... try again!');
                setOpen(true);
                setBadEmail(true);
            }
            else {
                setBadEmail(false);
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    const handleNotificationClose = (event: SyntheticEvent, reason?: string) => {
        if(reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    useEffect(() => {
        if(username) {
            handleCheckUsername(username);
        }
    }, [username]);

    useEffect(() => {
        if(email) {
            handleCheckEmail(email);
        }
    }, [email]);

    useEffect(() => {
        const toggleSubmitDisabled = () => {
            if(!badUsername && !badEmail) {
                setSubmitButtonDisabled(false);
            }
            else {
                setSubmitButtonDisabled(true);
            }
        };
        toggleSubmitDisabled();
    }, [badUsername, badEmail]);

    return (
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
                            Sign Up!
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
                              inputProps={{
                                  minLength: 8,
                                  maxLength: 30
                              }}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            required
                            id="email"
                            name="email"
                            label="email" 
                            placeholder="Email" 
                            type="email"
                            variant="outlined"
                            color="primary"
                            onChange={event => {setEmail(event.target.value)}}
                            InputProps={{
                                className: classes.input,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
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
                            disabled={submitButtonDisabled}
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            >
                                Sign Me Up!
                        </Button>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity="warning">
                    {`${alertMessage}`}
                </Alert>
            </Snackbar>
        </form>
        </Grid>

    );

}

export default SignUp;