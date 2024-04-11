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

import React, {lazy, memo, Suspense} from 'react';
import styled from "styled-components";
import {
    BLOGGIOS_TECH_INTRODUCTION_SECTION_SUMMARY as sectionId,
    BLOGGIOS_TECH_WHY_BLOGGIOS
} from "../../constant/ElementIdConstants";
import FallbackLoader from "../loaders/fallbackLoader";
import ScrollDownAnimatedButton from "../animations/ScrollDownAnimatedButton";
import {handleElementIdScroll} from "../../service/handleElementIdScroll";
import BgTransition from "../animations/BgTransition";

const BloggiosTechSectionHeader = lazy(() => import('../headers/BloggiosTechSectionHeader'));
const BloggiosTechDataCard = lazy(() => import('../Cards/BloggiosTechDataCard'));

const BloggiosTechIntroductionSectionSummary = () => {
    return (
        <Wrapper id={sectionId} className={'home__black-lines--background'}>
            <BgTransition
                component={'div'}
                type={'bg__fi'}
                delay={0.1}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'}/>}>
                    <BloggiosTechSectionHeader/>
                </Suspense>
            </BgTransition>

            <BgTransition
                component={'div'}
                type={'bg__fi'}
                delay={0.2}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Suspense fallback={<FallbackLoader width={'100%'} height={'250px'}/>}>
                    <BloggiosTechDataCard/>
                </Suspense>

                <ScrollDownAnimatedButton
                    margin={'10px auto'}
                    onClick={() => handleElementIdScroll(BLOGGIOS_TECH_WHY_BLOGGIOS)}
                />
            </BgTransition>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    user-select: none;
    font-family: 'Poppins', sans-serif;
    justify-content: center;
    gap: 100px;

    @media (max-height: 700px) {
        gap: 34px;
    }

    @media (max-height: 600px) {
        gap: 20px;
    }
`;

const MemoBloggiosTechIntroductionSection = memo(BloggiosTechIntroductionSectionSummary);

export default BloggiosTechIntroductionSectionSummary;