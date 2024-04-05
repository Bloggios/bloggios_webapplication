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

import React, {memo} from 'react';
import styled from "styled-components";
import BloggiosBase from "../boundries/bloggiosBase";
import {colors} from "../../styles/Theme";
import {askQuestionWhite, bgBlackRounded, posts} from "../../asset/svg";
import {messaging, qAndA} from "../../asset/marquee";
import IconButton from "../../component/buttons/IconButton";
import {handleDivScroll} from "../../service/commonFunctions";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const SupportPage = () => {

    const {width} = useWindowDimensions();

    return (
        <BloggiosBase>
            <Wrapper>
                <HeaderSection className={'wrapper-bg__accent--background'}>
                    <h2>Get Help and Support</h2>
                    <span>
                        Choose a category to quickly find the help you need
                    </span>

                    <CardsContainer id={'bloggiosHelpCardsMain'}>
                        <Card>
                            <img src={bgBlackRounded} alt="Bloggios"/>
                            <span>Bloggios Tech</span>
                        </Card>

                        <Card>
                            <img src={qAndA} alt="Questions"/>
                            <span>Q&A</span>
                        </Card>

                        <Card>
                            <img src={posts} alt="Bloggios"/>
                            <span>Post</span>
                        </Card>

                        <Card>
                            <img src={messaging} alt="Bloggios"/>
                            <span>Messaging</span>
                        </Card>

                        <Card>
                            <img src={askQuestionWhite} alt="Bloggios"/>
                            <span>Others</span>
                        </Card>
                    </CardsContainer>

                    {width < 500 && (
                        <IconButtonsGroup>
                            <IconButton onClick={()=> handleDivScroll('left', 'bloggiosHelpCardsMain')}>
                                <FaAngleLeft />
                            </IconButton>
                            <IconButton onClick={()=> handleDivScroll('right', 'bloggiosHelpCardsMain')}>
                                <FaAngleRight />
                            </IconButton>
                        </IconButtonsGroup>
                    )}
                </HeaderSection>
            </Wrapper>
        </BloggiosBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 72px);
    box-sizing: border-box;
    transition: all 400ms ease-in-out;

    @media (max-width: 700px) {
        margin-bottom: 74px;
    }

    @media (orientation: portrait) and (max-width: 700px) {
        height: auto;
    }
`;

const HeaderSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    margin-top: 50px;
    align-self: center;
    text-align: center;
    
    
    & > h2 {
        font-size: clamp(1.75rem, 1.4734rem + 1.7021vw, 2.75rem);
        font-family: "Poppins", sans-serif;
        letter-spacing: 2px;
        color: ${colors.white100};
    }
    
    & > span {
        font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
        color: ${colors.white100};
        margin-top: 25px;
    }
    
    @media (max-width: 700px) {
        padding: 16px;
        margin-top: 34px;
    }
`;

const CardsContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 40px;
    
    @media (max-width: 500px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        align-items: normal;
        justify-content: normal;
        width: 100%;
        padding: 40px 0 10px 0;
        margin-top: 0;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }
`;

const Card = styled.div`
    height: 180px;
    aspect-ratio: 1/1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: ${colors.white10};
    border-radius: 20px;
    padding: 16px 10px;
    border: 2px solid transparent;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    cursor: pointer;
    transition: all 250ms ease-in-out;
    
    & > img {
        height: 40%;
        aspect-ratio: 1/1;
    }
    
    & > span {
        font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
        font-weight: 500;
    }
    
    &:hover, &:active {
        background: ${colors.white05};
        border: 2px solid ${colors.white60};
    }
    
    @media (max-width: 500px) {
        scroll-snap-align: start;
        box-shadow: none;
    }
`;

const IconButtonsGroup = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    align-self: flex-end;
`;

const MemoizedSupportPage = memo(SupportPage);

export default MemoizedSupportPage;