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

import React, {lazy, memo, Suspense, useEffect} from 'react';
import styled from "styled-components";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import Divider from "../../../component/divider/divider";
import {colors} from "../../../styles/Theme";
import {useLocation} from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const DefaultServiceHeader = lazy(()=> import('../Components/DefaultServiceHeader'));
const DefaultServiceProductDevelopment = lazy(()=> import('../Components/DefaultServiceProductDevelopment'));
const BloggiosTechServiceMarquee = lazy(()=> import('../../../component/animations/BloggiosTechServiceMarquee'));
const DefaultServiceConceptCreation = lazy(()=> import('../Components/DefaultServiceConceptCreation'));
const DefaultServiceSupport = lazy(()=> import('../Components/DefaultServiceSupport'));
const DefaultServiceTraining = lazy(()=> import('../Components/DefaultServiceTechnicalTraining'));

const DefaultServiceOutlet = () => {

    const {hash} = useLocation();

    const scrollToSection = () => {
        if (hash) {
            const id = hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        scrollToSection();
    }, [hash]);

    return (
        <Wrapper>

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <DefaultServiceHeader />
            </Suspense>

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <BloggiosTechServiceMarquee />
            </Suspense>

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <DefaultServiceProductDevelopment />
            </Suspense>

            <Divider width={'60%'} color={colors.white20} />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <DefaultServiceConceptCreation />
            </Suspense>

            <Divider width={'60%'} color={colors.white20} />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <DefaultServiceSupport />
            </Suspense>

            <Divider width={'60%'} color={colors.white20} />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <DefaultServiceTraining />
            </Suspense>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export default memo(DefaultServiceOutlet);