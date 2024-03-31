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
import {useNavigate} from "react-router-dom";
import bloggios_logo from '../../asset/svg/bg-accent_rounded.svg'
import SimpleLoader from "../loaders/simpleLoader";
import {initLogout} from "../../service/functions";
import {IoIosSearch, IoMdLogOut} from "react-icons/io";
import FallbackLoader from "../loaders/fallbackLoader";

const MemoizedCompressedSidebarTile = lazy(()=> import('./components/CompressedSidebarTile'));
const MemoizedWebSearchBar = lazy(()=> import('../modal/WebSearchBar'));

const SidebarCompressed = () => {

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
                <SideBarRoundedWrapper>
                    <SidebarPrimarySection>
                        <UserAvatar src={profileImage ? profileImage : bloggios_logo} alt={name} />
                        <SearchBarIcon onClick={()=> setIsSearchBarOpen(!isSearchBarOpen)}>
                            <IoIosSearch/>
                        </SearchBarIcon>
                        <Suspense fallback={<SimpleLoader size={'4px'} />}>
                            <MemoizedCompressedSidebarTile />
                        </Suspense>
                    </SidebarPrimarySection>

                    <TileWrapper>
                        <TileIconButton
                            onClick={handleLogout}
                        >
                            <IoMdLogOut />
                        </TileIconButton>
                        <TooltipContent>
                            Logout
                        </TooltipContent>
                    </TileWrapper>
                </SideBarRoundedWrapper>
            </Wrapper>

            <Suspense fallback={<FallbackLoader height={'400px'} width={'100%'} />}>
                <MemoizedWebSearchBar
                    isOpen={isSearchBarOpen}
                    onClose={() => setIsSearchBarOpen(false)}
                />
            </Suspense>
        </>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: auto;
    background-color: transparent;
    padding: 20px 10px;
    position: fixed;
    z-index: 4;
`;

const SideBarRoundedWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: #0c0c0c;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    overflow-y: auto;
    gap: 10px;
    justify-content: space-between;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const UserAvatar = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

const SearchBarIcon = styled.button`
    outline: none;
    background-color: #272727;
    height: 40px;
    width: 40px;
    border-radius: 10px;
    border: 1px solid transparent;
    box-shadow: inset 0 0 2px transparent;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 150ms ease-in-out;

    &:focus {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
    }

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const SidebarPrimarySection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 34px;
    flex-direction: column;
`;

const TooltipContent = styled.span`
    background-color: #4258ff;
    color: #f5f5f5;
    text-align: center;
    border-radius: 6px;
    padding: 6px 12px;
    position: absolute;
    left: 80px;
    opacity: 0;
    visibility: hidden;

    &::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 0%;
        margin-left: -10px;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent #4258ff transparent transparent;
    }
`;

const TileWrapper = styled.div`
    display: flex;
    align-items: center;
    height: auto;
    width: auto;

    &:hover {
        ${TooltipContent} {
            visibility: visible !important;
            opacity: 1 !important;
        }
    }
`;

const TileIconButton = styled.button`
    height: 40px;
    width: 40px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e5e5e5;
    cursor: pointer;
    font-size: 20px;
    color: rgb(215,59,59);
    transition: all 250ms ease;

    &:hover {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 1);
    }
`;

const MemoizedSidebarCompressed = React.memo(SidebarCompressed);

export default MemoizedSidebarCompressed;