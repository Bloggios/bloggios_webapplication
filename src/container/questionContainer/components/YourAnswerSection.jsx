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

import React, {useMemo, useRef, useState} from 'react';
import Typography from "../../../component/typography/typography";
import ReactQuill from "react-quill";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {colors} from "../../../styles/Theme";
import AnswerSubmitModal from "../../../component/modal/AnswerSubmitModal";
import {useDispatch} from "react-redux";
import {toolbarOptions} from "../../../asset/configurations/QuillConfiguration";
import {getHtmlContent, validateHtmlContent} from "../../../service/QuillFunctions";
import styled from "styled-components";

const YourAnswerSection = ({
    questionId
                           }) => {

    const editorRef = useRef(null);
    const timeoutRef = useRef(null);
    const [editorContent, setEditorContent] = useState({});
    const [buttonLoader, setButtonLoader] = useState(false);
    const dispatch = useDispatch();
    const [addAnswerData, setAddAnswerData] = useState(null);
    const [answerSubmitModal, setAnswerSubmitModal] = useState(false);

    const quillBasicModules = useMemo(() => ({
        toolbar: toolbarOptions,
        imageResize: {
            modules: ['Resize', 'DisplaySize']
        }
    }), [])

    const handleEditorBlur = (value, editorDelta, source, editor) => {
        const delta = editor.getContents();
        const html = editor.getHTML();
        setEditorContent({
            deltaStatic: delta,
            htmlData: html,
            text: editor.getText()
        })
    }

    const handleAnswerSubmit = () => {
        clearTimeout(timeoutRef.current);
        setButtonLoader(true)
        const htmlContent = getHtmlContent(editorContent);
        let isValid = true
        if (htmlContent) {
            isValid = validateHtmlContent(htmlContent, dispatch);
        }
        setButtonLoader(false);
        if (isValid) {
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

    return (
        <>
            <Wrapper>
                <Heading4>
                    Do you have Answer ?
                </Heading4>

                <QuillField>
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
                    disabled={buttonLoader || !editorContent.text}
                    dBgColor={colors.accent60}
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
            </Wrapper>

            {answerSubmitModal && addAnswerData && (
                <AnswerSubmitModal
                    isModelOpen={answerSubmitModal}
                    onClose={() => setAnswerSubmitModal(false)}
                    data={addAnswerData}
                />
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Heading4 = styled.h4`
    font-size: clamp(1.125rem, 1.0765rem + 0.2985vw, 1.375rem);
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

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

export default YourAnswerSection;