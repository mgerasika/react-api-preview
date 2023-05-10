import { getNow } from '@common/utils/now.util';
import { expect } from '@jest/globals';

describe('get-now', () => {
    it('get now should be real now not mocked (but ignore milisecconds)', () => {
        expect(Math.round(getNow().getTime() / 1000)).toEqual(Math.round(new Date().getTime() / 1000));
    });
});
