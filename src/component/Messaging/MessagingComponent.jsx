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

import React, {lazy} from 'react';
import styled from "styled-components";
import {colors} from "../../styles/Theme";
import {Outlet} from "react-router-dom";

const MessagingUserList = lazy(()=> import('./NestedComponents/MessagingUserList'));
// const MobileUserSearchList = lazy(()=> import('./NestedComponents/MobileUserSearchList'));

const MessagingComponent = () => {

    return (
        <Wrapper>

            {/*{width > 600 ? (*/}
            {/*    <Suspense fallback={<FallbackLoader width={'32%'} height={'100%'} />}>*/}
            {/*        <MessagingUserList />*/}
            {/*    </Suspense>*/}
            {/*) : (*/}
            {/*    <Suspense fallback={<FallbackLoader width={'100%'} height={'70px'} thickness={2} />}>*/}
            {/*        <MobileUserSearchList />*/}
            {/*    </Suspense>*/}
            {/*)}*/}

            <MessagingUserList/>

            <MessageContainer>
                <Outlet />
            </MessageContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const MessageContainer = styled.div`
    width: 67%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${colors.black150};
    border-radius: 20px;
    padding: 20px;
    
    @media (max-width: 1000px) {
        width: 60%;
    }
    
    @media (max-width: 600px) {
        width: 100%;
        padding: 10px;
        height: calc(100% - 50px);
    }
`;

export default MessagingComponent;