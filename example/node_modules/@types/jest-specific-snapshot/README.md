# Installation
> `npm install --save @types/jest-specific-snapshot`

# Summary
This package contains type definitions for jest-specific-snapshot (https://github.com/igor-dv/jest-specific-snapshot#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest-specific-snapshot.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest-specific-snapshot/index.d.ts)
````ts
// Type definitions for jest-specific-snapshot 0.5
// Project: https://github.com/igor-dv/jest-specific-snapshot#readme
// Definitions by: Janeene Beeforth <https://github.com/dawnmist>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 4.3

/// <reference types="jest" />

declare global {
    namespace jest {
        interface Matchers<R, T> {
            toMatchSpecificSnapshot(snapshotFilename: string): R;
        }
    }
}

/**
 * Specify the serializer that should be used by toMatchSpecificSnapshot.
 * Note: toMatchSpecificSnapshot ignores the existing jest snapshot serializer settings. If you want to use a custom serializer,
 * you need to set it via this addSerializer function.
 */
export function addSerializer(serializer: any): void;

/**
 * This is used to create a customized version of toMatchSpecificSnapshot.
 */
export function toMatchSpecificSnapshot(data: any, snapshotFile: string, testName: string): () => { message(): string; pass: boolean; };

````

### Additional Details
 * Last updated: Fri, 17 Jun 2022 12:01:40 GMT
 * Dependencies: [@types/jest](https://npmjs.com/package/@types/jest)
 * Global values: none

# Credits
These definitions were written by [Janeene Beeforth](https://github.com/dawnmist).
