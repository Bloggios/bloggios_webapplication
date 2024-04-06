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
import bloggios_logo from "../../../asset/svg/bg-accent_rounded.svg";
import styled from "styled-components";
import {bgBlackRounded} from "../../../asset/svg";

const SidebarProfileContainer = ({
    profileImage,
    name,
    email
                                 }) => {
    return (
        <ProfileContainer>
            <img
                src={profileImage ? profileImage : bgBlackRounded}
                alt={name}
                height={'44px'}
                style={{
                    borderRadius: '50%',
                    height: '44px',
                    width: '44px',
                    aspectRatio: '1/1'
                }}
            />
            <ColumnWrapper>
                <NameSpan>{name}</NameSpan>
                <EmailSpan>{email}</EmailSpan>
            </ColumnWrapper>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #1c1b1b;
    padding: 7px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
    gap: 10px;
    align-items: center;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
`;

const NameSpan = styled.span`
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 150ms ease;
`;

const EmailSpan = styled.span`
    font-size: 12px;
    font-weight: 200;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 150ms ease;
`;

const MemoizedSidebarProfileContainer = React.memo(SidebarProfileContainer);

export default MemoizedSidebarProfileContainer;