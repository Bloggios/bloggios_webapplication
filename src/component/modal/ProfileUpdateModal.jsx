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
import FadeModal from "./FadeModal";
import styled from "styled-components";
import AnimatedField from '../fields/AnimatedField';
import {BiUser} from 'react-icons/bi';

const FormGroup = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
`;

const FormField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #616161;
  outline: 0;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 400;
    }
    padding-bottom: 6px;
    font-weight: 400;
    border-width: 3px;
    border-image: linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8));
    border-image-slice: 1;
  }

  /* Reset input */
  &:required, &:invalid {
    box-shadow: none;
  }
`;

const FormLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #616161;
`;


const ProfileUpdateModal = ({
    isModelOpen,
    onClose,
    name
}) => {
    return (
        <FadeModal
            isOpen={isModelOpen}
            onClose={onClose}
            height={'fit-content'}
            width={'clamp(250px, 95%, 550px)'}
            bgColor={'#0c0c0c'}
            padding={'20px'}
            margin={'70px 0 0 0'}
            borderRadius={'20px'}
        >
            <Wrapper>
                <TitleSpan>
                    Hey, {name.split(' ')[0]}
                </TitleSpan>

                <FormWrapper>
                    <InputWrapper>
                        <AnimatedField
                            label='Name'
                            icon={<BiUser />}
                        />
                    </InputWrapper>
                </FormWrapper>
            </Wrapper>
        </FadeModal>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TitleSpan = styled.span`
    position: relative;
    display: inline-block;
    color: transparent;
    /* background: -webkit-linear-gradient(16deg,var(--bard-color-brand-text-gradient-stop-1) 0,var(--bard-color-brand-text-gradient-stop-2) 9%,var(--bard-color-brand-text-gradient-stop-3) 20%,var(--bard-color-brand-text-gradient-stop-3) 24%,var(--bard-color-brand-text-gradient-stop-2) 35%,var(--bard-color-brand-text-gradient-stop-1) 44%,var(--bard-color-brand-text-gradient-stop-2) 50%,var(--bard-color-brand-text-gradient-stop-3) 56%,var(--bard-color-surface) 75%,var(--bard-color-surface) 100%); */
    background: linear-gradient(74deg, #4285f4 0, #9b72cb 9%, #d96570 20%, #d96570 24%, #9b72cb 35%, #4285f4 44%, #4285f4 50%, #d96570 56%, #131314 75%, #131314 100%);
    background-size: 400% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: clamp(20px, 2vw, 34px);
`;

const FormWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InputWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(110px, 1fr));
    gap: 10px;
`;

export default ProfileUpdateModal;