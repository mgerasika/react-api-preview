let IS_BROWSER = false;
try {
    if (window && localStorage) {
        IS_BROWSER = true;
    }
    // eslint-disable-next-line no-empty
} catch {}
if (IS_BROWSER && !localStorage.getItem('IS_DEBUG')) {
    localStorage.setItem('IS_DEBUG', (process.env.NODE_ENV === 'development').toString().toLowerCase());
}
export const IS_DEBUG = IS_BROWSER ? localStorage.getItem('IS_DEBUG') === 'true' : false;
