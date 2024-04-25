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

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import styled, {css} from "styled-components";
import * as Bg from './StyledComponent';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {HOME_PAGE, LANDING_PAGE, LOGIN_PAGE} from "../../constant/pathConstants";
import {profileTagsList} from "../../restservices/profileApi";
import {dispatchError, dispatchErrorMessage, dispatchSuccessMessage} from "../../service/functions";
import {authenticatedAxios} from "../../restservices/baseAxios";
import {ADD_PROFILE} from "../../constant/apiConstants";
import IconButton from "../buttons/IconButton";
import {FaCircleInfo} from "react-icons/fa6";
import {FaCheck} from "react-icons/fa";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import {Tooltip} from "react-tooltip";
import {colors} from "../../styles/Theme";
import {useMutation} from "@tanstack/react-query";
import {deleteComment} from "../../restservices/commentApi";
import {forgetPassword, forgetPasswordOtp, verifyOtp} from "../../restservices/authApi";
import OtpInput from "../fields/otpInput";
import useComponentSize from "../../hooks/useComponentSize";
import {clearLoading} from "../../state/loadingSlice";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {IoCheckmarkSharp} from "react-icons/io5";

const ForgetPasswordComponent = () => {

    const {isAuthenticated, userId} = useSelector(state => state.auth);
    const [currentStep, setCurrentStep] = useState(1);
    const [emailError, setEmailError] = useState({
        isError: false,
        message: null
    });
    const [otpError, setOtpError] = useState({
        isError: false,
        message: null
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buttonLoader, setButtonLoader] = useState(false);
    const {width} = useWindowDimensions();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [componentRef, size] = useComponentSize();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [forgetPasswordData, setForgetPasswordData] = useState({
        email: '',
        otp: '',
        userId: '',
        newPassword: ''
    });
    const [inputValue, setInputValues] = useState({
        input1: '', input2: '', input3: '', input4: '', input5: '', input6: '',
    });
    const [passwordValue, setPasswordValue] = useState({
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState({
        isError: false,
        message: null
    });

    useLayoutEffect(() => {
        if (isAuthenticated) {
            navigate(HOME_PAGE, {
                replace: true
            })
        }
    }, []);

    const handleOtpInputChange = useCallback((id, value) => {
        setInputValues((prevValue) => ({
            ...prevValue, [id]: value
        }));
    }, []);

    useEffect(() => {
        console.log(forgetPasswordData);
    }, [forgetPasswordData, currentStep])

    const handleInputChange = (event, property) => {
        setEmailError({
            isError: false,
            message: null
        });
        setOtpError({
            isError: false,
            message: null
        });
        setForgetPasswordData(prevData => ({
            ...prevData, [property]: event.target.value
        }))
    }

    const handlePasswordChange = (event, property) => {
        setPasswordError({
            isError: false,
            message: null
        });
        setPasswordValue(prevState => ({
            ...prevState, [property]: event.target.value
        }));
    }

    const handlePasswordBlur = (event) => {
        if (event.target.value === '') {
            return;
        }
        if (passwordValue.password !== passwordValue.confirmPassword) {
            setPasswordError({
                isError: true,
                message: 'Passwords do not match'
            })
        }
    }

    const updateSteps = (type) => {
        setCurrentStep((prevStep) => {
            if (type === 'next' && prevStep < 4) {
                return prevStep + 1;
            } else if (type === 'prev' && prevStep > 1) {
                return prevStep - 1;
            }
            return prevStep;
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (currentStep === 1) {
                handleEmailSend();
            }
        }
    };

    const handleEmailSend = () => {
        setButtonLoader(true);
        if ((currentStep === 1 && forgetPasswordData.email === '')) {
            setEmailError({
                isError: true,
                message: 'Hold on there! Before you move next, a email in this field we need to know.'
            });
            setButtonLoader(false);
            return;
        } else if (currentStep === 1 && !emailRegex.test(forgetPasswordData.email)) {
            setEmailError({
                isError: true,
                message: 'The email entered appears to be invalid. Please double-check for accuracy.'
            });
            setButtonLoader(false);
            return;
        }
        forgetPasswordOtp(forgetPasswordData.email)
            .then(response => {
                setForgetPasswordData(prevData => ({
                    ...prevData,
                    userId: response.userId
                }));
                dispatchSuccessMessage(dispatch, 'An OTP has been successfully sent to your registered email address');
                updateSteps('next');
            }).catch(error => {
            dispatchError(dispatch, error);
            setForgetPasswordData({});
        }).finally(() => {
            setButtonLoader(false);
        });
    }

    const handleOtpSubmit = useCallback(() => {
        setButtonLoader(true);
        const otpData = inputValue.input1 + "" + inputValue.input2 + "" + inputValue.input3 + "" + inputValue.input4 + "" + inputValue.input5 + "" + inputValue.input6;
        if (otpData.length > 0 && otpData.length !== 6) {
            setOtpError({
                isError: true,
                message: 'OTP must be of 6 Characters'
            });
            setButtonLoader(false);
        } else if (otpData.length === 0) {
            setOtpError({
                isError: true,
                message: 'Hold on there! Before you move next, a OTP in this field is mandatory.'
            });
            setButtonLoader(false);
        } else {
            setButtonLoader(false);
            setForgetPasswordData(prevData => ({
                ...prevData,
                otp: otpData
            }));
            updateSteps('next');
        }
    });

    const handleForgetPassword = () => {
        setButtonLoader(true);
        const payload = {
            userId: forgetPasswordData.userId,
            otp: forgetPasswordData.otp,
            newPassword: passwordValue.confirmPassword
        }
        forgetPassword(payload)
            .then(response => {
                updateSteps('next');
                setForgetPasswordData({});
            }).catch(error => {
            dispatchError(dispatch, error);
            if (error.response?.data && error.response.data?.field === 'otp') {
                updateSteps('prev');
            }
        }).finally(() => {
            setButtonLoader(false);
        })
    }

    const getInputFieldContent = useCallback(() => {
        if (currentStep === 1) {
            return (
                <>
                    <Field>
                        <FieldSummary>
                            Looks like your secret access code (password) has gone rogue. But fear not, fellow agent! To
                            receive a mission briefing (instructions) on retrieving your login, enter your <span
                            className={'gradient__dark-orange'}>Email</span> address below.
                        </FieldSummary>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex'
                        }}>
                            <Input
                                type={'email'}
                                placeholder={'Email*'}
                                maxLength={70}
                                required={true}
                                autoFocus={true}
                                value={forgetPasswordData.name}
                                inputMode={'email'}
                                onChange={(e) => handleInputChange(e, 'email')}
                                onKeyDown={handleKeyDown}
                            />
                            <IconButton
                                tooltipId={'forget-password__email-field'}
                                tooltipContent={'<p style="text-align: center">Email is mandatory field<br/>and cannot be empty</p>'}
                                isHtmlTooltip={true}
                                tooltipDelay={500}
                                fontSize={'20px'}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                            >
                                <FaCircleInfo/>
                            </IconButton>
                        </div>
                        {emailError.isError && (
                            <span style={{
                                fontSize: '12px',
                                fontFamily: "'Poppins', sans-serif",
                                color: 'rgb(255,87,87)',
                                letterSpacing: '1px'
                            }}>
                            {emailError.message ? emailError.message : 'Hold on there! Before you move next, a email in this field we need to know.'}
                        </span>
                        )}
                    </Field>
                    c
                </>
            )
        } else if (currentStep === 2) {
            return (
                <>
                    <Field>
                        <FieldSummary style={{fontSize: 'clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem)'}}>
                            You've to craft a powerful new defense system (password) for your account. To confirm its effectiveness, we've sent a secret verification code (OTP) to your email address. Enter the code below to complete the mission.
                        </FieldSummary>

                        <OtpWrapper id={'OTPGroup'} data-autosubmit={true} ref={componentRef}>
                            <OtpInput
                                id={'input1'}
                                value={inputValue.input1}
                                onValueChange={handleOtpInputChange}
                                previousId={null}
                                handleSubmit={handleOtpSubmit}
                                nextId={'input2'}
                                autofocus={true}
                            />
                            <OtpInput
                                id={'input2'}
                                value={inputValue.input2}
                                onValueChange={handleOtpInputChange}
                                previousId={'input1'}
                                handleSubmit={handleOtpSubmit}
                                nextId={'input3'}
                            />
                            <OtpInput
                                id={'input3'}
                                value={inputValue.input3}
                                onValueChange={handleOtpInputChange}
                                previousId={'input2'}
                                handleSubmit={handleOtpSubmit}
                                nextId={'input4'}
                            />
                            <OtpInput
                                id={'input4'}
                                value={inputValue.input4}
                                onValueChange={handleOtpInputChange}
                                previousId={'input3'}
                                handleSubmit={handleOtpSubmit}
                                nextId={'input5'}
                            />
                            <OtpInput
                                id={'input5'}
                                value={inputValue.input5}
                                onValueChange={handleOtpInputChange}
                                previousId={'input4'}
                                handleSubmit={handleOtpSubmit}
                                nextId={'input6'}
                            />
                            <OtpInput
                                id={'input6'}
                                value={inputValue.input6}
                                onValueChange={handleOtpInputChange}
                                previousId={'input5'}
                                handleSubmit={handleOtpSubmit}
                            />
                        </OtpWrapper>

                        {otpError.isError && (
                            <span style={{
                                fontSize: '12px',
                                fontFamily: "'Poppins', sans-serif",
                                color: 'rgb(255,87,87)',
                                letterSpacing: '1px'
                            }}>
                            {otpError.message ? otpError.message : 'Hold on there! Before you move next, a OTP in this field is incorrect.'}
                        </span>
                        )}
                    </Field>

                    <FetchLoaderButton
                        isLoading={buttonLoader}
                        text={'Next'}
                        onClick={handleOtpSubmit}
                        loaderSize={'2px'}
                        loaderDotsSize={'2px'}
                        bgColor={'#4258ff'}
                        hBgColor={'rgba(66, 88, 255, 0.9)'}
                        aBgColor={'#4258ff'}
                        color={'rgba(245, 245, 245, 0.8)'}
                        hColor={'rgba(245, 245, 245, 1)'}
                        borderRadius={'10px'}
                        padding={'8px 25px'}
                        style={{
                            width: '110px',
                            height: '40px',
                            border: 'none',
                            outline: 'none',
                            fontSize: 'clamp(0.75rem, 0.6622rem + 0.5405vw, 1rem)',
                            alignSelf: 'center'
                        }}
                    />
                </>
            )
        } else if (currentStep === 3) {
            return (
                <>
                    <Field style={{gap: 10}}>
                        <FieldSummary style={{fontSize: 'clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem)'}}>
                            <strong>Choose a strong password that includes uppercase and lowercase letters, numbers, and
                                symbols.
                                The longer, the better!</strong>
                        </FieldSummary>

                        <Bg.Field>
                            <Bg.Label>
                                New Password
                            </Bg.Label>
                            <Bg.Input
                                type={'password'}
                                maxLength={40}
                                required={true}
                                placeholder={'●●●●●●●●●'}
                                value={passwordValue.password}
                                onChange={(event) => handlePasswordChange(event, 'password')}
                                onBlur={handlePasswordBlur}
                            />
                        </Bg.Field>

                        <Bg.Field>
                            <Bg.Label>
                                Confirm Password
                            </Bg.Label>
                            <Bg.Input
                                type={isPasswordVisible ? 'text' : 'password'}
                                maxLength={20}
                                required={true}
                                placeholder={'●●●●●●●●●'}
                                value={passwordValue.confirmPassword}
                                onChange={(event) => handlePasswordChange(event, 'confirmPassword')}
                                onKeyDown={handleKeyDown}
                                onBlur={handlePasswordBlur}
                            />
                            <IconButton
                                tooltipId={'password-shown-forget-password-page'}
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

                        {passwordError.isError && (
                            <span style={{
                                fontSize: '12px',
                                fontFamily: "'Poppins', sans-serif",
                                color: 'rgb(255,87,87)',
                                letterSpacing: '1px'
                            }}>
                            {passwordError.message ? passwordError.message : 'Hold on there! Before you move next, a Password in this field is required.'}
                        </span>
                        )}
                    </Field>

                    <FetchLoaderButton
                        isLoading={buttonLoader}
                        text={'Submit'}
                        onClick={handleForgetPassword}
                        loaderSize={'2px'}
                        loaderDotsSize={'2px'}
                        bgColor={'#4258ff'}
                        hBgColor={'rgba(66, 88, 255, 0.9)'}
                        aBgColor={'#4258ff'}
                        color={'rgba(245, 245, 245, 0.8)'}
                        hColor={'rgba(245, 245, 245, 1)'}
                        borderRadius={'10px'}
                        padding={'8px 25px'}
                        style={{
                            width: '110px',
                            height: '40px',
                            border: 'none',
                            outline: 'none',
                            fontSize: 'clamp(0.75rem, 0.6622rem + 0.5405vw, 1rem)',
                            alignSelf: 'center'
                        }}
                    />
                </>
            )
        } else if (currentStep === 4) {
            return (
                <>
                    <Field>
                        <FieldSummary style={{fontSize: 'clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem)'}}>
                            <strong>Huzzah, agent!&nbsp;</strong>
                            You've successfully built a new defense system (password) and secured your account. Now you can freely access your top-secret intel (data) once again.
                        </FieldSummary>

                        <IconWrapper>
                            <IoCheckmarkSharp />
                        </IconWrapper>
                    </Field>

                    <ButtonsContainer>
                        <Button onClick={()=> navigate(LOGIN_PAGE)}>
                            Home
                        </Button>

                        <Button onClick={()=> navigate(LANDING_PAGE, {replace: true})}>
                            Login
                        </Button>
                    </ButtonsContainer>
                </>
            )
        }
    }, [currentStep, forgetPasswordData.name, emailError.isError, emailError.message, buttonLoader, componentRef, inputValue.input1, handleOtpSubmit, inputValue.input2, inputValue.input3, inputValue.input4, inputValue.input5, inputValue.input6, handleOtpInputChange, otpError.isError, otpError.message, passwordValue.password, isPasswordVisible, passwordValue.confirmPassword, passwordError.isError, passwordError.message, navigate])

    return (
        <Wrapper>
            <StepsContainer>
                {[1, 2, 3, 4].map(step => (
                    <Circle key={step} className={currentStep === step || currentStep > step ? 'active' : ''}>
                        {currentStep > step && (
                            <FaCheck color={'#f5f5f5'}/>
                        )}
                    </Circle>
                ))}
                <ProgressBar>
                    <Indicator currentStep={currentStep}/>
                </ProgressBar>
            </StepsContainer>

            <Form>
                <Header>
                    Forget <span className={'gradient__light-yellow-green'}>Password</span>
                </Header>

                {getInputFieldContent()}
            </Form>

            {width > 600 &&
                <>
                    <Tooltip id={'forget-password__email-field'}/>
                    <Tooltip id={'password-shown-forget-password-page'}/>
                </>
            }
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: clamp(220px, 90%, 520px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
`;

const StepsContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
`;

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: #f5f5f5;
    border: 4px solid #e0e0e0;
    transition: all 200ms ease;
    transition-delay: 0s;

    &.active {
        transition-delay: 100ms;
        border-color: #465cff;
        background-color: #465cff;
    }
`;

const ProgressBar = styled.div`
    position: absolute;
    height: 4px;
    width: 100%;
    background: #e0e0e0;
    z-index: -1;
`;

const Indicator = styled.span`
    position: absolute;
    height: 100%;
    width: ${({currentStep}) => `${((currentStep - 1) / 3) * 100}%`};
    background: #465cff;
    transition: all 300ms ease;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: row;
    justify-content: center;
`;

const Button = styled.button`
    font-family: 'Poppins', sans-serif;
    padding: 8px 25px;
    background: ${({disabled}) => (disabled ? '#6676f4' : '#4258ff')};
    border: none;
    border-radius: 8px;
    color: rgba(245, 245, 245, 0.8);
    font-size: clamp(0.75rem, 0.6622rem + 0.5405vw, 1rem);
    font-weight: 400;
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    transition: all 200ms linear;

    &:hover {
        background-color: rgba(66, 88, 255, 0.9);
        color: #f5f5f5;
    }
`;

const Form = styled.div`
    width: 100%;
    margin-top: 20px;
    height: auto;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 400px) {
        padding: 10px 5px;
    }
`;

const Header = styled.h2`
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    margin-top: 25px;
    font-size: clamp(1rem, 0.7926rem + 1.2766vw, 1.75rem);
    color: #f5f5f5;
    font-weight: 600;
    text-align: center;
`;

const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 34px 0;
    gap: 16px;
    position: relative;
`;

const FieldSummary = styled.span`
    font-size: clamp(0.75rem, 0.7015rem + 0.2985vw, 1rem);
    font-family: 'Poppins', sans-serif;
    color: rgba(245, 245, 245, 0.8);
    letter-spacing: 1px;
`;

const FieldStyles = css`
    border: none;
    outline: none;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 300;

    &:focus {
        color: rgba(245, 245, 245, 1);
    }
`;

const Input = styled.input`
    ${FieldStyles}
`;

const TextArea = styled.textarea`
    ${FieldStyles};
    resize: none;
`;

const SelectStyle = styled.select`
    font-family: 'Poppins', sans-serif;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    outline: 0;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 300;

    &::-ms-expand {
        display: none;
    }

    &:hover, :focus {
        color: #f5f5f5;
        background: #2a2a2a;
        border: none;
    }

    & option {
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
    }
`;

const LinkInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: fit-content;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    border-radius: 4px;

    & > span {
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        color: ${colors.white50};
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 300;
    }

    & > input {
        border: none;
        outline: none;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        color: rgba(245, 245, 245, 0.8);
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 300;

        &:focus {
            color: rgba(245, 245, 245, 1);
        }
    }
`;

const OtpWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: all 150ms ease;
`;

const IconWrapper = styled.div`
    display: flex;
    align-self: center;
    border-radius: 50%;
    background-color: ${colors.accent100};
    color: ${colors.white100};
    padding: 10px;
    font-size: 70px;
`;

export default ForgetPasswordComponent;