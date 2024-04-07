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

import React, {useState} from 'react';
import {bgAccentRounded} from '../../asset/svg'
import IconButton from "../buttons/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {Tooltip} from "react-tooltip";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {dispatchError, dispatchErrorMessage} from "../../service/functions";
import {loginUser} from "../../restservices/authApi";
import {ACCOUNT_INACTIVE} from "../../constant/ExceptionCodes";
import {authOtpUserId} from "../../service/authProviderApiService";
import {useNavigate} from "react-router-dom";
import {FORGET_PASSWORD_PAGE, SIGNUP_PAGE} from "../../constant/pathConstants";
import * as Bg from './StyledComponent';
import useWindowDimensions from "../../hooks/useWindowDimensions";

const LoginComponent = () => {

    const dispatch = useDispatch();
    const {width} = useWindowDimensions();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event, property) => {
        setLoginData(prevState => ({
            ...prevState,
            [property]: event.target.value
        }));
    };

    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const validateForm = () => {
        const errors = {};

        if (loginData.password === '') {
            errors.password = 'Password cannot be Empty'
        } else if (!validatePassword(loginData.password)) {
            errors.password = 'Password is not of correct format'
        } else {
            errors.password = ''
        }

        return errors;
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setButtonLoader(true);
        const errors = validateForm();

        if (Object.values(errors).some((error) => error)) {
            setButtonLoader(false);
            dispatchErrorMessage(dispatch, errors.password)
            return;
        }

        const payload = {
            email: loginData.email,
            password: loginData.password
        };

        loginUser(payload)
            .then((response) => {
                window.location.reload();
            }).catch((error) => {
            if (error?.response?.data?.uniqueErrorCode === ACCOUNT_INACTIVE) {
                authOtpUserId(payload, navigate, dispatch)
            } else {
                dispatchError(dispatch, error);
            }
            setButtonLoader(false)
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleLogin(event);
        }
    };

    return (
        <Bg.Wrapper>
            <Bg.Logo src={bgAccentRounded} alt="Bloggios"/>

            <Bg.Header>
                <h2>Welcome Back</h2>
                <p>Enter your information below to log in</p>
            </Bg.Header>

            <Bg.Form onSubmit={handleLogin}>
                <Bg.Field>
                    <Bg.Label>
                        Email
                    </Bg.Label>
                    <Bg.Input
                        type={'email'}
                        maxLength={40}
                        required={true}
                        placeholder={'user@bloggios.com *'}
                        value={loginData.email}
                        onChange={(event) => handleInputChange(event, 'email')}
                        onKeyDown={handleKeyDown}
                    />
                </Bg.Field>

                <Bg.Field>
                    <Bg.Label>
                        Password
                    </Bg.Label>
                    <Bg.Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        maxLength={20}
                        required={true}
                        placeholder={'●●●●●●●●●'}
                        value={loginData.password}
                        onChange={(event) => handleInputChange(event, 'password')}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton
                        tooltipId={'password-shown-login-page'}
                        tooltipContent={isPasswordVisible ? 'Hide Password' : 'Show Password'}
                        tooltipDelay={500}
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                        }}
                    >
                        {isPasswordVisible ? <MdVisibilityOff/> : <MdVisibility/>}
                    </IconButton>
                </Bg.Field>
                <Bg.ForgetPassword onClick={()=> navigate(FORGET_PASSWORD_PAGE)}>
                    Forget Password?
                </Bg.ForgetPassword>

                <FetchLoaderButton
                    isLoading={buttonLoader}
                    type={'submit'}
                    text={'Login'}
                    loaderSize={'4px'}
                    loaderDotsSize={'4px'}
                    bgColor={'#4258ff'}
                    hBgColor={'rgba(66, 88, 255, 0.9)'}
                    aBgColor={'#4258ff'}
                    color={'rgba(255, 255, 255, 0.8)'}
                    hColor={'rgba(255, 255, 255, 1)'}
                    borderRadius={'4px'}
                    padding={'10px 0'}
                    style={{
                        width: '100%',
                        height: '40px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        marginTop: '25px',
                        fontFamily: "'Poppins', san-serif"
                    }}
                />
            </Bg.Form>

            <Bg.Divider>
                <div/>
                <span>Or Continue With</span>
                <div/>
            </Bg.Divider>

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px'
            }}>
                <IconButton
                    bgColor={'rgba(255, 255, 255, 0.1)'}
                    borderRadius={'4px'}
                    tooltipId={'login-google-login-page'}
                    tooltipContent={'Login with Google'}
                    tooltipDelay={0}
                >
                    <FcGoogle/>
                </IconButton>

                <IconButton
                    bgColor={'rgba(255, 255, 255, 0.1)'}
                    borderRadius={'4px'}
                    tooltipId={'login-facebook-login-page'}
                    tooltipContent={'Login with Facebook'}
                    tooltipDelay={0}
                >
                    <FaFacebook color={'#187bf0'}/>
                </IconButton>
            </div>

            <Bg.AddAccount>
                Don't have an Account?
                <span onClick={()=> navigate(SIGNUP_PAGE)}>Create an Account</span>
            </Bg.AddAccount>
            {width > 600 && (
                <>
                    <Tooltip id={'password-shown-login-page'}/>
                    <Tooltip id={'login-google-login-page'}/>
                    <Tooltip id={'login-facebook-login-page'}/>
                </>
            )}
        </Bg.Wrapper>
    );
};

export default LoginComponent;