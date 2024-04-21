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

import styled, {css} from "styled-components";
import {colors} from "../../../styles/Theme";

export const Heading2 = styled.h2`
    font-size: clamp(1.5625rem, 1.375rem + 0.75vw, 2.125rem); // 25px to 34px
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    letter-spacing: 1px;
`;

const TextOverflowStyle = css`
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 1100px) {
        width: 180px;
    }

    @media (max-width: 340px) {
        width: 120px;
    }
`;

export const Span = styled.span`
    font-size: clamp(0.875rem, 0.8333rem + 0.1667vw, 1rem); // 14px to 16px
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    color: ${colors.white80};
    ${TextOverflowStyle};
`;

export const Caption = styled.span`
    font-size: clamp(0.75rem, 0.6667rem + 0.3333vw, 1rem); // 12px to 14px
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    color: ${colors.white60};
    font-weight: 300;
    ${TextOverflowStyle};
`;

export const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    margin-top: 20px;

    & > .select__arrow-button {
        position: absolute;
        bottom: 20px;
        right: 15px;
        width: 0;
        height: 0;
        border: solid #7b7b7b;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
    }
`;

export const FieldStyle = css`
    font-size: clamp(0.875rem, 0.8333rem + 0.1667vw, 1rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
`;

export const Label = styled.label`
    ${FieldStyle};
    color: rgba(245, 245, 245, 0.8);
`;

export const Input = styled.input`
    ${FieldStyle};
    outline: none;
    background-color: transparent;
    padding: 10px 16px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 14px;
    border: 1px solid ${colors.white20};

    &:focus {
        color: rgba(245, 245, 245, 1);
    }
    
    &:disabled {
        background: rgba(255, 255, 255, 0.1);
    }
    
    &:focus {
        border: 1px solid ${colors.white40};
    }
`;

export const TextAreaContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border-radius: 14px;
    padding: 6px 10px;
    border: ${({isFocused})=> (isFocused ? `1px solid ${colors.white60}` : `1px solid ${colors.white20}`)};

    & > span {
        ${FieldStyle};
        color: ${colors.white80};
        align-self: flex-end;
    }
`;

export const TextArea = styled.textarea`
    ${FieldStyle};
    border: none;
    outline: none;
    background-color: transparent;
    padding: 4px 6px;
    color: rgba(245, 245, 245, 0.8);
    resize: none;

    &:focus {
        color: rgba(245, 245, 245, 1);
    }

    &:disabled {
        background: rgba(255, 255, 255, 0.1);
    }
`;

export const LinkInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    outline: none;
    background-color: transparent;
    padding: 10px 16px;
    color: ${colors.white80};
    border-radius: 14px;
    border: ${({isFocused})=> (isFocused ? `1px solid ${colors.white60}` : `1px solid ${colors.white20}`)};
    
    & > span {
        padding-right: 5px;
        color: ${colors.white50};
        border-right: 1px solid ${colors.white10};
        ${FieldStyle};
    }
    
    & > input {
        border: none;
        outline: none;
        width: 100%;
        padding-left: 5px;
        color: ${colors.white80};
        background-color: transparent;
        ${FieldStyle};

        &:focus {
            color: rgba(245, 245, 245, 1);
        }
    }
`;

export const SelectStyle = styled.select`
    width: 100%;
    display: inline-block;
    cursor: pointer;
    border: 1px solid ${colors.white20};
    outline: none;
    background: transparent;
    padding: 10px 16px;
    color: ${colors.white80};
    border-radius: 15px;
    border: 1px solid ${colors.white20};
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    ${FieldStyle};

    &::-ms-expand {
        display: none;
    }

    &:hover, &:focus {
        color: ${colors.white100};
        background: ${colors.black200};
        border: 1px solid ${colors.white40};
    }

    & option {
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
    }
`;