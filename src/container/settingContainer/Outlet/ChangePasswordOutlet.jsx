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
import * as Bg from '../Components/StyledComponent';
import IconButton from "../../../component/buttons/IconButton";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {colors} from "../../../styles/Theme";
import {useMutation} from "@tanstack/react-query";
import {dispatchError, dispatchSuccessMessage} from "../../../service/functions";
import {changePassword, logoutUser} from "../../../restservices/authApi";
import {useDispatch} from "react-redux";

const ChangePasswordOutlet = () => {

    const [passwordValue, setPasswordValue] = useState({
        password: '',
        confirmPassword: '',
        oldPassword: ''
    });
    const [passwordError, setPasswordError] = useState({
        isError: false,
        message: null
    });
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const dispatch = useDispatch();

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

    const getButtonDisabled = () => {
        if (passwordError.isError) {
            return true;
        }
        if (passwordValue.oldPassword?.length === 0) {
            return true;
        }
        if (passwordValue.password?.length === 0) {
            return true;
        }
        if (passwordValue.confirmPassword?.length === 0) {
            return true;
        }
        if (passwordValue.password !== passwordValue.confirmPassword) {
            return true;
        }
    }

    const passwordChangeMutation = useMutation({
        mutationFn: (payload) => changePassword(payload),
        onSuccess: () => {
            dispatchSuccessMessage(dispatch, 'Password Changed Successfully!');
            logoutUser();
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    const handleChangePassword = () => {
        const payload = {
            newPassword: passwordValue.password,
            oldPassword: passwordValue.oldPassword
        }
        passwordChangeMutation.mutate(payload);
    }

    return (
        <Bg.Wrapper>
            <Bg.Heading2>
                Change Password
            </Bg.Heading2>

            <Bg.Paragraph>
                Strengthen your digital defenses by crafting a new, resilient password. Each keystroke becomes a barrier against potential threats, fortifying your online presence. Embrace this opportunity to enhance your security posture and shield your valuable data with a password tailored to withstand the challenges of the digital realm.
            </Bg.Paragraph>

            <Bg.Field>
                <Bg.Label>
                    Current Password
                </Bg.Label>
                <Bg.Input
                    type={isOldPasswordVisible ? 'text' : 'password'}
                    maxLength={40}
                    required={true}
                    placeholder={'●●●●●●●●●'}
                    value={passwordValue.oldPassword}
                    onChange={(event) => handlePasswordChange(event, 'oldPassword')}
                />

                <IconButton
                    tooltipId={'old-password-shown-change-password-page'}
                    tooltipContent={isOldPasswordVisible ? 'Hide Password' : 'Show Password'}
                    tooltipDelay={500}
                    onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 4
                    }}
                >
                    {isOldPasswordVisible ? <MdVisibilityOff/> : <MdVisibility/>}
                </IconButton>
            </Bg.Field>

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
                    type={isNewPasswordVisible ? 'text' : 'password'}
                    maxLength={40}
                    required={true}
                    placeholder={'●●●●●●●●●'}
                    value={passwordValue.confirmPassword}
                    onChange={(event) => handlePasswordChange(event, 'confirmPassword')}
                    onBlur={handlePasswordBlur}
                />
                <IconButton
                    tooltipId={'password-shown-change-password-page'}
                    tooltipContent={isNewPasswordVisible ? 'Hide Password' : 'Show Password'}
                    tooltipDelay={500}
                    onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 4
                    }}
                >
                    {isNewPasswordVisible ? <MdVisibilityOff/> : <MdVisibility/>}
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

            <FetchLoaderButton
                isLoading={passwordChangeMutation.isPending}
                text={'Submit'}
                onClick={handleChangePassword}
                loaderSize={'2px'}
                disabled={getButtonDisabled()}
                loaderDotsSize={'2px'}
                bgColor={'#4258ff'}
                dBgColor={colors.accent60}
                hBgColor={'rgba(66, 88, 255, 0.9)'}
                aBgColor={'#4258ff'}
                color={colors.white100}
                borderRadius={'10px'}
                padding={'8px 25px'}
                style={{
                    width: '110px',
                    height: '40px',
                    border: 'none',
                    outline: 'none',
                    fontSize: 'clamp(0.75rem, 0.6622rem + 0.5405vw, 1rem)',
                    alignSelf: 'flex-end',
                    marginTop: 20
                }}
            />
        </Bg.Wrapper>
    );
};

export default ChangePasswordOutlet;