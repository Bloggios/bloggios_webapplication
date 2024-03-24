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
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from 'swiper/modules';
import '../../styles/AuthSwiperStyles.css';
import {applicationSearching, createQuestion, marqueeImage, userProfile} from '../../asset/AuthCarousel';
import useWindowDimensions from "../../hooks/useWindowDimensions";

const AuthCarouselSection = ({
    title,
    smallSubTitle,
    longSubTitle
                             }) => {

    const {width} = useWindowDimensions();

    return (
        <Wrapper className={'wrapper-bg__accent--background'}>
            <div>
                <Title>
                    {title ? title : 'Welcome Back'}
                </Title>

                <SubTitle>
                    {
                        width > 1000
                        ? smallSubTitle ? smallSubTitle : 'Where will your connections take you today?'
                            : longSubTitle ? longSubTitle : 'Unleash the power of connection. Bloggios is your social hub, question box, messaging center, and software development partner - all rolled into one. Login and unlock a world of possibilities.'
                    }
                </SubTitle>
            </div>

            <Swiper
                slidesPerView={1}
                lazy={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>';
                    },
                }}
                modules={[Pagination, Autoplay]}
                className='bloggios-auth-swiper-main'
            >
                <SwiperSlide style={{
                    width: '100%',
                    height: 'auto'
                }}>
                    <Image src={marqueeImage} />
                </SwiperSlide>
                <SwiperSlide style={{
                    width: '100%',
                    height: 'auto'
                }}>
                    <Image src={userProfile} />
                </SwiperSlide>
                <SwiperSlide style={{
                    width: '100%',
                    height: 'auto'
                }}>
                    <Image src={createQuestion} />
                </SwiperSlide>
                <SwiperSlide style={{
                    width: '100%',
                    height: 'auto'
                }}>
                    <Image src={applicationSearching} />
                </SwiperSlide>
            </Swiper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Title = styled.h2`
    font-size: clamp(1rem, 0.6119rem + 2.3881vw, 3rem);
    color: #f5f5f5;
    letter-spacing: 1px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`;

const SubTitle = styled.h4`
    font-size: clamp(0.75rem, 0.6772rem + 0.4478vw, 1.125rem);
    color: rgba(245, 245, 245, 0.8);
    letter-spacing: 1px;
    font-family: 'Poppins', sans-serif;
    font-weight:400;
    text-align: center;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

export default AuthCarouselSection;