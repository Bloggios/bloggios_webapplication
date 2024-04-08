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
import useSeo from "../../../globalseo/useSeo";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {getHtmlContent, validateHtmlContent} from "../../../service/QuillFunctions";
import QuestionSubmitModal from "../../../component/modal/QuestionSubmitModal";
import AnswerSubmitModal from "../../../component/modal/AnswerSubmitModal";

const NotFound = lazy(() => import('../../../component/NotFound/NotFound'));

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
    const editorRef = useRef(null);
    const timeoutRef = useRef(null);
    const [editorContent, setEditorContent] = useState({});
    const [buttonLoader, setButtonLoader] = useState(false);
    const dispatch = useDispatch();
    const [addAnswerData, setAddAnswerData] = useState(null);
    const [answerSubmitModal, setAnswerSubmitModal] = useState(false);

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

    const quillBasicModules = useMemo(() => ({
        toolbar: toolbarOptions,
        imageResize: {
            modules: ['Resize', 'DisplaySize']
        }
    }), [])

    const handleEditorBlur = (value, editorDelta, source, editor) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const delta = editor.getContents();
            const html = editor.getHTML();
            setEditorContent({
                deltaStatic: delta,
                htmlData: html,
                text: editor.getText()
            })
        }, 500)
    }

    useEffect(() => {
        if (
            questionData &&
            questionData.tags &&
            questionData.tags.length > 0
        ) {
            setTagsData(questionData.tags);
        }
    }, [questionData]);

    const handleAnswerSubmit = () => {
        let isChecking = true;
        clearTimeout(timeoutRef.current);
        setButtonLoader(true)
        const htmlContent = getHtmlContent(editorContent);
        let isValid = true
        if (htmlContent) {
            isValid = validateHtmlContent(htmlContent, dispatch);
        }
        setButtonLoader(false);
        isChecking = false;
        if (isValid && !isChecking) {
            console.log(htmlContent)
            setAddAnswerData({
                questionId: questionId,
                images: htmlContent?.blobs,
                detailsHtml: htmlContent?.finalHtml,
                detailsText: htmlContent?.text
            })
            setAnswerSubmitModal(true);
        } else {
            editorRef.current.focus();
            setAnswerSubmitModal(false)
        }
    }

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
                                    text={'Answer Details'}
                                    type={'custom'}
                                    size={'18px'}
                                    color={'rgba(255, 255, 255, 0.7)'}
                                    spacing={'1px'}
                                    weight={500}
                                />
                                <ReactQuill
                                    ref={editorRef}
                                    theme="snow"
                                    modules={quillBasicModules}
                                    placeholder={'Please add details for your answer'}
                                    onChange={handleEditorBlur}
                                />
                            </QuillField>

                            <FetchLoaderButton
                                isLoading={buttonLoader}
                                onClick={handleAnswerSubmit}
                                text={'Proceed'}
                                loaderSize={'4px'}
                                loaderDotsSize={'4px'}
                                bgColor={'#4258ff'}
                                hBgColor={'rgba(66, 88, 255, 0.9)'}
                                aBgColor={'#4258ff'}
                                color={'rgba(255, 255, 255, 0.8)'}
                                hColor={'rgba(255, 255, 255, 1)'}
                                borderRadius={'4px'}
                                padding={'10px 0'}
                                style={{
                                    width: '110px',
                                    height: '40px',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '14px',
                                    fontFamily: "'Poppins', san-serif",
                                    alignSelf: 'flex-end'
                                }}
                            />
                        </YourAnswerSection>
                    </Wrapper>

                    <AnswerSubmitModal
                        isModelOpen={answerSubmitModal}
                        onClose={() => setAnswerSubmitModal(false)}
                        data={addAnswerData}
                    />
                </>
            )
        }
    }

    const getQuestionDetailsContent = () => {
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