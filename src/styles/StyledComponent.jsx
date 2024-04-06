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
import {colors} from "./Theme";

export const ColumnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const RowSpaceBetweenWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Paragraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
`;

export const BgLink = styled.a`
    font-family: "Poppins", sans-serif;
    font-size: inherit;
    text-decoration: underline;
    text-decoration-color: transparent;
    color: ${colors.linkColor};
    transition: all 200ms ease-in-out;
    
    &:hover, &:active {
        text-decoration: underline;
        text-decoration-color: ${colors.linkColor};
    }
`;