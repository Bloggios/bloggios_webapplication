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
import styled from "styled-components";
import bloggios_logo from "../../asset/svg/bg_logo_rounded_black.svg";
import NameStepper from "./stepper/NameStepper";
import LoaderButton from "../../component/buttons/loaderButton";
import GenderAndDobStepper from "./stepper/GenderAndDobStepper";
import BioStepper from "./stepper/BioStepper";
import WebsiteStepper from "./stepper/WebsiteStepper";
import AuthenticatedAxiosInterceptor from "../../restservices/AuthenticatedAxiosInterceptor";
import {ADD_PROFILE} from "../../constant/apiConstants";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../constant/pathConstants";
import {setSnackbar} from "../../state/snackbarSlice";
import {useDispatch} from "react-redux";
import {authenticatedAxios} from "../../restservices/baseAxios";
import BloggiosBase from "../baseContainer/bloggiosBase";
import {fetchProfileAndDispatch} from "../../service/functions";

const ProfileAdditionInitial = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [buttonLoader, setButtonLoader] = useState(false);
    const authAxios = AuthenticatedAxiosInterceptor();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState(
        {
            name: '',
            link: '',
            gender: '',
            dob: '',
            bio: '',

        }
    )

    const [helperText, setHelperText] = useState({
        name: '',
    });

    const handleProfileSubmit = () => {
        setButtonLoader(true);
        if (data.name === '') {
            setButtonLoader(false);
            setCurrentStep(1);
        } else {
            authenticatedAxios.post(ADD_PROFILE, data)
                .then((response)=> {
                    setButtonLoader(false);
                    fetchProfileAndDispatch(dispatch);
                    navigate(HOME_PAGE, {
                        replace: true
                    });
                }).catch((error)=> {
                const message = error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong. Please try again later';
                const snackBarData = {
                    isSnackbar: true,
                    message: message,
                    snackbarType: 'Error'
                }
                dispatch(setSnackbar(snackBarData));
                setButtonLoader(false);
            })
        }
    }

    const validateForm = () => {
        const errors = {};

        if (data.name === '') {
            errors.name = 'Name cannot be Empty'
        } else {
            errors.name = ''
        }

        return errors;
    };

    const handleNext = (index) => {
        const errors = {};
        if (index === 1) {
            const validateName = validateForm();
            setHelperText(validateName);
            if (helperText.name === '') {
                setCurrentStep(currentStep + 1);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <BloggiosBase>
            <Wrapper>
                <Main>
                    <BloggiosImage src={bloggios_logo} alt="Bloggios"/>
                    <TextWrapper>
                        <TitleText>
                            Stepping Bloggios
                        </TitleText>
                    </TextWrapper>

                    <StepperWrapper>
                        {
                            currentStep === 1 && (
                                <NameStepper data={data} setData={setData} helperText={helperText}
                                             setHelperText={setHelperText}/>
                            )
                        }
                        {
                            currentStep === 2 && (
                                <GenderAndDobStepper data={data} setData={setData} helperText={helperText}
                                                     setHelperText={setHelperText}/>
                            )
                        }
                        {
                            currentStep === 3 && (
                                <BioStepper data={data} setData={setData}/>
                            )
                        }
                        {
                            currentStep === 4 && (
                                <WebsiteStepper data={data} setData={setData}/>
                            )
                        }

                        {
                            currentStep === 1 && (
                                <LoaderButton
                                    width={'100%%'}
                                    height={'40px'}
                                    borderRadius={'10px'}
                                    isLoading={false}
                                    text={'Next'}
                                    onClick={() => handleNext(1)}
                                    fontSize={'16px'}
                                    backgroundColor={'rgba(255, 255, 255, 0.1)'}
                                    border={'1px solid rgba(255, 255, 255, 0.4)'}
                                    color={'rgba(255, 255, 255, 0.8)'}
                                    hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                                    hoveredColor={'rgba(255, 255, 255, 1)'}
                                    activeColor={'rgba(255, 255, 255, 0.8)'}
                                    activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                                />
                            )
                        }

                        {
                            currentStep >= 2 && currentStep < 4 && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: '10px'
                                }}>
                                    <LoaderButton
                                        width={'95%'}
                                        height={'40px'}
                                        borderRadius={'10px'}
                                        isLoading={false}
                                        text={'Prev'}
                                        onClick={() => handlePrev()}
                                        fontSize={'16px'}
                                        backgroundColor={'rgba(255, 255, 255, 0.1)'}
                                        border={'1px solid rgba(255, 255, 255, 0.4)'}
                                        color={'rgba(255, 255, 255, 0.8)'}
                                        hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                                        hoveredColor={'rgba(255, 255, 255, 1)'}
                                        activeColor={'rgba(255, 255, 255, 0.8)'}
                                        activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                                    />
                                    <LoaderButton
                                        width={'95%'}
                                        height={'40px'}
                                        borderRadius={'10px'}
                                        isLoading={false}
                                        text={'Next'}
                                        onClick={() => handleNext(2)}
                                        fontSize={'16px'}
                                        backgroundColor={'rgba(255, 255, 255, 0.1)'}
                                        border={'1px solid rgba(255, 255, 255, 0.4)'}
                                        color={'rgba(255, 255, 255, 0.8)'}
                                        hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                                        hoveredColor={'rgba(255, 255, 255, 1)'}
                                        activeColor={'rgba(255, 255, 255, 0.8)'}
                                        activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                                    />
                                </div>
                            )
                        }

                        {
                            currentStep === 4 && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: '10px'
                                }}>
                                    <LoaderButton
                                        width={'95%'}
                                        height={'40px'}
                                        borderRadius={'10px'}
                                        isLoading={false}
                                        text={'Prev'}
                                        onClick={() => handlePrev()}
                                        fontSize={'16px'}
                                        backgroundColor={'rgba(255, 255, 255, 0.1)'}
                                        border={'1px solid rgba(255, 255, 255, 0.4)'}
                                        color={'rgba(255, 255, 255, 0.8)'}
                                        hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                                        hoveredColor={'rgba(255, 255, 255, 1)'}
                                        activeColor={'rgba(255, 255, 255, 0.8)'}
                                        activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                                    />
                                    <LoaderButton
                                        width={'95%'}
                                        height={'40px'}
                                        borderRadius={'10px'}
                                        isLoading={buttonLoader}
                                        text={'Submit'}
                                        onClick={() => handleProfileSubmit()}
                                        fontSize={'16px'}
                                        backgroundColor={'rgba(255, 255, 255, 0.1)'}
                                        border={'1px solid rgba(255, 255, 255, 0.4)'}
                                        color={'rgba(255, 255, 255, 0.8)'}
                                        hoveredBorder={'1px solid rgba(255, 255, 255, 0.8)'}
                                        hoveredColor={'rgba(255, 255, 255, 1)'}
                                        activeColor={'rgba(255, 255, 255, 0.8)'}
                                        activeBorder={'1px solid rgba(255, 255, 255, 0.4)'}
                                    />
                                </div>
                            )
                        }
                    </StepperWrapper>
                </Main>
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

const Main = styled.main`
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
  -webkit-box-shadow: 10px 10px 47px 0px rgba(240, 240, 240, 0.08);
  -moz-box-shadow: 10px 10px 47px 0px rgba(240, 240, 240, 0.08);
  box-shadow: 10px 10px 47px 0px rgba(240, 240, 240, 0.08);
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

const TitleText = styled.span`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 25px;
  letter-spacing: 1px;
  text-align: center;
  font-weight: 500;
  
  @media(max-width: 350px) {
    font-size: 22px;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StepperWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 25px;
  flex-direction: column;
  gap: 20px;
  
  @media(max-width: 400px) {
    padding: 20px 10px;
  }
`;

export default ProfileAdditionInitial;