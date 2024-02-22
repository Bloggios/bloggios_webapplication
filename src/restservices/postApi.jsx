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
import {ADD_POST, DELETE_POST, FETCH_POST_TAGS, POST_LIST} from "../constant/apiConstants";

export const getTenTags = (tagName, config) => {
    const tagPayload = {
        page: 0,
        size: 10,
        texts: [tagName]
    }
    return authenticatedAxios.post(FETCH_POST_TAGS, tagPayload, {
        ...config
    })
        .then((response)=> response);
}

export const addPost = (payload) => {
    return authenticatedAxios.post(ADD_POST, payload)
        .then((response)=> response);
}

export const getPostList = async (pageParam = 0, options = {}) => {
    const payload = {
        page: pageParam,
        size: 10
    }
    const response = await authenticatedAxios.post(POST_LIST, payload, options);
    return response.data;
}

export const searchPostList = (payload) => {
    return authenticatedAxios.post(POST_LIST, payload)
        .then((response)=> response);
}

export const postDeleteApi = (postId) => {
    return authenticatedAxios.delete(DELETE_POST, {
        params: {
            "postId": postId
        }
    }).then((response)=> response);
}