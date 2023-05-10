import { useEffect, useState } from 'react';

export const SCREENS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1690,
    xxxl: 1920,
};

export function useScreenMediaQuery(): {
    isDownSM: boolean;
    isDownMD: boolean;
    isDownLG: boolean;
    isDownXL: boolean;
    isDownXXL: boolean;
    isDownXXXL: boolean;
    isUpSM: boolean;
    isUpMD: boolean;
    isUpLG: boolean;
    isUpXL: boolean;
    isUpXXL: boolean;
    isUpXXXL: boolean;
} {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = (): void => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return (): void => window.removeEventListener('resize', handleWindowResize);
    }, [setWidth]);

    return {
        isDownSM: width < SCREENS.sm,
        isDownMD: width < SCREENS.md,
        isDownLG: width < SCREENS.lg,
        isDownXL: width < SCREENS.xl,
        isDownXXL: width < SCREENS.xxl,
        isDownXXXL: width < SCREENS.xxxl,

        isUpSM: width >= SCREENS.sm,
        isUpMD: width >= SCREENS.md,
        isUpLG: width >= SCREENS.lg,
        isUpXL: width >= SCREENS.xl,
        isUpXXL: width >= SCREENS.xxl,
        isUpXXXL: width >= SCREENS.xxxl,
    };
}
