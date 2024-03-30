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

import React, {useEffect, useMemo, useState} from 'react';
import {IoSearch} from "react-icons/io5";
import {colors} from "../../../styles/Theme";
import IconButton from "../../buttons/IconButton";
import styled from "styled-components";
import useIsInputFocused from "../../../hooks/useIsInputFocused";
import {bgBlackRounded} from "../../../asset/svg";
import {searchProfileData} from "../../../restservices/profileApi";
import {dispatchError, dispatchErrorMessage, dispatchWarningMessage} from "../../../service/functions";
import {useDispatch, useSelector} from "react-redux";
import FallbackLoader from "../../loaders/fallbackLoader";
import {AiOutlineClose} from "react-icons/ai";
import {uuidValidator} from "../../../util/ComponentValidators";
import {useNavigate} from "react-router-dom";

const MessagingUserList = () => {
    const [userSearchRef, userSearchIsFocused] = useIsInputFocused();
    const { userId } = useSelector((state) => state.auth);
    const [searchInput, setSearchInput] = useState('');
    const [fetchedUserList, setFetchedUserList] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchingCatch, setSearchingCatch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setSearchingCatch(false);
        setFetchedUserList([]);
        setSearchLoader(searchInput.length > 0);
        const debounce = setTimeout(() => {
            if (searchInput.length >= 3) {
                searchProfileData(searchInput)
                    .then((response) => {
                        setFetchedUserList(response?.data?.object);
                    })
                    .catch((error) => {
                        dispatchError(dispatch, error);
                        setSearchingCatch(true);
                    })
                    .finally(() => {
                        setSearchLoader(false);
                    });
            }
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchInput]);

    const handleUserCardClick = (id) => {
        if (id === userId) {
            dispatchWarningMessage(dispatch, 'Self Messaging is not allowed');
        } else if (!id || !uuidValidator(id)) {
            dispatchErrorMessage(dispatch, 'User not exists for given data');
        } else {
            navigate(`${id}`);
        }
    };

    const getUserListContent = useMemo(() => {
        if (searchLoader && searchInput.length >= 3) {
            return <FallbackLoader width={'100%'} height={'100%'} />;
        }
        if (searchingCatch) {
            return <SpanText>Error Occurred</SpanText>;
        }
        if (!searchLoader && fetchedUserList.length > 0) {
            return (
                <UserList>
                    {fetchedUserList.map((item) => (
                        <UserCard key={item.userId} onClick={() => handleUserCardClick(item.userId)}>
                            <img src={item.profileImage || bgBlackRounded} alt={item.name} />
                            <div>
                                <h6>{item.name}</h6>
                                <span>{item.email}</span>
                            </div>
                        </UserCard>
                    ))}
                </UserList>
            );
        }
        if (searchInput.length === 0 && !searchLoader) {
            return <SpanText>Search user</SpanText>;
        }
        if (searchInput.length < 3) {
            return <SpanText>Minimum 3 Characters Required</SpanText>;
        }
        if (!searchLoader && fetchedUserList.length === 0 && searchInput.length >= 3) {
            return <SpanText>No User(s) Found</SpanText>;
        }
        return null;
    }, [searchLoader, searchingCatch, searchInput, fetchedUserList, handleUserCardClick, navigate]);

    return (
        <UserInfo>
            <h5>Users</h5>

            <SearchBox>
                <IoSearch color={userSearchIsFocused ? colors.white100 : colors.white80} />
                <input
                    type="search"
                    inputMode={'search'}
                    ref={userSearchRef}
                    maxLength={16}
                    placeholder={'Search User'}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
                <IconButton
                    padding={'7px'}
                    style={{
                        visibility: searchInput.length > 0 ? 'visible' : 'hidden',
                        opacity: searchInput.length > 0 ? 1 : 0,
                    }}
                    onClick={() => setSearchInput('')}
                >
                    <AiOutlineClose />
                </IconButton>
            </SearchBox>

            {getUserListContent}
        </UserInfo>
    );
};

const UserInfo = styled.div`
    width: 32%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: ${colors.black150};
    border-radius: 20px;
    padding: 20px;
    gap: 25px;

    & > h5 {
        font-size: clamp(0.875rem, 0.7713rem + 0.6383vw, 1.25rem);
        font-family: 'Poppins', sans-serif;
        color: ${colors.white80};
        font-weight: 500;
        letter-spacing: 1px;
    }

    @media (max-width: 1600px) {
        padding: 10px;
    }
`;

const SearchBox = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    background-color: ${colors.black200};
    border-radius: 7px;
    display: flex;
    flex-direction: row;
    gap: 7px;
    align-items: center;
    padding: 0 10px;

    & > svg {
        font-size: 24px;
    }

    & > input {
        padding: 10px 0;
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        min-width: 60px;
        font-family: 'Poppins', sans-serif;
        color: ${colors.white80};
        letter-spacing: 1px;
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);

        &:focus {
            color: ${colors.white100};
        }
    }
`;

const UserList = styled.div`
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 10px;
    box-sizing: border-box;
`;

const UserCard = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 7px;
    padding: 5px;
    border-radius: 7px;
    background: ${colors.black200};
    cursor: pointer;
    box-shadow: none;
    transition: all 150ms ease-in-out;

    & > img {
        height: 44px;
        aspect-ratio: 1/1;
        border-radius: 50%;
    }

    & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: ${colors.white80};

        & > h6 {
            font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            letter-spacing: 1px;
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        & > span {
            font-size: clamp(0.625rem, 0.5904rem + 0.2128vw, 0.75rem);
            font-family: 'Poppins', sans-serif;
            font-weight: 300;
            letter-spacing: 1px;
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &:hover, &:active {
    }
`;

const SpanText = styled.h6`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    letter-spacing: 1px;
    font-weight: 400;
    text-align: center;
    color: ${colors.white80};
`;

export default MessagingUserList;