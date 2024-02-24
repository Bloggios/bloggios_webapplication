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
import styled from "styled-components";
import Avatar from "../avatars/avatar";
import Typography from "../typography/typography";
import FilledButton from "../buttons/FilledButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ProfileCard = ({
                         name,
                         bio,
                         coverImage,
                         profileImage,
                         followers,
                         following,
                         email
                     }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {userId} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Wrapper>
            <CoverImageWrapper
                src={coverImage}
                loading={"lazy"}
            />
            <Avatar
                position={'absolute'}
                top={'30%'}
                left={'50%'}
                image={profileImage}
                translate={'translateX(-50%)'}
                size={'76px'}
            />
            <FollowWrapper>
                <ColumnTextWrapper>
                    <Typography type={'normal'} text={followers} family={'Poppins'}/>
                    <Typography text={'Follower'} type={'caption'} family={'Poppins'}/>
                </ColumnTextWrapper>

                <ColumnTextWrapper>
                    <Typography type={'normal'} text={following} family={'Inter'}/>
                    <Typography text={'Following'} type={'caption'} family={'Inter'}/>
                </ColumnTextWrapper>
            </FollowWrapper>

            <InformationWrapper>
                <Typography text={name} type={'custom'} family={'Inter'} size={'20px'} weight={300} spacing={'1px'}/>
                <Typography text={email} type={'custom'} family={'Inter'} size={'14px'} weight={200}
                            color={'rgba(255, 255, 255, 0.4)'}/>
            </InformationWrapper>

            <BioWrapper>
                <TextSpan>
                    {bio}
                </TextSpan>
            </BioWrapper>

            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '25px 0 4px 0'
            }}>
                <FilledButton
                    onClick={()=> navigate('/profile/' + userId)}
                    borderRadius={'0 0 16px 16px'}
                />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 250px;
  height: auto;
  width: clamp(200px, 95%, 300px);
  background-color: #272727;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid transparent;
  position: relative;
  flex-direction: column;
  user-select: none;
`;

const CoverImageWrapper = styled.img`
  aspect-ratio: 16/9;
  width: 100%;
  height: 140px;
  object-fit: cover;
  object-position: left center;
`;

const FollowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 1vw;
`;

const ColumnTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 20px 0 25px 0;
`;

const BioWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
`;

const TextSpan = styled.div`
  max-height: 2.9em;
  line-height: 1.4;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 200;
  white-space: pre-line;
`;

export default ProfileCard;