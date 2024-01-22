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

import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Avatar from "../avatars/avatar";
import ChipButton from "../buttons/chipButton";
import {HiHashtag, HiOutlinePhotograph} from "react-icons/hi";
import {CgOptions} from "react-icons/cg";
import {GoMention} from "react-icons/go";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {debounce} from "lodash";
import {getTenTags} from "../../restservices/postApi";
import axios from "axios";
import Typography from "../typography/typography";

const CreatePostWeb = ({
                           image
                       }) => {

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    let cancelTokenSource;

    const fetchTags = (value) => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Request canceled due to new value');
        }
        cancelTokenSource = axios.CancelToken.source();

        getTenTags(value, {
            cancelToken: cancelTokenSource.token
        })
            .then((response) => {

                if (response.data?.object) {
                    const newTags = response.data.object.map(tagItem => ({
                        tagId: tagItem.tagId,
                        tag: tagItem.tag
                    }));
                    setSuggestions(newTags)
                }
            })
            .catch((error) => {

            });
    }

    const handleScroll = (direction) => {
        const scrollContainer = document.getElementById('suggestionWrapper');
        const scrollAmount = 150; // You can adjust this value as needed

        if (direction === 'left') {
            scrollContainer.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
            scrollContainer.scrollLeft += scrollAmount;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputValue);
    }

    useEffect(() => {

        const handleInputChange = () => {
            const words = inputValue.split(' ');
            const lastWord = words[words.length - 1];
            if (lastWord.startsWith('#')) {
                fetchTags(lastWord);
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        };

        handleInputChange();
    }, [inputValue]);

    const handleSuggestionClick = (suggestion) => {
        const words = inputValue.split(' ');
        words[words.length - 1] = `${suggestion.tag}`;
        setInputValue(words.join(' '));
        setInputValue(prevState => prevState + " ");
        setShowSuggestions(false);
    };

    const addHashTag = () => {
        if (!showSuggestions) {
            if (inputValue.endsWith('#')) {
                setInputValue(inputValue.slice(0, -1)); // Remove the last character if it's a #
            } else {
                if (inputValue.endsWith(' ')) {
                    setInputValue(inputValue + '#');
                } else {
                    setInputValue(inputValue + ' #');
                }
            }
        }
    }

    useEffect(() => {
        console.log(suggestions)
    });

    return (
        <Wrapper onSubmit={handleSubmit}>
            <RowWrapper>
                <Avatar
                    size={'60px'}
                    position={'relative'}
                    left={'0'}
                    image={image}
                />
                <InputField
                    rows={3}
                    spellCheck={false}
                    value={inputValue}
                    placeholder={"Let's Share your Perceptions"}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </RowWrapper>

            <SuggestionMainDiv style={{
                display: showSuggestions ? 'flex' : 'none'
            }}>
                <ScrollButton onClick={() => handleScroll('left')}>
                    <FaAngleLeft />
                </ScrollButton>
                <SuggestionWrapper id="suggestionWrapper">
                    {
                        suggestions.length > 0 ? (
                            suggestions.map((item)=> (
                                <SuggestionChipButton key={item.tagId} onClick={()=> handleSuggestionClick(item)}>
                                    {item.tag}
                                </SuggestionChipButton>
                            ))
                        ) : (
                            <Typography text={'New Tag will be created'} type={'caption'} />
                        )
                    }
                </SuggestionWrapper>
                <ScrollButton onClick={() => handleScroll('right')}>
                    <FaAngleRight />
                </ScrollButton>
            </SuggestionMainDiv>

            <ButtonsWrapper>
                <ChipButton
                    text={'Photo'}
                    icon={<HiOutlinePhotograph color={'#1fe49e'} fontSize={'20px'}/>}
                />

                <ChipButton
                    text={'Hashtag'}
                    icon={<HiHashtag color={'#f27c7c'} fontSize={'20px'}/>}
                    onClick={addHashTag}
                    cursor={showSuggestions ? 'not-allowed' : 'pointer'}
                />

                <ChipButton
                    text={'Poll'}
                    icon={<CgOptions color={'#529dff'} fontSize={'20px'}/>}
                />

                <ChipButton
                    text={'Mention'}
                    icon={<GoMention color={'#d9b25f'} fontSize={'20px'}/>}
                />
            </ButtonsWrapper>

            <PostButtonWrapper>
                <PostButton>
                    Post
                </PostButton>
            </PostButtonWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.form`
  min-width: 95%;
  max-width: 400px; /* Set a maximum width to prevent it from growing indefinitely */
  margin: 0 auto; /* Center the form horizontally */
  height: auto;
  background-color: #272727;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden; /* Hide any potential overflow */
  box-sizing: border-box; /* Include padding in the width calculation */
`;


const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const InputField = styled.textarea`
  flex-grow: 1;
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  min-height: 20px;
  background: rgba(0, 0, 0, 0.1);
  outline: 2px solid rgba(255, 255, 255, 0.2);
  border: none;
  color: #e5e5e5;
  font-family: 'Inter', sans-serif;
  letter-spacing: 2px;
  user-select: text;

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin: 28px 0 20px 0;
  @media (max-width: 450px) {
    justify-content: space-around;
  }

  @media (min-width: 1400px) {
    justify-content: space-around;
  }
`;

const PostButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const PostButton = styled.button`
  padding: 10px;
  width: 140px;
  background-color: #4258ff;
  color: #e5e5e5;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 20px;
  font-size: 16px;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    color: #4258ff;
  }

  &:active {
    background-color: #e5e5e5;
  }
`;

const SuggestionMainDiv = styled.div`
  height: 35px;
  max-width: 100%; /* Added max-width to prevent width increase */
  padding: 5px;
  background-color: rgba(0, 0, 0, 1);
  margin-top: 25px;
  border-radius: 20px;
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
  background-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.7);
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
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.7);
  }
`;

export default CreatePostWeb;