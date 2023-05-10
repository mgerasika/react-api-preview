import { EMPTY_LINK_ITEM, ILinkItem, makeLinks } from '@common/utils/make-links.util';
import { expect } from '@jest/globals';

interface IExampleRoute {
    firstStep: ILinkItem;
    auth: {
        check: {
            id: (id?: string) => ILinkItem;
        };
        login: ILinkItem;
        my: {
            changePassword: ILinkItem;
        };
    };
}

const exampleRoute = makeLinks<IExampleRoute>({
    firstStep: EMPTY_LINK_ITEM,
    auth: {
        check: {
            id: (_id?: string) => EMPTY_LINK_ITEM,
        },
        login: EMPTY_LINK_ITEM,
        my: {
            changePassword: EMPTY_LINK_ITEM,
        },
    },
});
describe('make-routes', () => {
    it('my-test', () => {
        expect(exampleRoute.firstStep.toString()).toEqual('/first-step');
        expect(exampleRoute.auth.toString()).toEqual('/auth');
        expect(exampleRoute.auth.login.toString()).toEqual('/auth/login');
        expect(exampleRoute.auth.my.changePassword.toString()).toEqual('/auth/my/change-password');
        expect(exampleRoute.auth.check.id().toString()).toEqual('/auth/check/:id');
        expect(exampleRoute.auth.check.id('e87a8340-1a81-4013-a8c8-c5ab8ec205ea').toString()).toEqual(
            '/auth/check/e87a8340-1a81-4013-a8c8-c5ab8ec205ea',
        );
    });
});
