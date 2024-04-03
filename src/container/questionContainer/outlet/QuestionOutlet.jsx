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

import React, {lazy, Suspense, useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {colors} from "../../../styles/Theme";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import QuestionCard from "../components/QuestionCard";
import useBloggiosQuestionList from "../../../hooks/useBloggiosQuestionList";
import questionCard from "../components/QuestionCard";

const WritingQuestionOnBloggios = lazy(()=> import('../components/WritingQuestionOnBloggios'));

const QuestionOutlet = () => {

    const [filterType, setFilterType] = React.useState('recent');
    const [pageNum, setPageNum] = useState(0);
    const {
        isLoading,
        isError,
        error,
        data : questionList,
        hasNextPage
    } = useBloggiosQuestionList(pageNum);

    const parseQuestionList = useMemo(()=> {
        return questionList.map((question, index)=> {
            if (questionList.length === index + 1) {
                return (
                    <QuestionCard />
                )
            }
            return (
                <QuestionCard />
            )
        })
    }, [questionList])

    const getQuestionList = useCallback(()=> {
        if (isLoading) {
            return <FallbackLoader width={'100%'} height={'250px'} />
        } else if (!isLoading && questionList && questionList.length > 0) {
            return parseQuestionList
        }
    }, [isLoading, questionList, parseQuestionList])

    return (
        <Wrapper>
            <QuestionHeader>
                <h5>100 Questions</h5>
                <ButtonGroup>
                    <button className={filterType === 'recent' ? 'group__active' : ''} onClick={()=> setFilterType('recent')}>
                        Recent
                    </button>
                    <button className={filterType === 'unresolved' ? 'group__active' : ''} onClick={()=> setFilterType('unresolved')}>
                        Unresolved
                    </button>
                </ButtonGroup>
            </QuestionHeader>

            <MainSection>
                <QuestionList>
                    {getQuestionList()}
                </QuestionList>

                <QuestionSuggestionList>
                    <Suspense fallback={<FallbackLoader width={'100%'} height={'250px'} thickness={2} />}>
                        <WritingQuestionOnBloggios />
                    </Suspense>
                </QuestionSuggestionList>
            </MainSection>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const QuestionHeader = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    border-bottom: 1px solid ${colors.white10};
    
    & > h5 {
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: 300;
    }
`;

const ButtonGroup = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 7px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    
    & > button {
        border: none;
        outline: none;
        background: none;
        border-radius: 20px;
        overflow: hidden;
        padding: 10px;
        
        &.group__active {
            background: ${colors.accent100};
        }
    }
    
    & > button:hover {
        background: ${colors.accent60};
    }
`;

const MainSection = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const QuestionList = styled.div`
    width: 66.5%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 850px) {
        width: 100%;
    }
`;

const QuestionSuggestionList = styled.div`
    width: 33.2%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 0 10px 10px;
    
    @media (max-width: 850px) {
        display: none;
    }
`;

export default QuestionOutlet;