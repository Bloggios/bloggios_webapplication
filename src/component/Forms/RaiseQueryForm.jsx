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
import {useSelector} from "react-redux";
import styled, {css} from "styled-components";
import {colors} from "../../styles/Theme";

const RaiseQueryForm = () => {
    const [isChecked, setIsChecked] = useState(false);
    const {name, email} = useSelector((state)=> state.profile);
    const {isAuthenticated} = useSelector((state)=> state.auth);
    const [data, setData] = useState({
        name: isAuthenticated && name ? name : '',
        email: isAuthenticated && email ? email : '',
        phone: '',
        message: ''
    });

    const handleInputChange = (event, property) => {
        setData(prevState => ({
            ...prevState, [property] : event.target.value
        }));
    }

    return (
        <Wrapper>
            <Field>
                <Label>
                    Name
                </Label>
                <Input
                    type={'text'}
                    inputMode={'text'}
                    placeholder={'Name'}
                    value={data.name}
                    onChange={(event)=> handleInputChange(event, 'name')}
                />
            </Field>

            <RowWrapper>
                <Field>
                    <Label>
                        Email
                    </Label>
                    <Input
                        type={'text'}
                        inputMode={'email'}
                        placeholder={'ab@bloggios.com'}
                        value={data.email}
                        onChange={(event)=> handleInputChange(event, 'email')}
                    />
                </Field>
                <Field>
                    <Label>
                        Contact
                    </Label>
                    <Input
                        type={'number'}
                        inputMode={'tel'}
                        placeholder={'+917777777777'}
                        value={data.phone}
                        onChange={(event)=> handleInputChange(event, 'phone')}
                    />
                </Field>
            </RowWrapper>

            <Field>
                <Label>
                    Your Query
                </Label>
                <TextArea
                    rows={4}
                    placeholder={'Enter your Query in detail'}
                    value={data.message}
                    onChange={(event)=> handleInputChange(event, 'message')}
                />
            </Field>

            <Checkbox>
                <CheckboxContainer>
                    <HiddenCheckbox checked={isChecked} onChange={()=> setIsChecked(!isChecked)} />
                    <StyledCheckbox checked={isChecked}>
                        <CheckIcon viewBox="0 0 24 24" checked={isChecked}>
                            <polyline points="20 6 9 17 4 12" />
                        </CheckIcon>
                    </StyledCheckbox>
                </CheckboxContainer>
                <span>
                    By continuing, you agree to store input data on Bloggios
                </span>
            </Checkbox>

            <SubmitButton disabled={!isChecked}>
                Submit
            </SubmitButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    @media (max-width: 500px) {
        padding: 10px;
    }
`;

export const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    margin-top: 20px;
    min-width: 100px;
`;

export const FieldStyle = css`
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 400;
    
    @media (max-width: 400px) {
        font-size: 12px;
    }
`;

export const Label = styled.label`
    ${FieldStyle};
    color: rgba(0, 0, 0, 0.8);
`;

export const Input = styled.input`
    ${FieldStyle};
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    color: ${colors.black400};
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus, &:active {
        color: ${colors.black500};
    }
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    
    @media (max-width: 400px) {
        flex-direction: column;
    }
`;

const SelectStyle = styled.select`
    ${FieldStyle};
    display: inline-block;
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    color: ${colors.black400};
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;

    &::-ms-expand {
        display: none;
    }

    & option {
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
    }
`;

const TextArea = styled.textarea`
    ${FieldStyle};
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    color: ${colors.black400};
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    resize: none;
`;

const Checkbox = styled.div`
    ${FieldStyle};
    display: flex;
    align-items: flex-start;
    padding: 10px;
    color: ${colors.black400};
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    gap: 10px;
    
    & span {
        ${FieldStyle};
    }
`;

const CheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    background: ${props => (props.checked ? colors.accent100 : 'rgba(0, 0, 0, 0.1)')};
    border: 2px solid ${colors.accent100};
    transition: all 0.2s;
    border-radius: 5px;
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: ${colors.white100};
  stroke-width: 2px;
  visibility: ${props => (props.checked ? 'visible' : 'hidden')};
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.accent100};
    color: ${colors.white80};
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    outline: none;
    width: fit-content;
    align-self: flex-end;
    cursor: pointer;
    
    &:hover, &:active {
        color: ${colors.white100};
    }
    
    &:disabled {
        background: ${colors.accent70};
        color: ${colors.white80};
        cursor: not-allowed;
    }
`;

export default RaiseQueryForm;