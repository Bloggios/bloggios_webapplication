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
import {colors} from "../../styles/Theme";

const NewsletterSection = () => {
    return (
        <Wrapper>
            <Title>
                Get the latest updates<br/><strong>subscribe</strong> now!
            </Title>

            <InputGroup>
                <input
                    type='email'
                    inputMode={'email'}
                    placeholder={'Enter Email'}
                />
                <button title={'Coming Soon'}>
                    Subscribe
                </button>
            </InputGroup>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;

const Title = styled.h2`
    font-size: clamp(1.375rem, 1.1676rem + 1.2766vw, 2.125rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 600;
    
    & strong {
        background: linear-gradient(270deg, #ee4700, #ffb628);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
    }

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const InputGroup = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 10px;

    & input {
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 300;
        border: none;
        outline: none;
        width: 250px;
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        color: rgba(245, 245, 245, 0.8);
        border-radius: 4px;
        box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;

        &:focus {
            color: rgba(245, 245, 245, 1);
        }
    }

    & button {
        width: max-content;
        height: 41px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        border-radius: 5px;
        background: ${colors.accent80};
        color: ${colors.white100};
        cursor: not-allowed;
        
        &:hover, &:active {
            background: ${colors.accent100};
        }
    }
`;

export default NewsletterSection;