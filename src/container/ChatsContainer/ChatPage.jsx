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

import React, {Suspense} from 'react';
import BloggiosSidebarBase from "../boundries/bloggiosSidebarBase";
import styled from "styled-components";
import useComponentSize from "../../hooks/useComponentSize";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ProfileSuggestions from "../../component/Cards/ProfileSuggestions";
import {colors} from "../../styles/Theme";
import FallbackLoader from "../../component/loaders/fallbackLoader";
import MessagingComponent from "../../component/Messaging/MessagingComponent";

const ChatPage = () => {

    const [sectionRef, sectionSize] = useComponentSize();
    const {width} = useWindowDimensions();

    return (
        <BloggiosSidebarBase>
            <Wrapper>
                <LeftSection ref={sectionRef}>
                    <Suspense fallback={<FallbackLoader width={sectionSize.width} height={'400px'}/>}>
                        <MessagingComponent/>
                    </Suspense>
                </LeftSection>
                <RightSection>
                    {width > 1050 && <ProfileSuggestions/>}
                </RightSection>
            </Wrapper>
        </BloggiosSidebarBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 20px 20px 20px 10px;
    gap: 20px;

    @media (max-width: 700px) {
        padding: 10px;
    }
`;

const LeftSection = styled.div`
    max-width: 75%;
    width: 75%;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 25px;
    height: calc(100vh - 40px);
    border-radius: 20px;
    overflow: hidden;
    user-select: none;
    background-color: ${colors.black400};
    padding: 20px;
    
    @media (max-width: 700px) {
        height: calc(100vh - 160px);
    }
    
    @media (max-width: 1050px) {
        max-width: 100%;
        width: 100%;
    }
`;

const RightSection = styled.div`
    max-width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1050px) {
        display: none;
        max-width: none;
    }
`;

const Header = styled.h2`
    font-size: clamp(1rem, 0.5851rem + 2.5532vw, 2.5rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 500;
    color: ${colors.white80};
`;

export default ChatPage;