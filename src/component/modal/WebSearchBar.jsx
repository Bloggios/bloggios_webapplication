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

import React, {useEffect, useRef, useState} from 'react';
import FadeModal from "./FadeModal";
import styled from "styled-components";
import {IoIosSearch} from "react-icons/io";
import {bloggiosLinksList, bloggiosTechLinksList, globalSearchList} from "../../constant/listConstants";
import {useNavigate} from "react-router-dom";
import {BsChevronDown} from "react-icons/bs";
import {searchPostList} from "../../restservices/postApi";
import {searchProfileList} from "../../restservices/profileApi";
import {setSnackbar} from "../../state/snackbarSlice";
import {useDispatch} from "react-redux";
import {SEARCH_EMPTY_RESPONSE} from "../../constant/ReponseMessages";
import SearchPostSmallComponent from "../Cards/SearchPostSmallComponent";
import {VscSearchStop} from "react-icons/vsc";
import FallbackLoader from "../loaders/fallbackLoader";
import SearchUserSmallComponent from "../Cards/SearchUserSmallComponent";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const WebSearchBar = ({
                          isOpen,
                          onClose
                      }) => {

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [isShown, setIsShown] = useState(false);
    const dropdownRef = useRef(null);
    const [postPage, setPostPage] = useState(0);
    const [userPage, setUserPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState('')
    const dispatch = useDispatch();
    const {width} = useWindowDimensions();

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsShown(false);
        }
    };

    useEffect(() => {
        if (inputValue.length > 0) {
            setIsShown(false);
            setSearchLoading(true);
            setEmptyResponse('');
            const debounce = setTimeout(() => {
                if (inputValue.length > 0) {
                    fetchSearch(inputValue);
                }
            }, 500)

            return () => clearTimeout(debounce);
        } else if (inputValue.length === 0) {
            setUserList([]);
            setPostList([]);
            setSearchLoading(false);
        }
    }, [inputValue])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchSearch = (input) => {
        if (input.length > 2) {
            if (value === 'Posts') {
                setPostList([]);
                const postPayload = {
                    page: postPage,
                    size: 16,
                    texts: [input]
                };
                searchPostList(postPayload)
                    .then((response) => {
                        if (response.data?.object.length > 0) {
                            setPostList(response.data?.object);
                        } else {
                            setEmptyResponse(SEARCH_EMPTY_RESPONSE + " : " + input);
                        }
                        setSearchLoading(false);
                    })
            } else {
                setUserList([]);
                const userPayload = {
                    page: userPage,
                    size: 16,
                    listSearch: {
                        texts: [input]
                    }
                }
                searchProfileList(userPayload)
                    .then((response) => {
                        if (response.data?.object.length > 0) {
                            setUserList(response.data?.object);
                        } else {
                            setEmptyResponse(SEARCH_EMPTY_RESPONSE + " : " + input);
                        }
                        setSearchLoading(false);
                    }).catch((error) => {
                    setInputValue('');
                    setSearchLoading(false);
                    setUserList([]);
                    const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                })
            }
        } else if (input.length < 3) {
            setSearchLoading(false);
            setUserList([]);
            setPostList([]);
            setEmptyResponse("Minimum 3 Characters required")
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            inputRef.current.focus();
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, onClose]);

    const handleBloggiosPathClick = (path) => {
        navigate(path);
        onClose();
    }

    const handleSearchTypeDropdownClick = (label) => {
        setEmptyResponse('');
        setUserList([]);
        setPostList([]);
        setValue(label);
        setIsShown(false);
    }

    useEffect(()=> {
        if (!isOpen) {
            setInputValue('');
        }
    }, [isOpen])

    useEffect(()=> {
        setInputValue('');
        setUserList([]);
        setPostList([])
    }, [value])

    return (
        <>
            {isOpen && (
                <FadeModal
                    height={'fit-content'}
                    width={'clamp(250px, 95%, 550px)'}
                    borderRadius={'7px'}
                    margin={'70px 0 0 0'}
                    isOpen={isOpen}
                    onClose={onClose}
                    bgColor={'#272727'}
                    padding={'0 0 10px 0'}
                    border={'1px solid rgba(255, 255, 255, 0.1)'}
                >
                    <ModelHeader >
                            <IoIosSearch style={{flexShrink: 0}}/>
                            <SearchBar
                                autoFocus={true}
                                type={"text"}
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        {width > 350 && (
                            <ValueDropdownWrapper ref={dropdownRef} onClick={() => setIsShown(!isShown)}>
                                <DropdownWrapper>
                                    <span>{value ? value : globalSearchList[0].label}</span>
                                    <div style={{
                                        transform: isShown && 'rotate(180deg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'all 150ms ease-in-out'
                                    }}>
                                        <BsChevronDown/>
                                    </div>
                                </DropdownWrapper>

                                <DropdownItems style={{
                                    visibility: isShown ? 'visible' : 'hidden',
                                    opacity: isShown ? 1 : 0
                                }}>
                                    {globalSearchList.map((item) => (
                                        <DropdownItem onClick={() => handleSearchTypeDropdownClick(item.label)}
                                                      key={item.id}>
                                            <span>{item.label}</span>
                                        </DropdownItem>
                                    ))}
                                </DropdownItems>
                            </ValueDropdownWrapper>
                        )}
                    </ModelHeader>

                    {width <=350 && (
                        <div style={{
                            padding: '20px 20px 0 20px'
                        }}>
                            <ValueDropdownWrapper ref={dropdownRef} onClick={() => setIsShown(!isShown)}>
                                <DropdownWrapper>
                                    <span>{value ? value : globalSearchList[0].label}</span>
                                    <div style={{
                                        transform: isShown && 'rotate(180deg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'all 150ms ease-in-out'
                                    }}>
                                        <BsChevronDown/>
                                    </div>
                                </DropdownWrapper>

                                <DropdownItems style={{
                                    visibility: isShown ? 'visible' : 'hidden',
                                    opacity: isShown ? 1 : 0
                                }}>
                                    {globalSearchList.map((item) => (
                                        <DropdownItem onClick={() => handleSearchTypeDropdownClick(item.label)}
                                                      key={item.id}>
                                            <span>{item.label}</span>
                                        </DropdownItem>
                                    ))}
                                </DropdownItems>
                            </ValueDropdownWrapper>
                        </div>
                    )}

                    {searchLoading === true ? (
                        <ModelContentWrapper>
                            <FallbackLoader
                                height={'280px'}
                                width={'100%'}
                            />
                        </ModelContentWrapper>
                    ) : (
                        <ModelContentWrapper>
                            {
                                inputValue.length > 0 ? (
                                    value === 'Posts' ? (
                                        postList.length > 0 ? (
                                            <ListWrapper>
                                                {postList.map((post) => (
                                                    <SearchPostSmallComponent
                                                        key={post.userId}
                                                        postBody={post.body}
                                                        userId={post.userId}
                                                    />
                                                ))}
                                            </ListWrapper>
                                        ) : (
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
                                                    {emptyResponse}
                                                </NotFoundMessage>
                                            </NotResultFoundWrapper>
                                        )
                                    ) : (
                                        userList.length > 0 ? (
                                            <ListWrapper>
                                                {userList.map((user) => (
                                                    <SearchUserSmallComponent
                                                        key={user.userId}
                                                        name={user.name}
                                                        email={user.email}
                                                        onClose={onClose}
                                                        fetchedUserId={user.userId}
                                                        image={user.profileImage}
                                                    />
                                                ))}
                                            </ListWrapper>
                                        ) : (
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
                                                    {emptyResponse}
                                                </NotFoundMessage>
                                            </NotResultFoundWrapper>
                                        )
                                    )
                                ) : (
                                    <Wrapper>
                                        <BloggiosWrapper style={{
                                            paddingBottom: '16px',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}>
                                            <TextSpan style={{
                                                textAlign: 'center'
                                            }}>
                                                Bloggios
                                            </TextSpan>

                                            <BloggiosTechGrid>
                                                {bloggiosLinksList.map((item) => (
                                                    <BloggiosTechItems
                                                        key={item.label}
                                                        onClick={() => handleBloggiosPathClick(item.path)}
                                                    >
                                                        <div style={{
                                                            height: '25px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontSize: '22px',
                                                        }}>
                                                            {item.icon}
                                                        </div>

                                                        <ListTextSpan>
                                                            {item.label}
                                                        </ListTextSpan>
                                                    </BloggiosTechItems>
                                                ))}
                                            </BloggiosTechGrid>
                                        </BloggiosWrapper>
                                        <BloggiosWrapper>
                                            <TextSpan style={{
                                                textAlign: 'center'
                                            }}>
                                                Bloggios Tech
                                            </TextSpan>

                                            <BloggiosTechGrid>
                                                {bloggiosTechLinksList.map((item) => (
                                                    <BloggiosTechItems
                                                        key={item.label}
                                                        onClick={() => window.open(item.path, '_blank')}
                                                    >
                                                        <div style={{
                                                            height: '25px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontSize: '22px',
                                                        }}>
                                                            {item.icon}
                                                        </div>

                                                        <ListTextSpan>
                                                            {item.label}
                                                        </ListTextSpan>
                                                    </BloggiosTechItems>
                                                ))}
                                            </BloggiosTechGrid>
                                        </BloggiosWrapper>
                                    </Wrapper>
                                )
                            }
                        </ModelContentWrapper>
                    )}
                </FadeModal>
            )}
        </>
    );
};

