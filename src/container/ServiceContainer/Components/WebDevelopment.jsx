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

import React, {memo, Suspense, useEffect} from 'react';
import styled from "styled-components";
import {WEB_DEVELOPMENT_PRODUCT_DEVELOPMENT_SECTION} from "../../../constant/ElementIdConstants";
import {colors} from "../../../styles/Theme";
import {bloggiosLogin, intellijBackend} from "../../../asset/webp";
import BloggiosTrackerSelect from "../../../component/miscellaneous/BloggiosTrackerSelect";
import {webDevelopmentData} from "../../../asset/configurations/WebDevelopmentTrackerSelectData";
import {
    angularService,
    awsService,
    azureService,
    dockerService,
    elasticsearchService,
    flutterService,
    gcpService,
    githubService, googleanalyticsService,
    graphqlService,
    javascriptService,
    javaService,
    kafkaService,
    kubernetesService,
    mongodbService,
    nextjsService,
    nodejsService, oauthService, postgresqlService, postmanService,
    pythonService,
    reactService, reduxService,
    springService,
    swiftService, typescriptService
} from "../../../asset/ServicesMarquee";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import SingleMarquee from "../../../component/animations/SingleMarquee";
import RequestServiceButton from "./RequestServiceButton";

const bloggiosWebDevelopment = [
    {
        id: 1,
        icon: reactService
    },
    {
        id: 2,
        icon: javascriptService
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
        icon: nextjsService
    },
    {
        id: 9,
        icon: nodejsService
    },
    {
        id: 10,
        icon: reduxService
    },
    {
        id: 11,
        icon: googleanalyticsService
    },
    {
        id: 12,
        icon: typescriptService
    }
];

const WebDevelopment = () => {

    return (
        <Wrapper id={WEB_DEVELOPMENT_PRODUCT_DEVELOPMENT_SECTION}>
            <h2>Web <span className={'gradient__light-yellow'}>Development</span></h2>

            <RowWrapper>
                <ImageWrapper>
                    <img src={bloggiosLogin} alt="Backend Code"/>
                </ImageWrapper>

                <DataWrapper className={'service--outlet__row-data'}>
                    <h2>Web Development</h2>
                    <Paragraph2>
                        Unleash the power of the web with <strong className={'gradient__light-yellow-green'}>Bloggios</strong> expert web development services. We craft custom websites, CMS solutions, and web applications tailored to your business goals. From user-friendly interfaces to responsive design, we ensure a flawless user experience across all devices, propelling your brand's success in the ever-evolving digital landscape.
                    </Paragraph2>
                </DataWrapper>
            </RowWrapper>

            <Suspense fallback={<FallbackLoader width={'100%'} height={'100px'} thickness={2} />}>
                <SingleMarquee
                    marqueeList={bloggiosWebDevelopment}
                    margin={'50px 0'}
                />
            </Suspense>

            <DetailedInformation>
                <h4>Unleash the Power of the Web with <br/><span className={'gradient__dark-orange'}>Bloggios</span> Web Development Expertise</h4>
                <p>
                    At <span className={'gradient__dark-orange'}>Bloggios</span>, we're passionate about crafting exceptional web experiences that empower your business to thrive online.  Our team of seasoned web developers combines cutting-edge technology with strategic planning to deliver bespoke solutions that transform your vision into reality. Here's how we elevate your web presence:
                </p>
            </DetailedInformation>

            <TrackerData>
                <BloggiosTrackerSelect
                    mapData={webDevelopmentData}
                    margin={'25px 0 0 0'}
                    height={'auto'}
                />
            </TrackerData>

            <RequestServiceButton
                buttonText={'Consult Web Dev Experts'}
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
    display: flex;
    
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
    
    @media (max-width: 1200px) {
        width: 100%;
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

export default memo(WebDevelopment);