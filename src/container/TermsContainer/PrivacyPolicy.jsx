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

import React, {useState} from 'react';
import * as Bg from './styles/StyledComponent'
import BloggiosBase from "../boundries/bloggiosBase";
import styled from "styled-components";
import {colors} from "../../styles/Theme";
import BgTransition from "../../component/animations/BgTransition";

const data = {
    "Heading 1": <p>This is the content for Heading 1</p>,
    "Heading 2": <div><h3>This is the content for Heading 2</h3><p>More details here...</p></div>,
    "Heading 3": <span>This is the content for Heading 3</span>,
    "Heading 4": "Details for Heading 4",
    "Heading 5": "Details for Heading 5",
    "Heading 6": "Details for Heading 6",
    "Heading 7": "Details for Heading 7",
    "Heading 8": "Details for Heading 8",
    "Heading 9": "Details for Heading 9",
    "Heading 10": "Details for Heading 10"
};

const PrivacyPolicy = () => {
    const [selectedHeading, setSelectedHeading] = useState(Object.keys(data)[0]); // Initialize with the first key

    const handleHeadingClick = (heading) => {
        setSelectedHeading(heading);
    };

    return (
        <BloggiosBase>
            <Wrapper>
                <MainContainer>
                    <HeadingPart>
                        {Object.keys(data).map((heading, i) => (
                            <HeadingCard
                                key={i}
                                active={selectedHeading === heading}
                                onClick={() => handleHeadingClick(heading)}
                            >
                                <span>{heading}</span>
                            </HeadingCard>
                        ))}
                    </HeadingPart>
                    <DetailsPart>
                        {selectedHeading && (
                            data[selectedHeading]
                        )}
                    </DetailsPart>
                </MainContainer>
            </Wrapper>
        </BloggiosBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 72px);
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: all 400ms ease-in-out;
`;

const MainContainer = styled.div`
    width: 70%;
    height: 95%;
    align-self: center;
    background: ${colors.black400};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 10px;
    transition: all 400ms ease-in-out;
`;

const HeadingPart = styled.div`
    width: 25%;
    height: 100%;
    overflow: auto;
    padding: 6px 0;
    border-right: 1px solid ${colors.white10};
    transition: all 400ms ease-in-out;
`;

const DetailsPart = styled.div`
    width: 75%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    transition: all 400ms ease-in-out;
`;

const HeadingCard = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid ${colors.white10};
    border-left: 2px solid ${props => props.active ? colors.accent100 : 'transparent'};
    font-family: "Poppins", sans-serif;
    letter-spacing: ${props => props.active ? '2px' : '1px'};
    color: ${props => props.active ? colors.white100 : colors.white70};
    transition: all 400ms ease-in-out;
`;

export default PrivacyPolicy;