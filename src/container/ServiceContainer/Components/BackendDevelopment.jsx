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

import React, {memo, Suspense} from 'react';
import {
    BACKEND_DEVELOPMENT_PRODUCT_DEVELOPMENT_SECTION,
    WEB_DEVELOPMENT_PRODUCT_DEVELOPMENT_SECTION
} from "../../../constant/ElementIdConstants";
import {inforingUi, mobileUi, postman} from "../../../asset/webp";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import SingleMarquee from "../../../component/animations/SingleMarquee";
import BloggiosTrackerSelect from "../../../component/miscellaneous/BloggiosTrackerSelect";
import {mobileDevelopmentData} from "../../../asset/configurations/MobileDevelopmentTrackerSelectData";
import styled from "styled-components";
import {colors} from "../../../styles/Theme";
import {
    awsService,
    azureService,
    dockerService,
    elasticsearchService,
    flutterService, githubService,
    googleanalyticsService,
    grafanaService,
    graphqlService,
    javaService,
    jenkinsService,
    jiraService, kafkaService,
    kotlinService,
    kubernetesService,
    mongodbService, oauthService,
    postgresqlService,
    postmanService,
    reactService,
    springService,
    swiftService
} from "../../../asset/ServicesMarquee";
import {backendDevelopmentData} from "../../../asset/configurations/BackendDevelopmentTrackerSelectData";
import RequestServiceButton from "./RequestServiceButton";

const bloggiosBackendDevelopment = [
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
        icon: kafkaService
    },
    {
        id: 5,
        icon: postmanService
    },
    {
        id: 6,
        icon: elasticsearchService
    },
    {
        id: 7,
        icon: dockerService
    },
    {
        id: 8,
        icon: postgresqlService
    },
    {
        id: 9,
        icon: kubernetesService
    },
    {
        id: 10,
        icon: mongodbService
    },
    {
        id: 11,
        icon: grafanaService
    },
    {
        id: 12,
        icon: jenkinsService
    },
    {
        id: 13,
        icon: githubService
    },
    {
        id: 14,
        icon: oauthService
    },
    {
        id: 15,
        icon: jiraService
    },
    {
        id: 16,
        icon: azureService
    }
];

const BackendDevelopment = () => {
    return (
        <Wrapper id={BACKEND_DEVELOPMENT_PRODUCT_DEVELOPMENT_SECTION}>
            <h2>Backend <span className={'gradient__light-yellow'}>Development</span></h2>

            <RowWrapper>
                <ImageWrapper>
                    <img src={postman} alt="Postman"/>
                </ImageWrapper>

                <DataWrapper className={'service--outlet__row-data'}>
                    <h2>Backend Development</h2>
                    <Paragraph2>
                        Have you ever wondered what powers the features you love on <strong
                        className={'gradient__dark-orange'}>Bloggios</strong>? That's the magic of
                        backend development! Our skilled backend developers are the architects behind the scenes,
                        crafting the server-side logic that makes everything tick. They build and maintain the databases
                        that store your content, create APIs to connect different parts of Bloggios, and ensure
                        everything runs smoothly and securely. So, the next time you seamlessly post a blog or connect
                        with your audience, remember the talented backend developers making it all possible at <strong
                        className={'gradient__dark-orange'}>Bloggios</strong>!
                    </Paragraph2>
                </DataWrapper>
            </RowWrapper>

            <Suspense fallback={<FallbackLoader width={'100%'} height={'100px'} thickness={2}/>}>
                <SingleMarquee
                    marqueeList={bloggiosBackendDevelopment}
                    margin={'50px 0'}
                />
            </Suspense>

            <DetailedInformation>
                <h4>Elevate Your App's Potential with Robust Backend Development</h4>
                <p>
                    At Bloggios, our backend development prowess propels your app to the forefront of innovation. With
                    meticulous attention to detail and cutting-edge technologies, we craft seamless and scalable
                    solutions tailored to elevate your brand and engage users on a whole new level.
                </p>
            </DetailedInformation>

            <TrackerData>
                <BloggiosTrackerSelect
                    mapData={backendDevelopmentData}
                    margin={'25px 0 0 0'}
                    height={'auto'}
                />
            </TrackerData>

            <RequestServiceButton
                buttonText={'Consult Backend Expert'}
                style={{
                    alignSelf: 'center'
                }}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    color: ${colors.white100};

    & > h2 {
        font-size: clamp(1.25rem, 0.9043rem + 2.1277vw, 2.5rem);
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: 600;
        text-align: center;
    }
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 70px;

    @media (max-width: 800px) {
        margin-top: 40px;
    }

    @media (max-width: 600px) {
        flex-direction: column-reverse;
        margin-top: 20px;
        gap: 25px;
    }
`;

const ImageWrapper = styled.div`
    width: 48%;
    max-height: 440px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    & > img {
        width: 100%;
        object-fit: contain;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const DataWrapper = styled.div`
    width: 48%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 25px;

    & > h2 {
        font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        letter-spacing: 1px;
    }

    @media (max-width: 600px) {
        width: 100%;
        gap: 20px;

        & > h2 {
            text-align: center;
        }
    }
`;

const Paragraph2 = styled.p`
    font-size: clamp(0.875rem, 0.7713rem + 0.6383vw, 1.25rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    color: ${colors.white80};

    @media (max-width: 1000px) {
        font-size: clamp(0.75rem, 0.7061rem + 0.2703vw, 0.875rem);
    }
`;

const DetailedInformation = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    margin-top: 40px;
    align-self: center;

    & > h4 {
        font-size: clamp(1rem, 0.7926rem + 1.2766vw, 1.75rem);
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: 600;
    }

    & > p {
        font-size: clamp(0.875rem, 0.7401rem + 0.6349vw, 1.375rem);
        font-family: inherit;
        letter-spacing: inherit;
        color: ${colors.white80};
        text-align: justify;
    }
`;

const TrackerData = styled.div`
    width: 70%;
    display: flex;
    align-self: center;

    @media (max-width: 1200px) {
        width: 85%;
    }

    @media (max-width: 1000px) {
        width: 100%;
    }
`;

export default memo(BackendDevelopment);