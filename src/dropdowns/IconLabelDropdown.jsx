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
import PopoverAvatar from "../component/tooltips/popoverAvatar";
import {BsChevronDown} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../restservices/authApi";
import {setSnackbar} from "../state/snackbarSlice";
import {useDispatch} from "react-redux";
import {HOME_PAGE} from "../constant/pathConstants";

const IconLabelDropdown = ({
                               height,
                               width,
                               maxWidth,
                               maxHeight,
                               backgroundColor,
                               color,
                               borderRadius,
                               source,
                               text,
                               fontSize,
    itemsList
                           }) => {

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

    const handleNavigation = (item) => {
        if (item.label === 'Logout') {
            logoutUser()
                .then((response)=> {
                    navigate(HOME_PAGE, {
                        replace: true
                    });
                    window.location.reload();
                }).catch((error)=> {
                const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
                const snackBarData = {
                    isSnackbar: true,
                    message: message,
                    snackbarType: 'Error'
                }
                dispatch(setSnackbar(snackBarData))
            })
        } else {
            navigate(item.path);
        }
    }

    return (
        <DropdownWrapper
            ref={dropdownRef}
            onClick={()=> setIsShown(!isShown)}
            style={{
                height: height,
                width: width,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius,
                border: isShown ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent'
            }}
        >
            <PopoverAvatar source={source} size="34px"/>
            <DropdownText style={{
                fontSize: fontSize
            }}>{text}</DropdownText>
            <BsChevronDown fontSize={'18px'} />

            <DropdownItems style={{
                visibility: isShown ? 'visible' : 'hidden',
                opacity: isShown ? 1 : 0,
                transform: isShown ? 'translateY(5%)' : 'translateY(100%)'
            }}>
                {itemsList.map((item) => (
                    <DropdownItem onClick={()=> handleNavigation(item)} key={item.id}>
                        <span>{item.label}</span>
                        {item.icon}
                    </DropdownItem>
                ))}
            </DropdownItems>
        </DropdownWrapper>
    );
};

const DropdownWrapper = styled.button`
  outline: none;
  border: 1px solid transparent;
  transition: all 150ms ease;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 0 7px;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  letter-spacing: 1px;
  z-index: 5;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  &:active {
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

const DropdownText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 150ms ease;
`;

const DropdownItems = styled.div`
  width: 100%;
  background-color: #272727;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  top: 104%;
  right: 0;
  transition: all 250ms ease;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: #0b0b0b;
  }
`;

IconLabelDropdown.defaultProps = {
    height: '70%',
    width: 'auto',
    maxHeight: '70%',
    backgroundColor: '#272727',
    color: '#e5e5e5',
    borderRadius: '10px',
    fontSize: '14px'
}

export default IconLabelDropdown;