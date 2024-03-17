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

const OtpInput = ({
                      id,
                      previousId,
                      nextId,
                      value,
                      onValueChange,
                      handleSubmit,
                      autofocus,
                      ref
                  }) => {

    const GROUP_ID = 'OTPGroup';
    const DATASET = 'autosubmit';

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleKeyUp = (event) => {
        if (event.keyCode === 8 || event.keyCode === 37) {
            const previousElement = document.getElementById(previousId);
            if (previousElement) {
                previousElement.select();
            }
        } else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode === 39) {
            const nextElement = document.getElementById(nextId);
            if (event.target.value) {
                if (nextElement) {
                    nextElement.select();
                } else {
                    const inputGroup = document.getElementById(GROUP_ID);
                    if (inputGroup?.dataset[DATASET]) {
                        handleSubmit();
                    }
                }
            }
        }
    }

    return (
        <DigitInput
            id={id}
            name={id}
            type={isMobile ? 'number' : 'text'}
            value={value}
            maxLength={1}
            autoComplete={false}
            autoCorrect={false}
            autoFocus={autofocus}
            onChange={(e) => onValueChange(id, e.target.value)}
            onKeyUp={handleKeyUp}
        />
    );
};

const DigitInput = styled.input`
    border: none;
    outline: none;
    height: 48px;
    aspect-ratio: 1/1;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(0.875rem, 0.778rem + 0.597vw, 1.375rem);
    -moz-appearance: textfield;
    transition: all 150ms ease;
    user-select: none;
    line-height: 50px;
    text-align: center;
    color: #e5e5e5;
    margin: 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);

    &:focus {
        border-bottom: 2px solid rgba(255, 255, 255, 0.8);
    }

    &:active {
        border-bottom: 2px solid rgba(255, 255, 255, 0.8);
    }

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    @media (max-width: 1200px) {
        height: 40px;
    }

    @media (max-width: 800px) {
        height: 48px;
    }

    @media (max-width: 400px) {
        height: 34px;
    }

    @media (max-width: 260px) {
        height: 28px;
    }
`;

export default OtpInput;