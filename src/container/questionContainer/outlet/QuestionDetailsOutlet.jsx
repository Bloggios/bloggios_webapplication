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

import React, {lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
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
import Typography from "../../../component/typography/typography";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import '../../../styles/QuillEditorStyles.css'
import {toolbarOptions} from "../../../asset/configurations/QuillConfiguration";
import {dispatchSuccessMessage} from "../../../service/functions";
import {useDispatch} from "react-redux";
import HtmlContent from "../../../component/HtmlContent/HtmlContent";
import useComponentSize from "../../../hooks/useComponentSize";

const NotFound = lazy(() => import('../../../component/NotFound/NotFound'));

window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);
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
    const [tagsData, setTagsData] = useState([]);
    const [modifiedHtmlData, setModifiedHtmlData] = useState('');
    const [wrapperRef, wrapperSize] = useComponentSize();

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

    useEffect(() => {
        // Create a temporary div element to parse the HTML string
        if (questionData && questionData.detailsHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = questionData.detailsHtml;

            // Get all img tags in the HTML data
            const imgTags = tempDiv.getElementsByTagName('img');

            // Manipulate img tags here if needed
            for (let i = 0; i < imgTags.length; i++) {
                // For example, you can add a class or change src attribute
                imgTags[i].classList.add('html-data__img-tag');
            }

            // Set the modified HTML data
            setModifiedHtmlData(tempDiv.innerHTML);

            // Cleanup
            return () => {
                tempDiv.remove();
            };
        }
    }, [questionData]);

    const quillBasicModules = useMemo(() => ({
        toolbar: toolbarOptions,
        imageResize: {
            modules: ['Resize', 'DisplaySize']
        }
    }), [])

    // const handleEditorBlur = (value, editorDelta, source, editor) => {
    //     clearTimeout(timeoutRef.current);
    //     timeoutRef.current = setTimeout(() => {
    //         const delta = editor.getContents();
    //         const html = editor.getHTML();
    //         console.log(html);
    //         setEditorContent({
    //             deltaStatic: delta,
    //             htmlData: html,
    //             text: editor.getText()
    //         })
    //     }, 500)
    // }

    useEffect(() => {
        if (
            questionData &&
            questionData.tags &&
            questionData.tags.length > 0
        ) {
            setTagsData(questionData.tags);
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
                <Wrapper ref={wrapperRef}>
                    <Heading1>
                        {questionData.title}
                    </Heading1>

                    <Caption>
                        Asked : {getFormattedDate(questionData.dateCreated)}
                    </Caption>

                    <Divider/>

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

                    <Divider/>

                    <YourAnswerSection>
                        <Heading4>
                            Do you have Answer ?
                        </Heading4>

                        <QuillField>
                            <Typography
                                text={'Question Details'}
                                type={'custom'}
                                size={'18px'}
                                color={'rgba(255, 255, 255, 0.7)'}
                                spacing={'1px'}
                                weight={500}
                            />
                            {/*<ReactQuill*/}
                            {/*    ref={editorRef}*/}
                            {/*    theme="snow"*/}
                            {/*    modules={modules}*/}
                            {/*    placeholder={'Please add some details for your question'}*/}
                            {/*    onChange={handleEditorBlur}*/}
                            {/*/>*/}
                        </QuillField>
                    </YourAnswerSection>
                </Wrapper>
            )
        }
    }, [questionData, tagsData, wrapperRef, modifiedHtmlData, wrapperSize])

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

const Divider = styled.hr`
    color: ${colors.white10};
    width: 70%;
    align-self: center;
    margin-top: 10px;
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

const YourAnswerSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 25px;
`;

const Heading4 = styled.h4`
    font-size: clamp(1.25rem, 1.153rem + 0.597vw, 1.75rem);
    font-family: "Poppins", sans-serif;
    color: ${colors.white80};
    letter-spacing: 1px;
    font-weight: 500;
`;

const QuillField = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4px;
    gap: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    cursor: pointer;


    & > span {
        padding: 16px;
    }

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

export default QuestionDetailsOutlet;