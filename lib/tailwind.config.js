// eslint-disable-next-line no-undef
module.exports = {
    mode: 'jit',
    // These paths are just examples, customize them to match your project structure
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    prefix: '',
    important: false,
    separator: ':',
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1690px',
            xxxl: '1920px',
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            orange: '#f2b63e',
            green: '#2e5a36',
            gray: '#ccc',
            black: 'black',
            white: 'white',
        },

        fontFamily: {
            primary: ['Interstate'],
            secondary: ['Oddtype'],
        },
        //Currently oddbox used next font-sizes: size: '40' | '30' | '25' | '18' | '16' | '14' | '13' | '12';
        fontSize: {
            inherit: 'inherit',
            initial: 'initial',
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '30px',
            '4xl': '40px',
            '5xl': '50px',
        },
        fontWeight: {
            hairline: '100',
            thin: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
        },
    },
};
