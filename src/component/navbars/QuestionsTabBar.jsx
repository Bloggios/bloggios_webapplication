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

import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {BiPlus} from "react-icons/bi";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {handleDivScroll} from "../../service/commonFunctions";
import {useQuery} from "@tanstack/react-query";
import {getQuestionTabBarData} from "../../restservices/QuestionApi";
import FallbackLoader from "../loaders/fallbackLoader";
import FavouriteTagsModel from "../modal/FavouriteTagsModel";
import {useNavigate} from "react-router-dom";

const QuestionsTabBar = () => {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const navigate = useNavigate();
    const tabBarRef = useRef(null);
    const [isScrollButton, setIsScrollButton] = useState({
        right: true,
        left: false
    });

    const {
        isLoading,
        isSuccess,
        data,
        isError,
        refetch
    } = useQuery({
        queryKey: ['questionTabBarData'],
        queryFn: getQuestionTabBarData,
        staleTime: 700000
    })

    useEffect(() => {
        const container = tabBarRef.current;

        const handleScroll = () => {
            const isScrolledRight = container.scrollWidth > container.clientWidth + container.scrollLeft;
            const isScrolledLeft = container.scrollLeft > 0;

            setIsScrollButton({
                right: isScrolledRight,
                left: isScrolledLeft
            });
        };
        container.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const TabListContent = () => {
        if (isLoading) {
            return <FallbackLoader width={'100%'} height={'40px'} thickness={1}/>
        } else if (isSuccess && data) {
            return (
                data?.tags.map((item, index) => (
                    <TabSpan key={item.split(' ')[0] + index} onClick={()=> navigate(`/question/tags/${item}`)}>
                        {item}
                    </TabSpan>
                ))
            )
        } else if (isError && !isLoading) {
            return <span>Error Occurred</span>
        }
    }

    return (
        <>
            <Wrapper>
                <TabBar id={"questionTabBar"} ref={tabBarRef}>
                    <IconWrapper onClick={()=> setIsModelOpen(true)}>
                        <BiPlus/>
                    </IconWrapper>
                    <TabListContent/>
                </TabBar>
                {isScrollButton.right && (
                    <RightButton onClick={() => handleDivScroll('right', 'questionTabBar')}>
                        <FaChevronRight/>
                    </RightButton>
                )}

                {isScrollButton.left && (
                    <LeftButton onClick={() => handleDivScroll('left', 'questionTabBar')}>
                        <FaChevronLeft/>
                    </LeftButton>
                )}
            </Wrapper>

            {isModelOpen && (
                <FavouriteTagsModel
                    isModelOpen={isModelOpen}
                    onClose={()=> setIsModelOpen(false)}
                    data={data ? data : []}
                    refetch={refetch}
                />
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 44px;
    position: relative;
`;

const TabBar = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    gap: 25px;
    padding: 5px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const IconWrapper = styled.div`
    height: 100%;
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    aspect-ratio: 1/1;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    color: rgba(255, 255, 255, 0.7);

    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const TabSpan = styled.button`
    font-size: clamp(0.75rem, 0.6544rem + 0.5882vw, 0.875rem);
    white-space: nowrap;
    font-weight: 400;
    height: 100%;
    letter-spacing: 1px;
    border: none;
    outline: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    touch-action: manipulation;
    -ms-touch-action: manipulation;

    &:hover {
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        color: rgba(255, 255, 255, 0.8);
    }
`;

const ScrollButton = css`
    position: absolute;
    height: 100%;
    aspect-ratio: 1/1;
    color: rgba(255, 255, 255, 0.7);
    top: 4px;
    font-size: 18px;
    border: none;
    outline: none;
    right: 0;
    background: linear-gradient(to right, transparent, #0c0c0c, #0c0c0c);
    cursor: pointer;
    touch-action: manipulation;
    -ms-touch-action: manipulation;

    &:hover {
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        color: rgba(255, 255, 255, 0.8);
    }
`;

const RightButton = styled.button`
    ${ScrollButton};
    right: 0;
    background: linear-gradient(to right, transparent, #0c0c0c, #0c0c0c);
`;

const LeftButton = styled.button`
    ${ScrollButton};
    left: 0;
    background: linear-gradient(to left, transparent, #0c0c0c, #0c0c0c);
`;

const MemoizedQuestionsTabBar = React.memo(QuestionsTabBar);

export default MemoizedQuestionsTabBar;