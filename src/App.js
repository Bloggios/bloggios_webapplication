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

import React, {useEffect, useState} from 'react';
import Router from "./util/Router";
import {useDispatch, useSelector} from "react-redux";
import {refreshToken} from "./restservices/authApi";
import {clearCredentials, setCredentials} from "./state/authSlice";
import LoaderPage from "./component/loaders/loaderPage";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useNavigate} from "react-router-dom";
import AuthenticatedAxiosInterceptor from "./restservices/AuthenticatedAxiosInterceptor";
import {checkIsProfileAdded} from "./service/functions";
import './styles/GlobalStyles.css'

const App = () => {

    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(true);
    const [isProfileFetching, setIsProfileFetching] = useState(true);
    const {isAdded} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
    const authenticatedAxios = AuthenticatedAxiosInterceptor();
    const {isAuthenticated} = useSelector((state)=> state.auth);

    useEffect(() => {
        let isMounted = true;
        const timeoutId = setTimeout(() => {
            if (isMounted) {
                window.location.reload();
            }
        }, 4000);

        refreshToken()
            .then((response) => {
                if (isMounted) {
                    clearTimeout(timeoutId); // Clear the timeout if the response is received
                    const credentials = {
                        accessToken: response.data.accessToken,
                        userId: response.data.userId,
                        isAuthenticated: true
                    };
                    dispatch(setCredentials(credentials));
                    checkIsProfileAdded(
                        credentials.accessToken,
                        dispatch,
                        navigate
                    )
                    setIsChecking(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    clearTimeout(timeoutId);
                    dispatch(clearCredentials());
                    setIsChecking(false);
                }
            });

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    if (isChecking) return <LoaderPage/>

    return (
        <Router/>
    );
};

export default App;