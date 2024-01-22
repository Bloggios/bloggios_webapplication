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
import {SlOptionsVertical} from "react-icons/sl";
import FadeModal from "../modal/FadeModal";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import {BiImageAdd} from "react-icons/bi";
import authenticatedAxiosInterceptor from "../../restservices/AuthenticatedAxiosInterceptor";
import {authenticatedAxios} from "../../restservices/baseAxios";
import {ADD_IMAGE_TO_PROFILE} from "../../constant/apiConstants";
import {getProfile} from "../../restservices/profileApi";
import {setProfile} from "../../state/profileSlice";
import {useDispatch} from "react-redux";
import {setSnackbar} from "../../state/snackbarSlice";
import {FaRegUser} from "react-icons/fa";
import useComponentSize from "../../hooks/useComponentSize";

const ProfileCard = ({
                         name,
                         bio,
                         coverImage,
                         profileImage,
                         followers,
                         following,
                         path,
                         email
                     }) => {

    const {width} = useWindowDimensions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pImage, setPImage] = useState(profileImage);
    const dispatch = useDispatch();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageChange = (e, uploadFor) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('uploadFor', uploadFor);

                authenticatedAxios.post(ADD_IMAGE_TO_PROFILE, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        const snackbarData = {
                            isSnackbar: true,
                            message: `${uploadFor === 'profile' ? 'Profile' : 'Cover'} Image Added Successfully. It may take time to Reflect on Profile`,
                            snackbarType: 'Success',
                        };
                        dispatch(setSnackbar(snackbarData));
                        setTimeout(() => {
                            getProfile().then((response) => {
                                const { data } = response;
                                const profileData = {
                                    name: data.name,
                                    isAdded: true,
                                    profileImageUrl: null,
                                    bio: data.bio,
                                    email: data.email,
                                    profileImage: data.profileImage,
                                    coverImage: data.coverImage,
                                };
                                dispatch(setProfile(profileData));
                            });
                        }, 1600);
                    })
                    .catch((error) => {
                        const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                        const snackBarData = {
                            isSnackbar: true,
                            message: message,
                            snackbarType: 'Error',
                        };
                        dispatch(setSnackbar(snackBarData));
                    });
            };

            reader.readAsDataURL(file);
        }
        closeModal();
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
                    borderRadius={'0 0 16px 16px'}
                />
            </div>
            <FloatingButton onClick={openModal}>
                <SlOptionsVertical/>
            </FloatingButton>

            <FadeModal
                height={'fit-content'}
                width={'300px'}
                padding={'20px'}
                borderRadius={'16px'}
                margin={'40px 0 0 0'}
                isOpen={isModalOpen}
                onClose={closeModal}
                bgColor={'#272727'}
            >
                <ModalLogoWrapper>
                    <img src={bloggios_logo} alt="Bloggios" height={'60px'}/>
                </ModalLogoWrapper>

                <AddImageButtonWrapper htmlFor="image-input">
                    <span>Upload Profile Image</span>
                    <FaRegUser fontSize={'25px'} color='#28c916'/>
                    <input
                        type="file"
                        accept="image/*"
                        id="image-input"
                        style={{display: 'none'}}
                        onChange={(e)=> handleImageChange(e, 'profile')}
                    />
                </AddImageButtonWrapper>

                <AddImageButtonWrapper htmlFor="cover-input">
                    <span>Upload Cover Image</span>
                    <BiImageAdd fontSize={'25px'} color='#28c916'/>
                    <input
                        type="file"
                        accept="image/*"
                        id="cover-input"
                        style={{display: 'none'}}
                        onChange={(e)=> handleImageChange(e, 'cover')}
                    />
                </AddImageButtonWrapper>
            </FadeModal>
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

const FloatingButton = styled.button`
  position: absolute;
  height: 30px;
  width: 30px;
  border: 1px solid transparent;
  outline: none;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ModalLogoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const AddImageButtonWrapper = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  text-decoration: none;
  margin: 20px 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  opacity: 0.6;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.6);
    bottom: -7px;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .3s ease-in-out;
  }

  &:hover {
    opacity: 1;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export default ProfileCard;