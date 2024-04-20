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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ColumnWrapper} from "../../../styles/StyledComponent";
import styled from "styled-components";
import Typography from "../../../component/typography/typography";
import useIsInputFocused from "../../../hooks/useIsInputFocused";
import {toolbarOptions} from "../../../asset/configurations/QuillConfiguration";
import {IoClose} from "react-icons/io5";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import '../../../styles/QuillEditorStyles.css'
import {dispatchError, dispatchErrorMessage, dispatchWarningMessage} from "../../../service/functions";
import {useDispatch} from "react-redux";
import QuestionTag from "./QuestionTag";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {VscSearchStop} from "react-icons/vsc";
import IconButton from "../../../component/buttons/IconButton";
import {CgClose} from "react-icons/cg";
import QuestionSubmitModal from "../../../component/modal/QuestionSubmitModal";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {getHtmlContent, validateHtmlContent} from "../../../service/QuillFunctions";
import {fetchQuestionTags} from "../../../restservices/QuestionApi";

window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);

const AskQuestionFields = () => {

    const [titleRef, isTitleFocused] = useIsInputFocused();
    const editorRef = useRef(null);
    const [tagInputValue, setTagInputValue] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);
    const [editorContent, setEditorContent] = useState({});
    const dispatch = useDispatch();
    const [isSuggestion, setIsSuggestion] = useState(false);
    const [titleData, setTitleData] = useState('');
    const [buttonLoader, setButtonLoader] = useState(false);
    const [submitModal, setSubmitModal] = useState(false);
    const timeoutRef = useRef(null);
    const [addQuestionData, setAddQuestionData] = useState(null);
    const [isTagLoading, setIsTagLoading] = useState(false);
    const [fetchedTagData, setFetchedTagData] = useState([]);
    const [isTagError, setIsTagError] = useState(false);

    useEffect(()=> {
        setIsTagLoading(true)
        const controller = new AbortController();
        const {signal} = controller;

        const debounce = setTimeout(() => {
            fetchQuestionTags(0, tagInputValue.length > 0 ? tagInputValue.trim() : null, '', signal)
                .then(data => {
                    setFetchedTagData(data?.object);
                    setIsTagLoading(false);
                }).catch(e => {
                    setIsTagLoading(false);
                    if (signal.aborted) return;
                    setIsTagError(true);
                    dispatchError(dispatch, e);
            })
            return ()=> controller.abort();
        }, 500);

        return ()=> {
            clearTimeout(debounce);
            setIsTagLoading(false);
        };
    }, [tagInputValue])

    useEffect(() => {
        if (tagInputValue.length > 0) {
            setIsSuggestion(true)
        } else {
            setIsSuggestion(false);
        }
    }, [tagInputValue]);

    const handleChipClick = (chip) => {
        if (selectedChips.includes(chip)) {
            dispatchWarningMessage(dispatch, `You have already selected ${chip} Tag`)
        } else {
            setSelectedChips([...selectedChips, chip]);
        }
        setTagInputValue('');
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                setIsSuggestion(false);
                setTagInputValue('');
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleChipRemove = (removedChip) => {
        const updatedChips = selectedChips.filter(chip => chip !== removedChip);
        setSelectedChips(updatedChips);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' && tagInputValue.trim() !== '') {
            handleChipClick(tagInputValue.trim());
        }
    };

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
            console.log(html);
            setEditorContent({
                deltaStatic: delta,
                htmlData: html,
                text: editor.getText()
            })
        }, 500)
    }

    const handleSuggestionClose = () => {
        if (isSuggestion) {
            setIsSuggestion(false);
            setTagInputValue('');
        }
    }

    const validatePreQuestionSubmit = (preData) => {
        if (!preData.title) {
            dispatchErrorMessage(dispatch, 'Title is mandatory to Post a Question');
            return false;
        }
        if (preData.title) {
            const titleString = preData.title;
            if (titleString.length > 200) {
                dispatchErrorMessage(dispatch, 'Title length should not exceed 200 Characters');
                return false;
            }
            const split = titleString.split(/\s+/);
            if (split.length > 25) {
                dispatchErrorMessage(dispatch, 'Title should not contain more than 25 words');
                return false;
            }
        }
        if (preData.tags && preData.tags.length > 5) {
            dispatchErrorMessage(dispatch, 'More than 5 tags are not allowed in a single question');
            return false;
        }
        return true;
    }

    const handleValidate = () => {
        setButtonLoader(true);
        if (editorRef.current) {
            editorRef.current.blur();
        }
        const isValid = validatePreQuestionSubmit({
            title: titleData,
            tags: selectedChips
        });
        if (!isValid) {
            setButtonLoader(false);
            return;
        } else {
            const htmlContent = getHtmlContent(editorContent);
            let isValid = true
            if (htmlContent) {
                isValid = validateHtmlContent(htmlContent, dispatch);
            }
            setButtonLoader(false);
            if (isValid) {
                setAddQuestionData({
                    title: titleData,
                    tags: selectedChips,
                    images: htmlContent?.blobs,
                    detailsHtml: htmlContent?.finalHtml,
                    detailsText: htmlContent?.text
                });
                setSubmitModal(true);
            } else {
                editorRef.current.focus();
                return;
            }
        }
    }

    const tagListData = useCallback(() => {
        if (fetchedTagData.length > 0) {
            return fetchedTagData.map((tag, i) => (
                <QuestionTag
                    tag={tag.tag}
                    category={tag.category}
                    key={i + tag.category}
                    onClick={() => handleChipClick(tag.tag)}
                />
            ))
        } else if (!isTagLoading && fetchedTagData.length === 0) {
            return (
                <NotResultFoundWrapper>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '50px',
                        color: 'rgba(255,255,255,0.6)'
                    }}>
                        <VscSearchStop/>
                    </div>
                    <NotFoundMessage>
                        No Data Found
                    </NotFoundMessage>
                </NotResultFoundWrapper>
            )
        } else if (isTagError) {
            return (
                <NotResultFoundWrapper>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '50px',
                        color: 'rgba(255,255,255,0.6)'
                    }}>
                        <VscSearchStop/>
                    </div>
                    <NotFoundMessage>
                        Error Occurred
                    </NotFoundMessage>
                </NotResultFoundWrapper>
            )
        }
    }, [fetchedTagData, isTagLoading, isTagError])

    return (
        <>
            <ColumnWrapper style={{
                gap: '20px'
            }}>
                <Fields
                    style={{border: isTitleFocused ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)'}}
                    onClick={() => titleRef.current.focus()}
                >
                    <Typography
                        text={'Title'}
                        type={'custom'}
                        size={'18px'}
                        color={'rgba(255, 255, 255, 0.7)'}
                        spacing={'1px'}
                        weight={500}
                    />
                    <TitleInput
                        ref={titleRef}
                        type={'text'}
                        placeholder={'Eg: How to use two databases in Spring Boot'}
                        value={titleData}
                        onChange={(e) => setTitleData(e.target.value)}
                    />
                </Fields>

                <QuillField >
                    <Typography
                        text={'Question Details'}
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
                        placeholder={'Please add some details for your question'}
                        onChange={handleEditorBlur}
                    />
                </QuillField>

                <Fields>
                    <Typography
                        text={'Tags'}
                        type={'custom'}
                        size={'18px'}
                        color={'rgba(255, 255, 255, 0.7)'}
                        spacing={'1px'}
                        weight={500}
                    />

                    <TagInput>
                        {selectedChips.map((selectedTag, index) => (
                            <Tag key={index}>
                                {selectedTag}
                                <IoClose onClick={() => handleChipRemove(selectedTag)}/>
                            </Tag>
                        ))}
                        <TagFieldInput
                            type="text"
                            value={tagInputValue}
                            onChange={(event) => setTagInputValue(event.target.value)}
                            onKeyDown={handleInputKeyDown}
                            placeholder={selectedChips.length === 0 && "Type to search tags"}
                            maxLength={20}
                            readOnly={selectedChips.length > 4}
                        />
                        {isSuggestion && (
                            <SuggestionsContainer>
                                <SuggestionHeader>
                                    Fetched Tags
                                    <IconButton onClick={handleSuggestionClose}>
                                        <CgClose/>
                                    </IconButton>
                                </SuggestionHeader>
                                {tagListData()}
                                {isTagLoading && <FallbackLoader height={'20px'} width={'100%'} thickness={1}/>}
                            </SuggestionsContainer>
                        )}
                    </TagInput>
                </Fields>

                <FetchLoaderButton
                    isLoading={buttonLoader}
                    onClick={handleValidate}
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
            </ColumnWrapper>

            <QuestionSubmitModal
                isModelOpen={submitModal}
                onClose={() => setSubmitModal(false)}
                data={addQuestionData}
            />
        </>
    );
};

