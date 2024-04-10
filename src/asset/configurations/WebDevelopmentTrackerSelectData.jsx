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

import styled from "styled-components";
import {colors} from "../../styles/Theme";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
`;

const Heading2 = styled.h2`
    font-size: clamp(1.125rem, 1.0765rem + 0.2985vw, 1.375rem);
    letter-spacing: 2px;
    font-weight: 400;
    color: ${colors.white80};
    font-family: inherit;
`;

const Heading1 = styled.h1`
    font-size: clamp(1.5625rem, 1.4069rem + 0.9574vw, 2.125rem);
    letter-spacing: 2px;
    font-weight: 700;
    color: ${colors.white100};
    font-family: inherit;
`;

const Paragraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
`;

const Link = styled.a`
    font-family: "Poppins", sans-serif;
    font-size: inherit;
    text-decoration: none;
    color: #007bff;
`;

const UnorderedList = styled.ul`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    
    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
    }
`;

const OrderedList = styled.ol`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
    }
    
    & strong {
        color: ${colors.white100};
    }
`;

const getUiUx = () => {
    return (
        <Wrapper>
            <Heading2>
                Captivating User Interfaces (UI) and User Experience (UX)
            </Heading2>

            <Paragraph>
                We go beyond aesthetics to craft user journeys that are intuitive, engaging, and tailored to your target audience. Our UI/UX specialists leverage user research, competitor analysis, and industry best practices to design interfaces that are not only visually appealing but also foster user-friendly navigation and interaction.
            </Paragraph>
        </Wrapper>
    )
}

const getResponsiveDesign = () => {
    return (
        <Wrapper>
            <Heading2>
                Responsive Design and Development
            </Heading2>

            <Paragraph>
                We ensure your website seamlessly adapts to any device, from desktops to tablets and smartphones. Our developers utilize responsive frameworks and meticulously test across different screen sizes to guarantee a flawless user experience regardless of platform.
            </Paragraph>
        </Wrapper>
    )
}

const getSeo = () => {
    return (
        <Wrapper>
            <Heading2>
                Search Engine Optimization (SEO) Foundations
            </Heading2>

            <Paragraph>
                We build your website with a strong SEO foundation, employing best practices for on-page optimization and technical SEO. This helps your website rank higher in search engine results pages (SERPs), driving organic traffic and increasing brand visibility.
            </Paragraph>
        </Wrapper>
    )
}

const getPerformance = () => {
    return (
        <Wrapper>
            <Heading2>
                Performance Optimization
            </Heading2>

            <Paragraph>
                Speed is crucial in today's fast-paced digital world.  Our team optimizes website performance, including image compression, code minification, and caching strategies, to deliver lightning-fast loading times that keep users engaged and coming back for more.
            </Paragraph>
        </Wrapper>
    )
}

const getScalable = () => {
    return (
        <Wrapper>
            <Heading2>
                Scalable and Secure Infrastructure
            </Heading2>

            <Paragraph>
                We build your website on secure, scalable platforms that can accommodate future growth. Our developers leverage the latest security protocols and tools to safeguard your website from potential threats, ensuring your data and user information remain protected.
            </Paragraph>
        </Wrapper>
    )
}

export const webDevelopmentData = {
    'UI & UX' : getUiUx(),
    'Responsiveness' : getResponsiveDesign(),
    'SEO' : getSeo(),
    'Performance' : getPerformance(),
    "Scalable": getScalable()
}