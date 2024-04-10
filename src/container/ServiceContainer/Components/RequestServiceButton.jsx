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
import {BiChevronRight} from "react-icons/bi";
import {colors} from "../../../styles/Theme";
import {BLOGGIOS_TECH_ENQUIRY_SECTION} from "../../../constant/ElementIdConstants";

const RequestServiceButton = ({
    buttonText = 'Discuss Opportunities',
    style
                              }) => {

    const handleClick = () => {
        const enquiryForm = document.getElementById(BLOGGIOS_TECH_ENQUIRY_SECTION);
        if (enquiryForm) {
            enquiryForm.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    return (
        <Button style={style} onClick={handleClick}>
            {buttonText}
            <BiChevronRight />
        </Button>
    );
};

const Button = styled.button`
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    color: ${colors.white100};
    padding: 7px 10px;
    background: ${colors.black400};
    border-radius: 7px;
    margin-top: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    border: 2px solid ${colors.white100};
    transition: all 150ms ease-in-out;
    
    & > svg {
        font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
        color: inherit;
    }
    
    &:hover, &:active {
        background: ${colors.accent100};
        border: 2px solid ${colors.accent100};
    }
    
    @media (max-width: 500px) {
        padding: 4px 7px;
    }
`;

export default RequestServiceButton;