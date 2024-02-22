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

import {setSnackbar} from "../state/snackbarSlice";
import {authenticatedAxios, gatewayAxios} from "../restservices/baseAxios";
import {ADD_IMAGE_TO_PROFILE, PROFILE_ADDED} from "../constant/apiConstants";
import {setProfile} from "../state/profileSlice";
import {HOME_PAGE, LANDING_PAGE, PROFILE_ADDITION_INITIAL} from "../constant/pathConstants";
import {getFollow, getProfile} from "../restservices/profileApi";
import {logoutUser} from "../restservices/authApi";

export const dispatchError = (dispatch, error) => {
    if (error.response.status === 400 || error.response.status === 401) {
        const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
    } else {
        const message = 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
    }
}

export const checkIsProfileAdded = (accessToken, dispatch, navigate) => {
    gatewayAxios.get(PROFILE_ADDED, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
        .then((response) => {
            if (response?.data?.exist === true && response?.data?.event === 'profile') {
                dispatch(setProfile({isAdded: true}))
                fetchProfileAndDispatch(dispatch);
            } else {
                const snackBarData = {
                    isSnackbar: true,
                    message: 'Please add you Profile Data first',
                    snackbarType: 'Warning'
                }
                dispatch(setSnackbar(snackBarData))
                navigate(PROFILE_ADDITION_INITIAL);
            }
        }).catch((error) => {
        const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error'
        }
        dispatch(setSnackbar(snackBarData))
        navigate(HOME_PAGE, {
            replace: true
        })
    })
}

export const fetchProfileAndDispatch = async (dispatch) => {
    try {
        const response = await getProfile();
        const { data } = response;
        const profileData = {
            name: data.name,
            isAdded: true,
            profileImageUrl: null,
            bio: data.bio,
            email: data.email,
            userId: data.userId,
            profileImage: data.profileImage,
            coverImage: data.coverImage,
            followers: data.followers,
            following: data.following
        };
        dispatch(setProfile(profileData));
    } catch (error) {
        setTimeout(fetchProfileAndDispatch, 2000);
    }
};

export const initLogout = (navigate, dispatch) => {
    logoutUser()
        .then((response)=> {
            navigate(LANDING_PAGE, {
                replace: true
            });
            window.location.reload();
        }).catch((error)=> {
        const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error'
        }
        dispatch(setSnackbar(snackBarData))
    })
};

export const handleImageChange = (e, uploadFor, dispatch) => {
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
    return true;
};

export const dispatchSuccessMessage = (dispatch, message) => {
    const snackBarData = {
        isSnackbar: true,
        message: message,
        snackbarType: 'Success',
    };
    dispatch(setSnackbar(snackBarData));
}