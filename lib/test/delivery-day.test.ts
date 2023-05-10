import {
    EDeliveryDayCommon,
    getDeliveryDayFromDeliveryConfig,
    getStartDayFromDeliveryConfig,
} from '@common/utils/delivery-config.util';
import { expect } from '@jest/globals';
import dayjs from 'dayjs';

const format = 'YYYY-MM-DD HH:mm';

describe('delivery-day', () => {
    it('calc delivery day after 12:00', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:59', format).toDate(),
                    {
                        cutoff_day: 0,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-27 11:59');
    });
    it('calc delivery day before 12:00', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:35', format).toDate(),
                    {
                        cutoff_day: 0,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-20 11:35');
    });

    it('calc delivery day 2', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:35', format).toDate(),
                    {
                        cutoff_day: 1,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-27 11:35');
    });

    it('calc delivery day 3', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:35', format).toDate(),
                    {
                        cutoff_day: 1,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Fri,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-24 11:35');
    });

    it('calc delivery day 4', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:35', format).toDate(),
                    {
                        cutoff_day: 6,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Fri,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-31 11:35');
    });

    it('calc delivery day 4', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-23 11:35', format).toDate(),
                    {
                        cutoff_day: 1,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-27 11:35');
    });

    it('calc delivery day 4', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-23 11:35', format).toDate(),
                    {
                        cutoff_day: 5,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2022-01-03 11:35');
    });

    it('calc delivery day 5', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2021-12-24 11:35', format).toDate(),
                    {
                        cutoff_day: 4,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2022-01-03 11:35');
    });
});

describe('start-day', () => {
    it('calc start day 1', () => {
        expect(
            dayjs(
                getStartDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:35', format).toDate(),
                    {
                        cutoff_day: 0,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Mon,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-20 12:00');
    });

    it('calc start day 2', () => {
        expect(
            dayjs(
                getStartDayFromDeliveryConfig(
                    dayjs('2021-12-20 11:35', format).toDate(),
                    {
                        cutoff_day: 3,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Fri,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-21 12:00');
    });

    it('calc start day 2', () => {
        expect(
            dayjs(
                getStartDayFromDeliveryConfig(
                    dayjs('2021-12-20 12:35', format).toDate(),
                    {
                        cutoff_day: 3,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Fri,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-21 12:00');
    });

    it('calc start day 3', () => {
        expect(
            dayjs(
                getStartDayFromDeliveryConfig(
                    dayjs('2021-12-20 12:35', format).toDate(),
                    {
                        cutoff_day: 3,
                        cutoff_time: '12:12',
                        delivery_day: EDeliveryDayCommon.Fri,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2021-12-21 12:12');
    });

    it('calc start day 4', () => {
        expect(
            dayjs(
                getStartDayFromDeliveryConfig(
                    dayjs('2022-07-02 11:35', format).toDate(),
                    {
                        cutoff_day: 2,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Sat,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2022-07-07 12:00');
    });

    it('calc delivery day 4', () => {
        expect(
            dayjs(
                getDeliveryDayFromDeliveryConfig(
                    dayjs('2022-07-02 11:35', format).toDate(),
                    {
                        cutoff_day: 2,
                        cutoff_time: '12:00',
                        delivery_day: EDeliveryDayCommon.Sat,
                    },
                    undefined,
                ),
            ).format(format),
        ).toEqual('2022-07-09 11:35');
    });
});
