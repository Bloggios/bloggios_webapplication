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

import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getAuthPost, getUserAuthPost} from "../restservices/postApi";
import {dispatchError} from "../service/functions";

const useBloggiosAuthPost = (pageNum, userId) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, setHasNextPage] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const {signal} = controller;

        if (userId) {
            getUserAuthPost(userId, pageNum)
                .then(data => {
                    setData(prev => [...prev, ...data.object]);
                    setHasNextPage(Boolean(data?.object.length));
                    setIsLoading(false);
                }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                dispatchError(dispatch, e);
                setError({message : e?.response?.data?.message})
            })
        } else {
            getAuthPost(pageNum)
                .then(data => {
                    setData(prev => [...prev, ...data.object]);
                    setHasNextPage(Boolean(data?.object.length));
                    setIsLoading(false);
                }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                dispatchError(dispatch, e);
                setError({message : e?.response?.data?.message})
            })
        }
    }, [pageNum])

    return {isLoading, isError, error, data, hasNextPage};
};

export default useBloggiosAuthPost;