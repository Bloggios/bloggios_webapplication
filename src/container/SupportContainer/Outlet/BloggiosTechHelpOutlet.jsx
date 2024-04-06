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

import React, {useState} from 'react';
import styled from "styled-components";
import Accordion from "../../../component/Accordions/Accordion";
import {bloggiosTechHelpData} from "../../../asset/configurations/BloggiosTechHelpSupport";

const BloggiosTechHelpOutlet = () => {

    const [openAccordionId, setOpenAccordionId] = useState(null);

    const handleAccordionToggle = (accordionId) => {
        setOpenAccordionId(openAccordionId === accordionId ? null : accordionId);
    };

    return (
        <Wrapper>
            <Heading1>
                Frequently Asked<br/><strong>Questions</strong>
            </Heading1>

            <AccordionContainer>
                {bloggiosTechHelpData.map((item) => (
                    <Accordion
                        key={item.id}
                        data={item}
                        isOpen={item.id === openAccordionId}
                        onToggle={() => handleAccordionToggle(item.id)}
                    />
                ))}
            </AccordionContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
`;

const Heading1 = styled.h1`
    font-size: clamp(1.5625rem, 1.3032rem + 1.5957vw, 2.5rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 2px;
    font-weight: 600;
    text-align: center;
    
    & > strong {
        font-size: inherit;
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        background: linear-gradient(270deg, #dfda7d, #84e15f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: capitalize;
    }
`;

const AccordionContainer = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 1200px) {
        width: 60%;
    }

    @media (max-width: 1000px) {
        width: 80%;
    }

    @media (max-width: 700px) {
        width: 95%;
    }
`;

export default BloggiosTechHelpOutlet;