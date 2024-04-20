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
import {colors} from "../../../styles/Theme";
import {useNavigate} from "react-router-dom";
import {ASK_QUESTION_OUTLET_PAGE} from "../../../constant/pathConstants";

const WritingQuestionOnBloggios = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <h4>Got a Question ?</h4>
            <span>Ready to dive into the depths of curiosity? Share your burning questions with us and let the vibrant community illuminate your path with diverse perspectives and insights!</span>
            <button onClick={()=> navigate(ASK_QUESTION_OUTLET_PAGE)}>Start</button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #FF3CAC;
    background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
    padding: 14px;
    border-radius: 20px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    
    & > h4 {
        font-size: clamp(1rem, 0.9654rem + 0.2128vw, 1.125rem);
        font-weight: 500;
        font-family: inherit;
        letter-spacing: inherit;
    }
    
    & > span {
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
        font-weight: 400;
        font-family: inherit;
        letter-spacing: inherit;
        text-align: justify;
    }
    
    & > button {
        width: fit-content;
        align-self: flex-end;
        margin-top: 25px;
        border: none;
        outline: none;
        padding: 7px 16px;
        border-radius: 10px;
        background: ${colors.black150};
        color: ${colors.white80};
        
        &:hover, &:active {
            background: ${colors.black200};
            color: ${colors.white100};
        }
    }
`;

export default WritingQuestionOnBloggios;