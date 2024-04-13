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

import styled from "styled-components";
import {colors} from "../../../styles/Theme";

export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
`;

export const CoverImage = styled.div`
    width: 100%;
    height: 220px;
    position: relative;

    @media (max-width: 700px) {
        height: 180px;
    }

    @media (max-width: 500px) {
        height: 140px;
    }

    @media (max-width: 320px) {
        height: 120px;
    }
`;

export const CoverImageTag = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center center;

    @media (max-width: 700px) {
        height: 180px;
    }

    @media (max-width: 500px) {
        height: 140px;
    }

    @media (max-width: 320px) {
        height: 120px;
    }
`;

export const UserDetails = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0c0c0c;
`;

export const ColumnWrapper = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 170px;

    @media (max-width: 700px) {
        padding: 0 20px 0 150px;
        height: 58px;
    }

    @media (max-width: 500px) {
        padding: 0 10px 0 95px;
        height: 40px;
    }
`;

export const NameSpan = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 500px) {
        font-size: clamp(16px, 5vw, 20px);
    }

    @media (max-width: 350px) {
        font-size: clamp(16px, 5vw, 20px);
    }
`;

export const ProfileTagSpan = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
    color: rgba(255, 255, 255, 0.6);
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 500px) {
        width: 140px;
    }

    @media (max-width: 350px) {
        width: 100px;
    }
`;

export const ChangeCoverImageButton = styled.button`
    position: relative;
    bottom: 40px;
    float: right;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    color: rgba(0, 0, 0, 0.8);
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    border: none;
    outline: none;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);

    &:hover {
        background-color: rgba(255, 255, 255, 1);
        color: rgba(0, 0, 0, 1);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.8);
        color: rgba(0, 0, 0, 0.9);
    }

    @media (max-width: 400px) {
        font-size: 10px;
        bottom: 95%;
    }
`;

export const ButtonGroupWrapper = styled.div`
    position: relative;
    bottom: 40px;
    float: right;
    right: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    font-size: 14px;

    @media (max-width: 400px) {
        gap: 5px;
        font-size: 10px;
        bottom: 95%;
    }
`;

export const EditImage = styled.label`
    border: none;
    outline: none;
    padding: 5px 10px;
    background-color: rgba(25, 188, 19, 0.8);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: rgba(25, 188, 19, 1);
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(25, 188, 19, 0.9);
        color: rgba(255, 255, 255, 0.9);
    }
`;

export const RemoveImage = styled.label`
    border: none;
    outline: none;
    padding: 5px 10px;
    background-color: rgb(208, 90, 46);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: rgba(213, 85, 37, 1);
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(213, 85, 37, 1);
        color: rgba(255, 255, 255, 0.9);
    }
`;

export const CancelButton = styled.button`
    border: none;
    outline: none;
    height: 22px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfileImageChangeButton = styled.label`
    position: absolute;
    height: 34px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: #4258ff;
    left: 120px;
    bottom: -65px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
    cursor: pointer;

    &:hover {
        background-color: #4659f3;
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: #4f62f4;
        color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 700px) {
        font-size: 16px;
        height: 28px;
        left: 105px;
        bottom: -55px;
    }

    @media (max-width: 500px) {
        font-size: 14px;
        height: 22px;
        left: 65px;
        bottom: -42px;
    }
`;

export const BioFollowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 28px;
    letter-spacing: 1px;
    gap: 7px;
    font-family: 'Poppins', sans-serif;
    
    @media (max-width: 500px) {
        padding: 10px 16px;
    }
`;

export const BioWrapper = styled.div`
    width: 100%;
    display: flex;
    font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
    color: ${colors.white80};
    font-family: inherit;
    letter-spacing: inherit;
    word-wrap: normal;
    white-space: break-spaces;
`;

export const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
`;

export const FollowGroupWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    & > button {
        width: fit-content;
        display: flex;
        flex-direction: row;
        padding: 5px 10px;
        gap: 4px;
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
        font-size: clamp(0.75rem, 0.7006rem + 0.2326vw, 0.875rem);
        background: transparent;
        color: ${colors.white80};
        border-radius: 7px;
        
        &:hover, &:active {
            background: ${colors.white10};
            color: ${colors.white100};
        }
    }
`;