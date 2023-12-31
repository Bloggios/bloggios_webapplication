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
import Typography from "../typography/typography";

const ChipButton = ({
                        height,
                        width,
                        borderRadius = '25px',
                        backgroundColor = 'linear-gradient(225deg, #0c0c0c, #0a0a0a)',
                        color = '#e5e5e5',
                        icon,
                        text,
                        onClick
                    }) => {
    return (
        <ButtonWrapper
            onClick={onClick}
            style={{
                height,
                width,
                borderRadius: borderRadius && '25px',
                background: backgroundColor,
                color
            }}
        >
            {icon}
            <Typography
                text={text}
                type="custom"
                color="rgba(255, 255, 255, 0.7)"
                spacing="1px"
                family="Poppins"
            />
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.button`
  outline: none;
  border: none;
  box-shadow: -26px 26px 52px #080808, 26px -26px 52px #0e0e0e;
  padding: 7px 14px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
  user-select: none;
`;

ChipButton.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    borderRadius: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.node,
    text: PropTypes.node
};

export default ChipButton;