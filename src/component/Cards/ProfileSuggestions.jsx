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
import SmallProfileCard from "./SmallProfileCard";

const ProfileSuggestions = () => {
    return (
        <Wrapper>
            <TitleSpan>
                New Accounts
            </TitleSpan>

            <ProfileCardWrapper>
                <SmallProfileCard name={'Rohit Parihar'} email={'rohitparih@gmail.com'} bio={'Developer of Bloggios application\n' +
                    'Software Developer'} />
                <SmallProfileCard name={'Rakesh Shaw'} email={'rakesh5.cu@gmail.com'} bio={'Tester of Bloggios application'} />
                <SmallProfileCard name={'Atharva Gawande'} email={'atharvagawande19@gmail.com'} bio={'Developer and Tester of Bloggios Application\nSoftware Engineer'} />
                <SmallProfileCard name={'Tarun Bisht'} email={'tarun@gmail.com'} />
                <SmallProfileCard name={'Rohit Parihar'} email={'rohitparih@gmail.com'} bio={'Developer of Bloggios application\n' +
                    'Software Developer'} />
                <SmallProfileCard name={'Rakesh Shaw'} email={'rakesh5.cu@gmail.com'} bio={'Tester of Bloggios application'} />
            </ProfileCardWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    height: auto;
    width: clamp(200px, 95%, 300px);
    background-color: #272727;
    border-radius: 20px;
    overflow: hidden;
    user-select: none;
    padding: 20px 16px;
    flex-direction: column;
    gap: 20px;
`;

const TitleSpan = styled.span`
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 1px;
`;

const ProfileCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

export default ProfileSuggestions;