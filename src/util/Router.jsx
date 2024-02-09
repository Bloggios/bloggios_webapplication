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

import React, {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {
    ACTIVITY_PAGE,
    HOME_PAGE,
    LOGIN_PAGE,
    OTP_PAGE,
    PROFILE_ADDITION_INITIAL,
    PROFILE_PAGE,
    SECURITY_PAGE,
    SETTING_PAGE,
    SIGNUP_PAGE
} from "../constant/pathConstants";
import FallbackLoader from "../component/loaders/fallbackLoader";
import ProtectedRoute from "./ProtectedRoute";
import {useSelector} from "react-redux";
import OAuthRedirectHandler from "./OAuthRedirectHandler";

const HomePage = lazy(() => import('../container/homeContainer/homePage'));
const LoginPage = lazy(() => import('../container/userAuthenticationContainer/loginPage'));
const SignupPage = lazy(() => import('../container/userAuthenticationContainer/signUpPage'));
const OtpPage = lazy(() => import('../container/userAuthenticationContainer/otpPage'));
const ProfileAdditionInitial = lazy(() => import('../container/profileContainer/ProfileAdditionInitial'));
const ProfilePage = lazy(()=> import('../container/profileContainer/ProfilePage'));
const ActivityPage = lazy(()=> import('../container/activityContainer/activityPage'));
const SecurityPage = lazy(()=> import('../container/securityContainer/securityPage'));
const SettingPage = lazy(()=> import('../container/settingContainer/settingPage'));

const Router = () => {

    const {isAuthenticated} = useSelector((state) => state.auth);

    return (
            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'}/>}>
                <Routes>
                    <Route path={HOME_PAGE} element={<HomePage />}/>
                    <Route path={LOGIN_PAGE} element={<LoginPage/>}/>
                    <Route path={SIGNUP_PAGE} element={<SignupPage/>}/>
                    <Route path={OTP_PAGE} element={<OtpPage/>}/>
                    <Route path="/oauth2/redirect" Component={OAuthRedirectHandler}/>
                    <Route path={PROFILE_PAGE} element={<ProfilePage />}/>

                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
                        <Route path={PROFILE_ADDITION_INITIAL} element={<ProfileAdditionInitial/>}/>
                        <Route path={PROFILE_PAGE} element={<ProfilePage />} />
                        <Route path={ACTIVITY_PAGE} element={<ActivityPage />} />
                        <Route path={SECURITY_PAGE} element={<SecurityPage />} />
                        <Route path={SETTING_PAGE} element={<SettingPage />} />
                    </Route>
                </Routes>
            </Suspense>
    );
};

export default Router;