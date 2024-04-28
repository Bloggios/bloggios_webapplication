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

import React, {createRef, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Avatar from "../avatars/avatar";
import ChipButton from "../buttons/chipButton";
import {HiHashtag, HiOutlinePhotograph} from "react-icons/hi";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {addPost} from "../../restservices/postApi";
import Typography from "../typography/typography";
import {AiFillDelete} from "react-icons/ai";
import {authenticatedAxios} from "../../restservices/baseAxios";
import {ADD_POST_IMAGE} from "../../constant/apiConstants";
import {setSnackbar} from "../../state/snackbarSlice";
import {useDispatch} from "react-redux";
import {FaLocationDot} from "react-icons/fa6";
import SimpleLoader from "../loaders/simpleLoader";
import {dispatchError, dispatchWarningMessage} from "../../service/functions";
import {
    addHashTag,
    fetchTags,
    handleImageChange,
    handleImageUploadEvent,
    handleSuggestionClick,
    removeImage,
    validatePostData
} from "../../service/postApiFunctions";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import bloggios_logo from "../../asset/svg/bg_logo_black.svg";
import {setIsCreated} from "../../state/isCreatedSlice";
import {handleDivScroll} from "../../service/commonFunctions";
import {colors} from "../../styles/Theme";

const CreatePost = ({
                        image
                    }) => {

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const imageRef = createRef();
    const [selectedImages, setSelectedImages] = useState([]);
    const dispatch = useDispatch();
    const [postLoader, setPostLoader] = useState(false);
    const [tags, setTags] = useState('');
    const {width} = useWindowDimensions();
    const [location, setLocation] = useState(null);
    const [isLocationError, setIsLocationError] = useState(false);

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setLocation({latitude, longitude});
                },
                (error) => {
                    setIsLocationError(true);
                }
            );
        } else {
            setIsLocationError(true);
        }
    }

    function postSuccess() {
        dispatch(setIsCreated({
            isFollowed: false,
            isPost: true
        }));
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePostData(inputValue, dispatch, selectedImages)) {
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
                                postSuccess();
                            }).catch((error) => {
                            setPostLoader(false);
                            dispatchError(dispatch, error);
                        })
                    } else {
                        postSuccess();
                    }
                }).catch((error) => {
                setPostLoader(false);
                dispatchError(dispatch, error);
            });
        }
    }

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

    const getContent = useCallback(() => {
        if (width > 500) {
            return (
                <Wrapper>
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
                        <ScrollButton onClick={() => handleDivScroll('left')}>
                            <FaAngleLeft/>
                        </ScrollButton>
                        <SuggestionWrapper id="suggestionWrapper">
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
                        <ScrollButton onClick={() => handleDivScroll('right')}>
                            <FaAngleRight/>
                        </ScrollButton>
                    </SuggestionMainDiv>

                    <ImageWrapper selectedImages={selectedImages}>
                        {selectedImages.map((image, index) => (
                            <ImageListItem key={index}>
                                <ImageListMainDiv>
                                    <ImageListInnerTextDiv>
                                        <FirstSpan>{image.name}</FirstSpan>
                                        <LastSpan>{`${image.size} KB`}</LastSpan>
                                    </ImageListInnerTextDiv>
                                    <DeleteButton onClick={() => removeImage(index, selectedImages, setSelectedImages)}
                                                  color={'#ea1818'}>
                                        <AiFillDelete/>
                                    </DeleteButton>
                                </ImageListMainDiv>
                            </ImageListItem>
                        ))}
                    </ImageWrapper>

                    <ButtonsWrapper>
                        <ChipButton
                            text={'Photo'}
                            icon={<HiOutlinePhotograph color={'#1fe49e'} fontSize={'20px'}/>}
                            onClick={() => handleImageUploadEvent(imageRef)}
                        >
                            <input
                                multiple
                                type="file"
                                accept={"image/*"}
                                onChange={(event) => handleImageChange(event, setSelectedImages)}
                                ref={imageRef}
                                style={{display: 'none'}}
                            />
                        </ChipButton>

                        <ChipButton
                            text={'Hashtag'}
                            icon={<HiHashtag color={'#f27c7c'} fontSize={'20px'}/>}
                            onClick={() => addHashTag(showSuggestions, inputValue, setInputValue)}
                            cursor={showSuggestions ? 'not-allowed' : 'pointer'}
                        />

                        <ChipButton
                            text={'Location'}
                            icon={<FaLocationDot color={'#d9b25f'} fontSize={'20px'}/>}
                            cursor={'not-allowed'}
                            onClick={()=> dispatchWarningMessage(dispatch, 'Coming Soon')}
                            // onClick={handleLocation}
                        />
                    </ButtonsWrapper>

                    <PostButtonWrapper>
                        <PostButton onClick={handleSubmit}>
                            {postLoader ? <SimpleLoader size={'4px'}/> : 'Post'}
                        </PostButton>
                    </PostButtonWrapper>
                </Wrapper>
            )
        } else {
            return (
                <MobileWrapper>
                    <MobileRowWrapper>
                        <Avatar size={'40px'} borderRadius={'10px'} image={bloggios_logo}/>
                    </MobileRowWrapper>

                    <MobileRowWrapper>
                        <MobileTextArea
                            rows={3}
                            spellCheck={false}
                            value={inputValue}
                            placeholder={"Let's Share your Perceptions"}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </MobileRowWrapper>

                    <MobileSuggestionWrapper style={{
                        display: showSuggestions ? 'flex' : 'none'
                    }}>
                        {
                            suggestions.length > 0 ? (
                                suggestions.map((item) => (
                                    <MobileSuggestionChipButton key={item.tagId}
                                                                onClick={() => handleSuggestionClick(item, inputValue, setInputValue, setShowSuggestions)}>
                                        {item.tag}
                                    </MobileSuggestionChipButton>
                                ))
                            ) : (
                                <Typography text={'New Tag will be created'} type={'caption'}/>
                            )
                        }
                    </MobileSuggestionWrapper>

                    <MobileImageWrapper selectedImages={selectedImages}>
                        {selectedImages.map((image, index) => (
                            <MobileImageListItem key={index}>
                                <MobileImageListMainDiv>
                                    <MobileImageListInnerTextDiv>
                                        <MobileFirstSpan>{image.name}</MobileFirstSpan>
                                        <MobileLastSpan>{`${image.size} KB`}</MobileLastSpan>
                                    </MobileImageListInnerTextDiv>
                                    <MobileDeleteButton
                                        onClick={() => removeImage(index, selectedImages, setSelectedImages)}
                                        color={'#ea1818'}>
                                        <AiFillDelete/>
                                    </MobileDeleteButton>
                                </MobileImageListMainDiv>
                            </MobileImageListItem>
                        ))}
                    </MobileImageWrapper>

                    <ChipButton
                        width={'95%'}
                        margin={'0 auto'}
                        text={'Photo'}
                        icon={<HiOutlinePhotograph color={'#1fe49e'} fontSize={'20px'}/>}
                        onClick={() => handleImageUploadEvent(imageRef)}
                    >
                        <input
                            multiple
                            type="file"
                            accept={"image/*"}
                            onChange={(event) => handleImageChange(event, setSelectedImages)}
                            ref={imageRef}
                            style={{display: 'none'}}
                        />
                    </ChipButton>

                    <MobileChipButtonWrapper>
                        <ChipButton
                            text={'Hashtag'}
                            icon={<HiHashtag color={'#f27c7c'} fontSize={'20px'}/>}
                            onClick={() => addHashTag(showSuggestions, inputValue, setInputValue)}
                            cursor={showSuggestions ? 'not-allowed' : 'pointer'}
                        />

                        <ChipButton
                            text={'Location'}
                            icon={<FaLocationDot color={'#d9b25f'} fontSize={'20px'}/>}
                            cursor={'not-allowed'}
                        />
                    </MobileChipButtonWrapper>

                    <MobilePostButtonWrapper>
                        <MobileButton onClick={handleSubmit}>
                            {postLoader ? <SimpleLoader size={'4px'}/> : 'Share'}
                        </MobileButton>
                    </MobilePostButtonWrapper>
                </MobileWrapper>
            )
        }
    }, [width, image, inputValue, showSuggestions, suggestions, selectedImages, postLoader])

    return getContent();
};

