/*
 * Copyright © 2023-2024 Rohit Parihar and Bloggios
 * All rights reserved.
 * This software is the property of Rohit Parihar and is protected by copyright law.
 * The software, including its source code, documentation, and associated files, may not be used, copied, modified, distributed, or sublicensed without the express written consent of Rohit Parihar.
 * For licensing and usage inquiries, please contact Rohit Parihar at rohitparih@gmail.com, or you can also contact support@bloggios.com.
 * This software is provided as-is, and no warranties or guarantees are made regarding its fitness for any particular purpose or compatibility with any specific technology.
 * For license information and terms of use, please refer to the accompanying LICENSE file or visit http://www.apache.org/licenses/LICENSE-2.0.
 * Unauthorized use of this software may result in legal action and liability for damages.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import styled from "styled-components";
import React from "react";
import SingleColorLoader from "../loaders/SingleColorLoader";

const LoaderIconButton = ({
                              tooltipContent,
                              tooltipDelay = 500,
                              tooltipId = 'icon-button',
                              tooltipVariant = 'light',
                              bgColor = 'transparent',
                              color = 'rgba(255, 255, 255, 0.7)',
                              fontSize = '25px',
                              hBgColor = 'rgba(255, 255, 255, 0.08)',
                              hColor = 'rgba(255, 255, 255, 1)',
                              aBgColor = 'rgba(255, 255, 255, 0.04)',
                              aColor = 'rgba(255, 255, 255, 0.8)',
                              size = '40px',
                              padding = '2px',
                              children,
                              onClick,
                              style,
                              isHtmlTooltip = false,
                              isLoading
                          }) => {
    return (
        <Button
            data-tooltip-id={tooltipId}
            data-tooltip-content={!isHtmlTooltip ? tooltipContent : ''}
            data-tooltip-html={isHtmlTooltip ? tooltipContent : ''}
            data-tooltip-variant={tooltipVariant}
            data-tooltip-delay-show={tooltipDelay}
            bgColor={bgColor}
            color={color}
            fontSize={fontSize}
            hBgColor={hBgColor}
            hColor={hColor}
            aBgColor={aBgColor}
            aColor={aColor}
            padding={padding}
            width={size}
            onClick={onClick}
            style={style}
            isLoading={isLoading}
            disabled={isLoading}
        >
            {isLoading ? <SingleColorLoader height={'2px'} width={'2px'} size={'2px'}/> : children}
        </Button>
    );
};

const Button = styled.div`
    width: ${(props)=> props.width};
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    border-radius: 50%;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    font-size: ${(props) => props.fontSize};
    padding: ${(props) => props.padding};
    cursor: ${({isLoading}) => (isLoading ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${(props) => props.hBgColor};
        color: ${(props) => props.hColor};
    }

    &:active {
        background-color: ${(props) => props.aBgColor};
        color: ${(props) => props.aColor};
    }
`;

export default LoaderIconButton;