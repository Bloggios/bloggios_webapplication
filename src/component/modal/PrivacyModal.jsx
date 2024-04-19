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
import {colors} from "../../styles/Theme";
import FadeModal from "./FadeModal";
import styled from "styled-components";
import {bgBlackRounded} from "../../asset/svg";
import {
    PRIVACY_POLICY_PAGE,
    PRIVACY_TERMS_KEY_LOCAL_STORAGE,
    TERMS_AND_CONDITION_PAGE
} from "../../constant/ServiceConstants";
import {dispatchWarningMessage} from "../../service/functions";
import {useDispatch} from "react-redux";

const PrivacyModal = ({
    isModelOpen,
    onClose,
                      }) => {

    const dispatch = useDispatch();

    const handleAgree = () => {
        localStorage.setItem(PRIVACY_TERMS_KEY_LOCAL_STORAGE, 'true');
        onClose();
    }

    const handleDisagree = () => {
        window.alert('To proceed, kindly acknowledge our Terms and Privacy Policy');
        dispatchWarningMessage(dispatch, 'To proceed, kindly acknowledge our Terms and Privacy Policy');
    }

    return (
        <FadeModal
            isOpen={isModelOpen}
            onClose={onClose}
            height={'fit-content'}
            width={'clamp(250px, 95%, 550px)'}
            bgColor={colors.black70}
            padding={'20px'}
            margin={'70px 0 0 0'}
            borderRadius={'20px'}
        >
            <Wrapper>
                <Image>
                    <img src={bgBlackRounded} alt="Bloggios"/>
                </Image>
                <Heading1>
                    Terms and Privacy Policy
                </Heading1>

                <Paragraph>
                    Before proceeding, kindly review our Terms and Privacy Policy. By clicking 'Accept', you agree to abide by these terms.
                </Paragraph>

                <UnorderedList>
                    <li>
                        <strong>Privacy Policy</strong>
                        &nbsp;
                        <Link href={process.env.REACT_APP_PRIVACY_POLICY} target={'_blank'}>Bloggios Privacy Policy Details</Link>
                    </li>
                    <li>
                        <strong>Terms and Condition</strong>
                        &nbsp;
                        <Link href={process.env.REACT_APP_TERMS_CONDITION} target={'_blank'}>Bloggios Terms and Conditions Details</Link>
                    </li>
                </UnorderedList>

                <Paragraph>
                    Your use of our application is contingent upon acceptance of these terms.
                </Paragraph>

                <ButtonGroup>
                    <button onClick={handleDisagree}>Disagree</button>
                    <button onClick={handleAgree}>Agree</button>
                </ButtonGroup>
            </Wrapper>
        </FadeModal>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
`;

const Heading1 = styled.h1`
    font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
    letter-spacing: 2px;
    font-weight: 600;
    color: ${colors.white100};
    font-family: inherit;
    text-align: center;
`;

const Paragraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
`;

const Link = styled.a`
    font-family: "Poppins", sans-serif;
    font-size: inherit;
    text-decoration: none;
    color: #007bff;
`;

const UnorderedList = styled.ul`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    padding-left: 25px;
    
    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
    }
`;

const Image = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & > img {
        height: 52px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
    }
`;

const ButtonGroup = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-self: flex-end;
    
    & > button {
        border-radius: 10px;
        color: ${colors.white80};
        padding: 7px 10px;
        cursor: pointer;
        
        &:hover, &:active {
            color: ${colors.white100};
        }
    }
    
    & > button:first-child {
        border: 1px solid ${colors.white80};
        background: transparent;
    }
    
    & > button:last-child {
        background-color: ${colors.accent80};
        border: none;
    }
`;

export default PrivacyModal;