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

const getArchitecture = () => {
    return (
        <Wrapper>
            <Heading2>
                Rock-Solid Architecture for Scalability and Growth
            </Heading2>

            <Paragraph>
                Our experienced developers design back-end architectures with scalability and security in mind. We don't just build for today's needs, we consider future growth and integration requirements. This flexible foundation ensures your back-end can adapt and evolve alongside your business, keeping you ahead of the curve.
            </Paragraph>
        </Wrapper>
    )
}

const getSpringBoot = () => {
    return (
        <Wrapper>
            <Heading2>
                Spring Boot Savvy for Streamlined Java Development
            </Heading2>

            <Paragraph>
                For Java-based projects, our team leverages the power of Spring Boot, a popular framework known for its simplicity, speed, and convention-over-configuration approach. This translates to faster development times for your back-end application. Spring Boot's built-in features and functionalities streamline processes, reduce boilerplate code, and provide a robust foundation for building robust and maintainable back-end systems.
            </Paragraph>
        </Wrapper>
    )
}

const getDatabase = () => {
    return (
        <Wrapper>
            <Heading2>
                Database Expertise: Choosing the Right Tool for the Job
            </Heading2>

            <Paragraph>
                Data is king, and choosing the right storage solution is crucial. Our back-end developers are masters of various database technologies, including relational databases like MySQL and PostgreSQL for structured data, and NoSQL databases like Elasticsearch or MongoDb for handling massive volumes of unstructured data. This deep understanding allows us to tailor the back-end to your specific data needs, ensuring optimal performance and scalability for any data size.
            </Paragraph>
        </Wrapper>
    )
}

const getApiCraftsmanship = () => {
    return (
        <Wrapper>
            <Heading2>
                Building the Bridge Between Front-End and Back-End
            </Heading2>

            <Paragraph>
                The magic happens at the API layer. Our developers craft well-documented and secure APIs that act as the seamless bridge between your mobile app (or any front-end application) and the back-end systems.  These APIs ensure smooth data flow and efficient communication, enabling a delightful user experience across all touchpoints.
            </Paragraph>
        </Wrapper>
    )
}

const getSecurity = () => {
    return (
        <Wrapper>
            <Heading2>
                Protecting Your Data with Unwavering Vigilance:
            </Heading2>

            <Paragraph>
                Security is non-negotiable. Our developers implement robust security measures to safeguard your data from unauthorized access, breaches, and other threats. We stay on top of the latest security best practices and industry regulations to proactively address vulnerabilities and keep your app and data safe.
            </Paragraph>
        </Wrapper>
    )
}

const getDevops = () => {
    return (
        <Wrapper>
            <Heading2>
                Streamlining Development for Faster Delivery
            </Heading2>

            <Paragraph>
                We leverage DevOps methodologies to create a smooth and efficient workflow for development, testing, and deployment of your back-end system. This translates to faster release cycles, allowing you to get your app to market quicker. Additionally, DevOps practices minimize errors and enable continuous improvement of your back-end infrastructure, ensuring ongoing optimization and performance.
            </Paragraph>
        </Wrapper>
    )
}

const getCloud = () => {
    return (
        <Wrapper>
            <Heading2>
                Choosing the Perfect Cloud Platform for You
            </Heading2>

            <Paragraph>
                Cloud computing offers scalability, flexibility, and cost-effectiveness. Our back-end development team is well-versed in deploying applications on various cloud platforms like AWS, Azure, and GCP.  This agnostic approach allows us to assess your specific needs and choose the most cost-effective and scalable cloud solution for your back-end, ensuring your application runs smoothly and efficiently without vendor lock-in.
            </Paragraph>
        </Wrapper>
    )
}

export const backendDevelopmentData = {
    'Architecture' : getArchitecture(),
    'Spring Boot' : getSpringBoot(),
    'Database' : getDatabase(),
    'Api\'s Implementation': getApiCraftsmanship(),
    'Security': getSecurity(),
    'Devops': getDevops(),
    'Cloud Platform': getCloud()
}