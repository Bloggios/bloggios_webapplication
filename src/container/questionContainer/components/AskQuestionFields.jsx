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
import {dispatchErrorMessage, dispatchWarningMessage} from "../../../service/functions";
import {useDispatch} from "react-redux";
import QuestionTag from "./QuestionTag";
import useQuestionTagList from "../../../hooks/useQuestionTagList";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {VscSearchStop} from "react-icons/vsc";
import IconButton from "../../../component/buttons/IconButton";
import {CgClose} from "react-icons/cg";
import QuestionSubmitModal from "../../../component/modal/QuestionSubmitModal";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {Base64URItoMultipartFile} from "../../../service/QuillFunctions";

window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize);

const AskQuestionFields = () => {

    const [titleRef, isTitleFocused] = useIsInputFocused();
    const editorRef = useRef(null);
    const [tagRef, isTagFocused] = useIsInputFocused();
    const [tagInputValue, setTagInputValue] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);
    const [editorContent, setEditorContent] = useState({});
    const dispatch = useDispatch();
    const [isSuggestion, setIsSuggestion] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [titleData, setTitleData] = useState('');
    const [buttonLoader, setButtonLoader] = useState(false);
    const [submitModal, setSubmitModal] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const timeoutRef = useRef(null);
    const [addQuestionData, setAddQuestionData] = useState(null);
    const {
        isLoading: tagIsLoading,
        isError: tagIsError,
        error: fetchedTagError,
        data: fetchedTagData,
        hasNextPage: tagHasNextPage
    } = useQuestionTagList(pageNum, tagInputValue);
    const intObserver = useRef();

    const lastTagRef = useCallback(post => {
        if (tagIsLoading) return;
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(tags => {
            if (tags[0].isIntersecting && tagHasNextPage) {
                setPageNum(prevState => prevState + 1);
            }
        });

        if (post) intObserver.current.observe(post);
    }, [tagIsLoading, tagHasNextPage])

    useEffect(() => {
        if (tagInputValue.length > 0) {
            setIsSuggestion(true)
        } else {
            setIsSuggestion(false);
            setPageNum(0)
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
                setPageNum(0);
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
            setPageNum(0);
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

    const validateHtmlContent = (htmlContent) => {
        if (htmlContent.text) {
            const text = htmlContent.text;
            const words = text.split(/\s+|\\n/);
            const filteredWords = words.filter(word => word.trim() !== '');
            if (filteredWords.length > 400) {
                dispatchErrorMessage(dispatch, 'Question details cannot contains more than 400 Words');
                return false;
            }
        }
        if (htmlContent.blobs) {
            const imageBlobs = htmlContent.blobs;
            if (htmlContent.blobs.length > 4) {
                dispatchErrorMessage(dispatch, 'You can only add upto 5 Images in Question Details');
                return false;
            }
            for (let i = 0; i < imageBlobs.length; i++) {
                const blob = imageBlobs[i];
                if (blob.size > 800 * 1024) { // Convert KB to bytes
                    dispatchErrorMessage(dispatch, 'Image size should be less than 800 KB');
                    return false;
                }
            }
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
            const htmlContent = getHtmlContent();
            let isValid = true
            if (htmlContent) {
                isValid = validateHtmlContent(htmlContent);
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

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const getHtmlContent = () => {
        if (editorContent.htmlData) {
            const delta = editorContent.deltaStatic;
            const html = editorContent.htmlData;
            let blobs = [];
            let imageTags = [];
            if (delta.ops) {
                delta.ops.forEach((op, index) => {
                    if (op.insert && op.insert.image) {
                        const imageTag = op.insert.image;
                        const [, contentType, base64Data] = imageTag.match(/^data:(.*?);base64,(.*)$/);
                        const splitElement = contentType.split('/')[1];
                        if (!splitElement) {
                            dispatchErrorMessage('One of the Uploaded Image not Corrupted or not Valid');
                            return;
                        }
                        blobs.push(Base64URItoMultipartFile(imageTag, `random.${splitElement}`));
                        imageTags.push(imageTag);
                    }
                });
            }
            let finalHtml = html;
            imageTags.map((tag, index) => {
                finalHtml = finalHtml.replaceAll(tag, `bloggios-question-image-index${index}`);
            });
            return {
                finalHtml: finalHtml,
                blobs: blobs,
                text: editorContent.text
            }
        }
    }

    const tagListData = useCallback(() => {
        if (fetchedTagData.length > 0) {
            return fetchedTagData.map((tag, i) => {
                if (!tagIsError && fetchedTagData.length === i + 1) {
                    return (
                        <QuestionTag
                            ref={lastTagRef}
                            tag={tag.tag}
                            category={tag.category}
                            key={i + tag.category}
                            onClick={() => handleChipClick(tag.tag)}
                        />
                    )
                }
                return (
                    <QuestionTag
                        tag={tag.tag}
                        category={tag.category}
                        key={i + tag.category}
                        onClick={() => handleChipClick(tag.tag)}
                    />
                )
            })
        } else if (!tagIsLoading && fetchedTagData.length === 0) {
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
                        {tagInputValue.length <= 3
                            ? 'Minimum 3 Characters Required'
                            : 'Not Data Found'}
                    </NotFoundMessage>
                </NotResultFoundWrapper>
            )
        }
    }, [tagIsLoading, fetchedTagData, lastTagRef, tagIsError, tagInputValue.length])

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
                            ref={tagRef}
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
                                {tagIsLoading && <FallbackLoader height={'20px'} width={'100%'} thickness={2}/>}
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