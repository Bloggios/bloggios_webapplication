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

import React, {useLayoutEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {bgAccentRounded} from '../../asset/svg'
import IconButton from "../buttons/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {Tooltip} from "react-tooltip";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {dispatchError, dispatchErrorMessage} from "../../service/functions";
import {loginUser} from "../../restservices/authApi";
import {ACCOUNT_INACTIVE} from "../../constant/ExceptionCodes";
import {authOtpUserId} from "../../service/authProviderApiService";
import {setSnackbar} from "../../state/snackbarSlice";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../constant/pathConstants";

const LoginComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const {isAuthenticated} = useSelector((state)=> state.auth);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    useLayoutEffect(()=> {
        if (isAuthenticated) {
            navigate(HOME_PAGE);
        }
    }, [])

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
        <Wrapper>
            <Logo src={bgAccentRounded} alt="Bloggios"/>

            <Header>
                <h2>Welcome Back</h2>
                <p>Enter your information below to log in</p>
            </Header>

            <Form onSubmit={handleLogin}>
                <Field>
                    <Label>
                        Email
                    </Label>
                    <Input
                        type={'email'}
                        maxLength={40}
                        required={true}
                        placeholder={'user@bloggios.com *'}
                        value={loginData.email}
                        onChange={(event) => handleInputChange(event, 'email')}
                        onKeyDown={handleKeyDown}
                    />
                </Field>

                <Field>
                    <Label>
                        Password
                    </Label>
                    <Input
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
                </Field>
                <ForgetPassword>
                    Forget Password?
                </ForgetPassword>

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
            </Form>

            <Divider>
                <div/>
                <span>Or Continue With</span>
                <div/>
            </Divider>

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

            <AddAccount>
                Don't have an Account?
                <span>Create an Account</span>
            </AddAccount>
            <Tooltip id={'password-shown-login-page'}/>
            <Tooltip id={'login-google-login-page'}/>
            <Tooltip id={'login-facebook-login-page'}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: clamp(220px, 90%, 440px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
`;

const Logo = styled.img`
    height: 65px;
    aspect-ratio: 1/1;
`;

const Header = styled.div`
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    & h2 {
        font-size: clamp(1rem, 0.7926rem + 1.2766vw, 1.75rem);
        color: #f9f9f9;
        font-weight: 600;
    }

    & p {
        font-size: clamp(0.625rem, 0.5213rem + 0.6383vw, 1rem);
        color: rgba(249, 249, 249, 0.8);
        font-weight: 300;
    }
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 14px;
`;

const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    margin-top: 20px;
`;

const FieldStyle = css`
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
`;

const Label = styled.label`
    ${FieldStyle};
    color: rgba(245, 245, 245, 0.8);
`;

const Input = styled.input`
    ${FieldStyle};
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;

    &:focus {
        color: rgba(245, 245, 245, 1);
    }
`;

const ForgetPassword = styled.span`
    ${FieldStyle};
    border: none;
    outline: none;
    background: none;
    color: rgba(24, 123, 240, 0.8);
    align-self: flex-end;
    margin-top: 2px;
    cursor: pointer;

    &:hover {
        color: rgba(24, 123, 240, 1);
    }

    &:active {
        color: rgba(24, 123, 240, 0.88);
    }
`;

const Divider = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    font-size: 10px;
    font-weight: 200;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    padding: 0 10px;

    & div {
        height: 1px;
        width: 25%;
        background: rgba(255, 255, 255, 0.2);
        margin: 0 10px;
    }
`;

const AddAccount = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    font-size: 12px;
    font-weight: 200;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    cursor: pointer;

    & span {
        color: rgba(24, 123, 240, 0.8);
        text-decoration: underline;
        text-decoration-style: solid;

        &:hover {
            color: rgba(24, 123, 240, 1);
        }

        &:active {
            color: rgba(24, 123, 240, 0.88);
        }
    }
`;

export default LoginComponent;