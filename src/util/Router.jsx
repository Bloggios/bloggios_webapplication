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

import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {
    ACTIVITY_PAGE,
    ASK_QUESTION_OUTLET_PAGE, BLOGGIOS_MESSAGING_HELP, BLOGGIOS_OTHERS_HELP, BLOGGIOS_POST_HELP,
    BLOGGIOS_QAA_HELP,
    BLOGGIOS_TECH_HELP,
    CHATS_PAGE,
    FORGET_PASSWORD_PAGE,
    HOME_PAGE,
    LANDING_PAGE,
    LOGIN_PAGE,
    NOT_FOUND_PAGE,
    OAUTH_REDIRECT,
    OTP_PAGE,
    POST_PAGE,
    PRIVACY_POLICY, PRODUCT_DEVELOPMENT_SERVICE,
    PROFILE_ADDITION_INITIAL,
    PROFILE_PAGE,
    PROFILE_POST_OUTLET_PAGE,
    QUESTION_PAGE,
    REPORT_BUG_PAGE,
    SECURITY_PAGE,
    SERVICES_PAGE,
    SETTING_PAGE,
    SIGNUP_PAGE,
    SUPPORT_PAGE,
    TERMS_CONDITION
} from "../constant/pathConstants";
import FallbackLoader from "../component/loaders/fallbackLoader";
import ProtectedRoute from "./ProtectedRoute";
import {useSelector} from "react-redux";
import OAuthRedirectHandler from "./OAuthRedirectHandler";
import ChatUserOutlet from "../container/ChatsContainer/Outlet/ChatUserOutlet";
import BloggiosTechHelpOutlet from "../container/SupportContainer/Outlet/BloggiosTechHelpOutlet";
import DefaultServiceOutlet from "../container/ServiceContainer/Outlets/DefaultServiceOutlet";

const AuthenticatedHomePage = lazy(() => import('../container/homeContainer/AuthenticatedHomePage'));
const UnauthenticatedHomePage = lazy(() => import('../container/homeContainer/unauthenticatedHomePage'));
const LoginPage = lazy(() => import('../container/userAuthenticationContainer/loginPage'));
const SignupPage = lazy(() => import('../container/userAuthenticationContainer/signUpPage'));
const OtpPage = lazy(() => import('../container/userAuthenticationContainer/otpPage'));
const ProfileAdditionInitial = lazy(() => import('../container/profileContainer/ProfileAdditionInitial'));
const ProfilePage = lazy(()=> import('../container/profileContainer/ProfilePage'));
const ActivityPage = lazy(()=> import('../container/activityContainer/activityPage'));
const SecurityPage = lazy(()=> import('../container/securityContainer/securityPage'));
const SettingPage = lazy(()=> import('../container/settingContainer/settingPage'));
const PageNotFound = lazy(()=> import('../container/catchPages/PageNotFound'));
const QuestionPage = lazy(()=> import('../container/questionContainer/QuestionPage'));
const ProfileAboutOutlet = lazy(()=> import('../container/profileContainer/outlets/ProfileAboutOutlet'));
const ProfilePostOutlet = lazy(()=> import('../container/profileContainer/outlets/ProfilePostOutlet'));
const QuestionOutlet = lazy(()=> import('../container/questionContainer/outlet/QuestionOutlet'));
const QuestionAskOutlet = lazy(()=> import('../container/questionContainer/outlet/QuestionAskOutlet'));
const ChatPage = lazy(()=> import('../container/ChatsContainer/ChatPage'));
const ChatDefaultOutlet = lazy(()=> import('../container/ChatsContainer/Outlet/ChatDefaultOutlet'));
const PrivacyPolicy = lazy(()=> import('../container/TermsContainer/PrivacyPolicy'));
const TermsCondition = lazy(()=> import('../container/TermsContainer/TermsCondition'));
const ReportBugPage = lazy(()=> import('../container/ReportContainer/ReportBugPage'));
const SupportPage = lazy(()=> import('../container/SupportContainer/SupportPage'));
const DefaultHelpOutlet = lazy(()=> import('../container/SupportContainer/Outlet/DefaultHelpOutlet'));
const BloggiosQAAHelpOutlet = lazy(()=> import('../container/SupportContainer/Outlet/BloggiosQAAHelpOutlet'));
const ForgetPasswordPage = lazy(()=> import('../container/userAuthenticationContainer/forgetPasswordPage'));
const QuestionDetailsOutlet = lazy(()=> import('../container/questionContainer/outlet/QuestionDetailsOutlet'));
const PostPage = lazy(()=> import('../container/PostContainer/PostPage'));
const PostSectionOutlet = lazy(()=> import('../container/PostContainer/Outlet/PostSectionOutlet'));
const PostDetailsOutlet = lazy(()=> import('../container/PostContainer/Outlet/PostDetailsOutlet'));
const ServicePage = lazy(()=> import('../container/ServiceContainer/ServicePage'));
const ProductDevelopmentOutlet = lazy(()=> import('../container/ServiceContainer/Outlets/ProductDevelopmentOutlet'));
const BloggiosMessagingHelpOutlet = lazy(()=> import('../container/SupportContainer/Outlet/BloggiosMessagingHelpOutlet'));
const BloggiosPostHelpOutlet = lazy(()=> import('../container/SupportContainer/Outlet/BloggiosPostHelpOutlet'));
const BloggiosOthersHelpOutlet = lazy(()=> import('../container/SupportContainer/Outlet/BloggiosOthersHelpOutlet'));

