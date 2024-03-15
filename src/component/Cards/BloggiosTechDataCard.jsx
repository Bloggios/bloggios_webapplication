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

import React, {memo, useEffect, useState} from 'react';
import styled from "styled-components";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const BloggiosTechDataCard = () => {

    const [hoursCode, setHoursCode] = useState(0);
    const [liveProjects, setLiveProjects] = useState(0);
    const [linesCode, setLinesCode] = useState(0);

    const [ref, isIntersecting] = useIntersectionObserver({
        threshold: 1
    });

    useEffect(() => {
        if (isIntersecting) {
            const hoursCodeInterval = setInterval(() => {
                setHoursCode(prevPoint => {
                    if (prevPoint < 500) {
                        return prevPoint + 1;
                    } else {
                        clearInterval(hoursCodeInterval);
                        return prevPoint;
                    }
                });
            }, 10);

            const liveProjectsInterval = setInterval(() => {
                setLiveProjects(prevPoint => {
                    if (prevPoint < 7) {
                        return prevPoint + 1;
                    } else {
                        clearInterval(liveProjectsInterval);
                        return prevPoint;
                    }
                });
            }, 1000);

            const linesCodeInterval = setInterval(() => {
                setLinesCode(prevPoint => {
                    if (prevPoint < 200) {
                        return prevPoint + 1;
                    } else {
                        clearInterval(liveProjectsInterval);
                        return prevPoint;
                    }
                });
            }, 35);

            return () => {
                clearInterval(liveProjectsInterval);
                clearInterval(linesCodeInterval);
                clearInterval(hoursCodeInterval);
            };
        }
    }, [isIntersecting]);


    return (
        <CardWrapper ref={ref}>
            <InfoItemWrapper >
                <InfoValueSpan id={'increment'}>
                    {hoursCode + '+'}
                </InfoValueSpan>
                <InfoLabelSpan>Hours of Code</InfoLabelSpan>
            </InfoItemWrapper>

            <InfoItemWrapper >
                <InfoValueSpan id={'increment'}>
                    {liveProjects + '+'}
                </InfoValueSpan>
                <InfoLabelSpan>Live Projects</InfoLabelSpan>
            </InfoItemWrapper>

            <InfoItemWrapper >
                <InfoValueSpan>
                    {linesCode + 'k+'}
                </InfoValueSpan>
                <InfoLabelSpan>Lines of Code</InfoLabelSpan>
            </InfoItemWrapper>
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    padding: 40px;
    border-radius: 10px;
    background: linear-gradient(to right bottom, #f6f5f5, #ded7a1);
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    
    @media (max-width: 700px) {
        padding: 20px;
        gap: 20px;
    }

    @media (max-width: 400px) {
        padding: 20px 10px;
        gap: 10px;
    }
`;

const InfoItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    gap: 7px;
`;

const InfoValueSpan = styled.span`
    font-size: clamp(1.25rem, 0.8108rem + 2.7027vw, 2.5rem);
    font-weight: 700;
    color: #eca000;

    @media (max-width: 400px) {
        font-size: 18px;
    }
`;

const InfoLabelSpan = styled.span`
    font-size: clamp(0.75rem, 0.5743rem + 1.0811vw, 1.25rem);
    color: rgba(0, 0, 0, 0.7);

    @media (max-width: 300px) {
        font-size: 10px;
    }
`;

const MemoBloggiosTechDataCard = memo(BloggiosTechDataCard);

export default MemoBloggiosTechDataCard;