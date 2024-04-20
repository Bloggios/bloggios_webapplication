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

import {authenticatedAxios} from "./baseAxios";
import {
    ADD_PROFILE,
    COUNT_FOLLOW,
    DETAILED_PROFILE, FOLLOWER_FOLLOWING_LIST_API,
    GET_PROFILE,
    GET_USER_PROFILE,
    PROFILE_LIST,
    PROFILE_SUGGESTIONS,
    PROFILE_TAGS_LIST,
    SEARCH_USER_PROFILE_LIST
} from "../constant/apiConstants";

export const getProfile = () => {
    return authenticatedAxios.get(GET_PROFILE)
        .then((response)=> response);
}

export const getUserProfile = (userId) => {
    return authenticatedAxios.get(GET_USER_PROFILE + '/' + userId)
        .then((response)=> response);
}

export const getFollow = () => {
    return authenticatedAxios.get(COUNT_FOLLOW)
        .then((response)=> response);
}

export const profileSuggestions = (payload) => {
    return authenticatedAxios.post(PROFILE_SUGGESTIONS, payload)
        .then((response)=> response);
}

export const searchProfileList = (payload) => {
    return authenticatedAxios.post(PROFILE_LIST, payload)
        .then((response)=> response);
}

export const detailedProfile = (userId) => {
    return authenticatedAxios.get(DETAILED_PROFILE + '/' + userId)
        .then((response)=> response);
}

export const profileTagsList = () => {
    return authenticatedAxios.get(PROFILE_TAGS_LIST)
        .then((response)=> response);
}

export const searchProfileData = (text) => {
    return authenticatedAxios.get(SEARCH_USER_PROFILE_LIST, {
        params: {
            "text": text,
            "size": 20
        }
    }).then((response)=> response);
}

export const followerFollowingListApi = (key, userId, page) => {
    return authenticatedAxios.get(FOLLOWER_FOLLOWING_LIST_API, {
        params: {
            key: key,
            userId: userId,
            page: page
        }
    })
        .then(response => response.data);
}

export const updateProfileApi = (payload) => {
    return authenticatedAxios.put(ADD_PROFILE, payload)
        .then(response => response.data);
}