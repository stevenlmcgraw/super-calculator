import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Link, TextField, Grid, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { useStyles } from './styles';
import { AppState } from '../../redux/reducers/rootReducer';
import { postSiteUserLogin } from '../../redux/actions/authActions'
import ShowPasswordIconButton from '../../components/Buttons';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { accessToken, tokenType } = useSelector((state: AppState) => state.auth);
    // just so accessToken and tokenType aren't unused variabels for now
    console.log(accessToken, tokenType);

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const requestBody = {
        username,
        password
    }

    const handleSubmit = (event: FormEvent<{}>) => {
        dispatch(postSiteUserLogin(requestBody));
    }

    return (        
        <Grid container justify="center">
            <form className={classes.cardContainer}>
                <Card variant="outlined" className={classes.loginCard}>
                    <CardContent>
                        <Grid container justify="center" direction="column">
                            <Grid item className={classes.gridItem}>
                                <Typography className={classes.title} gutterBottom>
                                    Login!
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
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleSubmit}
                                >
                                        Log Me In!
                                </Button>
                            </Grid>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item >
                                    <Typography variant="subtitle1" color="primary">
                                        Need to sign-up?
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                    <Link href="/signup" color="secondary"> Click right he-yump!</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </Grid>        
    );

}

export default Login;