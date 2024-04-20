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
import styled from "styled-components";
import MemoizedHomeMarqueeCard from "../Cards/HomeMarqueeCard";
import Marquee from "react-fast-marquee";
import {
    angularService,
    awsService,
    azureService,
    dockerService,
    elasticsearchService,
    flutterService,
    gcpService,
    githubService,
    graphqlService,
    javascriptService,
    javaService,
    kafkaService,
    kubernetesService,
    mongodbService,
    nextjsService,
    nodejsService,
    oauthService,
    postgresqlService,
    postmanService,
    pythonService,
    reactService,
    springService,
    swiftService
} from '../../asset/ServicesMarquee';

export const bloggiosTechServiceRtlMarquee = [
    {
        id: 1,
        icon: javaService
    },
    {
        id: 2,
        icon: springService
    },
    {
        id: 3,
        icon: awsService
    },
    {
        id: 4,
        icon: azureService
    },
    {
        id: 5,
        icon: angularService
    },
    {
        id: 6,
        icon: graphqlService
    },
    {
        id: 7,
        icon: dockerService
    },
    {
        id: 8,
        icon: elasticsearchService
    },
    {
        id: 9,
        icon: javascriptService
    },
    {
        id: 10,
        icon: kafkaService
    },
    {
        id: 11,
        icon: swiftService
    },
    {
        id: 12,
        icon: pythonService
    }
];

export const bloggiosTechServiceLtrMarquee = [
    {
        id: 14,
        icon: reactService
    },
    {
        id: 15,
        icon: flutterService
    },
    {
        id: 16,
        icon: kubernetesService
    },
    {
        id: 17,
        icon: mongodbService
    },
    {
        id: 18,
        icon: gcpService
    },
    {
        id: 19,
        icon: githubService
    },
    {
        id: 20,
        icon: nextjsService
    },
    {
        id: 21,
        icon: nodejsService
    },
    {
        id: 22,
        icon: oauthService
    },
    {
        id: 23,
        icon: postgresqlService
    },
    {
        id: 24,
        icon: postmanService
    },
    {
        id: 25,
        icon: javaService
    }
];

const BloggiosTechServiceMarquee = () => {

    return (
        <Wrapper>
            <Marquee
                autoFill={true}
                direction={'right'}
            >
                {bloggiosTechServiceRtlMarquee.map((marquee)=> (
                    <MemoizedHomeMarqueeCard
                        key={marquee.id}
                        image={marquee.icon}
                    />
                ))}
            </Marquee>

            <Marquee
                autoFill={true}
                direction={'left'}
            >
                {bloggiosTechServiceLtrMarquee.map((marquee)=> (
                    <MemoizedHomeMarqueeCard
                        key={marquee.id}
                        image={marquee.icon}
                    />
                ))}
            </Marquee>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin: 25px 0 50px 0;
`;

export default BloggiosTechServiceMarquee;