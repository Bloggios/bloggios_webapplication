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

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authenticatedAxios, gatewayAxios} from "./baseAxios";
import {REFRESH_TOKEN} from "../constant/apiConstants";
import {clearCredentials, setCredentials} from "../state/authSlice";
import {LOGIN_PAGE} from "../constant/pathConstants";

const AuthenticatedAxiosInterceptor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {accessToken} = useSelector((state)=> state.auth);

    authenticatedAxios.interceptors.request.use(
        async (config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    authenticatedAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest._retry && error?.response?.data?.isExpired === true) {
                prevRequest._retry = true;
                try {
                    const response = await gatewayAxios.get(REFRESH_TOKEN, {
                        withCredentials: true,
                        headers: {
                            'clientId': process.env.REACT_APP_CLIENT_ID
                        }
                    });
                    const authData = { ...response.data, isAuthenticated: true };
                    dispatch(setCredentials(authData));
                    prevRequest.headers['Authorization'] = `Bearer ${response.data?.accessToken}`;
                    return authenticatedAxios(prevRequest);
                } catch (refreshEndpointError) {
                    dispatch(clearCredentials());
                    navigate(LOGIN_PAGE, {
                        replace: true
                    });
                    return Promise.reject(refreshEndpointError);
                }
            }
            return Promise.reject(error);
        }
    );

    return authenticatedAxios;
}

export default AuthenticatedAxiosInterceptor;