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

import React, {lazy, useCallback, useLayoutEffect, useMemo} from 'react';
import {useParams} from "react-router-dom";
import {uuidValidator} from "../../../util/ComponentValidators";
import styled from "styled-components";
import {LANDING_PAGE, QUESTION_PAGE, SUPPORT_PAGE} from "../../../constant/pathConstants";
import {MdOutlineContactSupport} from "react-icons/md";
import {BsQuestionCircle} from "react-icons/bs";
import {bgBlackRounded} from "../../../asset/svg";
import {useQuery} from "@tanstack/react-query";
import {fetchQuestionDetail} from "../../../restservices/QuestionApi";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {colors} from "../../../styles/Theme";
import {getFormattedDate} from "../../../service/DateFunctions";
import '../../../styles/InnerHtmlStyles.css';

const NotFound = lazy(() => import('../../../component/NotFound/NotFound'));

export const questionNotFoundList = [
    {
        id: 1,
        label: 'Question List',
        text: 'Redirect me to the Question List',
        button: 'Take Me',
        icon: <BsQuestionCircle/>,
        clickAction: QUESTION_PAGE
    },
    {
        id: 2,
        label: 'Home',
        text: 'Take me to the Bloggios Home Page',
        button: 'Take Me',
        icon: <img src={bgBlackRounded} height={'25px'} alt={'Bloggios'}/>,
        clickAction: LANDING_PAGE
    },
    {
        id: 3,
        label: 'Help',
        text: 'Need help, please contact support',
        button: 'Learn more',
        icon: <MdOutlineContactSupport/>,
        clickAction: SUPPORT_PAGE
    }
];

const QuestionDetailsOutlet = () => {

    const {questionId} = useParams();

    const {
        data: questionData,
        isLoading: questionIsLoading,
        isError: questionIsError,
        error: questionError,
        isSuccess: questionIsSuccess
    } = useQuery({
        queryKey: ['question', questionId],
        queryFn: () => fetchQuestionDetail(questionId),
        staleTime: 600000,
        retry: 4
    });

    const addCopyButton = () => {
        const preElements = document.getElementsByTagName('pre');
        const preArray = Array.from(preElements);
        console.log(preArray.length)
        for (let i = 0; i < preElements.length; i++) {
            const headerDiv = document.createElement('div');
            headerDiv.innerHTML = `<span class="pre__header-span">Snippet</span><button class="pre__header-button">Copy</button>`;
            headerDiv.className = 'pre__header-div';
            const headerChild = preElements[i].appendChild(headerDiv);
            preElements[i].style.position = 'relative'
            const copyChild = headerChild.getElementsByClassName('pre__header-button')[0];
            copyChild.addEventListener('click', ()=> {
                const innerText = preElements[i].innerText;
                navigator.clipboard.writeText(innerText)
                    .then(()=> {
                        console.log('Copied')
                    }).catch(()=> {
                    console.log('Error')
                })
            })
        }
    };

    useLayoutEffect(() => {
        // Add copy buttons once the component is mounted
        if (questionData && questionData.detailsHtml) {
            addCopyButton();
        }
    }, [questionData]);

    const questionNotFound = useMemo(() => {
        return (
            <Wrapper>
                <NotFound
                    alignSelf={'center'}
                    list={questionNotFoundList}
                />
            </Wrapper>
        )
    }, []);

    const getDetails = useCallback(() => {
        if (questionData) {
            return (
                <Wrapper>
                    <Heading1>
                        {questionData.title}
                    </Heading1>

                    <Caption>
                        Asked : {getFormattedDate(questionData.dateCreated)}
                    </Caption>

                    <Divider />

                    <div dangerouslySetInnerHTML={{__html : questionData.detailsHtml}} />
                </Wrapper>
            )
        }
    }, [questionData])

    const getQuestionDetailsContent = useCallback(() => {
            if (questionIsLoading) {
                return <FallbackLoader width={'100%'} height={'100%'}/>
            } else if (
                !questionIsLoading &&
                !questionIsError &&
                questionIsSuccess &&
                questionData
            ) {
                return getDetails();
            } else if (!questionIsLoading && questionIsError) {
                return questionNotFound;
            }
        }, [questionIsLoading, questionIsError, questionIsSuccess, questionData, getDetails, questionNotFound]
    )

    const getMainContent = useCallback(() => {
        if (uuidValidator(questionId)) {
            return getQuestionDetailsContent();
        } else {
            return questionNotFound;
        }
    }, [questionId, questionNotFound, getQuestionDetailsContent])

    return getMainContent();
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: "Poppins", sans-serif;
`;

const Heading1 = styled.h1`
    font-size: clamp(1.5625rem, 1.4534rem + 0.6716vw, 2.125rem);
    letter-spacing: 1px;
    font-weight: 600;
    color: ${colors.white100};
    font-family: inherit;
`;

const Caption = styled.span`
    font-size: clamp(0.75rem, 0.7015rem + 0.2985vw, 1rem);
    color: ${colors.white80};
    letter-spacing: 1px;
    font-family: inherit;
`;

const Divider = styled.hr`
    color: ${colors.white10};
    width: 70%;
    align-self: center;
    margin-top: 10px;
`;

export default QuestionDetailsOutlet;