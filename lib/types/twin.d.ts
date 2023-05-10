// import { css as cssImport } from '@emotion/react';
import styledImport from '@emotion/styled';
import 'twin.macro';

declare module 'twin.macro' {
    // The styled and css imports
    const styled: typeof styledImport;
    // const css: typeof cssImport;
    const css: any;
}

declare module '@emotion/css' {
    // The styled and css imports
    const styled: typeof styledImport;
    // const css: typeof cssImport;
    const css: any;
}
