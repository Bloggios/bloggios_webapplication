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

import React, {lazy, Suspense, useEffect, useState} from 'react';
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
import {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import '../../../styles/QuillEditorStyles.css'
import HtmlContent from "../../../component/HtmlContent/HtmlContent";
import useComponentSize from "../../../hooks/useComponentSize";
import Divider from "../../../component/divider/divider";
import QuestionAnswersSection from "../components/QuestionAnswersSection";
import useDynamicSeo from "../../../globalseo/useDynamicSeo";

const NotFound = lazy(() => import('../../../component/NotFound/NotFound'));
const YourAnswerSection = lazy(()=> import('../components/YourAnswerSection'));

window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);

const questionNotFoundList = [
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
    const [tagsData, setTagsData] = useState([]);
    const [modifiedHtmlData, setModifiedHtmlData] = useState('');
    const [wrapperRef, wrapperSize] = useComponentSize();

    const {
        data: questionData,
        isLoading: questionIsLoading,
        isError: questionIsError,
        error: questionError,
        isSuccess: questionIsSuccess,
        refetch,
        isRefetching
    } = useQuery({
        queryKey: ['question', questionId],
        queryFn: () => fetchQuestionDetail(questionId),
        staleTime: 600000,
        retry: 4
    });

    useDynamicSeo({
        title: `${questionData?.title} - Bloggios`,
        description: `Bloggios Questions - ${questionData?.title}`,
        keywords: 'Bloggios Questions, Q&A, Bloggios Q&A, Ask Questions, Questions, Bloggios Questions and Answers',
        author: 'Rohit Parihar',
        ogType: `article`,
        ogUrl: window.location.href,
        ogImage: bgBlackRounded,
        ogTitle: `${questionData?.title} - Bloggios`,
        ogDescription: `Bloggios Questions - ${questionData?.title}`
    });

    useEffect(() => {
        if (questionData && questionData.detailsHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = questionData.detailsHtml;
            const imgTags = tempDiv.getElementsByTagName('img');
            for (let i = 0; i < imgTags.length; i++) {
                imgTags[i].classList.add('html-data__img-tag');
            }
            setModifiedHtmlData(tempDiv.innerHTML);
            return () => {
                tempDiv.remove();
            };
        }
    }, [questionData]);

    useEffect(() => {
        if (
            questionData &&
            questionData.tags &&
            questionData.tags.length > 0
        ) {
            setTagsData(questionData.tags);
        }
    }, [questionData]);

    const questionNotFound = () => {
        return (
            <Wrapper>
                <NotFound
                    alignSelf={'center'}
                    list={questionNotFoundList}
                />
            </Wrapper>
        )
    }

    const getDetails = () => {
        if (questionData) {
            return (
                <>
                    <Wrapper ref={wrapperRef}>
                        <Heading1>
                            {questionData.title}
                        </Heading1>

                        <Caption>
                            Asked : {getFormattedDate(questionData.dateCreated)}
                        </Caption>

                        <Divider width={'70%'} verticalSpacing={'10px'}/>

                        {modifiedHtmlData && modifiedHtmlData.length > 0 && <HtmlContent htmlData={modifiedHtmlData} wrapperSize={wrapperSize} />}

                        <TagContainer>
                            <span>Tags</span>
                            <Tags>
                                {tagsData.map((tag, index) => (
                                    <button key={tag.tag + '_' + index}>
                                        {tag.tag}
                                    </button>
                                ))}
                            </Tags>
                        </TagContainer>

                        <Divider width={'70%'} verticalSpacing={'10px'}/>

                        <QuestionAnswersSection
                            answers={questionData.answers}
                            questionUserId={questionData.userId}
                            questionId={questionData.questionId}
                            refetch={refetch}
                        />

                        <Suspense fallback={<FallbackLoader width={'100%'} height={'250px'} />}>
                            <YourAnswerSection questionId={questionId} />
                        </Suspense>
                    </Wrapper>
                </>
            )
        }
    }

    const getQuestionDetailsContent = () => {
        if (questionIsLoading || isRefetching) {
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
    }

    const getMainContent = () => {
        if (uuidValidator(questionId)) {
            return getQuestionDetailsContent();
        } else {
            return questionNotFound;
        }
    }

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
    hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
    overflow: hidden;
    word-wrap: break-word;
`;

const Caption = styled.span`
    font-size: clamp(0.75rem, 0.7015rem + 0.2985vw, 1rem);
    color: ${colors.white80};
    letter-spacing: 1px;
    font-family: inherit;
    hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
    overflow: hidden;
    word-wrap: break-word;
`;

const TagContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
    flex-wrap: wrap;

    & > button {
        width: fit-content;
        padding: 2px 7px;
        display: flex;
        align-items: center;
        background: ${colors.accent100};
        cursor: pointer;
        border-radius: 20px;
        font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
        letter-spacing: 1px;
        font-family: "Poppins", sans-serif;
    }
`;

export default QuestionDetailsOutlet;