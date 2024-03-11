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

import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {dispatchErrorMessage} from "../../../service/functions";
import {useDispatch} from "react-redux";

Quill.register('modules/imageResize', ImageResize);
const AskQuestionFields = () => {

    const [titleRef, isTitleFocused] = useIsInputFocused();
    const editorRef = useRef(null);
    const [tagRef, isTagFocused] = useIsInputFocused();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedChips, setSelectedChips] = useState([]);
    const [editorContent, setEditorContent] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            const apiUrl = `https://your-backend-api.com/suggestions?query=${inputValue}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setSuggestions(data.suggestions);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        if (inputValue.trim() !== '') {
            // fetchSuggestions();
            setSuggestions(['Rohit', 'Rakesh', 'Atharva', 'Priya', 'Sweety'])
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleChipClick = (chip) => {
        setSelectedChips([...selectedChips, chip]);
        setInputValue('');
        setSuggestions([]);
    };

    const handleChipRemove = (removedChip) => {
        const updatedChips = selectedChips.filter(chip => chip !== removedChip);
        setSelectedChips(updatedChips);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            handleChipClick(inputValue.trim());
        }
    };

    const modules = useMemo(() => ({
        toolbar: toolbarOptions,
        imageResize: {
            modules: ['Resize', 'DisplaySize']
        }
    }), [])

    const base64ToBlob = (base64Data, contentType) => {
        const parts = base64Data.split(',');
        const byteString = atob(parts[1]);
        return new Blob([byteString], {
            type: contentType
        })
    }

    const handleEditorBlur = (previousSelection, source, editor) => {
        const delta = editor.getContents();
        const html = editor.getHTML();
        setEditorContent({
            deltaStatic: delta,
            htmlData: html
        })
    }

    const handleSubmit = () => {
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
                        const blob = base64ToBlob(imageTag, contentType);
                        blobs.push(blob);
                        imageTags.push(imageTag);
                    }
                });
            }
            let finalHtml = html;
            imageTags.map((tag, index)=> {
                finalHtml = finalHtml.replaceAll(tag, `bloggios-question-image-index${index}`);
            });
            console.log(finalHtml);
            console.log(blobs);
        } else {
            dispatchErrorMessage(dispatch, 'Please add data in Details');
        }
    }

    return (
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
                />
            </Fields>

            <Fields>
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
                    modules={modules}
                    placeholder={'Please add some details for your question'}
                    onBlur={handleEditorBlur}
                />
            </Fields>

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
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Type to search tags"
                        ref={tagRef}
                    />
                    <SuggestionsContainer>
                        {suggestions.map((suggestion, index) => (
                            <Suggestion
                                key={index}
                                onClick={() => handleChipClick(suggestion)}
                            >
                                {suggestion}
                            </Suggestion>
                        ))}
                    </SuggestionsContainer>
                </TagInput>
            </Fields>

            <button onClick={handleSubmit}>Submit</button>
        </ColumnWrapper>
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
    background-color: #4258ff;
    color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    cursor: pointer;

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
    font-size: clamp(0.75rem, 0.6296rem + 0.7407vw, 1rem);
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const SuggestionsContainer = styled.div`
    display: flex;
    position: absolute;
    top: 100%;
    background-color: #272727;
`;

const Suggestion = styled.div`
    background-color: #4258ff;
    padding: 8px;
    margin: 4px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

const MemoizedAskQuestionFields = React.memo(AskQuestionFields);
export default MemoizedAskQuestionFields;