const Fields = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    cursor: pointer;

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

const TitleInput = styled.input`
    width: 100%;
    min-width: 160px;
    outline: none;
    border: none;
    font-size: clamp(0.75rem, 0.6296rem + 0.7407vw, 1rem);
    background: transparent;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);

    &:focus {
        color: rgba(255, 255, 255, 1);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }
`;

const TagInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
`;

const Tag = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 4px;
    gap: 5px;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);

    &:hover {
        color: rgba(255, 255, 255, 1);
    }
`;

const TagFieldInput = styled.input`
    color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    margin-right: 8px;
    flex-grow: 1;
    border: none;
    outline: none;
    background: transparent;
    min-width: 28px;
    font-size: clamp(0.75rem, 0.6296rem + 0.7407vw, 1rem);

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const SuggestionsContainer = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    position: absolute;
    bottom: 110%;
    max-height: 250px;
    height: auto;
    overflow: auto;
    background-color: #272727;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 4px;
    gap: 10px;

    &::-webkit-scrollbar {
        height: 5px;
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: #555555;
    }

    &::-webkit-scrollbar-track:hover {
        background-color: #555555;
    }

    &::-webkit-scrollbar-track:active {
        background-color: #555555;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #121212;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #0C0C0C;
    }

    &::-webkit-scrollbar-thumb:active {
        background-color: #0C0C0C;
    }
`;

const NotResultFoundWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 70px 0;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const NotFoundMessage = styled.span`
    font-size: 20px;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 400;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.6);

    @media (max-width: 350px) {
        font-size: 16px;
    }
`;

const SuggestionHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    & span {
        font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 200;
    }
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

const MemoizedAskQuestionFields = React.memo(AskQuestionFields);
export default MemoizedAskQuestionFields;