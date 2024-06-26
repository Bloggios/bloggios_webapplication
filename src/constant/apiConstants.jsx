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
export const PROFILE_LIST = '/user-provider/v1.0/profile/profile-list';
export const REFRESH_TOKEN_SOCIAL = '/auth-provider/v1.0/authentication/refresh-token-social';
export const DETAILED_PROFILE = '/user-provider/v1.0/profile/detailed';
export const DELETE_POST = '/post-provider/v1.0/post'
export const AUTH_USER_POSTS = '/post-provider/v1.0/post/post-list/auth';
export const USER_POSTS = '/post-provider/v1.0/post/post-list/auth/user';
export const LIKE_COMMENT_COUNT = '/post-provider/v1.0/post/count';
export const ADD_LIKE = '/post-provider/v1.0/like';
export const ADD_COMMENT = '/post-provider/v1.0/comment';
export const POST_COMMENT_LIST = '/post-provider/v1.0/comment/post-comment';
export const PROFILE_TAGS_LIST = '/user-provider/v1.0/profile/tags-list';
export const FETCH_QUESTION_TAGS = '/question-provider/v1.0/tags/tag-search';
export const ADD_QUESTION = '/question-provider/v1.0/question';
export const SEARCH_USER_PROFILE_LIST = '/user-provider/v1.0/profile/profile-search';
export const USER_CHAT_HISTORY = '/websockets-provider/v1.0/chat-history/list';
export const USER_CHAT_LIST = '/websockets-provider/v1.0/user-chat/list';
export const QUESTION_LIST = '/question-provider/v1.0/question/list';
export const QUESTION_DETAIL = '/question-provider/v1.0/question';
export const ADD_ANSWER = '/question-provider/v1.0/answer';
export const POST_DETAILS = '/post-provider/v1.0/post';
export const GET_QUESTION_TAB_TAGS = '/question-provider/v1.0/tags/favourite-tags';
export const ADD_FAVOURITE_QUESTION_TAGS = '/question-provider/v1.0/tags/add-favourite';
export const FOLLOWER_FOLLOWING_LIST_API = '/user-provider/v1.0/follow-api/follow-list-with-user';
export const FORGET_PASSWORD_OTP = '/auth-provider/v1.0/user-auth/auth/forget-password-otp';
export const FORGET_PASSWORD = '/auth-provider/v1.0/user-auth/auth/forget-password';
export const BADGE_REQUEST = '/user-provider/v1.0/profile/badge-request';
export const CHANGE_PASSWORD = '/auth-provider/v1.0/user-auth/read/change-password';