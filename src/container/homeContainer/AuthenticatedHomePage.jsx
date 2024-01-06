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

import React, {lazy, Suspense} from 'react';
import styled from "styled-components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useSelector} from "react-redux";
import FallbackLoader from "../../component/loaders/fallbackLoader";
import useSeo from "../../globalseo/useSeo";
import useComponentSize from "../../hooks/useComponentSize";

const ProfileCard = lazy(() => import('../../component/Cards/ProfileCard'));

const AuthenticatedHomePage = () => {

    useSeo('homepage')

    const {width} = useWindowDimensions();
    const {name, bio} = useSelector((state) => state.profile);
    const [middleSectionRef, middleSectionSize] = useComponentSize();
    const [leftSectionRef, leftSectionSize] = useComponentSize();

    return (
        <Wrapper>
            <LeftBar ref={leftSectionRef}>
                <Suspense fallback={<FallbackLoader height={'400px'} width={leftSectionSize.width}/>}>
                    <ProfileCard
                        name={name}
                        bio={bio}
                        coverImage={'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        profileImage={'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        path={'/beingrohit-exe'}
                        followers={0}
                        following={0}
                    />
                </Suspense>
            </LeftBar>
            <RightBar>Right Bar</RightBar>
            <MiddleBar>Width : {width}</MiddleBar>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: grid;
  margin-top: 40px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0 0;
  grid-auto-flow: row dense;
  grid-template-areas:
    "Left-Bar Middle-Bar Right-Bar";

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 2fr; /* Adjust the column layout for smaller screens */
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-areas:
    "Middle-Bar";
  }
`;

const LeftBar = styled.div`
  grid-area: Left-Bar;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;

  @media (max-width: 750px) {
    display: none; /* Hide LeftBar for screens with width less than 700px */
  }
`;

const RightBar = styled.div`
  grid-area: Right-Bar;
  background-color: yellow;

  @media (max-width: 1200px) {
    display: none; /* Hide RightBar for screens with width less than 1200px */
  }
`;

const MiddleBar = styled.div`
  grid-area: Middle-Bar;
  background-color: midnightblue;

  span {
    font-weight: bold;
  }
`;

export default AuthenticatedHomePage;