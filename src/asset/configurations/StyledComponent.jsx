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
import {colors} from "../../styles/Theme";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
`;

const Heading1 = styled.h1`
    font-size: clamp(1.5625rem, 1.4069rem + 0.9574vw, 2.125rem);
    letter-spacing: 2px;
    font-weight: 700;
    color: ${colors.white100};
    font-family: inherit;
`;

const Heading2 = styled.h2`
    font-size: clamp(1.125rem, 1.0765rem + 0.2985vw, 1.375rem);
    letter-spacing: 2px;
    font-weight: 500;
    color: ${colors.white80};
    font-family: inherit;
`;

const Heading4 = styled.h4`
    font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
    letter-spacing: 2px;
    font-weight: 400;
    color: ${colors.white80};
    font-family: inherit;
`;

const Paragraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
`;

const FlexParagraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const BgLink = styled.a`
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

const OrderedList = styled.ol`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 25px;

    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
    }

    & strong {
        color: ${colors.white100};
    }
`;

const UnorderedList = styled.ul`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    padding-left: 25px;
    
    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
    }
`;

const HorizontalDivider = styled.hr`
    color: ${colors.white10};
`;

const RouterLink = styled(Link)`
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

export {
    Wrapper,
    Heading1,
    Heading2,
    Heading4,
    Paragraph,
    FlexParagraph,
    BgLink,
    OrderedList,
    UnorderedList,
    HorizontalDivider,
    RouterLink
}