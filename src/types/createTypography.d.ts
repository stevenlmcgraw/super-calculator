src/types/createTypography.d.ts

import * as createTypography from '@material-ui/core/styles/createTypography';

declare module '@material-ui/core/styles/createTypography' {
    interface TypographyOptions {
        [key: string]: any;
        tab?: any;
    }

    interface Typography {
        [key: string]: any;
        tab?: any;
    }
    
}