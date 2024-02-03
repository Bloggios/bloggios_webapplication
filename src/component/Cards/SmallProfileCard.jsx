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
import Avatar from "../avatars/avatar";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'

const SmallProfileCard = ({
    bio,
    name,
    email,
    image,
    key
                          }) => {

    return (
        <Wrapper key={key}>
            <RowWrapper>
                <Avatar size={'50px'} image={image ? image : bloggios_logo} borderRadius={'50%'} />
                <ColumnWrapper>
                    <NameSpan>{name}</NameSpan>
                    <EmailSpan>{email}</EmailSpan>
                </ColumnWrapper>
            </RowWrapper>

            <BioWrapper>
                <BioSpan>
                    {bio}
                </BioSpan>
            </BioWrapper>

            <ButtonsWrapper>
                <ViewProfile>
                    Profile
                </ViewProfile>
                <Message>
                    Message
                </Message>
            </ButtonsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #171717;
    height: auto;
    border-radius: 20px;
    padding: 10px;
    gap: 14px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const NameSpan = styled.span`
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const EmailSpan = styled.span`
    font-size: 12px;
    font-weight: 200;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const BioWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
`;

const BioSpan = styled.span`
    max-height: 5.7em;
    line-height: 1.4;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 200;
    white-space: pre-line;
`;

const ButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ViewProfile = styled.button`
    outline: none;
    border: none;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    background-color: #4258ff;
    border-radius: 10px;
    cursor: pointer;
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

const Message = styled.button`
    outline: none;
    border: none;
    padding: 5px 10px;
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

export default SmallProfileCard;