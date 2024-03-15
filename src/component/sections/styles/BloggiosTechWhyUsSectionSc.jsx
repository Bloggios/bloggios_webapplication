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

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    flex-direction: column;
    padding-top: 80px;
`;

const WhyUs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    gap: 20px;
    padding: 10px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background: #4258ff;
    max-width: 300px;
`;

const Icon = styled.img`
    height: 70px;
    aspect-ratio: 1/1;
`;

const Label = styled.span`
    font-size: clamp(0.875rem, 0.6993rem + 1.0811vw, 1.375rem);
    font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
    font-size: clamp(1.125rem, 0.4223rem + 4.3243vw, 3.125rem);
    color: #f5f5f5;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 600;
    
    & strong {
        background: linear-gradient(270deg, #ee4700, #ffb628);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
    }
`;

export {
    Wrapper,
    WhyUs,
    Cards,
    Card,
    Icon,
    Label,
    Title
}