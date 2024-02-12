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

import React, {lazy, Suspense, useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {IoIosSearch, IoMdLogOut} from "react-icons/io";
import WebSearchBar from "../modal/WebSearchBar";
import {RxSlash} from "react-icons/rx";
import FallbackLoader from "../loaders/fallbackLoader";
import IconLabelButton from "../buttons/IconLabelButton";
import {useNavigate} from "react-router-dom";
import {initLogout} from "../../service/functions";

const MemoizedSidebarProfileContainer = lazy(()=> import('./components/SidebarProfileContainer'));
const MemoizedSidebarTiles = lazy(()=> import('./components/SidebarTiles'));

const Sidebar = () => {

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const {isAdded, name, bio, email, profileImage, coverImage, followers, following} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        const handleKeyPress = (event) => {
            if (event.key === '/') {
                if (!isSearchBarOpen) {
                    event.preventDefault();
                    setIsSearchBarOpen(true);
                }
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isSearchBarOpen, setIsSearchBarOpen])

    const handleLogout = () => {
        initLogout(navigate, dispatch)
    }

    return (
        <>
            <Wrapper>
                <div style={{
                    width: '100%'
                }}>
                    <Suspense fallback={<FallbackLoader height={'160px'} width={'100%'} />}>
                        <MemoizedSidebarProfileContainer
                            profileImage={profileImage}
                            name={name}
                            email={email}
                        />
                    </Suspense>

                    <SearchBarInput onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}>
                        <IoIosSearch fontSize={'16px'}/>
                        <span>Explore Bloggios</span>
                        <SearchButton><RxSlash/></SearchButton>
                    </SearchBarInput>

                    <div style={{
                        width: '100%',
                        border: '1px dashed rgba(255, 255, 255, 0.2)',
                        margin: '20px 0'
                    }}/>

                    <Suspense fallback={<FallbackLoader height={'250px'} width={'100%'} />}>
                        <MemoizedSidebarTiles />
                    </Suspense>
                </div>

                <IconLabelButton
                    text={'Logout'}
                    icon={<IoMdLogOut fontSize={'20px'} />}
                    bgColor={'#1c1b1b'}
                    fontSize={'14px'}
                    color={'rgba(255, 255, 255, 0.8)'}
                    hColor={'rgba(255, 255, 255, 1)'}
                    hBgColor={'#4258ff'}
                    padding={'10px 16px'}
                    onClick={handleLogout}
                />
            </Wrapper>

            <WebSearchBar
                isOpen={isSearchBarOpen}
                onClose={() => setIsSearchBarOpen(false)}
            />
        </>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 280px;
    background-color: #0c0c0c;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding: 20px 10px;
    overflow-y: auto;
    gap: 10px;
    justify-content: space-between;
`;

const SearchBarInput = styled.div`
    padding: 7px 10px;
    width: 100%;
    outline: none;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    font-weight: 200;
    background-color: #272727;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin-top: 20px;
    border: 1px solid transparent;
    box-shadow: inset 0 0 2px transparent;

    &:focus {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
    }

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
    }
`;

const SearchButton = styled.div`
    height: 22px;
    aspect-ratio: 1/1;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
`;

const MemoizedSidebar = React.memo(Sidebar);

export default MemoizedSidebar;