const ModelHeader = styled.div`
    height: 50px;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    padding: 0 10px;
    font-size: 22px;
    gap: 10px;
`;

const SearchBar = styled.input`
    flex: 1;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 1px;
    outline: none;
    border: none;
    min-width: 160px;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
`;

const ModelContentWrapper = styled.div`
    width: 100%;
    max-height: 550px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    flex-direction: column;
`;

const BloggiosWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 350px) {
        display: none;
    }
`;

const TextSpan = styled.span`
    font-size: clamp(10px, 2rem, 16px);
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    letter-spacing: 1px;
`;

const BloggiosTechGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(110px, 1fr));
    gap: 10px;
    margin-top: 16px;
    box-sizing: border-box;
    height: 100%;
`;

const BloggiosTechItems = styled.button`
    width: 100%;
    height: 100%;
    outline: 1px solid rgba(255, 255, 255, 0.1);
    border: none;
    background-color: rgba(16, 23, 32, 0.2);
    color: #f5f5f5;
    border-radius: 10px;
    padding: 7px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 50ms ease;

    &:hover {
        outline: 1px solid rgba(255, 255, 255, 0.4);
        background-color: rgba(16, 23, 32, 0.4);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const ListTextSpan = styled.span`
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    text-align: left;
    
    @media (max-width: 550px) {
        font-size: 12px;
    }
`;

const ValueDropdownWrapper = styled.div`
    width: auto;
    height: auto;
    outline: none;
    position: relative;
    min-width: 100px;
    z-index: 2;
`;

const DropdownWrapper = styled.button`
    width: 100%;
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 150ms ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(16, 23, 32, 1);
    position: relative;
    cursor: pointer;
    user-select: none;
    padding: 5px 7px;
    border-radius: 10px;
    gap: 10px;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    z-index: 2;

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.8);
    }

    &:active {
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: rgba(255, 255, 255, 0.8);
    }

    &:focus {
        border: 1px solid rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const DropdownItems = styled.div`
    width: 100%;
    background-color: rgba(16, 23, 32, 1);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: absolute;
    top: 110%;
    right: 0;
    cursor: pointer;
    padding: 4px;
    transition: all 250ms ease;
`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 7px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);

    &:hover {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.1);
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

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
`;

const MemoizedWebSearchBar = React.memo(WebSearchBar);

export default MemoizedWebSearchBar;