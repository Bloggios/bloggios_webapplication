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

import React, {lazy, Suspense, useCallback, useEffect, useRef, useState} from 'react';
import FadeModal from "./FadeModal";
import styled from "styled-components";
import {BsSend} from "react-icons/bs";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {fetchTags, handleSuggestionClick} from "../../service/postApiFunctions";
import Typography from "../typography/typography";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useMutation} from "@tanstack/react-query";
import {dispatchError, dispatchErrorMessage, dispatchSuccessMessage} from "../../service/functions";
import {addPostComment} from "../../restservices/commentApi";
import {useDispatch, useSelector} from "react-redux";
import {clearIsCreated, setIsCreated} from "../../state/isCreatedSlice";
import FallbackLoader from "../loaders/fallbackLoader";
import {colors} from "../../styles/Theme";

const CommentList = lazy(()=> import('../List/CommentList'));

const CommentModel = ({
    isModalOpen,
    closeModal,
    name,
    postId,
    refetch,
    postUserId
                      }) => {

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [tags, setTags] = useState('');
    const {width} = useWindowDimensions();
    const containerRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const dispatch = useDispatch();
    const {isComment} = useSelector((state)=> state.isCreated);
    const [commentList, setCommentList] = useState(true);

    const dispatchClearIsCreated = useCallback(() => dispatch(clearIsCreated()), [dispatch]);

    useEffect(() => {
        if (isComment) {
            setCommentList(false);
            setTimeout(() => {
                dispatchClearIsCreated();
                setCommentList(true);
            }, 100);
        }
    }, [isComment, dispatchClearIsCreated]);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (container) {
            const amount = 100;
            if (direction === 'left') {
                container.scrollLeft -= amount;
                setScrollLeft(container.scrollLeft);
            } else if (direction === 'right') {
                container.scrollLeft += amount;
                setScrollLeft(container.scrollLeft);
            }
        }
    };

    const handleCommentPosted = async () => {
        setInputValue('');
        dispatchSuccessMessage(dispatch, "Comment Added");
        dispatch(setIsCreated({
            isFollowed: false,
            isPost: false,
            isComment: true
        }));
        await refetch();
    }

    const addCommentMutation = useMutation({
        mutationFn: (payload) => addPostComment(payload),
        onSuccess: handleCommentPosted,
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    const validateComment = useCallback(()=> {
        if (inputValue.length < 2 || inputValue.length === 0) {
            dispatchErrorMessage(dispatch, "Comment is not valid to be Posted")
            return false;
        } else if (inputValue.length > 250) {
            dispatchErrorMessage(dispatch, "Comment is too long");
            return false;
        } else {
            return true;
        }
    }, [inputValue.length, dispatch])

    const handlePostComment = () => {
        if (validateComment()) {
            const payload = {
                comment: inputValue,
                postId: postId
            }
            addCommentMutation.mutate(payload);
        }
    }

    useEffect(()=> {
        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        const inputElement = inputRef.current;

        if (inputElement) {
            inputElement.addEventListener("focus", handleFocus);
            inputElement.addEventListener("blur", handleBlur);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("focus", handleFocus);
                inputElement.removeEventListener("blur", handleBlur);
            }
        }
    }, [inputRef]);

    useEffect(() => {
        const handleInputChange = () => {
            const lines = inputValue.split('\n');
            const lastLine = lines[lines.length - 1];
            const words = lastLine.split(' ');
            const lastWord = words[words.length - 1];
            if (lastWord.startsWith('#')) {
                setTags(lastWord ? lastWord : '#');
                setShowSuggestions(true);
            } else {
                setTags('');
                setShowSuggestions(false);
            }
        };
        handleInputChange();
    }, [inputValue]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (tags.length > 0) {
                fetchTags(tags, setSuggestions);
            } else if (tags === '' || tags.length === 0) {
                setShowSuggestions(false)
            }
        }, 500)

        return () => clearTimeout(debounce);
    }, [tags]);

    const handleEnterPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handlePostComment();
        }
    };

    const getTagSuggestions = useCallback(()=> {
        return (
            <SuggestionMainDiv style={{
                display: showSuggestions ? 'flex' : 'none'
            }}>
                <SuggestionWrapper ref={containerRef}>
                    {
                        suggestions.length > 0 ? (
                            suggestions.map((item) => (
                                <SuggestionChipButton key={item.tagId}
                                                      onClick={() => handleSuggestionClick(item, inputValue, setInputValue, setShowSuggestions)}>
                                    {item.tag}
                                </SuggestionChipButton>
                            ))
                        ) : (
                            <Typography text={'New Tag will be created'} type={'caption'}/>
                        )
                    }
                </SuggestionWrapper>
                <ScrollButton onClick={() => handleScroll('left')}>
                    <FaAngleLeft/>
                </ScrollButton>
                <ScrollButton onClick={() => handleScroll('right')}>
                    <FaAngleRight/>
                </ScrollButton>
            </SuggestionMainDiv>
        )
    }, [showSuggestions, suggestions, inputValue])

    return (
        isModalOpen && (
            <FadeModal
                height={'fit-content'}
                width={'clamp(250px, 95%, 550px)'}
                padding={width > 500 ? '20px' : '10px'}
                borderRadius={'4px'}
                margin={'40px 0 0 0'}
                isOpen={isModalOpen}
                onClose={closeModal}
                bgColor={colors.black50}
            >
                <Wrapper>
                    <CommentListWrapper>
                        {commentList ? (
                            <Suspense fallback={<FallbackLoader width={'100%'} height={'100px'}/>}>
                                <CommentList
                                    postId={postId}
                                    postUserId={postUserId}
                                    refetch={refetch}
                                />
                            </Suspense>
                        ) : (
                            <FallbackLoader width={'100px'} height={'100px'} />
                        )}
                    </CommentListWrapper>

                    <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%'
                    }} />

                    {getTagSuggestions()}

                    <PostCommentWrapper style={{
                        border: isFocused ? '1px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <InputComment
                            type={'text'}
                            spellCheck={"false"}
                            value={inputValue}
                            placeholder={`Comment on ${name ? name.split(' ')[0] : 'Bloggios'}'s Post`}
                            onChange={(e) => setInputValue(e.target.value)}
                            ref={inputRef}
                            onKeyDown={handleEnterPress}
                        />
                        <ButtonComment onClick={handlePostComment}>
                            <BsSend />
                        </ButtonComment>
                    </PostCommentWrapper>
                </Wrapper>
            </FadeModal>
        )
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const PostCommentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding: 7px;
    border-radius: 16px;
    
    @media (max-width: 400px) {
        border-radius: 10px;
    }
    
    @media (max-width: 280px) {
        padding: 5px;
        flex-shrink: 0;
    }
`;

const CommentListWrapper = styled.div`
    width: 100%;
    max-height: 40vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    overflow-x: hidden;
`;

const InputComment = styled.input`
    flex: 1;
    font-size: 16px;
    padding: 5px 0;
    outline: none;
    border: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    
    &:focus {
        color: rgba(255, 255, 255, 1);
    }
    
    @media (max-width: 400px) {
        font-size: 12px;
    }

    @media (max-width: 280px) {
        font-size: 10px;
    }
`;

const ButtonComment = styled.button`
    height: 34px;
    width: 34px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: rgba(66, 88, 255, 0.84);
    outline: none;
    border: none;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    padding-top: 4px;
    padding-right: 2px;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    &:hover {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(66, 88, 255, 0.92);
    }

    &:active {
        color: rgba(255, 255, 255, 0.78);
        box-shadow: none;
        background-color: #4258ff;
    }

    @media (max-width: 400px) {
        height: 25px;
        width: 25px;
        font-size: 14px;
    }
`;

const SuggestionMainDiv = styled.div`
    height: 35px;
    max-width: 100%; /* Added max-width to prevent width increase */
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;


const SuggestionWrapper = styled.div`
    height: 100%;
    max-width: 100%; /* Added max-width to prevent width increase */
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap;
    flex-grow: 1;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SuggestionChipButton = styled.button`
    height: 100%;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: none;
    outline: none;
    flex-direction: row;
    background-color: #4258ff;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    display: inline-block;

    &:hover {
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(66, 88, 255, 1);
        color: rgba(255, 255, 255, 1);
    }
`;

const ScrollButton = styled.button`
    flex-shrink: 0;
    height: 26px;
    width: 26px;
    outline: none;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    font-size: 20px;
    background-color: transparent;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;

    &:hover {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(255, 255, 255, 0.07);
    }
`;

export default CommentModel;