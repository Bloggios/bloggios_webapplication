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

import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import PopoverAvatar from "../tooltips/popoverAvatar";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import MemoizedNavbarItems from "./NavbarItems";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useNavigate} from "react-router-dom";
import {navbarProfileNotLoggedInList} from "../../constant/listConstants";
import IconLabelDropdown from "../dropdowns/IconLabelDropdown";
import {HOME_PAGE, REPORT_BUG_PAGE, SUPPORT_PAGE} from "../../constant/pathConstants";
import MemoizedNavbarItemsMobile from "./navbarItemsMobile";
import {useDispatch, useSelector} from "react-redux";
import {getFollow} from "../../restservices/profileApi";
import {setProfile} from "../../state/profileSlice";
import {IoIosSearch, IoMdLogOut} from "react-icons/io";
import {clearIsCreated} from "../../state/isCreatedSlice";
import {RxSlash} from "react-icons/rx";
import FallbackLoader from "../loaders/fallbackLoader";
import {FaRegUser} from "react-icons/fa";
import {BiHelpCircle} from "react-icons/bi";
import {AiOutlineBug} from "react-icons/ai";

const MemoizedWebSearchBar = lazy(()=> import('../modal/WebSearchBar'));

const CustomNavbar = () => {

    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    const {isAuthenticated, userId} = useSelector((state)=> state.auth);
    const {isAdded, name, bio, email, profileImage, coverImage, followers, following} = useSelector((state) => state.profile);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const {isFollowed} = useSelector((state)=> state.isCreated);
    const dispatch = useDispatch();

    const navbarProfileLoggedInList = [
        {
            id: 1,
            icon: <FaRegUser fontSize={'18px'}/>,
            label: 'Profile',
            path: isAuthenticated && `/profile/${userId}`
        },
        {
            id: 2,
            icon: <BiHelpCircle fontSize={'18px'}/>,
            label: 'Help',
            path: SUPPORT_PAGE
        },
        {
            id: 3,
            icon: <AiOutlineBug fontSize={'18px'}/>,
            label: 'Report Bug',
            path: REPORT_BUG_PAGE
        },
        {
            id: 4,
            icon: <IoMdLogOut fontSize={'18px'}/>,
            label: 'Logout',
            path: HOME_PAGE
        },
    ]

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

    useEffect(() => {
        if (isFollowed) {
            getFollow()
                .then((response)=> {
                    const profileData = {
                        name: name,
                        isAdded: true,
                        profileImageUrl: null,
                        bio: bio,
                        email: email,
                        profileImage: profileImage,
                        coverImage: coverImage,
                        followers: response.data?.followers,
                        following: response.data?.following
                    };
                    dispatch(setProfile(profileData));
                    dispatch(clearIsCreated());
                })
        }
    }, [isFollowed]);

    const getTopLeftSection = useCallback(()=> {
        if (width > 700) {
            return (
                <IconLabelDropdown
                    maxWidth={'170px'}
                    height={'60%'}
                    source={profileImage ? profileImage : bloggios_logo}
                    text={name ? name : 'Bloggios'}
                    itemsList={isAuthenticated ? navbarProfileLoggedInList : navbarProfileNotLoggedInList}
                />
            )
        } else if (width <=700 && isAuthenticated) {
            return (
                <SearchIconWrapper onClick={()=> setIsSearchBarOpen(!isSearchBarOpen)}>
                    <IoIosSearch />
                </SearchIconWrapper>
            )
        } else {
            return (
                <></>
            )
        }
    }, [width, isAuthenticated, profileImage, name])

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
                    {isAuthenticated && (
                        <SearchBarInput onClick={()=> setIsSearchBarOpen(!isSearchBarOpen)} >
                            <IoIosSearch />
                            <span>Explore Bloggios</span>
                            <SearchButton><RxSlash /></SearchButton>
                        </SearchBarInput>
                    )}
                </LogoSearchBarWrapper>
                {width > 700 && <MemoizedNavbarItems/>}

                {getTopLeftSection()}
            </NavbarWrapper>
            {width <= 700 && <MemoizedNavbarItemsMobile />}

            <Suspense fallback={<FallbackLoader height={'400px'} width={'100%'} />}>
                {isAuthenticated && (
                    <MemoizedWebSearchBar
                        isOpen={isSearchBarOpen}
                        onClose={() => setIsSearchBarOpen(false)}
                    />
                )}
            </Suspense>
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

const SearchBarInput = styled.div`
    padding: 7px 10px;
    width: 240px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 14px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    font-weight: 200;
    background-color: #272727;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:focus {
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
    }

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 870px) {
        display: none;
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

const SearchIconWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border-radius: 10px;
    background-color: #4258ff;
    border: none;
    outline: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 22px;
    touch-action: manipulation;
    
    &:active {
        color: rgba(255, 255, 255, 1);
    }
    
    @media (max-width: 380px) {
        height: 30px;
        width: 30px;
        font-size: 18px;
    }
`;

const MemoizedCustomNavbar = React.memo(CustomNavbar);

export default MemoizedCustomNavbar;