import { removeUndefined } from '@common/utils/remove-undefined.util';
import { expect } from '@jest/globals';

describe('remove-undefined', () => {
    it('default', () => {
        expect(JSON.stringify(removeUndefined({ x: undefined }))).toEqual('{}');
    });

    it('for array', () => {
        expect(JSON.stringify(removeUndefined({ n: [], x: undefined }))).toEqual(JSON.stringify({ n: [] }));
        expect(JSON.stringify(removeUndefined({ n: [{ y: undefined }], x: undefined }))).toEqual(JSON.stringify({ n: [] }));
    });

    it('for object', () => {
        expect(JSON.stringify(removeUndefined({ n: 0, x: undefined }))).toEqual(JSON.stringify({ n: 0 }));
        expect(JSON.stringify(removeUndefined({ z: { a: 0, b: undefined }, x: undefined }))).toEqual(
            JSON.stringify({ z: { a: 0 } }),
        );

        expect(JSON.stringify(removeUndefined({ z: { a: 0, b: null }, x: undefined }))).toEqual(
            JSON.stringify({ z: { a: 0, b: null } }),
        );
    });
});
