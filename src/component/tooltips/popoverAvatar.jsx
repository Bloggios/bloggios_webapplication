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
import PropTypes from "prop-types";

const PopoverAvatar = ({
                           size = '50px',
                           source = '',
                           tooltip = 'Data',
                           top = '100%',
                           bottom = '',
                           left = '50%',
                           right = '',
                           transform = 'translate(-50%, 60%)',
                           bgColor = '#d9d9d9',
                           color = '#282a3a',
                           fontSize = '12px',
                           hoverTranslate = '0 -50%',
                           isTooltipAllowed = false,
                           borderRadius = '50%',
                           onClick,
                           cursor
                       }) => {
    return (
        <PopoverWrapper
            onClick={onClick}
            data-tooltip={tooltip}
            size={size}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
            transform={transform}
            background={bgColor}
            color={color}
            fontSize={fontSize}
            translate={hoverTranslate}
            opacity={isTooltipAllowed ? 1 : 0}
            visibility={isTooltipAllowed ? 'visible' : 'hidden'}
            style={{
                borderRadius: borderRadius,
                cursor: cursor
            }}
        >
            <img src={source} alt="Bloggios" height="100%" style={{ borderRadius, backgroundColor: "transparent" }} />
        </PopoverWrapper>
    );
};

const PopoverWrapper = styled.button`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  outline: none;
  border: none;
  padding: 0;
  position: relative;
  background-color: transparent;

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    padding: 3px 6px;
    border-radius: 4px;
    transition: 0.3s;
    opacity: 0;
    font-family: 'Inter', sans-serif;
    visibility: hidden;
    top: ${(props) => props.top};
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    background: ${(props) => props.background};
    transform: ${(props) => props.transform};
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize};
  }

  &:hover::before {
    opacity: ${(props) => props.opacity};
    visibility: ${(props) => props.visibility};
    translate: ${(props) => props.translate};
  }
`;

PopoverAvatar.propTypes = {
    size: PropTypes.string,
    source: PropTypes.string,
    tooltip: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    transform: PropTypes.string,
    bgColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    hoverTranslate: PropTypes.string,
    isTooltipAllowed: PropTypes.bool,
    borderRadius: PropTypes.string,
}

export default PopoverAvatar;