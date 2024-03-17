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
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearLoading, initiateLoading} from "../../state/loadingSlice";
import useComponentSize from "../../hooks/useComponentSize";
import {LuShieldCheck} from "react-icons/lu";
import {setSnackbar} from "../../state/snackbarSlice";
import Typography from "../../component/typography/typography";
import OtpInput from "../../component/fields/otpInput";
import SimpleLoader from "../../component/loaders/simpleLoader";
import {LOGIN_PAGE, SIGNUP_PAGE} from "../../constant/pathConstants";
import {resendOtp, verifyOtp} from "../../restservices/authApi";
import BloggiosBase from "../boundries/bloggiosBase";
import AuthBase from "../boundries/AuthBase";
import OtpComponent from "../../component/authentication/OtpComponent";

const OtpPage = () => {

    return (
        <AuthBase
            title={'Verify Email'}
        >
            <OtpComponent/>
        </AuthBase>
    )
}
export default React.memo(OtpPage);