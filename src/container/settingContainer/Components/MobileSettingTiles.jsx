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
import {settingListItems} from "../../../constant/listConstants";
import {useNavigate} from "react-router-dom";
import {colors} from "../../../styles/Theme";
import {IoMdLogOut} from "react-icons/io";
import {logoutUser} from "../../../restservices/authApi";
import {HiOutlineLogout} from "react-icons/hi";

const MobileSettingTiles = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            {settingListItems.map((settingListItem) => (
                <SettingTile key={settingListItem.id} onClick={()=> navigate(settingListItem.path)}>
                    <span>{settingListItem.label}</span>
                    {settingListItem.icon}
                </SettingTile>
            ))}
            <SettingTile onClick={logoutUser}>
                <span className={'error__color'}>Logout</span>
                <IoMdLogOut className={'error__color'} />
            </SettingTile>
            <SettingTile>
                <span className={'error__color'} onClick={logoutUser}>Logout from all Devices</span>
                <HiOutlineLogout className={'error__color'} />
            </SettingTile>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SettingTile = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
    background: transparent;
    gap: 10px;

    & > svg {
        font-size: 20px;
        flex-shrink: 0;
    }

    & > span {
        font-size: 15px;
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
    }
    
    &:active {
        background-color: ${colors.accent100};
    }
`;

export default MobileSettingTiles;