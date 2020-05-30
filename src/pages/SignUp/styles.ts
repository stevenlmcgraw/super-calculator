import { makeStyles, Theme } from "@material-ui/core";


export default makeStyles((theme: Theme) => ({
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