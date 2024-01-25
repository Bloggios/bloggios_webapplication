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

import React, {useLayoutEffect, useState} from 'react';
import Avatar from "../avatars/avatar";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import styled from "styled-components";
import Typography from "../typography/typography";
import {SlOptionsVertical} from "react-icons/sl";
import {CgProfile} from "react-icons/cg";
import {MdOutlineReport} from "react-icons/md";
import ImagesSwiper from "../Swiper/ImagesSwiper";

const swiperItems = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        label: 'Bloggios'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        label: 'Bloggios'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        label: 'Bloggios'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        label: 'Bloggios'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1517650862521-d580d5348145?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        label: 'Bloggios'
    }
]

const Posts = ({
                   avatar,
                   name,
                   location,
                   imagesList,
                   postBody = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad earum et, eveniet facilis fuga iusto provident veniam voluptates! A alias blanditiis deleniti deserunt dolor dolores doloribus ea eos, excepturi exercitationem facilis fugit ipsum iste itaque modi mollitia nihil nobis odit officiis optio placeat possimus praesentium quae quis quisquam quod quos sequi soluta suscipit tempora totam veniam veritatis voluptates! Cumque, debitis repellat. Praesentium tempora tenetur voluptates! A architecto culpa cumque deleniti harum nisi repudiandae! Iure maxime, nostrum odit officia possimus voluptate!'
               }) => {

    const [isShown, setIsShown] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleReadMoreClick = () => {
        setIsOpen(!isOpen);
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };


    const handleClick = () => {
        if (isShown) {
            setIsShown(false)
        }
    }

    return (
        <Wrapper onClick={handleClick}>
            <PostHeader>
                <LogoNameWrapper>
                    <Avatar
                        size={'50px'}
                        position={'relative'}
                        image={avatar ? avatar : bloggios_logo}
                    />
                    <ColumnWrapper>
                        <NameSpan>
                            {name ? name : "Rohit Parihar"}
                        </NameSpan>
                        <LocationSpan>
                            {location ? location : "Maharashtra, Pune"}
                        </LocationSpan>
                    </ColumnWrapper>
                </LogoNameWrapper>

                <OptionsMenu onClick={() => setIsShown(!isShown)}>
                    <SlOptionsVertical/>

                    <DropdownWrapper style={{
                        opacity: isShown ? 1 : 0,
                        visibility: isShown ? 'visible' : 'hidden',
                        transform: isShown ? 'translateX(0)' : 'translateX(100%)'
                    }}>
                        <DropDownItemWrapper>
                            <Typography text={'View Profile'} type={'custom'} size={'14px'}/>
                            <CgProfile fontSize={'18px'}/>
                        </DropDownItemWrapper>

                        <DropDownItemWrapper>
                            <Typography text={'Report Post'} type={'custom'} size={'14px'}/>
                            <MdOutlineReport fontSize={'18px'}/>
                        </DropDownItemWrapper>
                    </DropdownWrapper>
                </OptionsMenu>
            </PostHeader>

            <PostBodyWrapper>
                <TextContainer style={{
                    height: isExpanded ? 'auto' : '65px'
                }}>
                    {postBody}
                </TextContainer>
                {postBody.length > 250 && (
                    <ReadMoreButton onClick={toggleReadMore}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </ReadMoreButton>
                )}
            </PostBodyWrapper>

            {swiperItems && (
                <ImageSwiperWrapper>
                    <ImagesSwiper swiperItems={swiperItems} />
                </ImageSwiperWrapper>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 100%;
    max-width: 400px; /* Set a maximum width to prevent it from growing indefinitely */
    margin: 0 auto; /* Center the form horizontally */
    height: auto;
    min-height: 200px;
    background-color: #272727;
    border-radius: 20px;
    padding: 20px;
    overflow: hidden; /* Hide any potential overflow */
    box-sizing: border-box; /* Include padding in the width calculation */
    display: flex;
    flex-direction: column;
`;

const PostHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    user-select: none;
`;

const LogoNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const NameSpan = styled.span`
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LocationSpan = styled.span`
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 1px;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const OptionsMenu = styled.button`
    height: 34px;
    width: 34px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: background 150ms ease;

    &:hover {
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
    }

    &:active {
        color: rgba(255, 255, 255, 0.6);
        background-color: rgba(0, 0, 0, 0.4);
    }
`;

const DropdownWrapper = styled.div`
    position: absolute;
    height: auto;
    width: 160px;
    padding: 10px;
    background: rgba(28, 28, 28, 1);
    top: 105%;
    right: 10%;
    border-radius: 16px;
    transition: all 250ms ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    z-index: 2;
`;

const DropDownItemWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
    z-index: 2;
    transition: all 150ms ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const PostBodyWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 20px 0;
    padding: 10px;
`;

const ReadMoreButton = styled.button`
    border: none;
    background: linear-gradient(to right, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.8), rgba(39, 39, 39, 1));
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 2px 0 2px 25px;
    backdrop-filter: blur(2px);
`;

const TextContainer = styled.div`
    overflow: hidden;
    transition: all 500ms ease-in-out;
    text-align: justify;
    line-height: 22px;
`;

const ImageSwiperWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

export default Posts;