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

import React from 'react';
import {
    CHATS_PAGE,
    HOME_PAGE,
    POST_PAGE,
    QUESTION_PAGE,
    SECURITY_PAGE,
    SETTING_PAGE
} from "../../../constant/pathConstants";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {BiHomeAlt2} from "react-icons/bi";
import {FaHistory, FaUserAlt} from "react-icons/fa";
import {MdOutlineSecurity} from "react-icons/md";
import {IoIosSettings} from "react-icons/io";
import {useSelector} from "react-redux";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {BsChatDots, BsPatchQuestionFill, BsQuestionCircle} from "react-icons/bs";
import {GoHomeFill} from "react-icons/go";
import {RiChatSmile2Fill} from "react-icons/ri";
import {HiPaperAirplane} from "react-icons/hi2";

const CompressedSidebarTile = () => {

    const PROFILE_PATH = '/profile/';
    const ACTIVITY_PATH = '/activity/';
    const SECURITY_PATH = '/security';
    const SETTING_PATH = '/setting';

    const {userId} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const {height} = useWindowDimensions();

    return (
        <TilesWrapper style={{
            paddingBottom: height < 700 ? '16px' : 0,
            borderBottom: height < 700 ? '1px dashed rgba(255,255,255,0.2)' : '1px solid transparent'
        }}>
            <TileWrapper>
                <TileIconButton
                    active={window.location.pathname === HOME_PAGE}
                    onClick={() => navigate(HOME_PAGE)}
                >
                    <GoHomeFill />
                </TileIconButton>
                <TooltipContent>
                    Home
                </TooltipContent>
            </TileWrapper>

            <TileWrapper>
                <TileIconButton
                    active={window.location.pathname.includes(PROFILE_PATH)}
                    onClick={() => navigate('/profile/' + userId)}
                >
                    <FaUserAlt/>
                </TileIconButton>
                <TooltipContent

                >
                    Profile
                </TooltipContent>
            </TileWrapper>

            <TileWrapper>
                <TileIconButton
                    active={window.location.pathname.includes(CHATS_PAGE)}
                    onClick={() => navigate(CHATS_PAGE)}
                >
                    <RiChatSmile2Fill />
                </TileIconButton>
                <TooltipContent

                >
                    Chats
                </TooltipContent>
            </TileWrapper>

            <TileWrapper>
                <TileIconButton
                    active={window.location.pathname.includes(QUESTION_PAGE)}
                    onClick={()=> navigate(QUESTION_PAGE)}
                >
                    <BsPatchQuestionFill />
                </TileIconButton>
                <TooltipContent>
                    Q&A
                </TooltipContent>
            </TileWrapper>

            <TileWrapper>
                <TileIconButton
                    active={window.location.pathname.includes(POST_PAGE)}
                    onClick={() => navigate(POST_PAGE)}
                >
                    <HiPaperAirplane />
                </TileIconButton>
                <TooltipContent>
                    Posts
                </TooltipContent>
            </TileWrapper>

            <div style={{
                width: '100%',
                border: '1px dashed rgba(255, 255, 255, 0.2)'
            }}/>

            <TileWrapper>
                <TileIconButton
                    active={window.location.pathname === SETTING_PATH}
                    onClick={() => navigate(SETTING_PAGE)}
                >
                    <IoIosSettings/>
                </TileIconButton>
                <TooltipContent>
                    Setting
                </TooltipContent>
            </TileWrapper>
        </TilesWrapper>
    );
};

const TooltipContent = styled.span`
    background-color: #4258ff;
    color: #f5f5f5;
    text-align: center;
    border-radius: 6px;
    padding: 6px 12px;
    position: absolute;
    z-index: 1;
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
    background-color: ${(props) => (props.active ? 'rgba(66,88,255,0.8)' : 'transparent')};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e5e5e5;
    cursor: pointer;
    font-size: 18px;
    transition: all 250ms ease;

    &:hover {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 1);
    }
`;

const TilesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const MemoizedCompressedSidebarTile = React.memo(CompressedSidebarTile);

export default MemoizedCompressedSidebarTile;