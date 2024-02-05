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
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {BsChevronDown} from "react-icons/bs";

const ValueDropDown = ({list}) => {

    const [value, setValue] = useState('');
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

    return (
        <ValueDropdownWrapper ref={dropdownRef} onClick={()=> setIsShown(!isShown)}>
            <DropdownWrapper>
                <span>{value ? value : list[0]}</span>
                <div style={{
                    transform: isShown && 'rotate(180deg)',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 150ms ease-in-out'
                }}>
                    <BsChevronDown/>
                </div>
            </DropdownWrapper>

            <DropdownItems style={{
                visibility: isShown ? 'visible' : 'hidden',
                opacity: isShown ? 1 : 0
            }}>
                {list.map((item)=> (
                    <DropdownItem key={item}>
                        <span>{item}</span>
                    </DropdownItem>
                ))}
            </DropdownItems>
        </ValueDropdownWrapper>
    );
};

const ValueDropdownWrapper = styled.div`
    width: auto;
    height: auto;
    outline: none;
    position: relative;
    min-width: 100px;
`;

const DropdownWrapper = styled.button`
    width: 100%;
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 150ms ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(16, 23, 32, 1);
    position: relative;
    cursor: pointer;
    user-select: none;
    padding: 5px 7px;
    border-radius: 10px;
    gap: 10px;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    z-index: 2;

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.8);
    }

    &:active {
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: rgba(255, 255, 255, 0.8);
    }

    &:focus {
        border: 1px solid rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const DropdownItems = styled.div`
    width: 100%;
    background-color: rgba(16, 23, 32, 1);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: absolute;
    top: 110%;
    right: 0;
    cursor: pointer;
    padding: 4px;
    transition: all 250ms ease;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 7px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;



export default ValueDropDown;