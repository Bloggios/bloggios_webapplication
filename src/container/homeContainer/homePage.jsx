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

import React, {lazy, Suspense, useEffect, useLayoutEffect, useState} from 'react';
import useSeo from "../../globalseo/useSeo";
import {useDispatch, useSelector} from "react-redux";
import {PROFILE_ADDED} from "../../constant/apiConstants";
import {HOME_PAGE, PROFILE_ADDITION_INITIAL} from "../../constant/pathConstants";
import {setSnackbar} from "../../state/snackbarSlice";
import {useNavigate} from "react-router-dom";
import LoaderPage from "../../component/loaders/loaderPage";
import AuthenticatedAxiosInterceptor from "../../restservices/AuthenticatedAxiosInterceptor";
import {setProfile} from "../../state/profileSlice";
import FallbackLoader from "../../component/loaders/fallbackLoader";
import BloggiosBase from "../baseContainer/bloggiosBase";

const UnauthenticatedHomePage = lazy(()=> import('./unauthenticatedHomePage'));
const AuthenticatedHomePage = lazy(()=> import('./AuthenticatedHomePage'));

const HomePage = () => {

    useSeo('homepage');

    const {isAuthenticated} = useSelector((state)=> state.auth);
    const {isAdded} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authenticatedAxios = AuthenticatedAxiosInterceptor();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (isAuthenticated && !isAdded) {
            authenticatedAxios.get(PROFILE_ADDED)
                .then((response)=> {
                    if (response?.data?.exist === true && response?.data?.event === 'profile') {
                        dispatch(setProfile({isAdded: true}))
                        setIsChecking(false)
                    } else {
                        setIsChecking(false)
                        const snackBarData = {
                            isSnackbar: true,
                            message: 'Please add you Profile Data first',
                            snackbarType: 'Warning'
                        }
                        dispatch(setSnackbar(snackBarData))
                        navigate(PROFILE_ADDITION_INITIAL);
                    }
                }).catch((error)=> {
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
        } else {
            setIsChecking(false)
        }
    }, []);

    if (isChecking) return <LoaderPage />

    return (
        <BloggiosBase>
            <Suspense fallback={<FallbackLoader width={'100%'} height={'500px'} />}>
                {
                    isAuthenticated ? <AuthenticatedHomePage /> : <UnauthenticatedHomePage />
                }
            </Suspense>
        </BloggiosBase>
    );
};

export default HomePage;