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

export const LOGIN_PATH = '/auth-provider/v1.0/authentication/token';
export const SIGNUP_PATH = '/auth-provider/v1.0/user-auth/auth/register';
export const VERIFY_OTP = '/auth-provider/v1.0/authentication/verify-otp';
export const RESEND_OTP = '/auth-provider/v1.0/authentication/resend-otp';
export const REFRESH_TOKEN = '/auth-provider/v1.0/authentication/refresh-token';
export const OTP_USERID_REDIRECT = '/auth-provider/v1.0/authentication/otp-userId'
export const PROFILE_ADDED = '/user-provider/v1.0/profile/is-added';
export const LOGOUT = '/auth-provider/v1.0/authentication/logout';
export const ADD_PROFILE = '/user-provider/v1.0/profile';
export const GET_PROFILE = '/user-provider/v1.0/profile';
export const ADD_IMAGE_TO_PROFILE = '/user-provider/v1.0/profile/add-image';
export const FETCH_POST_TAGS = '/post-provider/v1.0/tag/tags-list';
export const ADD_POST = '/post-provider/v1.0/post';
export const ADD_POST_IMAGE = '/post-provider/v1.0/post/add-images';
export const POST_LIST = '/post-provider/v1.0/post/post-list'
export const GET_USER_PROFILE = '/user-provider/v1.0/profile';
export const COUNT_FOLLOW = '/user-provider/v1.0/follow-api/count-follow';
export const PROFILE_SUGGESTIONS = '/user-provider/v1.0/profile/suggestions';
export const CHECK_FOLLOWING = '/user-provider/v1.0/follow-api/is-following';
export const FOLLOW_USER = '/user-provider/v1.0/follow-api/follow';
export const UNFOLLOW_USER = '/user-provider/v1.0/follow-api/unfollow';