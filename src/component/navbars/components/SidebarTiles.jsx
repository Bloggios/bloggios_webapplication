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

import React, {useCallback, useEffect} from 'react';
import {CHATS_PAGE, HOME_PAGE, POST_PAGE, QUESTION_PAGE, SETTING_PAGE} from "../../../constant/pathConstants";
import {FaUserAlt} from "react-icons/fa";
import {IoIosSettings} from "react-icons/io";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {BsPatchQuestionFill} from "react-icons/bs";
import {RiChatSmile2Fill} from "react-icons/ri";
import {GoHomeFill} from "react-icons/go";
import {HiPaperAirplane} from "react-icons/hi2";
import {colors} from "../../../styles/Theme";
import Divider from "../../divider/divider";

const SidebarTiles = () => {

    const {userId, authorities} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const {height} = useWindowDimensions();
    const profilePath = `/profile/${userId}`;

    return (
        <Tiles style={{
            paddingBottom: height < 700 ? '16px' : 0,
            borderBottom: height < 700 ? '1px dashed rgba(255,255,255,0.2)' : '1px solid transparent'
        }}>

            <Tile
                active={window.location.pathname === HOME_PAGE}
                onClick={() => navigate(HOME_PAGE)}
            >
                <GoHomeFill />
                <TileSpan>Home</TileSpan>
            </Tile>

            <Tile
                active={window.location.pathname === profilePath}
                onClick={() => navigate(profilePath)}
            >
                <FaUserAlt/>
                <TileSpan>Profile</TileSpan>
            </Tile>

            <Tile
                active={window.location.pathname.includes(CHATS_PAGE)}
                onClick={() => navigate(CHATS_PAGE)}
            >
                <RiChatSmile2Fill />
                <TileSpan>Chats</TileSpan>
            </Tile>

            <Tile
                active={window.location.pathname.includes(QUESTION_PAGE)}
                onClick={() => navigate(QUESTION_PAGE)}
            >
                <BsPatchQuestionFill />
                <TileSpan>Q&A</TileSpan>
            </Tile>

            <Tile
                active={window.location.pathname.includes(POST_PAGE)}
                onClick={() => navigate(POST_PAGE)}
            >
                <HiPaperAirplane />
                <TileSpan>Posts</TileSpan>
            </Tile>

            <Divider width={'90%'} color={colors.white20} verticalSpacing={'10px'}/>

            <Tile
                active={window.location.pathname === SETTING_PAGE}
                onClick={() => navigate(SETTING_PAGE)}
            >
                <IoIosSettings/>
                <TileSpan>Setting</TileSpan>
            </Tile>
        </Tiles>
    );
};

const Tiles = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
`;

const Tile = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: ${(props) => (props.active ? 'rgba(66,88,255,0.8)' : 'transparent')};
    padding: 12px 16px;
    color: ${(props) => (props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)')};
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 18px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 250ms ease;
    
    &:hover {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 1);
    }
`;

const TileSpan = styled.span`
    flex: 1;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
`;

const MemoizedSidebarTiles = React.memo(SidebarTiles);

export default MemoizedSidebarTiles;