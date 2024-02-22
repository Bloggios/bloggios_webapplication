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

import styled from "styled-components";
import {FaAngleLeft, FaAngleRight, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {handleSuggestionClick} from "../../service/postApiFunctions";
import Typography from "../typography/typography";
import {handleDivScroll} from "../../service/commonFunctions";

const HorizontalTabs = ({tabsList}) => {

    const navigate = useNavigate();
    const tabsRef = useRef(null);
    const {width} = useWindowDimensions();
    const [isScrollButton, setIsScrollButton] = useState(false);

    useEffect(() => {
        const tabsContainer = tabsRef.current;
        if (tabsContainer) {
            const hasOverflow = tabsContainer.scrollWidth > tabsContainer.clientWidth;
            setIsScrollButton(hasOverflow);
        }
    }, [tabsList, width]);

    return (
        <Wrapper>
            <TabsWrapper>
                <Tabs id="suggestionWrapper" ref={tabsRef}>
                    {tabsList.map((item) => (
                        <Tab key={item.id}
                             onClick={() => navigate(item.path)}
                        >
                            {item.label}
                        </Tab>
                    ))}
                </Tabs>
                {isScrollButton && (
                    <>
                        <ScrollButton onClick={() => handleDivScroll('left')}>
                            <FaAngleLeft/>
                        </ScrollButton>
                        <ScrollButton onClick={() => handleDivScroll('right')}>
                            <FaAngleRight/>
                        </ScrollButton>
                    </>
                )}
            </TabsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 100%;
    max-width: 250px; /* Set a maximum width to prevent it from growing indefinitely */
    height: auto;
    overflow: hidden; /* Hide any potential overflow */
    box-sizing: border-box; /* Include padding in the width calculation */
`;

const TabsWrapper = styled.div`
    max-width: 100%; /* Added max-width to prevent width increase */
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

const Tabs = styled.div`
    height: 100%;
    max-width: 100%; /* Added max-width to prevent width increase */
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: clamp(20px, 4vw, 4vw);
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Tab = styled.button`
    padding: 7px 0;
    align-items: center;
    border-radius: 20px;
    border: none;
    position: relative;
    outline: none;
    flex-direction: row;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    display: inline-block;
    font-size: clamp(14px, 2vw, 16px);
    letter-spacing: 2px;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 10px;
        background-color: #6b7dfb;
        bottom: 0;
        left: 0;
        transform-origin: left;
        transform: scaleX(0.2);
        z-index: 2;
        transition: transform .3s ease-in-out;
    }

    &:hover {
        color: rgba(255, 255, 255, 1);
    }

    &:hover::before {
        transform-origin: left;
        transform: scaleX(1);
    }
`;

const ScrollButton = styled.button`
    flex-shrink: 0;
    height: 34px;
    width: 34px;
    font-size: 22px;
    outline: none;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.07);
        color: rgba(255, 255, 255, 0.9);
    }
`;

export default HorizontalTabs;