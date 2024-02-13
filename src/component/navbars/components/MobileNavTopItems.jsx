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

import React from 'react';
import styled from "styled-components";
import Avatar from "../../avatars/avatar";
import bloggios_logo from '../../../asset/svg/bg-accent_rounded.svg'
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {IoIosSearch} from "react-icons/io";

const MobileNavTopItems = () => {

    const {width} = useWindowDimensions();

    return (
        <Wrapper>
            <Avatar
                size={width > 380 ? '50px' : '40px'}
                borderRadius={'50%'}
                image={bloggios_logo}
            />
            <SearchIconWrapper>
                <IoIosSearch />
            </SearchIconWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    padding: 2vw;
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

const MemoizedMobileNavTopItems = React.memo(MobileNavTopItems);
export default MemoizedMobileNavTopItems;