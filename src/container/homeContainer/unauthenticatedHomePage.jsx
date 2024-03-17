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

import React, {lazy, Suspense} from 'react';
import styled from "styled-components";
import BloggiosBase from "../boundries/bloggiosBase";
import FallbackLoader from "../../component/loaders/fallbackLoader";
import useSeo from "../../globalseo/useSeo";

const MemoizedHomeHeader = lazy(()=> import('../../component/sections/HomeHeader'));
const MemoizedHomeTransitionSection = lazy(()=> import('../../component/sections/HomeTransitionSection'));
const BloggiosTechIntroductionSection = lazy(()=> import('../../component/sections/BloggiosTechIntroductionSection'));
const BloggiosTechIntroductionSectionSummary = lazy(()=> import('../../component/sections/BloggiosTechIntroductionSectionSummary'));
const BloggiosTechWhyUsSection = lazy(()=> import('../../component/sections/BloggiosTechWhyUsSection'));

const UnauthenticatedHomePage = () => {

    useSeo('homePage')
    return (
        <BloggiosBase>
            <Wrapper>
                <Suspense fallback={<FallbackLoader width={'100%'} height={'700px'} />}>
                    <MemoizedHomeHeader />
                </Suspense>

                <Suspense fallback={<FallbackLoader width={'100%'} height={'100vh'} />}>
                    <MemoizedHomeTransitionSection id={'transitionSection'} />
                </Suspense>

                <Suspense fallback={<FallbackLoader width={'100%'} height={'100vh'}/>}>
                    <BloggiosTechIntroductionSection />
                </Suspense>

                <Suspense fallback={<FallbackLoader width={'100%'} height={'100vh'}/>}>
                    <BloggiosTechIntroductionSectionSummary />
                </Suspense>

                <Suspense fallback={<FallbackLoader width={'100%'} height={'100vh'} />}>
                    <BloggiosTechWhyUsSection />
                </Suspense>
            </Wrapper>
        </BloggiosBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (orientation: portrait) and (max-width: 700px) {
        margin-bottom: 54px;
    }
`;

export default UnauthenticatedHomePage;