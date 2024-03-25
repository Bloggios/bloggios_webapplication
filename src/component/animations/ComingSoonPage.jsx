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

import React, {Suspense} from 'react';
import styled from "styled-components";
import FallbackLoader from "../loaders/fallbackLoader";
import DualHomePageMarqueeSection from "./DualHomePageMarqueeSection";
import BgTransition from "./BgTransition";
import {colors} from "../../styles/Theme";

const ComingSoonPage = () => {

    const headingStyle = {
        fontSize: 'clamp(1rem, 0.5851rem + 2.5532vw, 2.5rem)',
        fontWeight: 400,
        letterSpacing: '1px',
        color: colors.white80,
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif",
    };

    return (
        <Wrapper className={'page--mesh__background--svg'}>
            <InnerDiv>
                <TextWrapper>
                    <Introducing>
                        Introducing
                    </Introducing>
                    <ComingSoon>
                        BLOGGIOS
                    </ComingSoon>
                    <BgTransition style={headingStyle} component={'h1'} delay={0.1}>
                        The power of connection,<br/>powered by software
                    </BgTransition>
                </TextWrapper>

                <Suspense fallback={<FallbackLoader width={'100%'} height={'250px'} />}>
                    <DualHomePageMarqueeSection />
                </Suspense>
            </InnerDiv>
        </Wrapper>
    );
};

const Wrapper = styled.main`
    width: 100vw;
    min-height: 100vh;
`;

const InnerDiv = styled.div`
    height: 100vh;
    width: 100%;
    background: rgba(30, 30, 30, 0.1);
    backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Introducing = styled.h2`
    font-size: clamp(1.625rem, 1.2127rem + 2.5373vw, 3.75rem);
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    letter-spacing: 1px;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(270deg, #ee4700, #ffb628);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ComingSoon = styled.h1`
    font-size: clamp(2.125rem, 1.3246rem + 4.9254vw, 6.25rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 700;
    background: linear-gradient(to right, rgb(0, 168, 253), #fff 50%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Strong = styled.strong`
    background: linear-gradient(to right, rgb(0, 168, 253), #fff 50%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export default ComingSoonPage;