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
import PropTypes from "prop-types";
import TooltipWrapper from "../tooltips/tooltipWrapper";

const IconButton = ({
                        border,
                        color,
                        background,
                        borderRadius,
                        icon,
                        hoveredBorder,
                        activeBorder,
                        hoveredBackgroundColor,
                        activeBackgroundColor,
                        hoveredColor,
                        activeColor,
                        cursor,
                        tooltip,
                        isTooltipAllowed,
                        onClick
                    }) => {

    return (
        <TooltipWrapper
            tooltip={tooltip}
            width={'100%'}
            height={'100%'}
            isTooltipAllowed={isTooltipAllowed}
            whiteSpace={'nowrap'}
        >
            <Wrapper
                onClick={onClick}
                border={border}
                hoveredBorder={hoveredBorder}
                activeBorder={activeBorder}
                hoveredBackgroundColor={hoveredBackgroundColor}
                activeBackgroundColor={activeBackgroundColor}
                hoveredColor={hoveredColor}
                activeColor={activeColor}
                background={background}
                color={color}
                borderRadius={borderRadius}
                cursor={cursor}
            >
                {icon}
            </Wrapper>
        </TooltipWrapper>
    );
};

const Wrapper = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: ${(props) => props.border};
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  cursor: ${(props) => props.cursor};
  transition: all 150ms;

  &:hover {
    outline: none;
    background: ${(props) => props.hoveredBackgroundColor};
    border: ${(props) => props.hoveredBorder};
    color: ${(props) => props.hoveredColor};
  }

  &:active {
    outline: none;
    background-color: ${(props) => props.activeBackgroundColor};
    border: ${(props) => props.activeBorder};
    color: ${(props) => props.activeColor};
  }
`;

IconButton.defaultProps = {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#e5e5e5',
    hoveredBorder: '1px solid rgba(255, 255, 255, 0.6)',
    activeBorder: '1px solid rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    isTooltipAllowed: false
}

IconButton.propTypes = {
    border: PropTypes.string,
    color: PropTypes.string,
    background: PropTypes.string,
    borderRadius: PropTypes.string,
    icon: PropTypes.element.isRequired,
    hoveredBorder: PropTypes.string,
    activeBorder: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string,
    hoveredColor: PropTypes.string,
    activeColor: PropTypes.string,
    cursor: PropTypes.string,
    tooltip: PropTypes.string,
    isTooltipAllowed: PropTypes.bool
}

export default IconButton;