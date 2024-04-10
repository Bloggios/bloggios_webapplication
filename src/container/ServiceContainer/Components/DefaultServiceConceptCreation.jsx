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

import React, {memo} from 'react';
import ListConfiguration from "../../../asset/configurations/static/BloggiosTechServicesConfiguration.json";
import {useNavigate} from "react-router-dom";
import {Card, CardButton, Heading4, Heading6, NfCards, Paragraph1, Paragraph2} from "./DefaultServiceStyledComponents";
import {FaArrowRightLong} from "react-icons/fa6";
import styled from "styled-components";

const DefaultServiceConceptCreation = () => {

    const {conceptCreation} = ListConfiguration;
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Heading4 style={{
                textAlign: 'left',
                fontWeight: 600
            }}>
                Concept Creation
            </Heading4>

            <Paragraph1>
                Product ideation at <strong className={'gradient__light-yellow-green'}>Bloggios</strong> involves brainstorming, market research, and strategic thinking to generate innovative software solutions. Through collaborative sessions and stakeholder consultations, we explore diverse concepts and features. We analyze feasibility and market viability, prioritizing user-centric design principles. Feedback loops, user interviews, and prototyping refine concepts, ensuring alignment with strategic goals. Emphasizing agility and adaptability, we iterate and experiment to transform abstract ideas into tangible solutions. Our holistic approach aims to create impactful products that resonate with users, driving growth and delivering long-term value.
            </Paragraph1>

            <NfCards>
                {conceptCreation.map((item, index)=> (
                    <Card key={index}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <Heading6 className={'gradient__dark-orange'} style={{
                                fontWeight: 600
                            }}>{item.title}</Heading6>
                            <Paragraph2 style={{
                                width: '100%'
                            }}>
                                {item.description}
                            </Paragraph2>
                        </div>

                        <CardButton onClick={()=> navigate(item.path)}>
                            Explore <FaArrowRightLong />
                        </CardButton>
                    </Card>
                ))}
            </NfCards>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 6vw;

    @media (max-width: 700px) {
        padding: 20px 10px;
    }

    @media (max-width: 350px) {
        padding: 16px 6px;
    }
`;

export default memo(DefaultServiceConceptCreation);