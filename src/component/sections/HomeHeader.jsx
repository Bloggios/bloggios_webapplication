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
import {useNavigate} from "react-router-dom";
import {HOME_PAGE, SIGNUP_PAGE} from "../../constant/pathConstants";
import MemoizedScrollDownAnimatedButton from "../animations/ScrollDownAnimatedButton";
import BgTransition from "../animations/BgTransition";
import {useSelector} from "react-redux";

const HomeHeader = () => {

    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state)=> state.auth);

    const handleScroll = () => {
        const element = document.getElementById('transitionSection');
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        })
    }

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate(HOME_PAGE);
        } else {
            navigate(SIGNUP_PAGE);
        }
    }

    return (
        <BgTransition component={'main'} delay={0.2}>
            <Wrapper>
                <SubText>
                    Concatenate Perceptions
                </SubText>
                <HeadingText>
                    BLOGGIOS
                </HeadingText>
                <MottoText>
                    Where Software Meets Social, Learning, and More.
                </MottoText>
                <StreamlinedText>
                    Your digital partner for software mastery, social influence, immersive learning, and seamless forms. We transcend boundaries, fostering innovation and crafting a dynamic digital experience. Elevate your journey with Bloggios—where code meets community, and possibilities unfold effortlessly.
                </StreamlinedText>
                <GetStartedButton onClick={handleButtonClick} className="full-rounded">
                    <span>{isAuthenticated ? 'My Home' : 'Get Started'}</span>
                    <div className="border full-rounded"></div>
                </GetStartedButton>
                <MemoizedScrollDownAnimatedButton
                    margin={'10px 0 0 0'}
                    onClick={handleScroll}
                />
            </Wrapper>
        </BgTransition>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 72px);
    align-items: center;
    justify-content: center;
    padding: 40px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    gap: 10px;
    
    @media (max-width: 400px) {
        padding: 10px;
    }

    @media(max-height: 700px) {
        padding-top: 20px;
    }

    @media (orientation: portrait) and (max-width: 700px) {
        min-height: calc(100vh - 156px);
    }
`;

const SubText = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);

    @media (orientation: landscape) and (max-height: 670px) {
        font-size: clamp(1.4rem, 3vw, 1.8rem);
    }
`;

const HeadingText = styled.h1`
  background: linear-gradient(to right, rgb(0, 168, 253), #fff 50%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.8rem, 17vw, 8rem);

    @media (orientation: landscape) and (max-height: 670px) {
        font-size: clamp(2.8rem, 17vw, 6rem);
    }
`;

const MottoText = styled.span`
    font-size: clamp(1.2rem, 3vw, 2rem);
    font-weight: 300;
    padding-top: 20px;
    text-align: center;
    width: 70%;

    @media (max-width: 700px) {
        padding-top: 10px;
    }

    @media (max-height: 740px) {
        padding-top: 10px;
    }

    @media (orientation: portrait) {
        width: 85%;
    }
    
    @media (orientation: landscape) and (max-height: 670px) {
        padding-top: 10px;
        font-size: clamp(1.2rem, 3vw, 1.7rem);
    }
`;

const StreamlinedText = styled.p`
    margin-top: 40px;
    font-size: clamp(0.8rem, 3vw, 1.4rem);
    width: 70%;
    text-align: center;
    font-weight: 200;

    @media (orientation: portrait) {
        width: 90%;
    }

    @media (max-height: 740px) {
        width: 90%;
        margin-top: 20px;
    }

    @media (orientation: landscape) and (max-height: 670px) {
        width: 90%;
        margin-top: 20px;
        font-size: clamp(0.8rem, 3vw, 1.2rem);
    }
`;

const GetStartedButton = styled.button`
  font-size: 16px;
  position: relative;
  margin-top: 30px;
  padding: 1em 2.5em;
  border: none;
  background: #fff;
  transition: all 0.1s linear;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  z-index: 0;
  
  &:active {
    transform: scale(0.95);
  }

  span {
    color: #464646;
  }

  .border {
    position: absolute;
    border: 0.15em solid #fff;
    transition: all 0.3s 0.08s linear;
    top: 50%;
    left: 50%;
    width: 9em;
    height: 3em;
    transform: translate(-50%, -50%);
    border-radius: 2em;
  }

  &:hover .border {
    display: block;
    width: 11em;
    height: 3.7em;
  }

  &.full-rounded {
    border-radius: 2em;
  }
`;

const MemoizedHomeHeader = React.memo(HomeHeader);
export default MemoizedHomeHeader;