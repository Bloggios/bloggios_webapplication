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

import React, {lazy, Suspense, useEffect} from 'react';
import useComponentSize from "../../../hooks/useComponentSize";
import {useLocation} from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ServicesBase from "../Components/ServiceHeader";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {intellijBackend} from "../../../asset/webp";
import IconButton from "../../../component/buttons/IconButton";
import {handleDivScroll} from "../../../service/commonFunctions";
import {INDUSTRY_CARDS_PRODUCT_DEVELOPMENT_SECTION} from "../../../constant/ElementIdConstants";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {productDevelopment} from "../../../constant/listConstants";
import RequestServiceButton from "../Components/RequestServiceButton";
import Divider from "../../../component/divider/divider";
import {colors} from "../../../styles/Theme";
import styled from "styled-components";

const BloggiosTechDataCard = lazy(() => import('../../../component/Cards/BloggiosTechDataCard'));
const WebDevelopment = lazy(()=> import('../Components/WebDevelopment'));
const MobileDevelopment = lazy(()=> import('../Components/MobileDevelopment'));
const BackendDevelopment = lazy(()=> import('../Components/BackendDevelopment'));

const ProductIdeationOutlet = () => {
    const [wrapperRef, wrapperSize] = useComponentSize();
    const {hash} = useLocation();
    const {width} = useWindowDimensions();

    const scrollToSection = () => {
        if (hash) {
            const id = hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        scrollToSection();
    }, [hash]);

    const HeadingContent = () => {
        return (
            <>
                <span className={'gradient__light-yellow'}>Product </span>
                <span className={'gradient__light-yellow-green'}>Ideation</span>
            </>
        )
    }

    return (
        <Wrapper ref={wrapperRef}>
            <ServicesBase
                headingContent={<HeadingContent />}
                description={'Welcome to our website! Discover innovative solutions tailored to your needs. Let\'s embark on a journey of creativity and technology together'}
                buttonText={'Expert Advice'}
            />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'100px'} thickness={2} />}>
                <BloggiosTechDataCard />
            </Suspense>

            <RowWrapper>
                <ImageWrapper>
                    <img src={intellijBackend} alt="Backend Code"/>
                </ImageWrapper>

                <DataWrapper className={'service--outlet__row-data'}>
                    <h2>Custom Expertise</h2>
                    <Paragraph2>
                        Bloggios offers empowering software development services, delivering bespoke solutions tailored to your business needs. Our proficient team specializes in SaaS software, API Development, Custom Software, and Mobile Apps. Whether you're a startup or a seasoned enterprise, we navigate you through our Agile Development Process, ensuring the creation of potent software solutions that propel your success.
                    </Paragraph2>
                </DataWrapper>
            </RowWrapper>

            <IndustryTarget>
                <h1>Industry-Centric <span className={'gradient__light-purple'}>Software</span> Solutions Tailored to <span className={'gradient__light-yellow'}>Diverse</span> Needs</h1>
                <h6>Our dedicated team of experts works tirelessly, around the clock, to meticulously craft custom technology solutions tailored specifically for your industry and business needs.</h6>

                {width <= 600 && (
                    <IconButtonsGroup>
                        <IconButton onClick={()=> handleDivScroll('left', INDUSTRY_CARDS_PRODUCT_DEVELOPMENT_SECTION, 340)}>
                            <FaAngleLeft />
                        </IconButton>
                        <IconButton onClick={()=> handleDivScroll('right', INDUSTRY_CARDS_PRODUCT_DEVELOPMENT_SECTION, 340)}>
                            <FaAngleRight />
                        </IconButton>
                    </IconButtonsGroup>
                )}

                <IndustryCards id={INDUSTRY_CARDS_PRODUCT_DEVELOPMENT_SECTION}>
                    {productDevelopment.map((item) => (
                        <IndustryCard style={{minWidth: width < 600 ? Number(wrapperSize.width) - 28 + 'px' : '100%'}} key={item.id}>
                            <img src={item.icon} alt={item.title}/>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </IndustryCard>
                    ))}
                </IndustryCards>

                <RequestServiceButton
                    buttonText={'Custom Service'}
                    style={{
                        alignSelf: 'center'
                    }}
                />
            </IndustryTarget>

            <Divider width={'70%'} color={colors.white20} verticalSpacing={'40px'} />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <WebDevelopment />
            </Suspense>

            <Divider width={'70%'} color={colors.white20} verticalSpacing={'40px'} />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <MobileDevelopment />
            </Suspense>

            <Divider width={'70%'} color={colors.white20} verticalSpacing={'40px'} />

            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'} />}>
                <BackendDevelopment />
            </Suspense>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 6vw;

    @media (max-width: 700px) {
        padding: 20px 10px;
    }

    @media (max-width: 350px) {
        padding: 16px 6px;
    }
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 70px;
    
    @media (max-width: 600px) {
        flex-direction: column-reverse;
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

const IndustryTarget = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    margin-top: 100px;
    
    & > h1 {
        width: 50%;
        font-size: clamp(1.375rem, 1.0638rem + 1.9149vw, 2.5rem);
        text-align: center;
        font-family: inherit;
        letter-spacing: inherit;
        font-weight: 600;
        align-self: center;
    }
    
    & > h6 {
        width: 80%;
        font-size: clamp(0.875rem, 0.7713rem + 0.6383vw, 1.25rem);
        text-align: center;
        align-self: center;
        font-family: inherit;
        letter-spacing: inherit;
        color: ${colors.white80};
        font-weight: 400;
    }
    
    @media (max-width: 1600px) {
        & > h1 {
            width: 80%;
        }
    }

    @media (max-width: 600px) {
        gap: 20px;
        
        & > h1 {
            width: 100%;
        }
        
        & > h6 {
            width: 100%;
        }
    }
`;

const IndustryCards = styled.div`
    width: 80%;
    display: grid;
    align-self: center;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
    gap: 20px;
    
    @media (max-width: 1500px) {
        width: 100%;
    }
    
    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(240px, 1fr));
    }
    
    @media (max-width: 600px) {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;
        justify-content: flex-start;
    }
`;

const IndustryCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 20px 16px;
    border-radius: 16px;
    background: rgba(34, 35, 42, 0.2);
    box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075),0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    scroll-snap-align: center;
    color: ${colors.white80};
    
    transition: all 250ms ease-in-out;
    
    & > img {
        width: 80px;
        aspect-ratio: 1/1;
    }
    
    & > h4 {
        font-size: clamp(1.125rem, 1.0559rem + 0.4255vw, 1.375rem);
        font-family: inherit;
        font-weight: 500;
        letter-spacing: inherit;
        color: inherit;
    }
    
    & > p {
        font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
        font-family: inherit;
        letter-spacing: inherit;
        color: inherit;
    }
    
    &:hover, &:active {
        background: rgba(34, 35, 42, 0.4);
        color: ${colors.white100};
        gap: 25px;
        box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.4), 0 0 0 1px hsla(230, 13%, 9%, 0.075),0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09);
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

export default ProductIdeationOutlet;