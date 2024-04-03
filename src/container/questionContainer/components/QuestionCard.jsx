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
import {bgBlackRounded} from "../../../asset/svg";
import {colors} from "../../../styles/Theme";

const QuestionCard = () => {
    return (
        <Wrapper>
            <UserInfo>
                <img src={bgBlackRounded} alt="Bloggios"/>
                <span>Rohit Parihar</span>
            </UserInfo>

            <Main>
                <QuestionContent>
                    <QuestionDetails>

                    </QuestionDetails>

                    <Image>

                    </Image>
                </QuestionContent>

                <QuestionInfo>

                </QuestionInfo>
            </Main>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`;

const UserInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    
    & > img {
        height: 25px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
    }
    
    & > span {
        font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
        font-weight: 400;
        color: ${colors.white80};
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
    }
`;

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const QuestionContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 250px;
`;

const QuestionInfo = styled.div`
    
`;

const QuestionDetails = styled.div`
    width: 70%;
    background: aquamarine;
    height: 100%;
`;

const Image = styled.div`
    width: 29%;
    background: bisque;
    height: 100%;
`;

export default QuestionCard;