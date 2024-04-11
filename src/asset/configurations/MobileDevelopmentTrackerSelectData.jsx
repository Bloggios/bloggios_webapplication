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

const Paragraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
`;

const getPlatform = () => {
    return (
        <Wrapper>
            <Heading2>
                Platform Mastery
            </Heading2>

            <Paragraph>
                Our developers are gurus of both native app development (Swift/Kotlin) and cross-platform frameworks (React Native, Flutter). This mastery ensures we craft the perfect solution for your specific needs and target audience, whether you require the deep functionality of native apps or the broader reach of cross-platform development.
            </Paragraph>
        </Wrapper>
    )
}

const getPerformance = () => {
    return (
        <Wrapper>
            <Heading2>
                Performance Optimization Obsession
            </Heading2>

            <Paragraph>
                A laggy app is a losing app. That's why we're obsessed with performance optimization. We employ advanced code optimization techniques and conduct rigorous testing across various devices and operating systems. This relentless pursuit of smoothness guarantees a responsive and delightful user experience.
            </Paragraph>
        </Wrapper>
    )
}

const getDataDriven = () => {
    return (
        <Wrapper>
            <Heading2>
                Data-Driven Decisions for Continuous Improvement
            </Heading2>

            <Paragraph>
                Data is king in the mobile world. We integrate powerful app analytics tools to gather user insights and understand how users interact with your app. This real-time data empowers us to optimize app features, prioritize bug fixes, and ensure your app stays relevant and drives user engagement in the ever-changing mobile landscape.
            </Paragraph>
        </Wrapper>
    )
}

const getUiUx = () => {
    return (
        <Wrapper>
            <Heading2>
                UI/UX Craftsmanship
            </Heading2>

            <Paragraph>
                We believe a beautiful app is just as important as a functional one. Our UI/UX designers create user interfaces that are intuitive, engaging, and aesthetically pleasing. This ensures your app not only delivers results but also provides a delightful user experience that keeps users coming back for more.
            </Paragraph>
        </Wrapper>
    )
}

const getAgileAndDevops = () => {
    return (
        <Wrapper>
            <Heading2>
                Agile Development and DevOps Powerhouse
            </Heading2>

            <Paragraph>
                We don't just write code, we deploy it with lightning speed. By leveraging agile methodologies, we iterate rapidly on your mobile app, incorporating your feedback seamlessly. Our DevOps expertise streamlines deployment and guarantees seamless app updates, keeping your app fresh and users engaged.
            </Paragraph>
        </Wrapper>
    )
}

const getTechStackTitan = () => {
    return (
        <Wrapper>
            <Heading2>
                Tech Stack Titan
            </Heading2>

            <Paragraph>
                We stay ahead of the curve by wielding cutting-edge technologies like cloud integration, AI/ML features, and advanced security protocols. This tech stack powerhouse allows us to create robust, scalable mobile apps that can evolve alongside your business needs and user demands, ensuring your app remains future-proof.
            </Paragraph>
        </Wrapper>
    )
}

export const mobileDevelopmentData = {
    'Platform' : getPlatform(),
    'Performance' : getPerformance(),
    'Data Driven' : getDataDriven(),
    'UI/UX': getUiUx(),
    'Agile & DevOps': getAgileAndDevops(),
    'Tech Stack Titan': getTechStackTitan(),
}