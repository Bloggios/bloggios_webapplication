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

import React, {memo, useState} from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styled from "styled-components";
import {colors} from "../../styles/Theme";

const BloggiosTrackerSelect = ({
    mapData,
    height,
    margin
                               }) => {

    const {width} = useWindowDimensions();
    const [selectedHeading, setSelectedHeading] = useState(Object.keys(mapData)[0]);

    const handleHeadingClick = (heading) => {
        setSelectedHeading(heading);
    };


    return (
        <MainContainer style={{height: height, margin: margin}}>
            {width > 600 ? (
                <HeadingPart>
                    {Object.keys(mapData).map((heading, i) => (
                        <HeadingCard
                            key={i}
                            active={selectedHeading === heading}
                            onClick={() => handleHeadingClick(heading)}
                        >
                            <span>{heading}</span>
                        </HeadingCard>
                    ))}
                </HeadingPart>
            ) : (
                <SelectStyle
                    value={selectedHeading}
                    onChange={(event)=> handleHeadingClick(event.target.value)}
                >
                    {Object.keys(mapData).map((heading, i) => (
                        <option key={heading} value={heading}>
                            {heading}
                        </option>
                    ))}
                </SelectStyle>
            )}
            <DetailsPart>
                {selectedHeading && (
                    mapData[selectedHeading]
                )}
            </DetailsPart>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    width: 100%;
    align-self: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    transition: all 400ms ease-in-out;
    
    @media (max-width: 600px) {
        flex-direction: column;
        padding: 10px;
        gap: 20px;
    }
`;

const HeadingPart = styled.div`
    width: 24%;
    height: 100%;
    overflow: auto;
    background: ${colors.black400};
    border-radius: 10px;
    transition: all 400ms ease-in-out;
    
    @media (max-width: 600px) {
        display: none;
    }
`;

const DetailsPart = styled.div`
    width: 74%;
    height: 100%;
    overflow: auto;
    padding: 25px;
    background: ${colors.black400};
    border-radius: 25px 4px 25px 4px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    transition: all 400ms ease-in-out;

    @media (max-width: 600px) {
        width: 100%;
        padding: 20px 10px;
    }
`;

const HeadingCard = styled.div`
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid ${colors.white10};
    border-left: 2px solid ${props => props.active ? colors.accent100 : 'transparent'};
    font-family: "Poppins", sans-serif;
    letter-spacing: ${props => props.active ? '2px' : '1px'};
    color: ${props => props.active ? colors.white100 : colors.white70};
    cursor: pointer;
    transition: all 400ms ease-in-out;
    
    @media (max-width: 800px) {
        padding: 0 10px;
    }
`;

const SelectStyle = styled.select`
    font-family: 'Poppins', sans-serif;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    outline: 0;
    border: none;
    outline: none;
    background: ${colors.black400};
    padding: 10px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 300;
    border-bottom: 1px solid ${colors.white10};

    &::-ms-expand {
        display: none;
    }

    &:hover, &:focus {
        color: ${colors.white100};
        background: ${colors.black200};
        border-bottom: 1px solid ${colors.white10};
    }

    & option {
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
    }
`;

export default memo(BloggiosTrackerSelect);