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

import React, {useState} from 'react';
import FadeModal from "./FadeModal";
import styled, {css} from "styled-components";
import {colors} from "../../styles/Theme";
import * as Bg from '../../styles/InputFieldStyledComponent';
import {useDispatch, useSelector} from "react-redux";
import {dispatchSuccessMessage} from "../../service/functions";

const ReportModal = ({
    isModelOpen,
    onClose,
    data : reportData
                     }) => {

    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state)=> state.auth);
    const {name, email} = useSelector((state)=> state.profile);

    const [data, setData] = useState({
        name: isAuthenticated && name ? name : '',
        email: isAuthenticated && email ? email : '',
        message: ''
    });

    const handleInputChange = (event, property) => {
        setData(prevState => ({
            ...prevState, [property] : event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({...data, ...reportData});
        dispatchSuccessMessage(dispatch, 'Bug Reported');
        onClose();
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
                <h4>Report Bug</h4>

                <Form onSubmit={handleSubmit}>
                    <Bg.Field>
                        <Bg.Label>
                            Name
                        </Bg.Label>
                        <Bg.Input
                            type={'text'}
                            inputMode={'text'}
                            maxLength={40}
                            placeholder={'Your Name'}
                            value={data.name}
                            onChange={(event) => handleInputChange(event, 'name')}
                        />
                    </Bg.Field>

                    <Bg.Field>
                        <Bg.Label>
                            Email
                        </Bg.Label>
                        <Bg.Input
                            type={'email'}
                            inputMode={'email'}
                            maxLength={40}
                            placeholder={'Your Email'}
                            value={data.email}
                            onChange={(event) => handleInputChange(event, 'email')}
                        />
                    </Bg.Field>

                    <Bg.Field>
                        <Bg.Label>
                            Message
                        </Bg.Label>
                        <Bg.TextArea
                            rows={4}
                            spellCheck={false}
                            maxLength={200}
                            value={data.message}
                            onChange={(event) => handleInputChange(event, 'message')}
                            placeholder={'Please describe issue here'}
                        />
                    </Bg.Field>

                    <Button>
                        Report
                    </Button>
                </Form>
            </Wrapper>
        </FadeModal>
    );
};

const FlexStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Wrapper = styled.div`
    ${FlexStyle};
    
    & > h4 {
        font-size: clamp(1.125rem, 0.9521rem + 1.0638vw, 1.75rem);
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 500;
        color: ${colors.white80};
    }
`;

const Form = styled.form`
    ${FlexStyle};
`;

const Button = styled.button`
    width: fit-content;
    padding: 7px 16px;
    background: ${colors.accent80};
    color: ${colors.white80};
    font-family: 'Poppins', sans-serif;
    font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
    letter-spacing: 1px;
    font-weight: 400;
    border: none;
    outline: none;
    border-radius: 10px;
    align-self: flex-end;
    
    &:hover, &:active {
        background: ${colors.accent100};
        color: ${colors.white100};
    }
`;

export default ReportModal;