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
import styled from "styled-components";
import {bgAccentRounded} from '../../asset/svg';

const BloggiosTechSectionHeader = () => {
    return (
        <Wrapper>
            <SummarySection>
                Imagine a world where your technology effortlessly scales with your business, driving seamless growth and transformation. At Bloggios Tech, we bring this vision to life. Our proprietary development processes ensure reliability and user-centered solutions, empowering Enterprise and Scale-up companies to thrive in the digital landscape. Welcome to the era of seamless technology.
            </SummarySection>
            <div style={{
                width: '40%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <BloggiosImage src={bgAccentRounded} alt={'Bloggios'} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 40px 10vw;
    align-items: center;
    
    @media (max-width: 1200px) {
        padding: 40px 5vw;
    }

    @media (max-width: 700px) {
        flex-direction: column-reverse;
    }

    @media (max-width: 500px) {
        gap: 10px;
        padding: 28px 2vw;
    }
`;

const SummarySection = styled.p`
    font-size: clamp(0.75rem, 0.5304rem + 1.3514vw, 1.375rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 400;
    width: 60%;

    @media (max-width: 1200px) {
        width: 70%;
    }

    @media (max-width: 700px) {
        width: 100%;
        text-align: center;
    }

    @media (max-width: 500px) {
        text-align: center;
    }
`;

const BloggiosImage = styled.img`
    height: 250px;
    aspect-ratio: 1/1;

    @media (max-width: 1200px) {
        height: 200px;
    }

    @media (max-width: 700px) {
        height: 180px;
    }

    @media (max-width: 500px) {
        height: 140px;
    }
`;

const MemoBloggiosTechSectionHeader = memo(BloggiosTechSectionHeader);

export default MemoBloggiosTechSectionHeader;