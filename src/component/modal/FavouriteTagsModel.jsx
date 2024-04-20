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

import React, {useCallback, useEffect, useState} from 'react';
import FadeModal from "./FadeModal";
import {colors} from "../../styles/Theme";
import IconButton from "../buttons/IconButton";
import FallbackLoader from "../loaders/fallbackLoader";
import {IoClose} from "react-icons/io5";
import {AiOutlineClose} from "react-icons/ai";
import styled from "styled-components";
import {addFavouriteQuestionTags, fetchQuestionTags} from "../../restservices/QuestionApi";
import {dispatchError, dispatchSuccessMessage, dispatchWarningMessage} from "../../service/functions";
import QuestionTag from "../../container/questionContainer/components/QuestionTag";
import {VscSearchStop} from "react-icons/vsc";
import {CgClose} from "react-icons/cg";
import {useDispatch} from "react-redux";
import useIsInputFocused from "../../hooks/useIsInputFocused";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import {useMutation} from "@tanstack/react-query";

const FavouriteTagsModel = ({
                                isModelOpen,
                                onClose,
                                data,
                                refetch
                            }) => {

    const [isTagLoading, setIsTagLoading] = useState(false);
    const [fetchedTagData, setFetchedTagData] = useState([]);
    const [isTagError, setIsTagError] = useState(false);
    const [tagInputValue, setTagInputValue] = useState('');
    const [selectedChips, setSelectedChips] = useState(data.tags);
    const [isSuggestion, setIsSuggestion] = useState(false);
    const [tagRef, isTagFocused] = useIsInputFocused();
    const dispatch = useDispatch();

    const addTags = async () => {
        const payload = {
            tags: selectedChips
        }
        return addFavouriteQuestionTags(payload);
    }

    const addTagsMutation = useMutation({
        mutationFn: () => addTags(),
        onSuccess: () => {
            onClose();
            refetch();
            dispatchSuccessMessage(dispatch, 'Tags added successfully to Bloggios');
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    useEffect(() => {
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
            return () => controller.abort();
        }, 500);

        return () => {
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

    const handleSuggestionClose = () => {
        if (isSuggestion) {
            setIsSuggestion(false);
            setTagInputValue('');
        }
    }

    const handleChipRemove = (removedChip) => {
        const updatedChips = selectedChips.filter(chip => chip !== removedChip);
        setSelectedChips(updatedChips);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' && tagInputValue.trim() !== '') {
            handleChipClick(tagInputValue.trim());
        }
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

    const getPlaceholder = () => {
        if (selectedChips.length === 0) {
            return 'Type to search tags or add space to see all'
        } else if (selectedChips.length > 0 && selectedChips.length <= 11) {
            return 'Type'
        } else if (selectedChips.length >= 12) {
            return 'Can add only 12 Tags'
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
        <FadeModal
            isOpen={isModelOpen}
            onClose={onClose}
            height={'fit-content'}
            width={'clamp(250px, 95%, 550px)'}
            bgColor={colors.black70}
            padding={'20px'}
            margin={'70px 0 0 0'}
            borderRadius={'20px'}
        >
            <Wrapper>
                <header>
                    <h4>
                        Add Favourites
                    </h4>
                    <IconButton onClick={onClose} fontSize={'25px'}>
                        <AiOutlineClose/>
                    </IconButton>
                </header>

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
                        placeholder={getPlaceholder()}
                        maxLength={20}
                        readOnly={selectedChips.length >= 12}
                        ref={tagRef}
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

                <FetchLoaderButton
                    isLoading={addTagsMutation.isPending}
                    onClick={() => addTagsMutation.mutate()}
                    text={'Add Tags'}
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
                        width: '100%',
                        height: '40px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        marginTop: '25px',
                        fontFamily: "'Poppins', san-serif"
                    }}
                />
            </Wrapper>
        </FadeModal>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;

    & > header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > h4 {
            font-size: clamp(1.125rem, 1.0069rem + 0.5556vw, 1.5625rem);
            font-family: inherit;
            letter-spacing: inherit;
            font-weight: 600;
        }
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
    width: 58px;
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
    top: 110%;
    max-height: 250px;
    height: auto;
    overflow: auto;
    background-color: #272727;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 4px;
    gap: 10px;
    z-index: 1;

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

export default FavouriteTagsModel;