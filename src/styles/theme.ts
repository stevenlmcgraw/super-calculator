import { createMuiTheme } from "@material-ui/core/styles";

//const saturnHotdogMint = "#AAFAC8";
//const saturnHotdogJetBlack = "#363635";
const saturnHotdogJetBlack = "#363635";
const saturnHotdogMint = "#AAFAC8";



export default createMuiTheme({
    palette: {
        primary: {
            main: saturnHotdogJetBlack
        },
        secondary: {
            main: saturnHotdogMint
        },
        text: {
            primary: saturnHotdogMint
        }
    },
    typography: {
        tab: {
            textTransform: "none"
        }
    }
});