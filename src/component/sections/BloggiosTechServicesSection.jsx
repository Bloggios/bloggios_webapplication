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
import {colors} from "../../styles/Theme";
import {mainStreamServiceBloggiosTech} from "../../constant/listConstants";
import {FaArrowRightLong} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import IconButton from "../buttons/IconButton";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {handleDivScroll} from "../../service/commonFunctions";

const BloggiosTechServicesSection = () => {

    const navigate = useNavigate();
    const {width} = useWindowDimensions();

    return (
        <>
            <Divider />
            <Wrapper>
                <Title>
                    What we Offer
                </Title>

                {width < 500 && (
                    <IconButtonsGroup>
                        <IconButton onClick={()=> handleDivScroll('left', 'bloggiosTechServiceCards')}>
                            <FaAngleLeft />
                        </IconButton>
                        <IconButton onClick={()=> handleDivScroll('right', 'bloggiosTechServiceCards')}>
                            <FaAngleRight />
                        </IconButton>
                    </IconButtonsGroup>
                )}
                <Container id={'bloggiosTechServiceCards'}>
                    {mainStreamServiceBloggiosTech.map((item) => (
                        <MainStreamServicesCard key={item.id}>
                            <img src={item.icon} alt={item.label}/>
                            <h2>
                                {item.label}
                            </h2>

                            <span>
                                {item.text}
                            </span>

                            <LearnMoreButton onClick={()=> navigate(item.path)}>
                                <span>Learn More</span>
                                <FaArrowRightLong />
                            </LearnMoreButton>
                        </MainStreamServicesCard>
                    ))}
                </Container>

                <Summary>
                    Explore Services
                </Summary>
            </Wrapper>
        </>
    );
};

const Divider = styled.div`
    width: 50%;
    display: flex;
    margin: 60px 0;
    align-items: center;
    align-self: center;
    border-top: 1px solid #8191ff;
`;

const Wrapper = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 70px;
    align-self: center;
    
    @media (max-width: 1400px) {
        width: 95%;
    }

    @media (max-width: 1100px) {
        width: 80%;
    }

    @media (max-width: 700px) {
        width: 95%;
    }

    @media (max-width: 500px) {
        gap: 10px;
    }
`;

const Title = styled.h2`
    font-size: clamp(1.75rem, 1.223rem + 3.2432vw, 3.25rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 600;
`;

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    gap: 20px;
    
    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @media (max-width: 500px) {
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }
`;

const MainStreamServicesCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #4258ff;
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    
    & img {
        height: 70px;
        width: 70px;
    }
    
    & h2 {
        font-size: clamp(1.125rem, 0.9521rem + 1.0638vw, 1.75rem);
        color: ${colors.white100};
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 500;
        margin: 20px 0;
    }
    
    & span {
        margin-top: auto;
        font-size: clamp(0.75rem, 0.6622rem + 0.5405vw, 1rem);
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 300;
    }
    
    @media (max-width: 500px) {
        min-width: 260px;
        scroll-snap-align: start;
    }
`;

const LearnMoreButton = styled.button`
    width: fit-content;
    height: fit-content;
    border: none;
    outline: none;
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 5px 0;
    cursor: pointer;
    border-bottom: 1px solid ${colors.white80};
    margin-top: 20px;
    transition: all 250ms ease-in-out;
    
    & span {
        font-size: clamp(0.875rem, 0.8311rem + 0.2703vw, 1rem);
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 400;
    }
    
    & svg {
        font-size: 22px;
    }
    
    & span, & svg {
        color: ${colors.white80};
    }
    
    &:hover, &:active {
        gap: 20px;
        border-bottom: 1px solid ${colors.white100};

        & span, & svg {
            color: ${colors.white100};
        }
    }
`;

const Summary = styled.button`
    width: fit-content;
    align-self: center;
    border: 1px solid rgba(255, 182, 40, 0.7);
    outline: none;
    padding: 10px 20px;
    font-size: clamp(0.625rem, 0.3241rem + 1.8519vw, 1.25rem);
    border-radius: 10px;
    color: rgba(245, 245, 245, 0.7);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
    cursor: pointer;

    &:hover {
        border: 1px solid rgba(255, 182, 40, 1);
        color: rgba(245, 245, 245, 1);
    }

    &:active {
        border: 1px solid rgba(255, 182, 40, 0.8);
        color: rgba(245, 245, 245, 0.8);
    }

    @media (max-width: 500px) {
        padding: 6px 10px;
        margin-top: 20px;
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


const MemoizedBloggiosTechServicesSection = React.memo(BloggiosTechServicesSection);

export default MemoizedBloggiosTechServicesSection;