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

export const Heading4 = styled.h4`
    font-size: clamp(1.25rem, 1.008rem + 1.4894vw, 2.125rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 600;
    text-align: left;
`;

export const Heading6 = styled.h6`
    font-size: clamp(1.125rem, 1.0559rem + 0.4255vw, 1.375rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 500;
    text-align: left;
`;

export const Paragraph1 = styled.p`
    width: 60%;
    font-size: clamp(0.875rem, 0.778rem + 0.597vw, 1.375rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 400;
    color: ${colors.white80};
    
    @media (max-width: 1600px) {
        width: 85%;
    }

    @media (max-width: 800px) {
        width: 100%;
    }
`;

export const Paragraph2 = styled.p`
    font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
    color: ${colors.white80};
`;

export const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(240px, 1fr));
    gap: 10px;
    margin-top: 25px;
    
    @media (max-width: 1400px) {
        grid-template-columns: repeat(2, minmax(240px, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
`;

export const NfCards = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
    gap: 10px;
    margin-top: 25px;
    justify-content: center;
    
    @media (max-width: 1000px) {
        grid-template-columns: repeat(2, minmax(200px, 400px));
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
    }
`;

export const Card = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px 16px;
    border-radius: 10px;
    background: linear-gradient(to right bottom, ${colors.black200}, ${colors.black500});
    color: ${colors.white80};
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    gap: 25px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    
    &:hover, &:active {
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px;
    }
`;

export const CardButton  = styled.button`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 400;
    color: ${colors.white80};
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: all 150ms ease-in-out;
    
    &:hover, &:active {
        color: ${colors.white100};
        gap: 14px;
        border-left: 5px solid ${colors.white100};
        padding-left: 4px;
    }
`;