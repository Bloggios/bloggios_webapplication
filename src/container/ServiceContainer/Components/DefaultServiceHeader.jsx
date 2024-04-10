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

import React, {memo} from 'react';
import styled from "styled-components";
import {meshBackground} from "../../../asset/svg";
import RequestServiceButton from "./RequestServiceButton";

const DefaultServiceHeader = () => {
    return (
        <Wrapper>
            <Heading2>
                <span className={'gradient__light-yellow'}>Ideate, </span>
                <span className={'gradient__light-purple'}>Engineer, </span>
                <span className={'gradient__dark-orange'}>Deliver</span>
            </Heading2>

            <Heading4>
                Ignite your digital potential. Unleash peak performance with our engineering
            </Heading4>

            <RequestServiceButton>
                Discuss Opportunities
            </RequestServiceButton>

            <BgImage src={meshBackground} alt={'Bloggios'} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    padding: 25px 0;
    align-items: center;
    justify-content: center;
    
    @media (orientation: landscape) {
        min-height: 60vh;
    }
    
    @media (orientation: portrait) {
        min-height: unset;
        margin-top: 25px;
    }
`;

const Heading2 = styled.h2`
    font-size: clamp(1.5625rem, 0.5093rem + 6.4815vw, 3.75rem);
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    letter-spacing: 1px;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    
    & > span {
        font-family: inherit;
        letter-spacing: inherit;
    }
`;

const Heading4 = styled.h4`
    width: 40%;
    font-size: clamp(0.9375rem, 0.7128rem + 1.383vw, 1.75rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 400;
    text-align: center;
    
    @media (max-width: 1000px) {
        width: 80%;
    }

    @media (max-width: 500px) {
        width: 95%;
    }
`;

const BgImage = styled.img`
    position: absolute;
    z-index: -1;
    top: -100px;
    left: 0;
    height: calc(100% + 100px);
    width: 100%;
    object-fit: cover;
    filter: blur(10px);
`;

export default memo(DefaultServiceHeader);