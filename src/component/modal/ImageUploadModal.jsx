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
import bloggios_logo from "../../asset/svg/bg_logo_rounded_black.svg";
import {FaRegUser} from "react-icons/fa";
import {BiImageAdd} from "react-icons/bi";
import FadeModal from "./FadeModal";
import styled from "styled-components";
import {authenticatedAxios} from "../../restservices/baseAxios";
import {ADD_IMAGE_TO_PROFILE} from "../../constant/apiConstants";
import {setSnackbar} from "../../state/snackbarSlice";
import {getProfile} from "../../restservices/profileApi";
import {setProfile} from "../../state/profileSlice";
import {useDispatch} from "react-redux";

const ImageUploadModal = ({isModalOpen, closeModal}) => {

    const dispatch = useDispatch();

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
                                    followers: data.followers,
                                    following: data.following
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
    );
};

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

export default ImageUploadModal;