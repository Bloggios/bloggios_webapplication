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
import Avatar from "../avatars/avatar";
import ChipButton from "../buttons/chipButton";
import {HiHashtag, HiOutlinePhotograph} from "react-icons/hi";
import {CgOptions} from "react-icons/cg";
import {GoMention} from "react-icons/go";

const CreatePostWeb = () => {
    return (
        <Wrapper>
            <RowWrapper>
                <Avatar
                    size={'60px'}
                    position={'relative'}
                    left={'0'}
                    image={'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                />
                <InputField
                    rows={3}
                    spellCheck={false}
                    draggable={true}
                    placeholder={"Let's Share your Perceptions"}
                />
            </RowWrapper>

            <ButtonsWrapper>
                <ChipButton
                    text={'Photo'}
                    icon={<HiOutlinePhotograph color={'#1fe49e'} fontSize={'20px'} />}
                />

                <ChipButton
                    text={'Hashtag'}
                    icon={<HiHashtag color={'#f27c7c'} fontSize={'20px'} />}
                />

                <ChipButton
                    text={'Poll'}
                    icon={<CgOptions color={'#529dff'} fontSize={'20px'} />}
                />

                <ChipButton
                    text={'Mention'}
                    icon={<GoMention color={'#d9b25f'} fontSize={'20px'} />}
                />
            </ButtonsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 95%;
  height: auto;
  background-color: #272727;
  border-radius: 20px;
  padding: 20px;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const InputField = styled.textarea`
  flex-grow: 1;
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  min-height: 20px;
  background: rgba(0, 0, 0, 0.1);
  outline: 2px solid rgba(255, 255, 255, 0.2);
  border: none;
  color: #e5e5e5;
  font-family: 'Inter', sans-serif;
  letter-spacing: 2px;
  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin: 28px 0 20px 0;
  @media (max-width: 450px) {
    justify-content: space-around;
  }
  
  @media(min-width: 1400px) {
    justify-content: space-around;
  }
`;

export default CreatePostWeb;