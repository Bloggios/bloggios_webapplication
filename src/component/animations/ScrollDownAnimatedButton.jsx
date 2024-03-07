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
import styled, {keyframes} from "styled-components";

const ScrollDownAnimatedButton = ({
                                      margin,
                                      onClick
                                  }) => {
    return (
        <AnimatedButton
            style={{margin: margin}}
            onClick={onClick}
        />
    );
};

const wheel = keyframes`
    to {
        opacity: 0;
        top: 34px;

        @media (max-width: 400px) {
            top: 26px;
        }
    }
`;

const AnimatedButton = styled.button`
    width: 34px;
    height: 55px;
    border: 3px solid rgba(255, 255, 255, 0.6);
    border-radius: 60px;
    position: relative;
    outline: none;
    background: transparent;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    cursor: pointer;

    &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        top: 7px;
        left: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translateX(-50%);
        opacity: 1;
        animation: ${wheel} 2s infinite;
        -webkit-animation: ${wheel} 2s infinite;
    }

    @media (max-width: 440px) {
        width: 28px;
        height: 48px;

        &::before {
            height: 7px;
            width: 7px;
            top: 5px;
        }
    }
`;

const MemoizedScrollDownAnimatedButton = React.memo(ScrollDownAnimatedButton)

export default MemoizedScrollDownAnimatedButton;