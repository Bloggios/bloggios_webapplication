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

import React, {useCallback} from 'react';
import * as Bg from './styles/BloggiosTechWhyUsSectionSc';
import {whyUsCardListConstants} from "../../constant/listConstants";
import {BLOGGIOS_TECH_WHY_BLOGGIOS} from "../../constant/ElementIdConstants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import BgTransition from "../animations/BgTransition";
import {useNavigate} from "react-router-dom";
import {SERVICES_PAGE} from "../../constant/pathConstants";

const BloggiosTechWhyUsSection = () => {

    const {width} = useWindowDimensions();
    const navigate = useNavigate();

    const getList = useCallback(()=> {
        if (width > 800 || width < 500) {
            return whyUsCardListConstants
        } else if (width <= 800 && width >= 500) {
            return whyUsCardListConstants.slice(0, -2);
        }
    }, [width]);

    return (
        <Bg.Wrapper id={BLOGGIOS_TECH_WHY_BLOGGIOS}>
            <Bg.WhyUs>
                <BgTransition
                    component={'div'}
                    delay={0.1}
                >
                    <Bg.Title>
                        What makes <strong>Bloggios</strong><br/>Different
                    </Bg.Title>
                </BgTransition>
                <BgTransition
                    component={'div'}
                    delay={0.1}
                >
                <Bg.WhyUsButton onClick={()=> navigate(SERVICES_PAGE)}>
                    Explore More
                </Bg.WhyUsButton>
                </BgTransition>
                <Bg.Cards>
                    {getList().map((item, index)=> (
                        <BgTransition
                            component={'div'}
                            delay={index/10 + 0.1}
                            key={item.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                gap: '10px',
                                padding: '20px',
                                borderRadius: '10px',
                                background: '#4258ff',
                                maxWidth: '300px',
                            }}
                        >
                            <Bg.Icon src={item.icon} alt={item.label} />
                            <Bg.Label>{item.label}</Bg.Label>
                        </BgTransition>
                    ))}
                </Bg.Cards>
            </Bg.WhyUs>

            <Bg.Divider />

            <BgTransition
                component={'div'}
                delay={0.2}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Bg.Thoughts>
                    <Bg.ThoughtTitle>
                        <strong>Bloggios</strong><br/>Way
                    </Bg.ThoughtTitle>

                    <Bg.SummaryDiv>
                        <p>At Bloggios, we craft technological marvels engineered for expansion. Our exclusive development methodologies ensure steadfast, user-centric innovations that propel effortless digital metamorphosis for Enterprises and burgeoning Scale-up ventures.</p>
                        <h4>This, is the Bloggios brand of seamless technology.</h4>
                    </Bg.SummaryDiv>
                </Bg.Thoughts>
            </BgTransition>
        </Bg.Wrapper>
    );
};

export default BloggiosTechWhyUsSection;