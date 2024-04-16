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
import Divider from "../../../component/divider/divider";
import {FaRegUserCircle} from "react-icons/fa";

const settingListItems = [
    {
        id: 1,
        label: 'Edit Profile',
        icon: <FaRegUserCircle />
    },
    {
        id: 2,
        label: 'Verification',

    }
]
const SettingWebBar = () => {
    return (
        <Wrapper>
            <h2>
                Settings
            </h2>

            <Divider width={'90%'} verticalSpacing={'4px'} color={colors.white20} />

            <TilesWrapper>

                <Tile>
                    <FaRegUserCircle />
                    <span>Edit Profile</span>
                </Tile>
            </TilesWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px clamp(0.625rem, -0.4167rem + 1.6667vw, 1.25rem);
    background-color: ${colors.black400};
    border-radius: 16px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    
    & > h2 {
        font-size: 22px;
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: 600;
    }
`;

const TilesWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const Tile = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    color: ${colors.white80};
    border-radius: 10px;
    padding: 10px;
    transition: all 100ms ease-out;
    
    & > svg {
        font-size: 20px;
    }
    
    & > span {
        font-size: 15px;
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
    }
    
    &:hover {
        background-color: ${colors.white20};
        color: ${colors.white100};
    }
    
    &:active {
        background-color: ${colors.white10};
        color: ${colors.white80};
    }
`;

export default SettingWebBar;