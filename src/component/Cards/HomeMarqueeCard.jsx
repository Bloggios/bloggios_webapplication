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
import React from "react";

const HomeMarqueeCard = ({
    image,
    key
                         }) => {
    return (
        <Wrapper key={key}>
            <ImageWrapper src={image} alt={'Bloggios'} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100px;
    aspect-ratio: 16/9;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    padding: 16px;
    border: 1px solid transparent;
    transition: all 250ms ease-in-out;
    
    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.4);
    }
    
    @media (max-width: 1000px) {
        height: 70px;
        border-radius: 16px;
        padding: 14px;
    }

    @media (max-width: 500px) {
        height: 50px;
        border-radius: 12px;
        padding: 7px;
    }
`;

const ImageWrapper = styled.img`
    height: 100%;
    width: 100%;
    opacity: 1;
`;

const MemoizedHomeMarqueeCard = React.memo(HomeMarqueeCard);
export default MemoizedHomeMarqueeCard;