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
import styled, {keyframes} from "styled-components";
import {colors} from "../../styles/Theme";
import {FaPlus} from "react-icons/fa";

const slideDown = keyframes`
    from {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
    }
    to {
        max-height: 250px;
        opacity: 1;
        margin-bottom: 10px;
    }
`;

const slideUp = keyframes`
    from {
        max-height: 250px;
        opacity: 1;
        margin-bottom: 10px;
    }
    to {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
    }
`;

const AccordionContainer = styled.div`
    width: 100%;
    overflow: hidden;
    align-self: center;
`;

const AccordionHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    cursor: pointer;
    gap: 20px;
    background: ${({isOpen}) => (isOpen ? colors.white10 : colors.white05)};
    border-radius: ${({isOpen}) => (isOpen ? '10px 10px 0 0' : '10px')};
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${colors.white80};
    
    & > span {
        font-size: clamp(0.875rem, 0.8404rem + 0.2128vw, 1rem);
        color: inherit;
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
    }
    
    & > svg {
        flex-shrink: 0;
        transform: ${({isOpen}) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
        transition: transform 400ms ease-in-out;
    }
    
    &:hover, &:active {
        color: ${colors.white100};
    }
`;

const AccordionBody = styled.div`
    padding: 10px;
    max-height: 0;
    overflow: hidden;
    overflow-y: auto;
    border: 1px solid ${colors.white10};
    transition: all 400ms ease-in-out;
    animation: ${({isOpen}) => (isOpen ? slideDown : slideUp)} 0.3s forwards;
`;


const Accordion = ({ data, isOpen, onToggle }) => {
    return (
        <AccordionContainer>
            <AccordionHeader isOpen={isOpen} onClick={onToggle}>
                <span>{data.title}</span>
                <FaPlus />
            </AccordionHeader>
            <AccordionBody isOpen={isOpen}>
                {data.details}
            </AccordionBody>
        </AccordionContainer>
    );
};


export default Accordion;