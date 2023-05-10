/* eslint-disable no-console */
import { IS_DEBUG } from '@common/constants/is-debug.constant';

export const consoleService = {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    assert(expr: unknown, msg: string): void {
        if (!expr && IS_DEBUG) {
            console.error(`Assert: ${msg}`);
        }
    },
    log: (message?: unknown, ...optionalParams: unknown[]): void => {
        if (IS_DEBUG) {
            console.log(message, ...optionalParams);
        }
    },
    error: (msg?: unknown, ...optionalParams: unknown[]): void => {
        if (IS_DEBUG) {
            console.error(`Handled Error: ${msg}`, ...optionalParams);
        }
    },
    warn: (message?: unknown, ...optionalParams: unknown[]): void => {
        if (IS_DEBUG) {
            console.warn(message, ...optionalParams);
        }
    },
};
