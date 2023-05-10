import { CONST } from '@common/constants/const.constant';
import { EDeliveryDayCommon, getStartDayFromDeliveryConfig } from '@common/utils/delivery-config.util';
import {
    ECalendarEventType,
    EUpcomingDeliverySubType,
    getAllEvents,
    IDayRangeCommon,
    ISubscriptionCommon,
} from '@common/utils/get-events.util';
import { getNow } from '@common/utils/now.util';
import { expect } from '@jest/globals';
import dayjs from 'dayjs';

const format = 'YYYY-MM-DD HH:mm';
const today = dayjs('2021-12-10 11:00', format).toDate();
describe('getAllEvents', () => {
    it('no events', () => {
        expect(
            getAllEvents({
                today,
                range: {
                    start: dayjs('2021-12-1 11:00', format).toDate(),
                    end: dayjs('2021-12-31 11:00', format).toDate(),
                },
                orders: [],
                subscriptions: [],
                addAdditionalMinutesForBlockUIInMinutes: 0,
            }).length,
        ).toEqual(0);
    });

    // it('have one customer holiday', () => {
    //     const result = getAllEvents({
    //         today,
    //         range: {
    //             start: dayjs('2021-12-1 11:00', format).toDate(),
    //             end: dayjs('2021-12-31 11:00', format).toDate(),
    //         },
    //         customerHolidays: [
    //             {
    //                 startDate: dayjs('2021-12-1 11:00', format).toDate(),
    //                 endDate: dayjs('2021-12-2 11:00', format).toDate(),
    //             },
    //         ],
    //         systemHolidays: [],
    //         orders: [],
    //         subscriptions: [],
    //         addAdditionalMinutesForBlockUIInMinutes: 0,
    //     });
    //     expect(result.length).toEqual(1);
    //     expect(result[0].metadata?.type).toEqual(ECalendarEventType.customerHoliday);
    // });

    // it('have one system holiday', () => {
    //     const result = getAllEvents({
    //         today,
    //         range: {
    //             start: dayjs('2021-12-1 11:00', format).toDate(),
    //             end: dayjs('2021-12-31 11:00', format).toDate(),
    //         },
    //         systemHolidays: [
    //             {
    //                 startDate: dayjs('2021-12-1 11:00', format).toDate(),
    //                 endDate: dayjs('2021-12-2 11:00', format).toDate(),
    //             },
    //         ],
    //         customerHolidays: [],
    //         orders: [],
    //         subscriptions: [],
    //         addAdditionalMinutesForBlockUIInMinutes: 0,
    //     });
    //     expect(result.length).toEqual(1);
    //     expect(result[0].metadata?.type).toEqual(ECalendarEventType.systemHoliday);
    // });

    it('have 4 subscription for monday', () => {
        const today = dayjs('2021-12-1 10:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2021-12-1 10:00', format).toDate(),
                end: dayjs('2021-12-31 10:00', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    // startDate: dayjs('2021-12-1 11:00', format).toDate(),
                    nextBillingAtDate: getStartDayFromDeliveryConfig(
                        today,
                        {
                            delivery_day: EDeliveryDayCommon.Mon,
                            cutoff_day: 1,
                        },
                        undefined,
                    ),
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.type).toEqual(ECalendarEventType.subscription);
    });

    it('have 5 subscription for friday', () => {
        const today = dayjs('2021-12-1 10:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2021-12-1 10:00', format).toDate(),
                end: dayjs('2021-12-31 10:00', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    // startDate: dayjs('2021-12-1 11:00', format).toDate(),
                    nextBillingAtDate: getStartDayFromDeliveryConfig(
                        today,
                        {
                            delivery_day: EDeliveryDayCommon.Fri,
                            cutoff_day: 1,
                        },
                        undefined,
                    ),
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(5);
        expect(result[0].metadata?.type).toEqual(ECalendarEventType.subscription);
    });

    // it('have 2 holiday and 2 subscription ', () => {
    //     const today = dayjs('2021-12-1 10:00', format).toDate();
    //     const result = getAllEvents({
    //         today,
    //         range: {
    //             start: dayjs('2021-12-1 10:00', format).toDate(),
    //             end: dayjs('2021-12-31 10:00', format).toDate(),
    //         },
    //         systemHolidays: [],
    //         customerHolidays: [
    //             {
    //                 startDate: dayjs('2021-12-12 11:00', format).toDate(),
    //                 endDate: dayjs('2021-12-19 11:00', format).toDate(),
    //             },
    //         ],
    //         orders: [],
    //         subscriptions: [
    //             createMockSubscription({
    //                 period: 1,
    //                 period_unit: 'week',
    //                 // startDate: dayjs('2021-12-1 11:00', format).toDate(),
    //                 nextBillingAtDate: getStartDayFromDeliveryConfig(today, {
    //                     delivery_day: EDeliveryDayCommon.Mon,
    //                     cutoff_day: 1,
    //                 }),
    //             }),
    //         ],
    //         addAdditionalMinutesForBlockUIInMinutes: 0,
    //     });
    //     expect(result.length).toEqual(3);
    //     expect(result[0].metadata?.type).toEqual(ECalendarEventType.subscription);
    //     expect(result[1].metadata?.type).toEqual(ECalendarEventType.customerHoliday);
    //     expect(result[2].metadata?.type).toEqual(ECalendarEventType.subscription);
    // });
});

describe('getAllEvents - blocked for modification', () => {
    it('no blocked subscription ', () => {
        const today = dayjs('2021-12-2 11:30', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2021-12-1 ', format).toDate(),
                end: dayjs('2021-12-3 ', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    // startDate: dayjs('2021-12-2 11:00', format).toDate(),
                    nextBillingAtDate: getStartDayFromDeliveryConfig(
                        today,
                        {
                            delivery_day: EDeliveryDayCommon.Fri,
                            cutoff_day: 1,
                        },
                        undefined,
                    ),
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(1);
        expect(result[0].metadata?.type).toEqual(ECalendarEventType.subscription);
    });
    it('have one blocked subscription ', () => {
        const today = dayjs('2021-12-3 12:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2021-12-1 ', format).toDate(),
                end: dayjs('2021-12-4 ', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    nextBillingAtDate: dayjs('2021-12-3 ', format).toDate(),
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(1);
        expect(result[0].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.blockedForUpdate);
    });

    it('have one NO blocked subscription (before 1 minute)', () => {
        const today = dayjs('2021-12-3 11:59', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2021-12-1', format).toDate(),
                end: dayjs('2021-12-4 ', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    nextBillingAtDate: dayjs('2021-12-3 ', format).toDate(),
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(1);
        expect(result[0].metadata?.type).toEqual(ECalendarEventType.subscription);
    });

    it('have one blocked subscription (added addAdditionalMinutesForBlockUIInMinutes = 30)', () => {
        const today = dayjs('2021-12-3 11:30', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2021-12-1 ', format).toDate(),
                end: dayjs('2021-12-4 ', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    nextBillingAtDate: dayjs('2021-12-3', format).toDate(),
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 30,
        });
        expect(result.length).toEqual(1);
        expect(result[0].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.blockedForUpdate);
    });

    it('have one withRemovedPause tick ', () => {
        const today = dayjs('2022-9-12 19:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1 ', format).toDate(),
                end: dayjs('2022-9-30 ', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-19', format).toDate(),
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.skippedButPauseRemoved);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
    });

    it('1 hour before cutOff', () => {
        const today = dayjs('2022-9-12 17:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5 ', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5 ', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-12', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });

    it('30 mins before cutOff - block UI', () => {
        const today = dayjs('2022-9-12 17:30', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5 ', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-12', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 30,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        // wait for order
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.blockedForUpdate);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });

    it('1 hour after cutOff', () => {
        const today = dayjs('2022-9-12 19:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5 ', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-12', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        // wait for order
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.blockedForUpdate);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });

    it('1 day after cutOff - but previous nextBillingAtDate', () => {
        const today = dayjs('2022-9-13 19:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5 ', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-12', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        // wait for order
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.blockedForUpdate);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });

    it('1 day after cutOff - but new nextBillingAtDate', () => {
        const today = dayjs('2022-9-13 19:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5 ', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-19', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        // wait for order
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.skippedButPauseRemoved);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });

    it('have one withRemovedPause tick when pause exist (1 hour after)', () => {
        const today = dayjs('2022-9-12 19:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-19', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(4);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.skippedButPauseRemoved);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[3].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });

    it('not have withRemovedPause tick when pause exist', () => {
        const today = dayjs('2022-9-12 17:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [
                {
                    orderDate: dayjs('2022-9-5', format).toDate(),
                },
            ],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-19', format).toDate(),
                    pauses: [
                        {
                            startDate: dayjs('2022-9-26', format).toDate(),
                            endDate: dayjs('2022-9-27', format).toDate(),
                        },
                    ],
                    cutOffTime: '18:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(3);
        expect(result[0].metadata?.orderObj).not.toBe(undefined);
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.pause);
    });
});

describe('getAllEvents - change frequency', () => {
    it('default upcoming delivery', () => {
        const today = dayjs('2022-9-6 19:00', format).toDate();
        const result = getAllEvents({
            today,
            range: {
                start: dayjs('2022-9-1', format).toDate(),
                end: dayjs('2022-9-30', format).toDate(),
            },
            orders: [],
            subscriptions: [
                createMockSubscription({
                    period: 1,
                    period_unit: 'week',
                    startDate: dayjs('2022-9-5 7:00', format).toDate(),
                    nextBillingAtDate: dayjs('2022-9-19', format).toDate(),
                    // pauses: [
                    //     {
                    //         startDate: dayjs('2022-9-26', format).toDate(),
                    //         endDate: dayjs('2022-9-27', format).toDate(),
                    //     },
                    // ],
                    cutOffTime: '12:00',
                }),
            ],
            addAdditionalMinutesForBlockUIInMinutes: 0,
        });
        expect(result.length).toEqual(3);
        expect(result[0].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.skippedButPauseRemoved);
        expect(result[1].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
        expect(result[2].metadata?.subscriptionObj?.subType).toEqual(EUpcomingDeliverySubType.upcomingDelivery);
    });
});

const createMockSubscription = ({
    period,
    period_unit,
    nextBillingAtDate,
    startDate,
    pauses,
    cutOffTime,
}: {
    period: number;
    period_unit: 'day' | 'week';
    startDate?: Date;
    nextBillingAtDate: Date;
    pauses?: IDayRangeCommon[];
    cutOffTime: string;
}): ISubscriptionCommon => {
    const [hours, minutes] = cutOffTime.split(':');
    return {
        id: '',
        billing_period: period,
        billing_period_unit: period_unit,
        cutOffDayOfWeekFromDC: dayjs(nextBillingAtDate).day(),
        totalPrice: 0,
        totalAddonsPrice: 0,
        startDate: startDate || nextBillingAtDate,
        cutOff: 1,
        cancelDate: undefined,
        endDate: CONST.MAX_DATE,
        nextBillingAtDate,
        pauses,
        cutoffTime: dayjs(getNow())
            .set('hours', +hours)
            .set('minutes', +minutes)
            .toDate(),
    };
};
