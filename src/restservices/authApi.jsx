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

import {gatewayAxios} from "./baseAxios";
import {LOGIN_PATH, REFRESH_TOKEN, RESEND_OTP, SIGNUP_PATH, VERIFY_OTP} from "../constant/apiConstants";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const loginUser = (loginPayload) => {
    return gatewayAxios.post(LOGIN_PATH, loginPayload, {
        withCredentials: true
    }).then((response)=> response);
}

export const signupUser = (signupPayload) => {
    return gatewayAxios.post(SIGNUP_PATH, signupPayload)
        .then((response)=> response.data);
}

export const verifyOtp = (otpPayload) => {
    return gatewayAxios.get(VERIFY_OTP, {
        headers: {
            'otp': otpPayload.otp
        },
        params: {
            'userId': otpPayload.userId
        }
    }).then((response)=> response.data);
}

export const resendOtp = (userId) => {
    return gatewayAxios.get(RESEND_OTP, {
        params: {
            'userId': userId
        }
    }).then((response)=> response.data);
}

export const refreshToken = () => {
    return gatewayAxios.get(REFRESH_TOKEN, {
        withCredentials: true,
        headers: {
            'clientId': CLIENT_ID
        }
    }).then((response)=> response);
}