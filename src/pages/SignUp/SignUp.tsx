import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { Card, Link, TextField, Grid, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './styles';

import ShowPasswordIconButton from '../../components/Buttons';
import useDebounce from '../../utilities/hooks';
import { 
    checkUsernameAvailability, 
    checkEmailAvailability, 
    registerNewSiteUser } 
from '../../utilities/api';

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
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const DEBOUNCE_TIMEOUT = 750;
    const debouncedUsername = useDebounce(username, DEBOUNCE_TIMEOUT);
    const debouncedEmail = useDebounce(email, DEBOUNCE_TIMEOUT);

    const requestBody = {
        username,
        email,
        password
    };

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
    };

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

    const toggleShowPassword = () => {

    }

    useEffect(() => {
        if(debouncedUsername) {
            handleCheckUsername(debouncedUsername);
        }
    }, [debouncedUsername]);

    useEffect(() => {
        if(debouncedEmail) {
            handleCheckEmail(debouncedEmail);
        }
    }, [debouncedEmail]);

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
                <Grid item className={classes.gridItem}>
                        <Typography className={classes.title} gutterBottom>
                            Sign Up!
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username" 
                            placeholder="Username"
                            variant="outlined"
                            onChange={event => {setUsername(event.target.value)}}
                            className={classes.textField}
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
                    <Grid item className={classes.gridItem}>
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
                            className={classes.textField}
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
                    <Grid item className={classes.gridItem}>
                        <TextField 
                            required
                            id="password"
                            name="password"
                            label="Password" 
                            placeholder="Password" 
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            color="primary"
                            onChange={event => {setPassword(event.target.value)}}
                            className={classes.textField}
                            InputProps={{
                                className: classes.input,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                    <ShowPasswordIconButton 
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                    />
                                )
                              }}
                            />
                    </Grid>
                    <Grid item className={classes.gridItem}>
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
                    <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item >
                        <Typography variant="subtitle1" color="primary">
                            Already signed-up?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                        <Link href="/login" color="secondary"> Click right he-yump!</Link>
                        </Typography>
                    </Grid>
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