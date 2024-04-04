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
import {privacyNoticeData} from "../../asset/configurations/PrivacyNoticeData";
import IconButton from "../../component/buttons/IconButton";
import {BiHomeAlt2} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE, LANDING_PAGE} from "../../constant/pathConstants";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const PrivacyPolicy = () => {

    const navigate = useNavigate();
    const {width} = useWindowDimensions();
    const [selectedHeading, setSelectedHeading] = useState(Object.keys(privacyNoticeData)[0]);

    const handleHeadingClick = (heading) => {
        setSelectedHeading(heading);
    };

    return (
            <Wrapper>
                <MainContainer>
                    {width > 600 ? (
                        <HeadingPart>
                            {Object.keys(privacyNoticeData).map((heading, i) => (
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
                            {Object.keys(privacyNoticeData).map((heading, i) => (
                                <option key={heading} value={heading}>
                                    {heading}
                                </option>
                            ))}
                        </SelectStyle>
                    )}
                    <DetailsPart>
                        {selectedHeading && (
                            privacyNoticeData[selectedHeading]
                        )}
                    </DetailsPart>
                </MainContainer>

                <IconButton
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: 10
                    }}
                    fontSize={'28px'}
                    bgColor={colors.accent80}
                    hBgColor={colors.accent100}
                    aBgColor={colors.accent100}
                    onClick={()=> navigate(LANDING_PAGE)}
                >
                    <BiHomeAlt2/>
                </IconButton>
            </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    transition: all 400ms ease-in-out;
`;

const MainContainer = styled.div`
    width: 70%;
    height: 90%;
    align-self: center;
    background: ${colors.black400};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 10px;
    transition: all 400ms ease-in-out;
    
    @media (max-width: 1000px) {
        width: 90%;
    }
    
    @media (max-width: 800px) {
        width: 95%;
        height: 80%;
    }
    
    @media (max-width: 600px) {
        flex-direction: column;
        padding: 10px;
        gap: 20px;
    }
`;

const HeadingPart = styled.div`
    width: 25%;
    height: 100%;
    overflow: auto;
    padding: 6px 0;
    border-right: 1px solid ${colors.white10};
    transition: all 400ms ease-in-out;
    
    @media (max-width: 600px) {
        display: none;
    }
`;

const DetailsPart = styled.div`
    width: 75%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    transition: all 400ms ease-in-out;

    @media (max-width: 600px) {
        width: 100%;
        padding: 10px;
    }
    
    @media (max-width: 400px) {
        padding: 0;
    }
`;

const HeadingCard = styled.div`
    width: 100%;
    min-height: 70px;
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

export default PrivacyPolicy;