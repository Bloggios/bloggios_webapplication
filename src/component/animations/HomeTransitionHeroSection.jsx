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
import {ColumnWrapper} from "../../styles/StyledComponent";
import styled, {css} from "styled-components";
import BgTransition from "./BgTransition";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const HomeTransitionHeroSection = () => {

    const {width} = useWindowDimensions();

    const headingStyle = {
        fontSize: 'clamp(1rem, -0.0341rem + 6.3636vw, 2.75rem)',
        fontWeight: 500,
        letterSpacing: '1px',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif",
    };

    const subTitleStyle = {
        fontSize: 'clamp(0.75rem, 0.6117rem + 0.8511vw, 1.25rem)',
        textAlign: 'center',
        width: width > 800 ? '60%' : '85%',
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 400,
        margin: '0 auto',
    }

    const buttonGroupStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        gap: width > 400 ? '40px' : '10px'
    }

    return (
        <ColumnWrapper style={{
            gap: width > 800 ? '40px' : '20px'
        }}>
            <ColumnWrapper>
                <BgTransition style={headingStyle} component={'h1'} delay={0.1}>
                    The power of connection,<br/>powered by <Strong>software</Strong>
                </BgTransition>

                <BgTransition style={subTitleStyle} component={'h5'} delay={0.4}>
                    Beyond the blog. Engage your audience, spark conversations, and build thriving online communities with our powerful social media features, messaging tools, and custom software solutions
                </BgTransition>
            </ColumnWrapper>

            <BgTransition style={buttonGroupStyle} component={'div'} delay={0.7}>
                <AskForQuoteButton>
                    Get a Quote
                </AskForQuoteButton>
                <LearnAboutUsButton>
                    Learn about us
                </LearnAboutUsButton>
            </BgTransition>
        </ColumnWrapper>
    );
};

const Strong = styled.strong`
    background: linear-gradient(to right, rgb(0, 168, 253), #fff 50%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ButtonStyle = css`
    padding: 16px 28px;
    outline: none;
    border: none;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    
    @media (max-width: 800px) {
        padding: 10px 22px;
        font-size: 14px;
    }
    
    @media (max-width: 400px) {
        padding: 7px 16px;
        font-size: 11px;
    }
`;

const AskForQuoteButton = styled.button`
    ${ButtonStyle};
    background-color: #4b5fff;

    &:hover {
        color: rgba(255, 255, 255, 1);
        background-color: #4055ff;
    }
    
    &:active {
        color: rgba(255, 255, 255, 0.85);
        background-color: #4258ff;
    }
`;

const LearnAboutUsButton = styled.button`
    ${ButtonStyle};
    background-color: transparent;

    &:hover {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
        color: rgba(255, 255, 255, 0.85);
        background-color: rgba(255, 255, 255, 0.05);
    }
`;

const MemoizedHomeTransitionHeroSection = React.memo(HomeTransitionHeroSection);

export default MemoizedHomeTransitionHeroSection;