import { SCREENS } from '@common/hooks/use-screen-media-query.hook';

export const MQ = {
    sm: `@media (min-width: ${SCREENS.sm}px)`,
    md: `@media (min-width: ${SCREENS.md}px)`,
    lg: `@media (min-width: ${SCREENS.lg}px)`,
    xl: `@media (min-width: ${SCREENS.xl}px)`,
    xxl: `@media (min-width: ${SCREENS.xxl}px)`,
    xxxl: `@media (min-width: ${SCREENS.xxxl}px)`,
};
