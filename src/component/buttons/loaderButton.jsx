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
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from "styled-components";
import SimpleLoader from "../loaders/simpleLoader";
import Typography from "../typography/typography";

const LoaderButton = ({
                          width,
                          height,
                          borderRadius,
                          fontSize,
                          isLoading,
                          text,
                          backgroundColor,
                          border,
                          color,
                          hoveredColor,
                          hoveredBackgroundColor,
                          hoveredBorder,
                          activeColor,
                          activeBackgroundColor,
                          activeBorder,
                          onClick
                      }) => {
    return (
        <ButtonWrapper
            backgroundColor={backgroundColor}
            border={border}
            color={color}
            hoveredColor={hoveredColor}
            hoveredBackgroundColor={hoveredBackgroundColor}
            hoveredBorder={hoveredBorder}
            activeColor={activeColor}
            activeBackgroundColor={activeBackgroundColor}
            activeBorder={activeBorder}
            onClick={onClick}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
                fontSize: fontSize,
                cursor: isLoading ? 'not-allowed' : 'pointer'
            }}>
            {
                isLoading ? <SimpleLoader size={'4px'}/> : (
                    <Typography
                        text={text}
                        type={'custom'}
                        spacing={'1px'}
                        family={'Inter'}
                    />
                )
            }
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  transition: all 150ms;
  &:hover {
    color: ${(props) => props.hoveredColor};
    background-color: ${(props) => props.hoveredBackgroundColor};
    border: ${(props) => props.hoveredBorder};
  }
  &:active {
    color: ${(props) => props.activeColor};
    background-color: ${(props) => props.activeBackgroundColor};
    border: ${(props) => props.activeBorder};
  }
`;

export default LoaderButton;