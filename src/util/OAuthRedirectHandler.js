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

import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../state/authSlice";
import {setSnackbar} from "../state/snackbarSlice";
import {refreshTokenSocial} from "../restservices/authApi";

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

const OAuthRedirectHandler = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const navigate = useLocation();

    const getUrlParameter = (name) => {
        return searchParams.get(name)
    }

    const token = getUrlParameter(ACCESS_TOKEN);
    const refreshToken = getUrlParameter(REFRESH_TOKEN);
    const userId = getUrlParameter('userId');
    const error = getUrlParameter('error');

    if (token && refreshToken) {
        refreshTokenSocial(refreshToken)
            .then((response)=> {
                const authData = { ...response.data, isAuthenticated: true };
                dispatch(setCredentials(authData));
                window.location.href = '/'
            })
        return (<Navigate to={{
            pathname: "/",
            state: { from: location }
        }} />);
    } else {
        const message = error || 'Something went wrong. Please try again later';
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
        return <Navigate to={{
            pathname: "/login",
            state: {
                from: location,
                error: error
            }
        }} />;
    }
}

export default OAuthRedirectHandler