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
import styled from "styled-components";
import {GoHome} from "react-icons/go";
import {useDispatch, useSelector} from "react-redux";
import bloggios_logo from '../../../asset/svg/bg_logo_rounded_black.svg'
import {
    CHATS_PAGE,
    HOME_PAGE,
    POST_PAGE, QUESTION_PAGE,
    REPORT_BUG_PAGE, SERVICES_PAGE,
    SETTING_PAGE,
    SUPPORT_PAGE
} from "../../../constant/pathConstants";
import {useNavigate} from "react-router-dom";
import {BsChatDots, BsPatchQuestionFill} from "react-icons/bs";
import {FaCode, FaHistory, FaUserAlt} from "react-icons/fa";
import {IoIosSettings, IoMdLogOut} from "react-icons/io";
import {ACTIVITY_PATH_MATCHER, PROFILE_PATH_MATCHER} from "../../../constant/ServiceConstants";
import {initLogout} from "../../../service/functions";
import {BiHelpCircle} from "react-icons/bi";
import {AiOutlineBug} from "react-icons/ai";
import {HiPaperAirplane} from "react-icons/hi2";
import {QUESTION_LIST} from "../../../constant/apiConstants";

const LoggedInMobileNavItems = () => {

    const {name, profileImage} = useSelector((state)=> state.profile);
    const {userId} = useSelector((state)=> state.auth);
    const [isShown, setIsShown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsShown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        initLogout(navigate, dispatch)
    }

    return (
        <Wrapper>
            <BottomBar>
                <NavItem
                    onClick={() => navigate(HOME_PAGE)}
                    active={window.location.pathname === '/home'}
                >
                    <GoHome />
                </NavItem>

                <NavItem
                    onClick={() => navigate(CHATS_PAGE)}
                    active={window.location.pathname === CHATS_PAGE}
                >
                    <BsChatDots />
                </NavItem>

                <NavItem
                    onClick={() => navigate(POST_PAGE)}
                    active={window.location.pathname === POST_PAGE}
                >
                    <HiPaperAirplane />
                </NavItem>

                <NavItem
                    onClick={() => navigate(QUESTION_PAGE)}
                    active={window.location.pathname === QUESTION_PAGE}
                >
                    <BsPatchQuestionFill />
                </NavItem>

                <NavItem
                    ref={dropdownRef}
                    onClick={()=> setIsShown(!isShown)}
                >
                    <ProfileImage
                        src={profileImage ? profileImage : bloggios_logo}
                        alt={name}
                    />
                </NavItem>

                <DropdownItems style={{
                    visibility: isShown ? 'visible' : 'hidden',
                    opacity: isShown ? 1 : 0,
                    transform: isShown ? 'translateY(5%)' : 'translateY(100%)'
                }}>
                    <DropdownItem
                        onClick={()=> navigate('/profile/' + userId)}
                        active={window.location.pathname.includes(PROFILE_PATH_MATCHER)}
                    >
                        <FaUserAlt fontSize={'16px'}/>
                        Profile
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(SERVICES_PAGE)}
                        active={window.location.pathname.includes(SERVICES_PAGE)}
                    >
                        <FaCode fontSize={'16px'}/>
                        Services
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(SUPPORT_PAGE)}
                        active={window.location.pathname === SUPPORT_PAGE}
                    >
                        <BiHelpCircle fontSize={'16px'}/>
                        Help
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(REPORT_BUG_PAGE)}
                        active={window.location.pathname === REPORT_BUG_PAGE}
                    >
                        <AiOutlineBug fontSize={'16px'}/>
                        Report Bug
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(SETTING_PAGE)}
                        active={window.location.pathname === SETTING_PAGE}
                    >
                        <IoIosSettings fontSize={'16px'}/>
                        Setting
                    </DropdownItem>

                    <DropdownItem
                        onClick={handleLogout}
                    >
                        <IoMdLogOut fontSize={'16px'}/>
                        Logout
                    </DropdownItem>
                </DropdownItems>
            </BottomBar>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    height: auto;
    width: 100%;
    background-color: transparent;
    padding: 10px;
    z-index: 18;
    min-width: 250px;
    
    @media (min-width: 701px) {
        display: none;
    }
`;

const BottomBar = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    background-color: #0c0c0c;
    border-radius: 10px;
    position: relative;
`;

const NavItem = styled.button`
    height: 34px;
    width: 34px;
    aspect-ratio: 1/1;
    cursor: pointer;
    background-color: ${(props) => (props.active ? '#4258ff' : 'transparent')};
    color: ${(props) => (props.active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    border-radius: 50px;
    border: none;
    outline: none;
    touch-action: manipulation !important;
    -ms-touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent !important;

    &:active {
        background-color: rgba(66, 88, 255, 0.79);
        color: rgba(255, 255, 255, 1);
    }
`;

const ProfileImage = styled.img`
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: #0c0c0c;
`;

const DropdownItems = styled.div`
    width: 100%;
    background-color: inherit;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two equal columns */
    gap: 5px;
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    bottom: 120%;
    right: 0;
    transition: all 250ms ease;
`;

const DropdownItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    overflow: hidden;
    padding: 10px;
    border-radius: 10px;
    gap: 5px;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    border: none;
    outline: none;
    background-color: ${(props) => (props.active ? '#4258ff' : 'rgba(255, 255, 255, 0.06)')};
    color: ${(props) => (props.active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)')};
    cursor: pointer;
    touch-action: manipulation !important;
    -ms-touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent !important;

    &:active {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(66, 88, 255, 0.8);
    }
`;

const MemoizedLoggedInMobileNavItems = React.memo(LoggedInMobileNavItems);

export default MemoizedLoggedInMobileNavItems;