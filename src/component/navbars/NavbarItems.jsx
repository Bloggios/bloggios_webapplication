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

import React, {useCallback} from 'react';
import TooltipWrapper from "../tooltips/tooltipWrapper";
import {loggedInNavItems, loggedOutNavItems} from "../../constant/listConstants";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {FaCode} from "react-icons/fa";
import {notification, notificationActive} from '../../asset/svg';

const NavbarItems = () => {

    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state)=> state.auth);
    const { snackbarType, message, isSnackbar, path } = useSelector((state) => state.snackbar);

    const getNavBarItems = useCallback(()=> {
        return (
            isAuthenticated ? (
                <>
                {loggedInNavItems.map((item) => (
                    <NavItem
                        key={item.page} tooltip={item.tooltip}
                        onClick={() => navigate(item.page)}
                        active={window.location.pathname === item.page}
                    >
                        {item.icon}
                    </NavItem>
                    ))}
                    <NavItem>
                        {isSnackbar && snackbarType === 'notification' ?
                            <Icon src={notificationActive} alt="notification" /> :
                            <Icon src={notification} alt="notification" />
                        }
                    </NavItem>
                </>
            ) : (
                <>
                    {
                        loggedOutNavItems.map((item) => (
                            <TooltipWrapper key={item.page} tooltip={item.tooltip}>
                                <NavItem
                                    onClick={() => navigate(item.page)}
                                    active={window.location.pathname === item.page}
                                >
                                    {item.icon}
                                </NavItem>
                            </TooltipWrapper>
                        ))
                    }
                    <TooltipWrapper tooltip={'Bloggios Tech'}>
                        <NavItem
                            onClick={() => window.open('https://tech.bloggios.com', 'blank')}
                        >
                            <FaCode />
                        </NavItem>
                    </TooltipWrapper>
                </>
            )
        )
    }, [isAuthenticated, navigate, isSnackbar, snackbarType])

    return (
        <ItemsWrapper>
            {getNavBarItems()}
        </ItemsWrapper>
    );
};

const ItemsWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5vw;
`;

const NavItem = styled.div`
  font-size: 25px;
  position: relative;
  cursor: pointer;
  color: ${(props) => (props.active ? '#7688ff' : '#e5e5e5')};

  &::before {
    content: '';
    height: 10px;
    width: 10px;
    border-radius: 50%;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    background-color: ${(props) => (props.active ? '#7688ff' : '#e5e5e5')};
    box-shadow: ${(props) => props.active ? '1px 0 20px 4px rgba(66, 88, 255, 0.43)' : 'none'};
    visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: all 250ms ease;
  }
`;

const Icon = styled.img`
    width: 28px;
    aspect-ratio: 1/1;
    cursor: pointer;
    position: relative;
`;

const MemoizedNavbarItems = React.memo(NavbarItems);

export default MemoizedNavbarItems;