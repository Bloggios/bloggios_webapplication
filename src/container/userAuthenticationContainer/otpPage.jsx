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
import {verifyOtp} from "../../restservices/authApi";

const OtpPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(25);
    const [inputValue, setInputValues] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
    });


    const {width} = useWindowDimensions();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [componentRef, size] = useComponentSize();

    const userId = location.state?.userId ? location.state.userId : '';

    useEffect(() => {
        if (userId === '') {
            navigate(SIGNUP_PAGE)
        }
    }, [navigate, userId]);

    const handleInputChange = useCallback((id, value) => {
        setInputValues((prevValue) => ({
            ...prevValue, [id]: value
        }));
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(initiateLoading(true))
        const otpData = inputValue.input1 + "" + inputValue.input2 + "" + inputValue.input3 + "" + inputValue.input4 + "" + inputValue.input5 + "" + inputValue.input6;
        const otpPayload = {
            userId: userId,
            otp: otpData,
        };
        verifyOtp(otpPayload)
            .then((response) => {
                dispatch(clearLoading())
                navigate(LOGIN_PAGE, {
                    replace: true
                });
            }).catch((error) => {
            const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
            const snackBarData = {
                isSnackbar: true,
                message: message,
                snackbarType: 'Error'
            };
            dispatch(clearLoading());
            dispatch(setSnackbar(snackBarData));
        })
    });

    const handleResendOtp = () => {
        setIsLoading(true);
        // resendOtp(userId)
        //     .then((response) => {
        //         const snackbarData = {
        //             isSnackbar: true,
        //             message: 'OTP sent to your Email',
        //             snackbarType: 'Success'
        //         };
        //         dispatch(setSnackbar(snackbarData))
        //         setTimeout(() => {
        //             setIsLoading(false);
        //             setCountdown(25);
        //         }, 2000)
        //     }).catch((error) => {
        //     logger.error(error);
        //     setIsLoading(false);
        //     const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
        //     const snackBarData = {
        //         isSnackbar: true,
        //         message: message,
        //         snackbarType: 'Error'
        //     }
        //     dispatch(setSnackbar(snackBarData))
        //     setCountdown(25);
        // })
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

    return (
        <Wrapper>
            <IconWrapper>
                <LuShieldCheck/>
            </IconWrapper>

            <TextWrapper>
                {
                    width > 500 ? (
                        <>
                            <Typography
                                text={'Please verify your Email'}
                                type={'title'}
                            />
                            <Typography
                                text={'We have sent you an email for OTP'}
                                type={'custom'}
                                color={'rgba(255, 255, 255, 0.6)'}
                                size={'16px'}
                                spacing={'1px'}
                                family={'Inter'}
                            />
                        </>
                    ) : (
                        <>
                            <Typography
                                text={'Please verify your Email'}
                                type={'custom'}
                                size={'20px'}
                                spacing={'1px'}
                                weight={400}
                                family={'Inter'}
                            />
                            <Typography
                                text={'We have sent you an email for OTP'}
                                type={'custom'}
                                color={'rgba(255, 255, 255, 0.6)'}
                                size={'12px'}
                                spacing={'1px'}
                                family={'Inter'}
                            />
                        </>
                    )
                }
            </TextWrapper>

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
                <Splitter>&ndash;</Splitter>
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
        </Wrapper>
    );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding-top: 40px;
  min-width: 270px;
`;

const OtpWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 10px;
  transition: all 150ms ease;
  @media (max-width: 500px) {
    gap: 10px;
  }
`;

const Splitter = styled.span`
  padding: 7px 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 40px;
  margin: 0;
  transition: all 150ms ease;
  @media (max-width: 550px) {
    font-size: 28px;
  }
  @media (max-width: 550px) {
    padding: 4px 0;
    font-size: 22px;
  }
`;

const IconWrapper = styled.div`
  height: 150px;
  width: 150px;
  background-color: #4258ff;
  color: #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  transition: all 150ms ease;
  @media (max-width: 500px) {
    height: 100px;
    width: 100px;
    font-size: 70px;
  }
`;

const TextWrapper = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.button`
  background-color: rgba(66, 88, 255, 0.75);
  color: rgba(255, 255, 255, 0.6);
  outline: none;
  border: none;
  border-radius: 16px;
  font-size: 25px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;

  &:hover {
    background-color: #4258ff;
    color: rgba(255, 255, 255, 1);
  }

  &:active {
    background-color: rgba(66, 88, 255, 0.75);
    color: rgba(255, 255, 255, 0.6);
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
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  font-size: 18px;
  color: #4258ff;
  font-weight: bold;
  @media (max-width: 550px) {
    height: 28px;
    width: 28px;
    font-size: 14px;
  }
  @media (max-width: 450px) {
    height: 25px;
    width: 25px;
    font-size: 12px;
  }
`;

export default React.memo(OtpPage);