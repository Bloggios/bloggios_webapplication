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
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setSnackbar} from "../../state/snackbarSlice";
import useSeo from "../../globalseo/useSeo";
import Typography from "../../component/typography/typography";
import IconButton from "../../component/buttons/iconButton";
import TextField from "../../component/fields/textField";
import LoaderButton from "../../component/buttons/loaderButton";
import Divider from "../../component/divider/divider";
import {HOME_PAGE, LOGIN_PAGE, OTP_PAGE} from "../../constant/pathConstants";
import {signupUser} from "../../restservices/authApi";

const SignUpPage = () => {

    useSeo('signup');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [buttonLoader, setButtonLoader] = useState(false);
    const {isAuthenticated} = useSelector((state)=> state.auth);

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        username: '',
    });

    const [helperText, setHelperText] = useState({
        email: '',
        password: '',
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleInputChange = useCallback((e, property) => {
        setSignupData(prevData => ({
            ...prevData,
            [property]: e.target.value,
        }));
        setHelperText(prevHelperText => ({
            ...prevHelperText,
            [property]: '',
        }));
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(HOME_PAGE, {
                replace: true
            })
        }
    }, []);

    const validateForm = () => {
        const errors = {};

        if (signupData.email==='') {
            errors.email = 'Email cannot be Empty'
        } else if (!validateEmail(signupData.email)) {
            errors.email = 'Email is not correct or valid'
        } else {
            errors.email = ''
        }

        if (signupData.password==='') {
            errors.password = 'Password cannot be Empty'
        } else if (!validatePassword(signupData.password)) {
            errors.password = 'Password is not of correct format'
        } else {
            errors.password = ''
        }

        return errors;
    };

    const handleEnterPress = (event) => {
        console.log(event)
        if (event.keyCode === '13') {
            handleSubmit();
        }
    };


    const handleSubmit = (e) => {
        setButtonLoader(true)
        e.preventDefault();

        const errors = validateForm();
        setHelperText(errors);

        if (Object.values(errors).some((error) => error)) {
            setButtonLoader(false);
            return;
        }

        signupUser(signupData)
            .then((response) => {
                setButtonLoader(false)
                const snackbarData = {
                    isSnackbar: true,
                    message: 'OTP sent to your Email. Please verify to continue',
                    snackbarType: 'Success'
                };
                dispatch(setSnackbar(snackbarData))
                navigate(OTP_PAGE, {
                    replace: true,
                    state: {
                        userId: response.userId
                    }
                })
            }).catch((error) => {
            const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
            const snackBarData = {
                isSnackbar: true,
                message: message,
                snackbarType: 'Error'
            }
            dispatch(setSnackbar(snackBarData))
            setButtonLoader(false)
        })
    };


    return (
        <Wrapper>
            <SignupMain>
                <BloggiosImage src={bloggios_logo} alt="Bloggios"/>
                <TextWrapper>
                    <Typography
                        text={'Create Account'}
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
                        tooltip={'Signup with Google'}
                    />
                    <IconButton
                        icon={<FaFacebookF fontSize={'20px'} color={'#0666b2'}/>}
                        background={'#e5e5e5'}
                        hoveredBackgroundColor={'#edf7ff'}
                        activeBackgroundColor={'#e5e5e5'}
                        isTooltipAllowed={true}
                        tooltip={'Signup with Facebook'}
                    />
                    <IconButton
                        icon={<FaGithub fontSize={'20px'} color={'#272727'}/>}
                        background={'#e5e5e5'}
                        hoveredBackgroundColor={'#edf7ff'}
                        activeBackgroundColor={'#e5e5e5'}
                        isTooltipAllowed={true}
                        tooltip={'Signup with Github'}
                    />
                </SocialLoginButtonWrapper>

                <DividerWrapper>
                    <Line/>
                    <Typography text={'OR'} type={'custom'} color={'rgba(255, 255, 255, 0.4)'} weight={100}/>
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
                        helperText={helperText.email}
                        value={signupData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        isDisabled={buttonLoader}
                    />
                    <TextField
                        placeholder={'Password*'}
                        fontSize={'16px'}
                        padding={'10px 10px'}
                        background={'rgba(255, 255, 255, 0.1)'}
                        borderRadius={'7px'}
                        helperTextAllowed={true}
                        helperText={helperText.password}
                        passwordVisibilityIcon={true}
                        isPassword={true}
                        maxLength={20}
                        value={signupData.password}
                        onChange={(e) => handleInputChange(e, 'password')}
                        isDisabled={buttonLoader}
                    />
                </FieldWrapper>

                <SignupTextWrapper>
                    By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </SignupTextWrapper>

                <LoaderButton
                    width={'95%'}
                    height={'40px'}
                    borderRadius={'10px'}
                    isLoading={buttonLoader}
                    text={'Sign Up'}
                    fontSize={'16px'}
                    onClick={handleSubmit}
                    backgroundColor={'rgba(255, 255, 255, 0.1)'}
                    border={'1px solid rgba(255, 255, 255, 0.4)'}
                    color={'rgba(255, 255, 255, 0.8)'}
                    hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                    hoveredColor={'rgba(255, 255, 255, 1)'}
                    activeColor={'rgba(255, 255, 255, 0.8)'}
                    activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                />

                <Divider verticalSpacing={'10px'} />

                <AlreadyAccount onClick={()=> navigate(LOGIN_PAGE)}>
                    Already Account ? Login
                </AlreadyAccount>

            </SignupMain>
        </Wrapper>
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

const SignupMain = styled.main`
  height: auto;
  min-height: 500px;
  width: clamp(220px, 90%, 380px);
  background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
  padding: 16px 0;
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

const SignupTextWrapper = styled.span`
  width: 95%;
  display: flex;
  height: auto;
  font-size: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 100;
  letter-spacing: 1px;
  text-align: justify;
  opacity: 0.8;
`;

const SignUpButton = styled.button`
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

const AlreadyAccount = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: #e5e5e5;
  font-size: 16px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
`;

export default React.memo(SignUpPage);