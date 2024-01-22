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

import React, {createRef, useEffect, useState} from 'react';
import styled from "styled-components";
import Avatar from "../avatars/avatar";
import bloggios_logo from '../../asset/svg/bg_logo_black.svg'
import ChipButton from "../buttons/chipButton";
import {HiHashtag, HiOutlinePhotograph} from "react-icons/hi";
import {CgOptions} from "react-icons/cg";
import {GoMention} from "react-icons/go";
import {useDispatch} from "react-redux";
import axios from "axios";
import {addPost, getTenTags} from "../../restservices/postApi";
import {setSnackbar} from "../../state/snackbarSlice";
import {authenticatedAxios} from "../../restservices/baseAxios";
import {ADD_POST_IMAGE} from "../../constant/apiConstants";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Typography from "../typography/typography";
import {AiFillDelete} from "react-icons/ai";
import {FaLocationDot} from "react-icons/fa6";
import SimpleLoader from "../loaders/simpleLoader";

const CreatePostMobile = () => {

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const imageRef = createRef();
    const [selectedImages, setSelectedImages] = useState([]);
    const dispatch = useDispatch();
    const [postLoader, setPostLoader] = useState(false);
    let cancelTokenSource;

    const handleImageUploadEvent = () => {
        imageRef.current.click();
    }

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newImages = Array.from(files).map((file) => {
            return {
                name: file.name,
                size: (file.size / 1024).toFixed(1),
                file,
            };
        });
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

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
                if (error.response.status === 400 || error.response.status === 401) {
                    const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                } else {
                    const message = 'Something went wrong while fetching the Tags';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                }
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

    const validatePostData = () => {
        if (inputValue === '') {
            const message = "There is nothing to share in your Post";
            const snackBarData = {
                isSnackbar: true,
                message: message,
                snackbarType: 'Error',
            };
            dispatch(setSnackbar(snackBarData));
            return true;
        } else if (selectedImages.length > 6) {
            const message = "You cannot add more than 5 Images";
            const snackBarData = {
                isSnackbar: true,
                message: message,
                snackbarType: 'Error',
            };
            dispatch(setSnackbar(snackBarData));
            return true;
        }
        return false;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePostData()) {
            setPostLoader(true);
            const postPayload = {
                postType: 'POST',
                isImageAdded: selectedImages.length > 0,
                body: inputValue
            }
            addPost(postPayload)
                .then((response) => {
                    if (selectedImages.length > 0) {
                        const formData = new FormData();
                        selectedImages.forEach((image, index) => {
                            formData.append('images', image.file);
                        });
                        authenticatedAxios.post(ADD_POST_IMAGE + '/' + response.data?.id, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }
                        })
                            .then((response) => {
                                const snackbarData = {
                                    isSnackbar: true,
                                    message: 'Post Created successfully to Bloggios',
                                    snackbarType: 'Success',
                                };
                                dispatch(setSnackbar(snackbarData));
                                setPostLoader(false);
                                setSelectedImages([]);
                                setInputValue('');
                            }).catch((error) => {
                            setPostLoader(false);
                            if (error.response.status === 400 || error.response.status === 401) {
                                const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                                const snackBarData = {
                                    isSnackbar: true,
                                    message: message,
                                    snackbarType: 'Error',
                                };
                                dispatch(setSnackbar(snackBarData));
                            } else {
                                const message = 'Something went wrong. Please try again later';
                                const snackBarData = {
                                    isSnackbar: true,
                                    message: message,
                                    snackbarType: 'Error',
                                };
                                dispatch(setSnackbar(snackBarData));
                            }
                        })
                    } else {
                        const snackbarData = {
                            isSnackbar: true,
                            message: 'Post Created successfully to Bloggios',
                            snackbarType: 'Success',
                        };
                        dispatch(setSnackbar(snackbarData));
                        setPostLoader(false);
                        setSelectedImages([]);
                        setInputValue('');
                    }
                }).catch((error) => {
                setPostLoader(false);
                if (error.response.status === 400 || error.response.status === 401) {
                    const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                } else {
                    const message = 'Something went wrong. Please try again later';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                }
            });
        }
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

    return (
        <Wrapper>
            <RowWrapper>
                <Avatar size={'40px'} borderRadius={'10px'} image={bloggios_logo}/>
            </RowWrapper>

            <RowWrapper>
                <TextArea
                    rows={3}
                    spellCheck={false}
                    value={inputValue}
                    placeholder={"Let's Share your Perceptions"}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </RowWrapper>

            <SuggestionWrapper style={{
                display: showSuggestions ? 'flex' : 'none'
            }}>
                {
                    suggestions.length > 0 ? (
                        suggestions.map((item) => (
                            <SuggestionChipButton key={item.tagId} onClick={() => handleSuggestionClick(item)}>
                                {item.tag}
                            </SuggestionChipButton>
                        ))
                    ) : (
                        <Typography text={'New Tag will be created'} type={'caption'}/>
                    )
                }
            </SuggestionWrapper>

            <ImageWrapper selectedImages={selectedImages}>
                {selectedImages.map((image, index) => (
                    <ImageListItem key={index}>
                        <ImageListMainDiv>
                            <ImageListInnerTextDiv>
                                <FirstSpan>{image.name}</FirstSpan>
                                <LastSpan>{`${image.size} KB`}</LastSpan>
                            </ImageListInnerTextDiv>
                            <DeleteButton onClick={() => removeImage(index)} color={'#ea1818'}>
                                <AiFillDelete/>
                            </DeleteButton>
                        </ImageListMainDiv>
                    </ImageListItem>
                ))}
            </ImageWrapper>

            <ChipButton
                width={'95%'}
                margin={'0 auto'}
                text={'Photo'}
                icon={<HiOutlinePhotograph color={'#1fe49e'} fontSize={'20px'}/>}
                onClick={handleImageUploadEvent}
            >
                <input
                    multiple
                    type="file"
                    accept={"image/*"}
                    onChange={handleImageChange}
                    ref={imageRef}
                    style={{display: 'none'}}
                />
            </ChipButton>

            <ChipButtonWrapper>
                <ChipButton
                    text={'Hashtag'}
                    icon={<HiHashtag color={'#f27c7c'} fontSize={'20px'}/>}
                    onClick={addHashTag}
                    cursor={showSuggestions ? 'not-allowed' : 'pointer'}
                />

                <ChipButton
                    text={'Location'}
                    icon={<FaLocationDot color={'#d9b25f'} fontSize={'20px'}/>}
                    cursor={'not-allowed'}
                />
            </ChipButtonWrapper>

            <PostButtonWrapper>
                <Button onClick={handleSubmit}>
                    {postLoader ? <SimpleLoader size={'4px'}/> : 'Share'}
                </Button>
            </PostButtonWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto; /* Center the form horizontally */
  min-width: 250px;
  max-width: 95vw;
  min-height: 250px;
  height: auto;
  background-color: #272727;
  border-radius: 20px;
  padding: 10px 0;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  height: auto;
`;

const TextArea = styled.textarea`
  width: 95%;
  outline: 2px solid rgba(255, 255, 255, 0.2);
  border: none;
  background: #1e1e1e;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  color: #e5e5e5;
  font-size: 18px;
  line-height: 25px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
  }
