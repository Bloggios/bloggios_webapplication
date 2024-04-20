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
import {askQuestionWhite, askQuestionYellow} from "../../../asset/svg";
import {qAndA} from "../../../asset/marquee";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {ASK_QUESTION_OUTLET_PAGE, ASK_QUESTION_PAGE, QUESTION_PAGE} from "../../../constant/pathConstants";

const BloggiosQuestionsHeader = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = () => {
        if (location.pathname.includes(ASK_QUESTION_OUTLET_PAGE)) {
            navigate(QUESTION_PAGE);
        } else {
            navigate(ASK_QUESTION_PAGE);
        }
    }

    return (
        <BloggiosQuestions>
            <YellowQuestion src={askQuestionYellow} alt="Bloggios"/>
            <WhiteQuestion src={askQuestionWhite} alt="Bloggios" />
            <QAA src={qAndA} alt='Bloggios' />

            <BloggiosQuestionMain>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <TitleSpan>
                        Bloggios Questions
                    </TitleSpan>
                    <SubTitleSpan>
                        Elevate your curiosity on Bloggios! Unleash the power of questions and answers, seamlessly connecting minds. Ask, explore, and unravel knowledge in a vibrant community-driven experience.
                    </SubTitleSpan>
                </div>
                <AskQuestionButton onClick={handleNavigation}>
                    {location.pathname.includes(ASK_QUESTION_OUTLET_PAGE) ? 'See List' : 'Ask Question'}
                </AskQuestionButton>
            </BloggiosQuestionMain>
        </BloggiosQuestions>
    );
};

const BloggiosQuestions = styled.div`
    display: flex;
    width: 100%;
    aspect-ratio: 16/4;
    border-radius: 20px;
    background: #4258ff;
    position: relative;
    overflow: hidden;
    user-select: none;
    
    @media (max-width: 600px) {
        aspect-ratio: 16/5;
        border-radius: 16px;
    }

    @media (max-width: 450px) {
        aspect-ratio: 16/7;
    }

    @media (max-width: 400px) {
        aspect-ratio: unset;
        height: auto;
    }
`;

const YellowQuestion = styled.img`
    height: 70%;
    position: absolute;
    left: 100px;
    bottom: 20px;
    transform: rotate(0.1turn);
    opacity: 0.4;
    
    @media (max-width: 600px) {
        left: 20px;
    }
`;

const WhiteQuestion = styled.img`
    height: 55%;
    position: absolute;
    right: 100px;
    top: 20px;
    transform: rotate(-0.1turn);
    opacity: 0.4;
`;

const QAA = styled.img`
    height: 85%;
    position: absolute;
    left: 40%;
    bottom: -50px;
    opacity: 0.2;
    transform: rotate(-10deg);
`;

const BloggiosQuestionMain = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    border-radius: 60px;
    background-color: rgba(66, 86, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    @media (max-width: 400px) {
        flex-direction: column;
        padding: 10px 7px;
        gap: 20px;
        border-radius: 25px;
    }
`;

const TitleSpan = styled.h1`
    font-size: clamp(1.125rem, 0.8114rem + 1.9298vw, 2.5rem);
    color: #e5e5e5;
    letter-spacing: 1px;
    font-weight: 700;
    text-transform: uppercase;
`;

const SubTitleSpan = styled.h5`
    font-size: clamp(0.625rem, 0.511rem + 0.7018vw, 1.125rem);
    color: #e5e5e5;
    font-weight: 300;
    width: 60%;
    
    @media (max-width: 1600px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 95%;
    }
`;

const AskQuestionButton = styled.button`
    padding: 15px 20px;
    border-radius: 5px;
    margin-top: 10px;
    width: fit-content;
    font-size: clamp(0.75rem, 0.6182rem + 0.8108vw, 1.125rem);
    font-weight: 500;
    background-color: #ffaf00;
    border: none;
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: -1px;
    word-spacing: 1px;
    white-space: nowrap;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    transform: translate(-1px, -1px);
    cursor: pointer;
    touch-action: manipulation;
    -ms-touch-action: manipulation;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    }

    &:active {
        transform: translate(0);
    }

    @media (max-width: 650px) {
        padding: 10px 20px;
    }

    @media (max-width: 450px) {
        padding: 10px 16px;
    }

    @media (max-width: 400px) {
        padding: 7px 10px;
        width: 100%;
    }
`;

export default BloggiosQuestionsHeader;