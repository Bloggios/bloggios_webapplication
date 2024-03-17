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
import BloggiosBase from "./bloggiosBase";
import LoginComponent from "../../component/authentication/LoginComponent";
import AuthCarouselSection from "../../component/sections/AuthCarouselSection";

const AuthBase = ({
                      title,
                      smallSubTitle,
                      longSubTitle,
                      children
                  }) => {
    return (
        <BloggiosBase>
            <Wrapper>
                <FormSection>
                    {children}
                </FormSection>

                <InformationSection>
                    <AuthCarouselSection
                        title={title}
                        smallSubTitle={smallSubTitle}
                        longSubTitle={longSubTitle}
                    />
                </InformationSection>
            </Wrapper>
        </BloggiosBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    height: calc(100vh - 72px);
    box-sizing: border-box;
    transition: all 400ms ease-in-out;
    
    @media (max-width: 700px) {
        margin-bottom: 74px;
    }

    @media (orientation: portrait) and (max-width: 700px) {
        height: auto;
    }
`;

const FormSection = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1400px) {
        width: 34%;
    }

    @media (max-width: 1000px) {
        width: 40%;
    }

    @media (max-width: 800px) {
        width: 100%;
    }
    
    @media (orientation: portrait) and (max-width: 700px) {
        align-items: flex-start;
        margin-top: 20px;
    }
`;

const InformationSection = styled.div`
    width: 50%;
    display: flex;
    padding: 20px;

    @media (max-width: 1400px) {
        width: 66%;
    }

    @media (max-width: 1000px) {
        width: 60%;
    }
    
    @media (max-width: 800px) {
        display: none;
    }
`;

export default AuthBase;