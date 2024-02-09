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
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF, FaGithub} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setSnackbar} from "../../state/snackbarSlice";
import useSeo from "../../globalseo/useSeo";
import IconButton from "../../component/buttons/iconButton";
import Typography from "../../component/typography/typography";
import TextField from "../../component/fields/textField";
import LoaderButton from "../../component/buttons/loaderButton";
import Divider from "../../component/divider/divider";
import {HOME_PAGE, SIGNUP_PAGE} from "../../constant/pathConstants";
import {loginUser} from "../../restservices/authApi";
import {ACCOUNT_INACTIVE} from "../../constant/ExceptionCodes";
import {authOtpUserId} from "../../service/authProviderApiService";
import AuthenticatedAxiosInterceptor from "../../restservices/AuthenticatedAxiosInterceptor";
import {GOOGLE_AUTH_URL} from "../../restservices/baseAxios";
import BloggiosBase from "../baseContainer/bloggiosBase";

const LoginPage = () => {

    useSeo('login');

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [buttonLoader, setButtonLoader] = useState(false);
    const authenticatedAxios = AuthenticatedAxiosInterceptor();
    const {isAuthenticated} = useSelector((state)=> state.auth);

    const [loginData, setLoginData] = useState({
        entryPoint: '',
        password: '',
    });

    const [helperText, setHelperText] = useState({
        password: '',
    });

    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleInputChange = useCallback((e, property) => {
        setLoginData(prevData => ({
            ...prevData,
            [property]: e.target.value,
        }));
        setHelperText(prevHelperText => ({
            ...prevHelperText,
            [property]: '',
        }));
    }, []);

    const validateForm = () => {
        const errors = {};

        if (loginData.password==='') {
            errors.password = 'Password cannot be Empty'
        } else if (!validatePassword(loginData.password)) {
            errors.password = 'Password is not of correct format'
        } else {
            errors.password = ''
        }

        return errors;
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(HOME_PAGE);
        }
    }, []);

    const handleLogin = (e) => {
        setButtonLoader(true);
        e.preventDefault();

        const errors = validateForm();
        setHelperText(errors);

        if (Object.values(errors).some((error) => error)) {
            setButtonLoader(false);
            return;
        }

        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

        const payload = {
            email : loginData.entryPoint,
            password: loginData.password,
            clientId: clientId,
            clientSecret: clientSecret
        }

        loginUser(payload)
            .then((response)=> {
                window.location.reload();
            }).catch((error)=> {
            console.error(error?.response?.data?.uniqueErrorCode)
            if (error?.response?.data?.uniqueErrorCode === ACCOUNT_INACTIVE) {
                authOtpUserId(payload, navigate, dispatch)
            } else {
                const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
                const snackBarData = {
                    isSnackbar: true,
                    message: message,
                    snackbarType: 'Error'
                }
                dispatch(setSnackbar(snackBarData))
            }
            setButtonLoader(false)
        })
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleLogin(event);
        }
    };

    const openGoogleAuth = () => {
        window.location.href = GOOGLE_AUTH_URL
    }

    return (
        <BloggiosBase>
            <Wrapper>
                <LoginMain>
                    <BloggiosImage src={bloggios_logo} alt="Bloggios"/>
                    <TextWrapper>
                        <Typography
                            text={'Login'}
                            type={'title'}
                            family={'Inter'}
                        />
                    </TextWrapper>

                    <SocialLoginButtonWrapper>
                        <IconButton
                            icon={<FcGoogle fontSize={'20px'}/>}
                            background={'#e5e5e5'}
                            hoveredBackgroundColor={'#edf7ff'}
                            activeBackgroundColor={'#e5e5e5'}
                            isTooltipAllowed={true}
                            tooltip={'Login with Google'}
                            onClick={openGoogleAuth}
                        />
                        <IconButton
                            icon={<FaFacebookF fontSize={'20px'} color={'#0666b2'}/>}
                            background={'#e5e5e5'}
                            hoveredBackgroundColor={'#edf7ff'}
                            activeBackgroundColor={'#e5e5e5'}
                            isTooltipAllowed={true}
                            tooltip={'Login with Facebook'}
                        />
                        <IconButton
                            icon={<FaGithub fontSize={'20px'} color={'#272727'}/>}
                            background={'#e5e5e5'}
                            hoveredBackgroundColor={'#edf7ff'}
                            activeBackgroundColor={'#e5e5e5'}
                            isTooltipAllowed={true}
                            tooltip={'Login with Github'}
                        />
                    </SocialLoginButtonWrapper>

                    <DividerWrapper>
                        <Line/>
                        <Typography text={'or'} type={'custom'} family={'Inter'} color={'rgba(255, 255, 255, 0.4)'} weight={300}/>
                        <Line/>
                    </DividerWrapper>

                    <FieldWrapper>
                        <TextField
                            placeholder={'Email*'}
                            fontSize={'16px'}
                            padding={'10px 10px'}
                            background={'rgba(255, 255, 255, 0.1)'}
                            borderRadius={'7px'}
                            helperTextAllowed={true}
                            value={loginData.entryPoint}
                            onChange={(e) => handleInputChange(e, 'entryPoint')}
                            isDisabled={buttonLoader}
                            onKeyDown={handleKeyDown}
                        />
                        <TextField
                            placeholder={'Password*'}
                            fontSize={'16px'}
                            padding={'10px 10px'}
                            background={'rgba(255, 255, 255, 0.1)'}
                            borderRadius={'7px'}
                            helperTextAllowed={true}
                            helperText={helperText.password}
                            helperTextColor={'rgb(255,51,51)'}
                            passwordVisibilityIcon={true}
                            isPassword={true}
                            maxLength={25}
                            value={loginData.password}
                            onChange={(e) => handleInputChange(e, 'password')}
                            isDisabled={buttonLoader}
                            onKeyDown={handleKeyDown}
                        />
                    </FieldWrapper>

                    <LoaderButton
                        width={'95%'}
                        height={'40px'}
                        borderRadius={'10px'}
                        isLoading={buttonLoader}
                        text={'Login'}
                        onClick={handleLogin}
                        fontSize={'16px'}
                        backgroundColor={'rgba(255, 255, 255, 0.1)'}
                        border={'1px solid rgba(255, 255, 255, 0.4)'}
                        color={'rgba(255, 255, 255, 0.8)'}
                        hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                        hoveredColor={'rgba(255, 255, 255, 1)'}
                        activeColor={'rgba(255, 255, 255, 0.8)'}
                        activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                    />

                    <Divider verticalSpacing={'10px'} />

                    <CreateAccount onClick={()=> navigate(SIGNUP_PAGE)}>
                        Create Account
                    </CreateAccount>
                </LoginMain>
            </Wrapper>
        </BloggiosBase>
    );
};

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const LoginMain = styled.main`
  height: auto;
  min-height: 400px;
  width: clamp(220px, 90%, 380px);
  background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  -webkit-box-shadow: 10px 10px 47px 0px rgba(240,240,240,0.08);
  -moz-box-shadow: 10px 10px 47px 0px rgba(240,240,240,0.08);
  box-shadow: 10px 10px 47px 0px rgba(240,240,240,0.08);
  @media (max-width: 600px) {
    margin-top: 40px;
  }
  @media (max-height: 750px) {
    margin-top: 20px;
  }
`;

const BloggiosImage = styled.img`
  height: 80px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FieldWrapper = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SocialLoginButtonWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 40px;
  margin: 10px 0;
`;

const DividerWrapper = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.4);
`;

const LoginButton = styled.button`
  height: 34px;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.6);
  }
`;

const CreateAccount = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: #e5e5e5;
  font-size: 16px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
`;

export default React.memo(LoginPage);