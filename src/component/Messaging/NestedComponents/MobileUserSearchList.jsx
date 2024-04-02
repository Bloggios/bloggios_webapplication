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
import {colors} from "../../../styles/Theme";

const MobileUserSearchList = () => {
    return (
        <Wrapper>
            {/*<SearchBox>*/}
            {/*    <IoSearch color={userSearchIsFocused ? colors.white100 : colors.white80} />*/}
            {/*    <input*/}
            {/*        type="search"*/}
            {/*        inputMode={'search'}*/}
            {/*        ref={userSearchRef}*/}
            {/*        maxLength={16}*/}
            {/*        placeholder={'Search User'}*/}
            {/*        onChange={(e) => setSearchInput(e.target.value)}*/}
            {/*        value={searchInput}*/}
            {/*    />*/}
            {/*    <IconButton*/}
            {/*        padding={'7px'}*/}
            {/*        style={{*/}
            {/*            visibility: searchInput.length > 0 ? 'visible' : 'hidden',*/}
            {/*            opacity: searchInput.length > 0 ? 1 : 0,*/}
            {/*        }}*/}
            {/*        onClick={() => setSearchInput('')}*/}
            {/*    >*/}
            {/*        <AiOutlineClose />*/}
            {/*    </IconButton>*/}
            {/*</SearchBox>*/}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${colors.black150};
    border-radius: 20px;
    padding: 10px;
    position: relative;
`;

const SearchBox = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    background-color: ${colors.black200};
    border-radius: 7px;
    display: flex;
    flex-direction: row;
    gap: 7px;
    align-items: center;
    padding: 0 10px;

    & > svg {
        font-size: 24px;
    }

    & > input {
        padding: 10px 0;
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        min-width: 60px;
        font-family: 'Poppins', sans-serif;
        color: ${colors.white80};
        letter-spacing: 1px;
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);

        &:focus {
            color: ${colors.white100};
        }
    }
`;

export default MobileUserSearchList;