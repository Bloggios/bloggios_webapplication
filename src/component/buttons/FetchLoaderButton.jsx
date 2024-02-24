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

import React from 'react';
import styled from "styled-components";
import SingleColorLoader from "../loaders/SingleColorLoader";

const FetchLoaderButton = ({
                               style,
                               isLoading,
                               text = 'Button',
                               bgColor,
                               hBgColor,
                               aBgColor,
                               color,
                               hColor,
                               aColor,
                               borderRadius,
                               padding,
                               loaderColor,
                               loaderSize,
                               loaderDotsSize,
                               onClick
                           }) => {

    return (
        <ButtonWrapper
        onClick={onClick}
            style={style}
            bgColor={bgColor}
            hBgColor={hBgColor}
            aBgColor={aBgColor}
            color={color}
            hColor={hColor}
            aColor={aColor}
            borderRadius={borderRadius}
            padding={padding}
        >
            {isLoading ?
                <SingleColorLoader color={loaderColor} size={loaderSize} height={loaderDotsSize}
                                   width={loaderDotsSize}/> :
                <span>{text}</span>}

        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    padding: ${(props)=> props.padding};
    border-radius: ${(props)=> props.borderRadius};
    
    &:hover {
        color: ${(props) => props.hColor};
        background-color: ${(props) => props.hBgColor};
    }
    
    &:active {
        color: ${(props) => props.aColor};
        background-color: ${(props) => props.aBgColor};
    }
`;

export default FetchLoaderButton;