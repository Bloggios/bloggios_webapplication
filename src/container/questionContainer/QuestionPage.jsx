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

import React, {lazy, Suspense} from 'react';
import BloggiosSidebarBase from "../boundries/bloggiosSidebarBase";
import styled from "styled-components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useComponentSize from "../../hooks/useComponentSize";
import FallbackLoader from "../../component/loaders/fallbackLoader";
import {Outlet} from "react-router-dom";

const ProfileSuggestions = lazy(()=> import('../../component/Cards/ProfileSuggestions'));
const QuestionsTabBar = lazy(()=> import('../../component/navbars/QuestionsTabBar'));
const BloggiosQuestionsHeader = lazy(()=> import('./components/BloggiosQuestionsHeader'));

const QuestionPage = () => {

    const {width} = useWindowDimensions();
    const [suggestionRef, suggestionSize] = useComponentSize();

    return (
        <BloggiosSidebarBase>
            <Wrapper>
                <QuestionSection>
                    <Suspense fallback={<FallbackLoader width={'100%'} height={'100px'} />}>
                        <QuestionsTabBar />
                    </Suspense>

                    <Suspense fallback={<FallbackLoader width={'100%'} height={'250px'} />}>
                        <BloggiosQuestionsHeader />
                    </Suspense>

                    <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'}/>}>
                        <Outlet />
                    </Suspense>
                </QuestionSection>

                <SuggestionSection ref={suggestionRef}>
                    <Suspense fallback={<FallbackLoader width={suggestionSize.width}/>}>
                        {width > 1050 && <ProfileSuggestions/>}
                    </Suspense>
                </SuggestionSection>
            </Wrapper>
        </BloggiosSidebarBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 20px 20px 20px 10px;
    gap: 20px;

    @media (max-width: 700px) {
        padding: 10px;
    }
`;

const QuestionSection = styled.div`
    max-width: 75%;
    min-width: auto;
    height: fit-content;
    flex: 3;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 25px;
    background: #0c0c0c;
    border-radius: 20px;
    padding: 20px 16px;
    
    @media (max-width: 1050px) {
        max-width: 100%;
    }
    
    @media (max-width: 600px) {
        padding: 20px 10px;
    }
`;

const SuggestionSection = styled.div`
    flex: 1;
    max-width: 25%;
    min-width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1050px) {
        display: none;
    }
`;

const MemoizedQuestionPage = React.memo(QuestionPage);

export default MemoizedQuestionPage;