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

const QuestionTag = React.forwardRef(({
                                          tag,
                                          category,
                                          onClick
                                      }, ref) => {
    return (
        ref ? (
            <Wrapper ref={ref} onClick={onClick}>
                <h5 title={'Tag'}>{tag}</h5>
                <span title={'Tag Category'}>{category}</span>
            </Wrapper>
        ) : (
            <Wrapper onClick={onClick}>
                <h5 title={'Tag'}>{tag}</h5>
                <span title={'Tag Category'}>{category}</span>
            </Wrapper>
        )
    )
});

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 5px 10px;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: rgba(245, 245, 245, 0.8);
    letter-spacing: 1px;
    user-select: none;

    & h5 {
        font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
        font-weight: 400;
    }

    & span {
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
        font-weight: 300;
    }

    &:hover, &:active {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(245, 245, 245, 1);
    }
`;

export default QuestionTag;