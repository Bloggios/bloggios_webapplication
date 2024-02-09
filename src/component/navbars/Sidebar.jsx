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
import bloggios_logo from '../../asset/svg/bg-accent_rounded.svg'
import {useDispatch, useSelector} from "react-redux";
import Divider from "../divider/divider";
import {IoIosSearch, IoIosSettings} from "react-icons/io";
import WebSearchBar from "../modal/WebSearchBar";
import {RxSlash} from "react-icons/rx";
import {FaHistory, FaUserAlt} from "react-icons/fa";
import {setSnackbar} from "../../state/snackbarSlice";
import {useNavigate} from "react-router-dom";
import {getFollow, getProfile} from "../../restservices/profileApi";
import {setProfile} from "../../state/profileSlice";
import {MdOutlineSecurity} from "react-icons/md";

const Sidebar = () => {

    const PROFILE_PATH = '/profile/';
    const ACTIVITY_PATH = '/activity/';
    const SECURITY_PATH = '/security';
    const SETTING_PATH = '/setting';

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const {isAdded, name, bio, email, profileImage, coverImage, followers, following} = useSelector((state) => state.profile);
    const {userId} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const followResponse = await getFollow();
                const { data } = response;
                const followData = followResponse.data;
                const profileData = {
                    userId: data.userId,
                    name: data.name,
                    isAdded: true,
                    profileImageUrl: null,
                    bio: data.bio,
                    email: data.email,
                    profileImage: data.profileImage,
                    coverImage: data.coverImage,
                    followers: followData.followers,
                    following: followData.following
                };
                dispatch(setProfile(profileData));
            } catch (error) {
                setTimeout(fetchProfile, 2000);
            }
        };

        if (isAdded) {
            fetchProfile();
        }
    }, [isAdded]);

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

    const handlePageNavigation = (page, route) => {
        if (window.location.pathname.startsWith(page) || window.location.pathname === page) {
            const snackbarData = {
                isSnackbar: true,
                message: 'You are currently on selected page',
                snackbarType: 'Warning'
            };
            dispatch(setSnackbar(snackbarData))
        } else {
            navigate(route);
        }
    }

    return (
        <>
            <Wrapper>
                <ProfileContainer>
                    <img
                        src={profileImage ? profileImage : bloggios_logo}
                        alt={name}
                        height={'44px'}
                        style={{
                            borderRadius: '50%',
                            height: '44px',
                            width: '44px',
                            aspectRatio: '1/1'
                        }}
                    />
                    <ColumnWrapper>
                        <NameSpan>{name}</NameSpan>
                        <EmailSpan>{email}</EmailSpan>
                    </ColumnWrapper>
                </ProfileContainer>

                <SearchBarInput onClick={()=> setIsSearchBarOpen(!isSearchBarOpen)} >
                    <IoIosSearch fontSize={'16px'} />
                    <span>Explore Bloggios</span>
                    <SearchButton><RxSlash /></SearchButton>
                </SearchBarInput>

                <Divider verticalSpacing={'40px'}/>

                <Tiles>
                    {/*{*/}
                    {/*    icon: <BiHomeAlt2/>,*/}
                    {/*    path: HOME_PAGE,*/}
                    {/*    tooltip: 'Home'*/}
                    {/*},*/}
                    {/*{*/}
                    {/*    icon: <CgProfile />,*/}
                    {/*    path: ,*/}
                    {/*    tooltip: 'Chats'*/}
                    {/*},*/}
                    {/*{*/}
                    {/*    icon: <IoNotificationsOutline/>,*/}
                    {/*    path: NOTIFICATIONS_PAGE,*/}
                    {/*    tooltip: 'Notifications'*/}
                    {/*},*/}
                    {/*{*/}
                    {/*    icon: <VscSettingsGear/>,*/}
                    {/*    path: SERVICES_PAGE,*/}
                    {/*    tooltip: 'Services'*/}
                    {/*},*/}

                    <Tile
                        active={window.location.pathname.startsWith(PROFILE_PATH)}
                        onClick={()=> handlePageNavigation(PROFILE_PATH, '/profile/' + userId)}
                    >
                        <TileSpan>Profile</TileSpan>
                        <FaUserAlt />
                    </Tile>

                    <Tile
                        active={window.location.pathname.startsWith(ACTIVITY_PATH)}
                        onClick={()=> handlePageNavigation(ACTIVITY_PATH, '/activity/' + userId)}
                    >
                        <TileSpan>Activity</TileSpan>
                        <FaHistory />
                    </Tile>

                    <Tile
                        active={window.location.pathname.startsWith(SECURITY_PATH)}
                        onClick={()=> handlePageNavigation(SECURITY_PATH, '/security')}
                    >
                        <TileSpan>Security</TileSpan>
                        <MdOutlineSecurity />
                    </Tile>

                    <Tile
                        active={window.location.pathname.startsWith(SETTING_PATH)}
                        onClick={()=> handlePageNavigation(SETTING_PATH, '/setting')}
                    >
                        <TileSpan>Setting</TileSpan>
                        <IoIosSettings />
                    </Tile>
                </Tiles>
            </Wrapper>

            <WebSearchBar
                isOpen={isSearchBarOpen}
                onClose={()=> setIsSearchBarOpen(false)}
            />
        </>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 16vw;
    background-color: #0c0c0c;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding: 20px 10px;
    overflow-y: auto;
    gap: 10px;
`;

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #1c1b1b;
    padding: 7px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
    gap: 10px;
    align-items: center;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
`;

const NameSpan = styled.span`
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 150ms ease;
`;

const EmailSpan = styled.span`
    font-size: 12px;
    font-weight: 200;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 150ms ease;
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

const Tiles = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    max-height: 70vh;
`;

const Tile = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => (props.active ? 'rgba(66,88,255,0.8)' : '#1c1b1b')};
    padding: 16px;
    color: ${(props) => (props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)')};
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 16px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 250ms ease;
    
    &:hover {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 1);
    }
`;

const TileSpan = styled.span`
    width: 70%;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const MemoizedSidebar = React.memo(Sidebar);

export default MemoizedSidebar;