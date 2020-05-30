import { makeStyles, Theme } from "@material-ui/core";


export default makeStyles((theme: Theme) => ({
    button: {
    justifyContent: 'center',
    height: '3.5rem',
    width: '20rem',
    minWidth: '12rem',
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
    gridItem: {
        margin: '1em'
    },
    input: {
        color: theme.palette.primary.main
    },
    loginCard: {
        backgroundColor: 'white'
    },
    textField: {
        width: '20rem',
        minWidth: '12rem'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.palette.primary.main
    }
}));