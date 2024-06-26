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
    ADD_ANSWER,
    ADD_FAVOURITE_QUESTION_TAGS,
    ADD_QUESTION,
    FETCH_QUESTION_TAGS,
    GET_QUESTION_TAB_TAGS,
    QUESTION_DETAIL,
    QUESTION_LIST
} from "../constant/apiConstants";

export const fetchQuestionTags = (page, tag, category, signal) => {
    return authenticatedAxios.get(FETCH_QUESTION_TAGS, {
        params: {
            page: page,
            tagName: tag,
            category: category,
        },
        signal: signal
    }).then((response)=> response.data);
}

export const addQuestion = (formData) => {
    return authenticatedAxios.post(ADD_QUESTION, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((response)=> response.data);
}

export const fetchQuestionList = (page, isResolved, tag) => {
    return authenticatedAxios.get(QUESTION_LIST, {
        params: {
            page: page,
            isResolved: isResolved,
            tag: tag
        }
    }).then(response => response.data)
};

export const fetchQuestionDetail = (questionId) => {
    return authenticatedAxios.get(QUESTION_DETAIL, {
        params: {
            questionId: questionId,
        }
    }).then((response)=> response.data);
}

export const addAnswer = (formData) => {
    return authenticatedAxios.post(ADD_ANSWER, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((response)=> response.data);
}

export const getQuestionTabBarData = () => {
    return authenticatedAxios.get(GET_QUESTION_TAB_TAGS)
        .then((response)=> response.data);
}

export const addFavouriteQuestionTags = (payload) => {
    return authenticatedAxios.post(ADD_FAVOURITE_QUESTION_TAGS, payload)
        .then((response)=> response.data);
}

export const deleteQuestion = (questionId) => {
    return authenticatedAxios.delete(ADD_QUESTION, {
        params: {
            questionId: questionId,
        }
    }).then(response => response.data);
}

export const deleteAnswer = (questionId, answerId) => {
    return authenticatedAxios.delete(ADD_ANSWER, {
        params: {
            questionId: questionId,
            answerId: answerId
        }
    }).then(response => response.data);
}