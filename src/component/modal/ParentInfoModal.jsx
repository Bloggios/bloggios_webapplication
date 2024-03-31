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

import React, {useCallback} from 'react';
import FadeModal from "./FadeModal";
import {colors} from "../../styles/Theme";
import PropTypes from "prop-types";
import styled from "styled-components";
import {bgAccentRounded} from "../../asset/svg";
import IconButton from "../buttons/IconButton";
import {AiOutlineClose} from "react-icons/ai";

const ParentInfoModal = ({
                             isModelOpen,
                             onClose,
                             title,
                             summary = 'You are currently accessing the Bloggios platform in the development sandbox environment (devsandbox). Please note that devsandbox is exclusively for authorized users. If you are not authorized, kindly close this tab and visit bloggios.com, which is accessible to all users. Unauthorized access to devsandbox may result in appropriate actions being taken. Thank you for your cooperation.',
                             type = 'Information'
                         }) => {

    const getContentData = useCallback(() => {
        return (
            <>
                <Header>
                    <img src={bgAccentRounded} alt="Bloggios" height={'40px'}/>
                    <IconButton onClick={onClose}>
                        <AiOutlineClose/>
                    </IconButton>
                </Header>
                {type && (
                    <Title>
                        {type}
                    </Title>
                )}

                {summary && (
                    <Summary>
                        {summary}
                    </Summary>
                )}
            </>
        )
    }, [summary, onClose, type])
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
            gap={'20px'}
        >
            {getContentData()}
            <Button onClick={onClose}>
                OK
            </Button>
        </FadeModal>
    );
};

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

const Title = styled.h4`
    font-size: clamp(1rem, 0.8617rem + 0.8511vw, 1.5rem);
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
`;

const Summary = styled.div`
    width: 100%;
    display: flex;
    max-height: 400px;
    overflow-y: auto;
    -ms-overflow-y: auto;
    font-size: clamp(0.625rem, 0.5559rem + 0.4255vw, 0.875rem);
    color: ${colors.white80};
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
    text-align: justify;
`;

const Button = styled.button`
    align-self: flex-end;
    padding: 5px 10px;
    font-size: clamp(0.625rem, 0.5213rem + 0.6383vw, 1rem);
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background: ${colors.accent80};
    border-radius: 10px;
    
    &:hover, &:active {
        background: ${colors.accent100};
    }
`;

ParentInfoModal.propTypes = {
    isModelOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default ParentInfoModal;