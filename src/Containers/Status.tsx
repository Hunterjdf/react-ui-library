import React, { memo } from 'react';
import styled from 'styled-components';
import { transition, flex, position } from '../Utils/Mixins';
import { SmallText, SmallTextProps } from '../Text';
import { MainInterface } from '../Utils/BaseStyles';

interface StatusProps extends TextProps, DotProps {
    large?: boolean;
}

interface TextProps extends SmallTextProps, MainInterface {
    large?: boolean;
    status: string;
}

interface DotProps extends MainInterface {
    large?: boolean;
    status: string;
}

export const Status: React.FC<StatusProps> = memo(
    ({ children, status, large, ...props }): React.ReactElement => (
        <Text bold large={large} status={status} {...props}>
            <Dot large={large} status={status} />
            {children}
        </Text>
    ),
);

const Text = styled(SmallText)<TextProps>`
    ${flex('flex-start', 'center')}
    ${transition(['color'])}
    display: inline-flex;
    ${({ status, theme }): string => `
        color: ${theme.colors.status[status]};
    `}
    ${({ large }): string => (large ? `font-size: 1.4rem;` : '')}
`;

const Dot = styled.span<DotProps>`
    ${transition(['background-color'])}
    ${({ status, theme }): string => `
        background-color: ${theme.colors.status[status]};
        &:before {
            ${transition(['background-color'])}
            background-color: ${theme.colors.status[status]};
        }
    `}

    margin-right: 5px;
    position: relative;

    &,
    &:before {
        ${({ large }): string =>
            large
                ? `
            width: 11px;
            height: 11px;
        `
                : `
            width: 9px;
            height: 9px;
        `}
        border-radius: 50%;
    }

    &:before {
        ${transition(['transform', 'opacity'])}
        ${position('absolute')}
        animation: pulse 1s ease-in-out 0s infinite;
        content: '';

        @keyframes pulse {
            from {
                transform: scale(1);
                opacity: 0.7;
            }
            to {
                transform: scale(1.9);
                opacity: 0;
            }
        }
    }
`;
