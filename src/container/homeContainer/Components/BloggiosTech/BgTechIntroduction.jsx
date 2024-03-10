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
import styled, {keyframes} from "styled-components";

const BgTechIntroduction = () => {
    return (
        <Wrapper>
            <LeftSection>
                Rohit
            </LeftSection>
            <RightSection>
                <AnimatedBlob />
            </RightSection>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-height: 250px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const RightSection = styled.div`
    flex: 1;
`;

const LeftSection = styled.div`
    flex: 1;
    background-color: #4258ff;
`;

const BlobAnimation = keyframes`
    0%, 100%{
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    50%{
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
`;

const AnimatedBlob = styled.div`
    background-image: url(/bloggios_wide.svg);
    width: 380px;
    height: 380px;
    background-size: cover;
    -moz-background-size: cover;
    background-position: center center;
    margin: 20px;
    box-shadow: 0 5px 5px 5px rgba(13, 110, 253, 0.2);
    animation: ${BlobAnimation} 5s ease-in-out infinite;
    transition: all 1s ease-in-out;
`;

const MemoizedBgTechIntroduction = React.memo(BgTechIntroduction);

export default MemoizedBgTechIntroduction;