const Router = () => {

    const {isAuthenticated, authorities} = useSelector((state) => state.auth);

    return (
            <Suspense fallback={<FallbackLoader width={'100%'} height={'400px'}/>}>
                <Routes>
                    <Route path={LANDING_PAGE} element={<UnauthenticatedHomePage />}/>
                    <Route path={LOGIN_PAGE} element={<LoginPage/>}/>
                    <Route path={SIGNUP_PAGE} element={<SignupPage/>}/>
                    <Route path={OTP_PAGE} element={<OtpPage/>}/>
                    <Route path={OAUTH_REDIRECT} Component={OAuthRedirectHandler}/>
                    <Route path={NOT_FOUND_PAGE} element={<PageNotFound />} />
                    <Route path={PRIVACY_POLICY} element={<PrivacyPolicy />} />
                    <Route path={TERMS_CONDITION} element={<TermsCondition />} />
                    <Route path={REPORT_BUG_PAGE} element={<ReportBugPage />} />
                    <Route path={FORGET_PASSWORD_PAGE} element={<ForgetPasswordPage />} />
                    <Route path={SUPPORT_PAGE} element={<SupportPage />} >
                        <Route index element={<DefaultHelpOutlet />} />
                        <Route path={BLOGGIOS_TECH_HELP} element={<BloggiosTechHelpOutlet />} />
                        <Route path={BLOGGIOS_QAA_HELP} element={<BloggiosQAAHelpOutlet />} />
                        <Route path={BLOGGIOS_MESSAGING_HELP} element={<BloggiosMessagingHelpOutlet />} />
                        <Route path={BLOGGIOS_POST_HELP} element={<BloggiosPostHelpOutlet />} />
                        <Route path={BLOGGIOS_OTHERS_HELP} element={<BloggiosOthersHelpOutlet />} />
                    </Route>
                    <Route path={SERVICES_PAGE} element={<ServicePage />} >
                        <Route index element={<DefaultServiceOutlet />} />
                        <Route path={PRODUCT_DEVELOPMENT_SERVICE} element={<ProductDevelopmentOutlet />} />
                    </Route>
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} authorities={authorities}/>}>
                        <Route path={HOME_PAGE} element={<AuthenticatedHomePage />} />
                        <Route path={PROFILE_ADDITION_INITIAL} element={<ProfileAdditionInitial/>}/>
                        <Route path={PROFILE_PAGE} element={<ProfilePage />} />
                        <Route path={ACTIVITY_PAGE} element={<ActivityPage />} />
                        <Route path={SECURITY_PAGE} element={<SecurityPage />} />
                        <Route path={SETTING_PAGE} element={<SettingPage />} />
                        <Route path={QUESTION_PAGE} element={<QuestionPage />} >
                            <Route index element={<QuestionOutlet />} />
                            <Route path={ASK_QUESTION_OUTLET_PAGE} element={<QuestionAskOutlet />} />
                            <Route path={':questionId'} element={<QuestionDetailsOutlet />} />
                        </Route>
                        <Route path={PROFILE_PAGE} element={<ProfilePage />}>
                            <Route index element={<ProfileAboutOutlet />} />
                            <Route path={PROFILE_POST_OUTLET_PAGE} element={<ProfilePostOutlet />} />
                        </Route>
                        <Route path={CHATS_PAGE} element={<ChatPage />} >
                            <Route index element={<ChatDefaultOutlet />} />
                            <Route path={':userId'} element={<ChatUserOutlet />} />
                        </Route>

                        <Route path={POST_PAGE} element={<PostPage />} >
                            <Route index element={<PostSectionOutlet />} />
                            <Route path={':postId'} element={<PostDetailsOutlet />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
    );
};

export default Router;