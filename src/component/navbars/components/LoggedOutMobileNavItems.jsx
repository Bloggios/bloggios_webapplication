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
import {useNavigate} from "react-router-dom";
import {
    LANDING_PAGE,
    LOGIN_PAGE,
    REPORT_BUG_PAGE,
    SERVICES_PAGE,
    SIGNUP_PAGE,
    SUPPORT_PAGE
} from "../../../constant/pathConstants";
import {GoHome, GoPlusCircle} from "react-icons/go";
import bloggios_logo from "../../../asset/svg/bg_logo_rounded_black.svg";
import styled from "styled-components";
import {GrServices} from "react-icons/gr";
import {FaCode} from "react-icons/fa";
import {MdLogin, MdOutlineContactSupport} from "react-icons/md";
import {LuUserPlus} from "react-icons/lu";
import {AiOutlineBug} from "react-icons/ai";

const LoggedOutMobileNavItems = () => {

    const [isShown, setIsShown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

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

    return (
        <Wrapper>
            <BottomBar>
                <NavItem
                    onClick={() => navigate(LANDING_PAGE)}
                    active={window.location.pathname === '/'}
                >
                    <GoHome />
                </NavItem>

                <NavItem
                    onClick={() => navigate(SERVICES_PAGE)}
                    active={window.location.pathname === SERVICES_PAGE}
                >
                    <GrServices />
                </NavItem>

                <NavItem
                    onClick={() => window.open('https://tech.bloggios.com', 'blank')}
                >
                    <FaCode />
                </NavItem>

                <NavItem
                    onClick={() => navigate('/create')}
                    active={window.location.pathname === '/create'}
                >
                    <GoPlusCircle />
                </NavItem>

                <NavItem
                    ref={dropdownRef}
                    onClick={()=> setIsShown(!isShown)}
                >
                    <ProfileImage
                        src={bloggios_logo}
                        alt={'Bloggios'}
                    />
                </NavItem>

                <DropdownItems style={{
                    visibility: isShown ? 'visible' : 'hidden',
                    opacity: isShown ? 1 : 0,
                    transform: isShown ? 'translateY(5%)' : 'translateY(100%)'
                }}>
                    <DropdownItem
                        onClick={()=> navigate(LOGIN_PAGE)}
                        active={window.location.pathname === LOGIN_PAGE}
                    >
                        <MdLogin fontSize={'16px'}/>
                        Login
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(SIGNUP_PAGE)}
                        active={window.location.pathname === SIGNUP_PAGE}
                    >
                        <LuUserPlus fontSize={'16px'}/>
                        Sign Up
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(REPORT_BUG_PAGE)}
                        active={window.location.pathname === REPORT_BUG_PAGE}
                    >
                        <AiOutlineBug fontSize={'16px'}/>
                        Report Bug
                    </DropdownItem>

                    <DropdownItem
                        onClick={()=> navigate(SUPPORT_PAGE)}
                        active={window.location.pathname === SUPPORT_PAGE}
                    >
                        <MdOutlineContactSupport fontSize={'16px'}/>
                        Help
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
    
    @media (max-width: 300px) {
        font-size: 10px;
    }
`;


const MemoizedLoggedOutMobileNavItems = React.memo(LoggedOutMobileNavItems);

export default MemoizedLoggedOutMobileNavItems;