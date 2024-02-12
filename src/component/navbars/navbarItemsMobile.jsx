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
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styled from "styled-components";
import {loggedInNavItems, loggedOutNavItems} from "../../constant/listConstants";
import {useSelector} from "react-redux";

const NavbarItemsMobile = () => {

    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const {isAuthenticated} = useSelector((state)=> state.auth);

    const getNavbarItems = useCallback(()=> {
        return (
            isAuthenticated ? (
                loggedInNavItems.map((item)=> (
                    <NavItems
                        key={item.page}
                        onClick={() => navigate(item.page)}
                        active={window.location.pathname === item.page}
                    >
                        {item.icon}
                    </NavItems>
                ))
            ) : (
                loggedOutNavItems.map((item)=> (
                    <NavItems
                        key={item.page}
                        onClick={() => navigate(item.page)}
                        active={window.location.pathname === item.page}
                    >
                        {item.icon}
                    </NavItems>
                ))
            )
        )
    }, [isAuthenticated, navigate])

    return (
        <Wrapper style={{width: width}}>
            <ItemsWrapper>
                {getNavbarItems()}
            </ItemsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 60px;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  z-index: 18;
`;

const ItemsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
`;

const NavItems = styled.div`
  font-size: 25px;
  color: ${(props) => (props.active ? '#7688ff' : '#e5e5e5')};
  position: relative;
  &::before {
    content: '';
    height: 2px;
    width: 200%;
    top: -14px;
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

const MemoizedNavbarItemsMobile = React.memo(NavbarItemsMobile);

export default MemoizedNavbarItemsMobile;