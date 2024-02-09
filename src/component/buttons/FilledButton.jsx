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

const FilledButton = ({
                          width = '98%',
                          padding = '10px',
                          borderRadius = '10px',
                          bgColor = '#000000',
                          hoveredBgColor = 'rgba(0, 0, 0, 0.6)',
                          activeBgColor = '#000000',
                          color = 'rgba(255, 255, 255, 0.6)',
                          hoveredColor = 'rgba(255, 255, 255, 0.8)',
                          activeColor = '#e5e5e5',
                          onClick
                      }) => {
    return (
        <ButtonWrapper
            style={{
                width: width,
                padding: padding,
                borderRadius: borderRadius

            }}
            onClick={onClick}
            color={color}
            bgColor={bgColor}
            hoveredBgColor={hoveredBgColor}
            activeBgColor={activeBgColor}
            hoveredColor={hoveredColor}
            activeColor={activeColor}
        >
            View Profile
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.button`
    border: none;
    outline: none;
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    font-size: 14px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.bgColor};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.hoveredBgColor};
        color: ${(props) => props.hoveredColor};
    }

    &:active {
        background-color: ${(props) => props.activeBgColor};
        color: ${(props) => props.activeColor};
    }
`;

export default FilledButton;