const Wrapper = styled.div`
    min-width: 95%;
    max-width: 400px; /* Set a maximum width to prevent it from growing indefinitely */
    margin: 0 auto; /* Center the form horizontally */
    height: auto;
    background-color: ${colors.black200};
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

    align-items: center;
    gap: 1vw;
    margin: 28px 0 20px 0;
    @media (max-width: 450px) {
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
    height: 34px;
    width: 140px;
    background-color: ${colors.accent100};
    color: ${colors.white100};
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
        background-color: ${colors.white100};
        color: ${colors.accent100};
    }

    &:active {
        background-color: #e5e5e5;
    }
`;

const SuggestionMainDiv = styled.div`
    height: 35px;
    max-width: 100%; /* Added max-width to prevent width increase */
    padding: 5px;
    background-color: ${colors.black100};
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
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    flex-direction: row;
    background-color: ${colors.accent80};
    color: ${colors.white80};
    cursor: pointer;
    display: inline-block;

    &:hover, &:active {
        background-color: ${colors.accent100};
        color: ${colors.white100};
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
    background-color: ${colors.accent80};
    color: ${colors.white80};
    cursor: pointer;

    &:hover, &:active {
        background-color: ${colors.accent100};
        color: ${colors.white100};
    }
`;

const ImageWrapper = styled.div`
    padding-top: 40px;
    display: ${(props) => (props.selectedImages.length > 0 ? 'block' : 'none')};
`;

const ImageListMainDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
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
    width: 48%;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 300 !important;
`;

const LastSpan = styled.span`
    font-size: 16px;
    padding-left: 20px;
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
        margin-top: 10px;
    }
`;

const MobileWrapper = styled.div`
    width: 95%;
    margin: 0 auto; /* Center the form horizontally */
    min-width: 250px;
    max-width: 95vw;
    min-height: 250px;
    height: auto;
    background-color: ${colors.black200};
    border-radius: 20px;
    padding: 10px 0;
`;

const MobileRowWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    height: auto;
`;

const MobileTextArea = styled.textarea`
    width: 95%;
    outline: 2px solid rgba(255, 255, 255, 0.2);
    border: none;
    background: rgba(0, 0, 0, 0.1);
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

const MobileChipButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 5px;
    padding: 10px 10px;
`;

const MobilePostButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
    margin: 20px 0 0 0;
`;

const MobileButton = styled.div`
    height: 50px;
    width: 95%;
    background-color: ${colors.accent100};
    color: ${colors.white100};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    user-select: none;

    &:hover {
        background-color: ${colors.white100};
        color: ${colors.accent100};
    }

    &:active {
        background-color: #e5e5e5;
    }
`;

const MobileSuggestionWrapper = styled.div`
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

const MobileSuggestionChipButton = styled.button`
    height: 100%;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: none;
    outline: none;
    flex-direction: row;
    background-color: ${colors.accent80};
    color: ${colors.white80};
    cursor: pointer;
    display: inline-block;

    &:hover, &:active {
        background-color: ${colors.accent100};
        color: ${colors.white100};
    }
`;

const MobileImageWrapper = styled.div`
    padding: 16px;
    display: ${(props) => (props.selectedImages.length > 0 ? 'block' : 'none')};
`;

const MobileImageListMainDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
`;

const MobileImageListInnerTextDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    width: 100%;
`;

const MobileFirstSpan = styled.span`
    max-width: 48%;
    width: 42%;
    min-width: 80px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 300 !important;
`;

const MobileLastSpan = styled.span`
    font-size: 14px;
    padding-left: 16px;
    font-weight: 200 !important;
`;

const MobileDeleteButton = styled.div`
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

const MobileImageListItem = styled.div`
    & + & {
        margin-top: 10px; /* Adjust as needed */
    }
`;

const MemoizedCreatePost = React.memo(CreatePost);

export default MemoizedCreatePost;