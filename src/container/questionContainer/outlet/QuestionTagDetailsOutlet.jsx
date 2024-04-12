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

import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {fetchQuestionList} from "../../../restservices/QuestionApi";
import {useInfiniteQuery} from "@tanstack/react-query";
import QuestionCard from "../components/QuestionCard";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import IconButton from "../../../component/buttons/IconButton";
import {FiPlusCircle} from "react-icons/fi";
import styled from "styled-components";
import {colors} from "../../../styles/Theme";

const QuestionTagDetailsOutlet = () => {

    const [filterType, setFilterType] = React.useState('recent');
    const {tag} = useParams();
    const [totalQuestions, setTotalQuestions] = React.useState(0);

    const questionListApi = async ({pageParam}) => {
        let isResolved = undefined;
        if (filterType === 'unresolved') {
            isResolved = false;
        }
        return fetchQuestionList(pageParam - 1, isResolved, tag);
    }

    const {
        data: questionList,
        error,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        isSuccess,
        refetch,
        isRefetching
    } = useInfiniteQuery({
        queryKey: ['questionsList'],
        queryFn: questionListApi,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.object?.length ? allPages?.length + 1 : undefined
        }
    })

    useEffect(()=> {
        refetch();
    }, [filterType, tag])

    useEffect(() => {
        if (questionList) {
            questionList.pages.map((data) => {
                setTotalQuestions(data?.totalRecordsCount)
            })
        }
    }, [questionList]);

    const questionContent = questionList?.pages.map((value) => {
        return value?.object.map((item) => (
            <QuestionCard
                key={item.questionId}
                questionId={item.questionId}
                userId={item.userId}
                title={item.title}
                tags={item.tags}
                dateCreated={item.dateCreated}
                imageLink={item.imageLink}
                detailsText={item.detailsText}
                isResolved={item.isResolved}
            />
        ))
    });

    const getQuestionList = useCallback(()=> {
        if ((isLoading && !isFetchingNextPage) || isRefetching) {
            return <FallbackLoader width={'100%'} height={'100px'} />
        } else if (isSuccess && questionList && !isLoading && !isError) {
            return questionContent;
        } else if (isError && error) {
            return (
                <span>Error Occurred</span>
            )
        }
    }, [isLoading, isFetchingNextPage, isSuccess, questionList, isError, questionContent, error, refetch, isRefetching]);

    const getLoadingOrFetchMoreContent = useCallback(()=> {
        if (!isLoading && isFetchingNextPage) {
            return <FallbackLoader width={'100%'} height={'70px'} />
        } else if (!isLoading && hasNextPage) {
            return (
                <FetchMoreButtonWrapper>
                    <IconButton onClick={fetchNextPage} fontSize={'34px'} padding={'0'}>
                        <FiPlusCircle />
                    </IconButton>
                </FetchMoreButtonWrapper>
            )
        }
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage])

    return (
        <Wrapper>
            <QuestionHeader>
                <h5>{`${totalQuestions} Questions`}</h5>
                <ButtonGroup>
                    <button className={filterType === 'recent' ? 'group__active' : ''} onClick={()=> setFilterType('recent')}>
                        Recent
                    </button>
                    <button className={filterType === 'unresolved' ? 'group__active' : ''} onClick={()=> setFilterType('unresolved')}>
                        Unresolved
                    </button>
                </ButtonGroup>
            </QuestionHeader>

            <QuestionList>
                {getQuestionList()}
                {getLoadingOrFetchMoreContent()}
            </QuestionList>
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

const QuestionList = styled.div`
    width: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const NoQuestions = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > span {
        font-size: clamp(0.875rem, 0.8507rem + 0.1493vw, 1rem);
        letter-spacing: 1px;
        font-family: "Poppins", sans-serif;
        color: ${colors.white80};
    }
`;

const FetchMoreButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default QuestionTagDetailsOutlet;