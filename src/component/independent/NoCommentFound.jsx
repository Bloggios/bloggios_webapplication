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

const NoCommentFound = () => {
    return (
        <Wrapper>
            <Title>No Comments yet</Title>
            <SubTitle>
                Be the first to share your thoughts and insights on this Post
            </SubTitle>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
`;

const Title = styled.h1`
    font-size: clamp(1rem, 0.9515rem + 0.2985vw, 1.25rem);
    letter-spacing: 1px;
    font-weight: 500;
    color: #7687ff;
    font-family: inherit;
`;

const SubTitle = styled.h4`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    letter-spacing: 1px;
    font-weight: 400;
    color: ${colors.white60};
`;

export default NoCommentFound;