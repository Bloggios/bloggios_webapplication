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
import * as Bg from './styles/BloggiosTechStyledComponents'
import {FaAngleDoubleDown} from "react-icons/fa";
import {
    BLOGGIOS_TECH_INTRODUCTION_SECTION,
    BLOGGIOS_TECH_INTRODUCTION_SECTION_SUMMARY
} from "../../constant/ElementIdConstants";
import {handleElementIdScroll} from "../../service/handleElementIdScroll";
import {useNavigate} from "react-router-dom";
import {SERVICES_PAGE} from "../../constant/pathConstants";
import BgTransition from "../animations/BgTransition";

const BloggiosTechIntroductionSection = () => {

    const navigate = useNavigate();

    return (
        <Bg.Wrapper id={BLOGGIOS_TECH_INTRODUCTION_SECTION} className={'home__black-lines--background'}>
            <BgTransition
                component={'h2'}
                type={'bg__fi'}
                delay={0.1}
                style={{
                    fontSize: 'clamp(1.5625rem, 0.5093rem + 6.4815vw, 3.75rem)',
                    color: 'rgba(255, 255, 255, 1)',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'linear-gradient(270deg, #ee4700, #ffb628)',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Introducing
            </BgTransition>
            <BgTransition
                component={'h1'}
                type={'bg__fi'}
                delay={0.2}
                style={{
                    fontSize: 'clamp(1.875rem, 0.3704rem + 9.2593vw, 5rem)',
                    color: 'rgba(255, 255, 255, 1)',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                Bloggios <span className={"home__tech-span-underline"}>Tech</span>
            </BgTransition>
            <BgTransition
                component={'h4'}
                type={'bg__fi'}
                delay={0.3}
                style={{
                    fontSize: 'clamp(1.125rem, 0.463rem + 4.0741vw, 2.5rem)',
                    fontWeight: 400,
                    letterSpacing: '1px',
                    color: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                Tech solutions, <span className={'span__yellow--gradient'}>reimagined</span>
            </BgTransition>

            <BgTransition
                component={'div'}
                type={'bg__fi'}
                delay={0.4}
                style={{
                    marginTop: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                }}
            >
                <Bg.ExploreProjects onClick={() => navigate(SERVICES_PAGE)}>
                    Explore Services
                </Bg.ExploreProjects>

                <Bg.NavigateButton
                    onClick={() => handleElementIdScroll(BLOGGIOS_TECH_INTRODUCTION_SECTION_SUMMARY)}
                    className={'button__scroll--icon'}
                >
                    More <FaAngleDoubleDown className={'button__scroll-down--icon'}/>
                </Bg.NavigateButton>
            </BgTransition>
        </Bg.Wrapper>
    );
};

const MemoizedBloggiosTechSection = React.memo(BloggiosTechIntroductionSection);

export default MemoizedBloggiosTechSection;