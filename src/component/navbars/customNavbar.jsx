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

import React, {useEffect} from 'react';
import styled from "styled-components";
import PopoverAvatar from "../tooltips/popoverAvatar";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import MemoizedNavbarItems from "./NavbarItems";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useNavigate} from "react-router-dom";
import {navbarProfileLoggedInList, navbarProfileNotLoggedInList} from "../../constant/listConstants";
import IconLabelDropdown from "../../dropdowns/IconLabelDropdown";
import {HOME_PAGE} from "../../constant/pathConstants";
import MemoizedNavbarItemsMobile from "./navbarItemsMobile";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../restservices/profileApi";
import {setProfile} from "../../state/profileSlice";

const CustomNavbar = () => {

    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state)=> state.auth);
    const {isAdded, name} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const { data } = response;
                const profileData = {
                    name: data.name,
                    isAdded: true,
                    profileImageUrl: null,
                    bio: data.bio,
                    email: data.email
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

    return (
        <>
            <NavbarWrapper>
                <LogoSearchBarWrapper>
                    <PopoverAvatar onClick={()=> navigate(HOME_PAGE)}
                                   source={bloggios_logo}
                                   tooltip="Home"
                                   bgColor="#f5f5f5"
                                   size="48px"
                                   cursor={'pointer'}
                                   isTooltipAllowed={true}/>
                    <SearchBarInput type={'text'} placeholder={'# Explore Bloggios'} maxLength={20}/>
                </LogoSearchBarWrapper>
                {width > 700 && <MemoizedNavbarItems/>}

                <IconLabelDropdown
                    maxWidth={'170px'}
                    height={'60%'}
                    source={bloggios_logo}
                    text={name ? name : 'Bloggios'}
                    itemsList={isAuthenticated ? navbarProfileLoggedInList : navbarProfileNotLoggedInList}
                />
            </NavbarWrapper>
            {width <= 700 && <MemoizedNavbarItemsMobile />}
        </>
    );
};

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  height: 72px;
  padding: 0 2vw;
`;

const LogoSearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4vw;
  height: 100%;
`;

const SearchBarInput = styled.input`
  padding: 7px 10px;
  width: 220px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 14px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  background-color: #272727;
  color: rgba(255, 255, 255, 0.6);
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 2px;
  }
  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 870px) {
    display: none;
  }
`;

const MemoizedCustomNavbar = React.memo(CustomNavbar);

export default MemoizedCustomNavbar;