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
import * as Bg from "./StyledComponent";
import {bgAccentRounded} from "../../asset/svg";
import {LOGIN_PAGE, SIGNUP_PAGE} from "../../constant/pathConstants";
import OtpInput from "../fields/otpInput";
import styled from "styled-components";
import {clearLoading} from "../../state/loadingSlice";
import {resendOtp, verifyOtp} from "../../restservices/authApi";
import {setSnackbar} from "../../state/snackbarSlice";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import useComponentSize from "../../hooks/useComponentSize";
import SimpleLoader from "../loaders/simpleLoader";
import Typography from "../typography/typography";
import {OTP_NOT_PRESENT_FOR_USER} from "../../constant/ExceptionCodes";
import {dispatchError, dispatchErrorMessage} from "../../service/functions";

const OtpComponent = () => {

    const {width} = useComponentSize();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [componentRef, size] = useComponentSize();
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(25);
    const [inputValue, setInputValues] = useState({
        input1: '', input2: '', input3: '', input4: '', input5: '', input6: '',
    });

    const handleInputChange = useCallback((id, value) => {
        setInputValues((prevValue) => ({
            ...prevValue, [id]: value
        }));
    }, []);

    const userId = location.state?.userId ? location.state.userId : '';

    useLayoutEffect(() => {
        if (userId === '') {
            navigate(SIGNUP_PAGE)
        }
    }, [navigate, userId]);

    const handleSubmit = useCallback(() => {
        setIsLoading(true);
        const otpData = inputValue.input1 + "" + inputValue.input2 + "" + inputValue.input3 + "" + inputValue.input4 + "" + inputValue.input5 + "" + inputValue.input6;
        const otpPayload = {
            otp: otpData,
            userId: userId
        };
        verifyOtp(otpPayload)
            .then((response) => {
                dispatch(clearLoading())
                navigate(LOGIN_PAGE, {
                    replace: true
                });
            }).catch((error) => {
            dispatchError(dispatch, error);
            dispatch(clearLoading());
            setInputValues({
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: ''
            });
        }).finally(()=> {
            setIsLoading(false);
        })
    });

    const handleResendOtp = () => {
        setIsLoading(true);
        resendOtp(userId)
            .then((response) => {
                const snackbarData = {
                    isSnackbar: true,
                    message: 'OTP sent to your Email',
                    snackbarType: 'Success'
                };
                dispatch(setSnackbar(snackbarData))
                setTimeout(() => {
                    setIsLoading(false);
                    setCountdown(25);
                }, 2000)
            }).catch((error) => {
            setIsLoading(false);
            if (error?.response?.data?.uniqueErrorCode === OTP_NOT_PRESENT_FOR_USER) {
                dispatchErrorMessage(dispatch, 'Something went wrong while resending OTP');
                navigate(SIGNUP_PAGE, {
                    replace: true
                })
            } else {
                dispatchError(dispatch, error);
            }
            setCountdown(25);
        })
    }

    useEffect(() => {
        let intervalId;
        if (!isLoading && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isLoading, countdown]);

    return (<Bg.Wrapper>
            <Bg.Logo src={bgAccentRounded} alt="Bloggios"/>

            <Bg.Header>
                <h2>OTP Verification</h2>
                <p>Enter the verification code do we sent<br/>to your Email Address</p>
            </Bg.Header>


            <span style={{
                margin: '34px 0 10px 0',
                fontSize: 'clamp(0.625rem, 0.5213rem + 0.6383vw, 1rem)',
                color: 'rgba(249, 249, 249, 0.8)',
                fontWeight: 300
            }}>
                Type 6 digit OTP here
            </span>
            <OtpWrapper id={'OTPGroup'} data-autosubmit={true} ref={componentRef}>
                <OtpInput
                    id={'input1'}
                    value={inputValue.input1}
                    onValueChange={handleInputChange}
                    previousId={null}
                    handleSubmit={handleSubmit}
                    nextId={'input2'}
                    autofocus={true}
                />
                <OtpInput
                    id={'input2'}
                    value={inputValue.input2}
                    onValueChange={handleInputChange}
                    previousId={'input1'}
                    handleSubmit={handleSubmit}
                    nextId={'input3'}
                />
                <OtpInput
                    id={'input3'}
                    value={inputValue.input3}
                    onValueChange={handleInputChange}
                    previousId={'input2'}
                    handleSubmit={handleSubmit}
                    nextId={'input4'}
                />
                <OtpInput
                    id={'input4'}
                    value={inputValue.input4}
                    onValueChange={handleInputChange}
                    previousId={'input3'}
                    handleSubmit={handleSubmit}
                    nextId={'input5'}
                />
                <OtpInput
                    id={'input5'}
                    value={inputValue.input5}
                    onValueChange={handleInputChange}
                    previousId={'input4'}
                    handleSubmit={handleSubmit}
                    nextId={'input6'}
                />
                <OtpInput
                    id={'input6'}
                    value={inputValue.input6}
                    onValueChange={handleInputChange}
                    previousId={'input5'}
                    handleSubmit={handleSubmit}
                />
            </OtpWrapper>

            <ButtonWrapper
                onClick={handleResendOtp}
                disabled={countdown > 0}
                style={{
                    width: size.width,
                    height: size.height,
                    cursor: isLoading || countdown > 0 ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? <SimpleLoader size={'5px'}/> : countdown > 0 ? (<CountdownWrapper>
                    <Typography text={'Resend  In'} type={'custom'} size={width > 500 ? '22px' : '18px'}/>
                    <CircularContainer>
                        {countdown}
                    </CircularContainer>
                </CountdownWrapper>) : 'Resend OTP'}

            </ButtonWrapper>
        </Bg.Wrapper>);
};

const OtpWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: all 150ms ease;
`;

const ButtonWrapper = styled.button`
    background-color: rgba(66, 88, 255, 0.8);
    color: rgba(245, 245, 245, 0.8);
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: clamp(0.875rem, 0.778rem + 0.597vw, 1.375rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    margin-top: 40px;
    transition: all 150ms;

    &:hover {
        background-color: rgba(66, 88, 255, 1);
        color: rgba(245, 245, 245, 1);
    }

    &:active {
        background-color: rgba(66, 88, 255, 0.88);
        color: rgba(245, 245, 245, 0.88);
    }

    &:disabled {
        background-color: rgba(66, 88, 255, 0.6);
        color: rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 550px) {
        border-radius: 7px;
        font-size: 18px;
    }

    @media (max-width: 450px) {
        font-size: 16px;
    }
`;

const CountdownWrapper = styled.div`
    width: 95%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 550px) {
        width: 90%;
        height: 90%;
    }
`;

const CircularContainer = styled.div`
    height: 28px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    color: #4258ff;
    font-weight: 600;

    @media (max-width: 550px) {
        height: 28px;
        width: 28px;
    }
    @media (max-width: 450px) {
        height: 25px;
        width: 25px;
    }
`;

export default OtpComponent;