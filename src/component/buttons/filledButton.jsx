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

const Wrapper = styled.button`
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 250ms ease;
  color: ${(props) => props.color || 'rgba(255, 255, 255, 0.6)'};
  border: ${(props) => props.border || '2px solid transparent'};

  &:hover {
    color: rgba(255, 255, 255, 1);
    border: ${(props) => props.hoveredBorder || '2px solid rgba(255, 255, 255, 0.16)'};
  }

  &:disabled {
    background: #151515 !important;
    cursor: not-allowed;
    border: 1px solid transparent;
  }
`;

const FilledButton = ({
                          height = '50px',
                          width = '100%',
                          bgColor = '#0b0b0b',
                          borderRadius = '14px',
                          border,
                          text,
                          color,
                          disabled,
                          hoveredBorder,
                          onClick
                      }) => (
    <Wrapper
        onClick={onClick}
        disabled={disabled}
        color={color}
        hoveredBorder={hoveredBorder}
        border={border}
        style={{
            height,
            width,
            backgroundColor: bgColor,
            borderRadius,
        }}
    >
        {text}
    </Wrapper>
);

FilledButton.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    bgColor: PropTypes.string,
    borderRadius: PropTypes.string,
    border: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    hoveredBorder: PropTypes.string,
    onClick: PropTypes.any
};

export default FilledButton;