`;

const ChipButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 5px;
  padding: 10px 10px;
`;

const PostButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0 0;
`;

const Button = styled.div`
  height: 50px;
  width: 95%;
  background: linear-gradient(225deg, #0c0c0c, #0a0a0a);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  user-select: none;

  &:hover {
    background: linear-gradient(225deg, #151515, #151515);
  }
`;

const SuggestionWrapper = styled.div`
  height: 34px;
  max-width: 95%; /* Added max-width to prevent width increase */
  overflow-x: auto; /* Enable horizontal scrolling */
  white-space: nowrap;
  flex-grow: 1;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 1);
  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 10px auto; /* Center the form horizontally */
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

const ImageWrapper = styled.div`
  padding: 16px;
  display: ${(props) => (props.selectedImages.length > 0 ? 'block' : 'none')};
`;

const ImageListMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
`;

const ImageListInnerTextDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  width: 100%;
`;

const FirstSpan = styled.span`
  max-width: 48%;
  width: 42%;
  min-width: 80px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 300 !important;
`;

const LastSpan = styled.span`
  font-size: 14px;
  padding-left: 16px;
  font-weight: 200 !important;
`;

const DeleteButton = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: transparent;
  cursor: pointer;
  color: rgb(236, 83, 83);
  transition: all 150ms ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ImageListItem = styled.div`
  & + & {
    margin-top: 10px; /* Adjust as needed */
  }
`;

export default CreatePostMobile;