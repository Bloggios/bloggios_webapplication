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
import styled, {css} from "styled-components";
import {colors} from "../../../styles/Theme";
import SocialLinks from "../../../component/animations/SocialLinks";
import contactInformation from '../../../asset/configurations/static/ContactInformation.json';
import {IoMdMail} from "react-icons/io";
import {FaGlobe, FaPhoneAlt} from "react-icons/fa";
import FallbackLoader from "../../../component/loaders/fallbackLoader";

const RaiseQueryForm = lazy(()=> import('../../../component/Forms/RaiseQueryForm'));

const DefaultHelpOutlet = () => {
    return (
        <Wrapper className={'wrapper-bg__accent--background'}>
            <Column className={'enquiry-format__section'}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 28}}>
                    <Header>
                        Need <strong>Assistance</strong> ?<br/>Submit your <strong>query</strong> <br/>here
                    </Header>

                    <ContactInformation>
                        <MainContact>
                            <Contact>
                                <IoMdMail />
                                <a href={`mailto:${contactInformation.data.email}`}>
                                    {contactInformation.data.email}
                                </a>
                            </Contact>

                            <Contact>
                                <FaPhoneAlt />
                                <span>
                                {contactInformation.data.contact}
                            </span>
                            </Contact>

                            <Contact>
                                <FaGlobe />
                                <a href={contactInformation.data.website} target={"_blank"}>
                                    Website
                                </a>
                            </Contact>
                        </MainContact>

                    </ContactInformation>
                </div>

                <SocialLinks />
            </Column>

            <Column className={'enquiry-form__section'}>
                <Suspense fallback={<FallbackLoader height={'100%'} width={'100%'}/>}>
                    <RaiseQueryForm />
                </Suspense>
            </Column>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 60%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-self: center;
    margin: 40px 0;
    border-radius: 16px;
    padding: 28px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    gap: 10px;
    user-select: none;

    @media (max-width: 1600px) {
        width: 70%;
    }

    @media (max-width: 1200px) {
        width: 95%;
    }

    @media (max-width: 880px) {
        flex-direction: column;
        width: 70%;
        gap: 40px;
    }

    @media (max-width: 650px) {
        width: 95%;
    }

    @media (max-width: 500px) {
        width: 98%;
        padding: 16px 7px 7px 7px;
    }
`;

const Column = styled.div`
    width: 50%;
    display: flex;
    
    &.enquiry-format__section {
        flex: 1;
        flex-shrink: 0;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        justify-content: space-between;
    }
    
    &.enquiry-form__section {
        flex: 1;
        background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
        border-radius: 16px;
    }
    
    @media (max-width: 880px) {
        width: 100%;
    }
`;

const HeaderStyles = css`
    font-size: clamp(1.375rem, 1.1676rem + 1.2766vw, 2.125rem);
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
`;

const Header = styled.h2`
    ${HeaderStyles};
    color: ${colors.white100};

    & strong {
        ${HeaderStyles};
        background: linear-gradient(270deg, #f15e1e, #ffb628);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const ContactInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MainContact = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Contact = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    color: ${colors.white80};
    cursor: pointer;
    transition: all 250ms ease-in-out;
    
    & svg {
        font-size: clamp(1.25rem, 1.1636rem + 0.5319vw, 1.5625rem);
    }
    
    & a, & span {
        text-decoration: none;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        color: inherit;
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
    }
    
    &:hover, &:active {
        background: ${colors.white100};
        color: ${colors.accent100};
    }
`;

export default DefaultHelpOutlet;