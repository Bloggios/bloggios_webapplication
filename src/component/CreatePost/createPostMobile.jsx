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
import bloggios_logo from '../../asset/svg/bg_logo_black.svg'
import ChipButton from "../buttons/chipButton";
import {HiHashtag, HiOutlinePhotograph} from "react-icons/hi";
import {CgOptions} from "react-icons/cg";
import {GoMention} from "react-icons/go";

const CreatePostMobile = () => {
    return (
        <Wrapper>
            <RowWrapper>
                <Avatar size={'40px'} borderRadius={'10px'} image={bloggios_logo} />
            </RowWrapper>

            <RowWrapper>
                <TextArea
                    placeholder={"Let's Share your perceptions"}
                    rows={3}
                    spellCheck={false}
                    draggable={false}
                />
            </RowWrapper>

            <ChipButtonWrapper>
                <ChipButton
                    text={'Photo'}
                    height={'40px'}
                    icon={<HiOutlinePhotograph color={'#1fe49e'} fontSize={'20px'} />}
                />

                <ChipButton
                    text={'Hashtag'}
                    height={'40px'}
                    icon={<HiHashtag color={'#f27c7c'} fontSize={'20px'} />}
                />

                <ChipButton
                    text={'Poll'}
                    height={'40px'}
                    icon={<CgOptions color={'#529dff'} fontSize={'20px'} />}
                />

                <ChipButton
                    text={'Mention'}
                    height={'40px'}
                    icon={<GoMention color={'#d9b25f'} fontSize={'20px'} />}
                />
            </ChipButtonWrapper>

            <PostButtonWrapper>
                <Button>
                    Share
                </Button>
            </PostButtonWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 95%;
  min-width: 250px;
  min-height: 250px;
  height: auto;
  background-color: #272727;
  border-radius: 20px;
  padding: 10px 0; 
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  height: auto;
`;

const TextArea = styled.textarea`
  width: 95%;
  outline: 2px solid rgba(255, 255, 255, 0.2);
  border: none;
  background: #1e1e1e;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  color: #e5e5e5;
  font-size: 18px;
  line-height: 25px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
  }
`;

const ChipButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 5px;
  padding: 10px 10px;
`;

const PostButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0 0;
`;

const Button = styled.div`
  height: 50px;
  width: 95%;
  background: linear-gradient(225deg, #0c0c0c, #0a0a0a);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  user-select: none;

  &:hover {
    background: linear-gradient(225deg, #151515, #151515);
  }
`;

export default CreatePostMobile;