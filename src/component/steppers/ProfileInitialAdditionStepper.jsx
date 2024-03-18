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
import {useDispatch, useSelector} from "react-redux";
import IconButton from "../buttons/IconButton";
import {FaCircleInfo} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";
import {profileTagsList} from "../../restservices/profileApi";
import {dispatchError} from "../../service/functions";
import {FaCheck} from "react-icons/fa";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import {authenticatedAxios} from "../../restservices/baseAxios";
import {ADD_PROFILE} from "../../constant/apiConstants";
import {HOME_PAGE} from "../../constant/pathConstants";
import {useNavigate} from "react-router-dom";

const ProfileInitialAdditionStepper = () => {

    const {authorities} = useSelector((state)=> state.auth);
    const {email} = useSelector((state) => state.auth);
    const [currentStep, setCurrentStep] = useState(1);
    const [nameError, setNameError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buttonLoader, setButtonLoader] = useState(false);
    const [options, setOptions] = useState([]);
    const [profileData, setProfileData] = useState({
        name: '',
        bio: '',
        link: '',
        profileTag: null
    });

    useLayoutEffect(()=> {
        if (!authorities.includes('ROLE_DUMMY')) {
            navigate(HOME_PAGE, {
                replace: true
            })
        }
    }, [authorities])

    const handleBioChange = (event) => {
        const lines = event.target.value.split('\n');
        if (lines.length <= 3) {
            setProfileData(prevData => ({
                ...prevData, bio: event.target.value
            }))
        } else {
            setProfileData(prevData => ({
                ...prevData, bio: event.target.value
            }))
        }
    }

    useEffect(() => {
        profileTagsList()
            .then((response) => {
                setOptions(response.data?.tags);
            }).catch((error) => {
            dispatchError(dispatch, error);
        })
    }, [])

    const handleInputChange = (event, property) => {
        setNameError(false);
        setProfileData(prevData => ({
            ...prevData, [property]: event.target.value
        }))
    }

    const updateSteps = (e) => {
        const targetId = e.target.id;
        if ((currentStep === 1 && profileData.name === '')) {
            setNameError(true);
            return;
        }
        setCurrentStep((prevStep) => {
            if (targetId === 'next' && prevStep < 4) {
                return prevStep + 1;
            } else if (targetId === 'prev' && prevStep > 1) {
                return prevStep - 1;
            }
            return prevStep;
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            setCurrentStep((prevStep) => {
                if (prevStep < 4) {
                    return prevStep + 1;
                }
                return prevStep;
            });
            if (currentStep === 4) {
                handleSubmit();
            }
        }
    };

    const handleSubmit = () => {
        setButtonLoader(true);
        authenticatedAxios.post(ADD_PROFILE, profileData)
            .then((response) => {
                setTimeout(()=> {
                    window.location.reload();
                }, 1000)
            }).catch((error) => {
            dispatchError(dispatch, error);
            setButtonLoader(false);
        })
    }

    const getInputFieldContent = useCallback(() => {
        if (currentStep === 1) {
            return (
                <Field>
                    <FieldSummary>
                        Hey there, <strong>{email}!</strong> That's quite the address, but wouldn't you prefer a
                        friendly nickname instead? What should I call you?
                    </FieldSummary>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        display: 'flex'
                    }}>
                        <Input
                            type={'text'}
                            placeholder={'Your Name*'}
                            maxLength={40}
                            required={true}
                            autoFocus={true}
                            value={profileData.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                            onKeyDown={handleKeyDown}
                        />
                        <IconButton
                            tooltipId={'profile-page-name-field'}
                            tooltipContent={'<p style="text-align: center">Name is mandatory field<br/>and cannot be empty</p>'}
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
                    {nameError && (
                        <span style={{
                            fontSize: '12px',
                            fontFamily: "'Poppins', sans-serif",
                            color: 'rgb(255,87,87)',
                            letterSpacing: '1px'
                        }}>
                            Hold on there! Before you move next, a name in this field we need to know.
                        </span>
                    )}
                </Field>
            )
        } else if (currentStep === 2) {
            return (
                <Field>
                    <FieldSummary style={{fontSize: 'clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem)'}}>
                        First impressions matter, <strong>{profileData.name.split(' ')[0]}!</strong> Your bio is your
                        headline, a captivating first sentence that grabs attention. What will hook them and make them
                        want to know more about the amazing you?
                    </FieldSummary>

                    <TextArea
                        rows={4}
                        spellCheck={false}
                        maxLength={200}
                        value={profileData.bio}
                        onChange={handleBioChange}
                        autoFocus={true}
                        placeholder={'Future biographer needed! \nBriefly introduce yourself'}
                        onKeyDown={handleKeyDown}
                    />
                </Field>
            )
        } else if (currentStep === 3) {
            return (
                <Field>
                    <FieldSummary style={{fontSize: 'clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem)'}}>
                        Links are like portals to other adventures, <strong>{profileData.name.split(' ')[0]}</strong> .
                        Got a website,
                        blog, portfolio, or something cool you created online? Share the link in your bio and let people
                        explore the world you've built!
                    </FieldSummary>

                    <Input
                        type={'text'}
                        placeholder={'Enter Link here'}
                        maxLength={40}
                        required={true}
                        autoFocus={true}
                        value={profileData.link}
                        onChange={(e) => handleInputChange(e, 'link')}
                        onKeyDown={handleKeyDown}
                    />
                </Field>
            )
        } else if (currentStep === 4) {
            return (
                <Field>
                    <FieldSummary style={{fontSize: 'clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem)'}}>
                        What describes your awesomeness best, <strong>{profileData.name.split(' ')[0]}</strong>? Are you
                        a
                        beat-dropping Musician, a code-wielding Software Engineer, or something else entirely? Pick your
                        tag and show the world your true colors!
                    </FieldSummary>

                    <SelectStyle
                        autoFocus={true}
                        onKeyDown={handleKeyDown}
                        value={profileData.tag}
                        onChange={(event) => handleInputChange(event, 'profileTag')}
                    >
                        {options.map((option) => (
                            <option key={option} value={option.value}>
                                {option}
                            </option>
                        ))}
                    </SelectStyle>
                </Field>
            )
        }
    }, [currentStep, email, nameError, options, profileData.name, profileData.bio, profileData.link, profileData.tag])

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
                    Profile Details
                </Header>

                {getInputFieldContent()}
            </Form>

            <ButtonsContainer>
                {currentStep !== 1 && (
                    <Button id="prev" disabled={currentStep === 1} onClick={updateSteps}>
                        Prev
                    </Button>
                )}
                {currentStep !== 4 && (
                    <Button id="next" disabled={currentStep === 4} onClick={updateSteps}>
                        Next
                    </Button>
                )}
                {currentStep === 4 && (
                    <FetchLoaderButton
                        isLoading={buttonLoader}
                        text={'Submit'}
                        onClick={handleSubmit}
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
                            border: 'none',
                            outline: 'none',
                            fontSize: 'clamp(0.75rem, 0.6622rem + 0.5405vw, 1rem)'
                        }}
                    />
                )}
            </ButtonsContainer>
            <Tooltip id={'profile-page-name-field'}/>
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
`;

const Header = styled.div`
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 6px;
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

export default ProfileInitialAdditionStepper;