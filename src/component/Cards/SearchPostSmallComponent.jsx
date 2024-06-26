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

import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Avatar from "../avatars/avatar";
import bloggios_logo from "../../asset/svg/bg-accent_rounded.svg";
import {getUserProfile} from "../../restservices/profileApi";

const SearchPostSmallComponent = ({
                                      userId,
                                      postBody
                                  }) => {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        getUserProfile(userId)
            .then((response) => {
                setImage(response.data.profileImageLink ? response.data.profileImageLink : '');
                setName(response.data.name ? response.data.name : '');
            }).catch((error) => {
            console.log(error);
        })
    }, [userId])
    return (
        <Wrapper>
            <Avatar size={'40px'} image={image.length > 0 || image ? image : bloggios_logo}/>

            <PostBodySpan>
                {postBody}
            </PostBodySpan>

            <FollowButton>
                {name}
            </FollowButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    outline: 1px solid rgba(255, 255, 255, 0.1);
    border: none;
    background-color: rgba(16, 23, 32, 0.2);
    color: #f5f5f5;
    border-radius: 10px;
    padding: 7px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 50ms ease;

    &:hover {
        outline: 1px solid rgba(255, 255, 255, 0.4);
        background-color: rgba(16, 23, 32, 0.4);
        color: rgba(255, 255, 255, 0.8);
    }

    &:focus {
        outline: 1px solid rgba(255, 255, 255, 0.4);
        background-color: rgba(16, 23, 32, 0.4);
        color: rgba(255, 255, 255, 0.8);
    }

    &:focus {
        outline: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(16, 23, 32, 0.2);
        color: rgba(255, 255, 255, 0.6);
    }
`;

const PostBodySpan = styled.span`
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const FollowButton = styled.button`
    outline: none;
    border: none;
    padding: 5px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    max-width: 150px;
    background-color: #4258ff;
    border-radius: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 150ms ease;

    &:hover {
        background-color: rgba(66, 88, 255, 0.9);
        color: rgba(255, 255, 255, 0.8);
    }

    &:active {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 0.6);
    }
`;

const ViewProfileButton = styled.button`
    outline: none;
    border: none;
    padding: 5px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    background-color: #272727;
    border-radius: 10px;
    cursor: pointer;
    transition: all 150ms ease;

    &:hover {
        background-color: rgba(39, 39, 39, 0.9);
        color: rgba(255, 255, 255, 0.8);
    }

    &:active {
        background-color: #272727;
        color: rgba(255, 255, 255, 0.6);
    }
`;

export default SearchPostSmallComponent;