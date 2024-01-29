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
import '../../styles/SwiperStyle.css'
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Zoom} from "swiper/modules";
import {IoChevronBackOutline, IoChevronForward} from "react-icons/io5";
import styled from "styled-components";
import 'swiper/css/pagination';

const ImagesSwiper = ({swiperItems}) => {

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            zoom={true}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            }}
            lazy={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            }}
            modules={[Navigation, Zoom, Pagination]}
            className='bloggios-custom-creative-swiper'
        >
            {swiperItems.map((item, index) => (
                <SwiperSlide key={index}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        borderRadius: '20px',
                        height: 'auto'
                    }} className="swiper-zoom-container">
                        <SwiperImage
                            alt={item}
                            src={item}
                            loading={'lazy'}
                        />
                    </div>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </SwiperSlide>
            ))}
            <div className="swiper-button-prev">
                <IoChevronBackOutline/>
            </div>
            <div className="swiper-button-next">
                <IoChevronForward/>
            </div>
        </Swiper>
    );
};

const SwiperImage = styled.img`
    width: 100%;
    height: 500px;
    object-fit: contain;
    aspect-ratio: 1/1;
    background: #272727;
    border-radius: 20px;
    overflow: hidden;
    @media (max-width: 1000px) {
        height: auto;
    }
`;

export default ImagesSwiper;