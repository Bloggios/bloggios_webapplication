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

import styled, {css} from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    flex-direction: column;
    height: auto;
    padding: 40px 0;
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
    
    @media (max-width: 800px) {
        grid-template-columns: repeat(3, minmax(100px, 1fr));
    }

    @media (max-width: 500px) {
        grid-template-columns: repeat(2, minmax(100px, 1fr));
    }

    @media (max-width: 300px) {
        grid-template-columns: repeat(1, minmax(100px, 1fr));
    }
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

    @media (max-width: 500px) {
        height: 50px;
    }
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

const WhyUsButton = styled.button`
    border: 1px solid rgba(255, 182, 40, 0.7);
    outline: none;
    padding: 10px 20px;
    font-size: clamp(0.625rem, 0.3241rem + 1.8519vw, 1.25rem);
    border-radius: 10px;
    color: rgba(245, 245, 245, 0.7);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
    cursor: pointer;

    &:hover {
        border: 1px solid rgba(255, 182, 40, 1);
        color: rgba(245, 245, 245, 1);
    }

    &:active {
        border: 1px solid rgba(255, 182, 40, 0.8);
        color: rgba(245, 245, 245, 0.8);
    }

    @media (max-width: 500px) {
        padding: 6px 10px;
    }
`;

const Divider = styled.div`
    width: 50%;
    display: flex;
    margin: 70px 0;
    align-items: center;
    border-top: 1px solid #8191ff;
`;

const Thoughts = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    width: 55%;
    
    @media (max-width: 1500px) {
        width: 75%;
    }

    @media (max-width: 800px) {
        width: 95%;
        gap: 20px;
    }
    
    @media (max-width: 400px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;

const ThoughtTitle = styled.span`
    font-size: clamp(1.125rem, 0.7447rem + 2.3404vw, 2.5rem);
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;

    & strong {
        background: linear-gradient(270deg, #ee4700, #ffb628);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
    }
    
    @media (max-width: 400px) {
        text-align: center;
    }
`;

const SummaryDiv = styled.div`
    letter-spacing: 1px;
    margin-top: 10px;
    text-align: justify;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    & p {
        font-size: clamp(0.75rem, 0.5771rem + 1.0638vw, 1.375rem);
    }
    
    & h4 {
        font-size: clamp(0.875rem, 0.6848rem + 1.1702vw, 1.5625rem);
    }
`;

export {
    Wrapper,
    WhyUs,
    Cards,
    Card,
    Icon,
    Label,
    Title,
    WhyUsButton,
    Divider,
    Thoughts,
    ThoughtTitle,
    SummaryDiv
}