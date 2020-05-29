import { makeStyles, Theme } from "@material-ui/core";


export default makeStyles((theme: Theme) => ({
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