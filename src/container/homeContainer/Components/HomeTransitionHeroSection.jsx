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
import {ColumnWrapper} from "../../../styles/StyledComponent";
import styled from "styled-components";

const HomeTransitionHeroSection = () => {
    return (
        <ColumnWrapper>
            <HeadingSpan>
                The power of connection<br/>powered by <Strong>software</Strong>
            </HeadingSpan>

            <SubTitle>
                Beyond the blog. Engage your audience, spark conversations, and build thriving online communities with our powerful social media features, messaging tools, and custom software solutions
            </SubTitle>
        </ColumnWrapper>
    );
};

const HeadingSpan = styled.h1`
    font-size: clamp(1rem, 0.516rem + 2.9787vw, 2.75rem);
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-family: 'Poppins', sans-serif;
`;

const Strong = styled.strong`
    background: linear-gradient(to right, rgb(0, 168, 253), #fff 50%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const SubTitle = styled.h5`
    font-size: clamp(0.75rem, 0.6117rem + 0.8511vw, 1.25rem);
    text-align: center;
    width: 60%;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    margin: 0 auto;
`;

const MemoizedHomeTransitionHeroSection = React.memo(HomeTransitionHeroSection);

export default MemoizedHomeTransitionHeroSection;