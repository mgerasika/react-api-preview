import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';
import 'twin.macro';
import { ButtonV2 } from './button-v2.component';

export default {
    title: 'Button V2',
};

export const Default = (): JSX.Element => {
    return (
        <div>
            <h2>Primary</h2>
            <div tw="flex justify-around">
                <ButtonV2 name="mybutton" variant="primary">
                    Without icon
                </ButtonV2>
                <ButtonV2 name="mybutton" variant="primary" icon={<InfoCircleOutlined />}>
                    With icon
                </ButtonV2>

                <ButtonV2 name="mybutton" disabled variant="primary">
                    Disabled
                </ButtonV2>

                <ButtonV2 name="mybutton" disabled variant="primary" icon={<InfoCircleOutlined />}>
                    Disabled with icon
                </ButtonV2>
            </div>
            <hr />

            <h2>Secondary</h2>
            <div tw="flex justify-around">
                <ButtonV2 name="mybutton" variant="secondary">
                    Without icon
                </ButtonV2>
                <ButtonV2 name="mybutton" variant="secondary" icon={<InfoCircleOutlined />}>
                    With icon
                </ButtonV2>
                <ButtonV2 name="mybutton" disabled variant="secondary">
                    Disabled
                </ButtonV2>

                <ButtonV2 name="mybutton" disabled variant="secondary" icon={<InfoCircleOutlined />}>
                    Disabled with icon
                </ButtonV2>
            </div>
            <hr />

            <h2>Tertiary</h2>
            <div tw="flex justify-around">
                <ButtonV2 name="mybutton" variant="tertiary">
                    Without icon
                </ButtonV2>
                <ButtonV2 name="mybutton" variant="tertiary" icon={<InfoCircleOutlined />}>
                    With icon
                </ButtonV2>
                <ButtonV2 name="mybutton" disabled variant="tertiary">
                    Disabled
                </ButtonV2>

                <ButtonV2 name="mybutton" disabled variant="tertiary" icon={<InfoCircleOutlined />}>
                    Disabled with icon
                </ButtonV2>
            </div>
            <hr />

            <h2>Quaternary</h2>
            <div tw="flex justify-around">
                <ButtonV2 name="mybutton" variant="quaternary">
                    Without icon
                </ButtonV2>
                <ButtonV2 name="mybutton" variant="quaternary" icon={<InfoCircleOutlined />}>
                    With icon
                </ButtonV2>
                <ButtonV2 name="mybutton" disabled variant="quaternary">
                    Disabled
                </ButtonV2>

                <ButtonV2 name="mybutton" disabled variant="quaternary" icon={<InfoCircleOutlined />}>
                    Disabled with icon
                </ButtonV2>
            </div>
            <hr />

            <h2>Full width</h2>
            <div tw="grid grid-cols-4 grid-column-gap[16px]">
                <ButtonV2 tw="w-full" name="mybutton" variant="primary">
                    Without icon
                </ButtonV2>
                <ButtonV2 tw="w-full" name="mybutton" variant="secondary" icon={<InfoCircleOutlined />}>
                    With icon
                </ButtonV2>
                <ButtonV2 tw="w-full" name="mybutton" disabled variant="tertiary">
                    Disabled
                </ButtonV2>

                <ButtonV2 tw="w-full" name="mybutton" disabled variant="tertiary" icon={<InfoCircleOutlined />}>
                    Disabled with icon
                </ButtonV2>
            </div>
        </div>
    );
};
