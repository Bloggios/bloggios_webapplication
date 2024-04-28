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
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LOGIN_PAGE, OTP_PAGE} from "../../constant/pathConstants";
import {bgAccentRounded} from "../../asset/svg";
import IconButton from "../buttons/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import {Tooltip} from "react-tooltip";
import * as Bg from './StyledComponent';
import {dispatchError, dispatchErrorMessage, dispatchSuccessMessage} from "../../service/functions";
import {signupUser} from "../../restservices/authApi";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const SignUpComponent = () => {

    const navigate = useNavigate();
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const [buttonLoader, setButtonLoader] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {isAuthenticated} = useSelector((state) => state.auth);
    const [signupData, setSignupData] = useState({
        email: '',
        password: ''
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleInputChange = (event, property) => {
        setSignupData(prevState => ({
            ...prevState,
            [property]: event.target.value
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (signupData.email === '') {
            errors.email = 'Email cannot be Empty'
        } else if (!validateEmail(signupData.email)) {
            errors.email = 'Email is not correct or valid'
        } else {
            errors.email = ''
        }

        if (signupData.password === '') {
            errors.password = 'Password cannot be Empty'
        } else if (!validatePassword(signupData.password)) {
            errors.password = 'Password is not of correct format'
        } else {
            errors.password = ''
        }

        return errors;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSignup(event);
        }
    };


    const handleSignup = (e) => {
        setButtonLoader(true)
        e.preventDefault();

        const errors = validateForm();

        if (Object.values(errors).some((error) => error)) {
            setButtonLoader(false);
            if (errors.email) {
                dispatchErrorMessage(dispatch, errors.email);
            }
            if (errors.password) {
                dispatchErrorMessage(dispatch, errors.password);
            }
            return;
        }

        signupUser(signupData)
            .then((response) => {
                setButtonLoader(false)
                dispatchSuccessMessage(dispatch, 'OTP sent to your Email. Please verify to continue');
                navigate(OTP_PAGE, {
                    replace: true,
                    state: {
                        userId: response.userId
                    }
                })
            }).catch((error) => {
            dispatchError(dispatch, error);
            setButtonLoader(false)
        })
    };

    return (
        <Bg.Wrapper>
            <Bg.Logo src={bgAccentRounded} alt="Bloggios"/>

            <Bg.Header>
                <h2>Sign Up, It's Easy</h2>
                <p>Bloggios where thoughts connect seamlessly</p>
            </Bg.Header>

            <Bg.Form onSubmit={handleSignup}>
                <Bg.Field>
                    <Bg.Label>
                        Email
                    </Bg.Label>
                    <Bg.Input
                        type={'email'}
                        maxLength={40}
                        required={true}
                        placeholder={'user@bloggios.com*'}
                        value={signupData.email}
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
                        value={signupData.password}
                        onChange={(event) => handleInputChange(event, 'password')}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton
                        tooltipId={'password-shown-signup-page'}
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

                <Bg.TermsSpan>
                    By Signing Up, your agree to our <strong>Terms of Service</strong> and <strong>Privacy
                    Policy</strong>
                </Bg.TermsSpan>

                <FetchLoaderButton
                    isLoading={buttonLoader}
                    type={'submit'}
                    text={'Sign Up'}
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

            {/*<Bg.Divider>*/}
            {/*    <div/>*/}
            {/*    <span>Or Continue With</span>*/}
            {/*    <div/>*/}
            {/*</Bg.Divider>*/}

            {/*<div style={{*/}
            {/*    width: '100%',*/}
            {/*    display: 'flex',*/}
            {/*    flexDirection: 'row',*/}
            {/*    justifyContent: 'center',*/}
            {/*    gap: '10px'*/}
            {/*}}>*/}
            {/*    <IconButton*/}
            {/*        bgColor={'rgba(255, 255, 255, 0.1)'}*/}
            {/*        borderRadius={'4px'}*/}
            {/*        tooltipId={'signup-google-signup-page'}*/}
            {/*        tooltipContent={'Sign Up with Google'}*/}
            {/*        tooltipDelay={0}*/}
            {/*    >*/}
            {/*        <FcGoogle/>*/}
            {/*    </IconButton>*/}

            {/*    <IconButton*/}
            {/*        bgColor={'rgba(255, 255, 255, 0.1)'}*/}
            {/*        borderRadius={'4px'}*/}
            {/*        tooltipId={'signup-facebook-signup-page'}*/}
            {/*        tooltipContent={'Sign Up with Facebook'}*/}
            {/*        tooltipDelay={0}*/}
            {/*    >*/}
            {/*        <FaFacebook color={'#187bf0'}/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}

            <Bg.AddAccount>
                Already have an Account?
                <span onClick={()=> navigate(LOGIN_PAGE)}>Login</span>
            </Bg.AddAccount>
            {width > 600 && (
                <>
                    <Tooltip id={'password-shown-signup-page'}/>
                    <Tooltip id={'signup-google-signup-page'}/>
                    <Tooltip id={'signup-facebook-signup-page'}/>
                </>
            )}
        </Bg.Wrapper>
    );
};
export default SignUpComponent;