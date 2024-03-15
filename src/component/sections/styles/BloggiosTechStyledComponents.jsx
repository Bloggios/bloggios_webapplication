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

import styled, {css, keyframes} from "styled-components";

const Wrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    user-select: none;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
`;

const Introducing = styled.h2`
    font-size: clamp(1.5625rem, 0.5093rem + 6.4815vw, 3.75rem);
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    letter-spacing: 1px;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(270deg, #ee4700, #ffb628);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Heading = styled.h1`
    font-size: clamp(1.875rem, 0.3704rem + 9.2593vw, 5rem);
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    letter-spacing: 1px;
    font-family: 'Poppins', sans-serif;
`;

const SubText = styled.h4`
    font-size: clamp(1.125rem, 0.463rem + 4.0741vw, 2.5rem);
    font-weight: 400;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
`;

const ButtonGroup = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const ButtonStyles = css`
    border: none;
    outline: none;
    padding: 10px 20px;
    font-size: clamp(0.625rem, 0.3241rem + 1.8519vw, 1.25rem);
    border-radius: 10px;
    color: #f5f5f5;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    cursor: pointer;
    
    @media (max-width: 500px) {
        padding: 6px 10px; 
    }
`;

const ExploreProjects = styled.button`
    ${ButtonStyles};
    background: #4258ff;
`;

const NavigateButton = styled.button`
    ${ButtonStyles};
    background: transparent;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    
    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
`;

export {
    Wrapper,
    Introducing,
    Heading,
    SubText,
    ButtonGroup,
    ExploreProjects,
    NavigateButton
}