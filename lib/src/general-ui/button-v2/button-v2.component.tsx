import { THEME } from '@common/constants/theme.constant';
import { SerializedStyles } from '@emotion/react';
import { Button as AntButton } from 'antd';
import React, { ReactNode } from 'react';
import { css } from 'twin.macro';

type TButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
interface IProps {
    name: string;
    variant: TButtonVariant;
    disabled?: boolean;
    onClick?: () => void;
    external?: boolean;
    children?: ReactNode;
    type?: 'submit' | 'button';
    className?: string;
    target?: string;
    icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
export const ButtonV2 = React.forwardRef<HTMLDivElement, IProps>(
    ({ name, type = 'submit', icon, children, external, target, disabled, className, variant, ...rest }, _ref) => {
        return (
            <AntButton
                name={name}
                {...rest}
                disabled={disabled}
                css={styles.button({ variant })}
                className={className}
                data-testid={`button-${name}`}
                htmlType={type}
                ref={_ref}
            >
                <>
                    {icon}
                    {children && <span css={styles.children(!!icon)}> {children}</span>}
                </>
            </AntButton>
        );
    },
);

// TODO: remove unused styles (variants, size, etc)
const styles = {
    button: ({ variant }: Pick<IProps, 'variant'>): (SerializedStyles | boolean | undefined)[] => [
        css`
            display: flex;
            justify-content: center;
            padding: 12px 16px;
            border-radius: 4px;
            align-items: center;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            height: 48px;

            &&[ant-click-animating-without-extra-node='true']::after {
                display: none;
            }

            span:first-of-type {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .anticon {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `,

        variant === 'primary' &&
            css`
                &&.ant-btn {
                    background-color: ${THEME.ORANGE};
                    border: 1px solid ${THEME.ORANGE};
                    color: black;

                    :hover {
                        background-color: ${THEME.ORANGE_500};
                        border: 1px solid ${THEME.ORANGE_500};
                        color: black;
                    }

                    :disabled {
                        background-color: ${THEME.GRAY_300};
                        border: 1px solid ${THEME.GRAY_300};
                        color: ${THEME.GRAY};
                    }
                }
            `,

        variant === 'secondary' &&
            css`
                &&.ant-btn {
                    background-color: ${THEME.WHITE};
                    border: 1px solid ${THEME.GRAY_300};
                    color: black;
                    :hover {
                        background-color: ${THEME.WHITE};
                        border: 1px solid ${THEME.BLACK};
                        color: black;
                    }

                    :disabled {
                        border: 1px solid ${THEME.GRAY_300};
                        background-color: ${THEME.GRAY_200};
                        color: #919191;
                    }
                }
            `,

        variant === 'tertiary' &&
            css`
                &&.ant-btn {
                    color: white;
                    background-color: ${THEME.GREEN};
                    border: 1px solid ${THEME.GREEN};
                    :hover {
                        background-color: #1f3d24;
                        color: white;
                    }

                    :disabled {
                        background-color: ${THEME.GRAY_300};
                        border: 1px solid ${THEME.GRAY_300};
                        color: #767676;
                    }
                }
            `,

        variant === 'quaternary' &&
            css`
                &&.ant-btn {
                    color: white;
                    background-color: ${THEME.PINK};
                    border: 1px solid ${THEME.PINK};
                    :hover {
                        background-color: ${THEME.PINK_HOVER};
                        border: 1px solid ${THEME.PINK_HOVER};
                        color: white;
                    }

                    :disabled {
                        background-color: ${THEME.GRAY_300};
                        border: 1px solid ${THEME.GRAY_300};
                        color: #767676;
                    }
                }
            `,
    ],
    children: (hasIcon: boolean): (SerializedStyles | boolean | undefined)[] => [
        css`
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 2px;
        `,
        hasIcon &&
            css`
                padding-left: 8px;
            `,
    ],
};
