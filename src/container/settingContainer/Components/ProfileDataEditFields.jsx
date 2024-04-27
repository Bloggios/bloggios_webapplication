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

import React, {useEffect, useState} from 'react';
import * as Bg from "./StyledComponent";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import useIsInputFocused from "../../../hooks/useIsInputFocused";
import {profileTagsList, updateProfileApi} from "../../../restservices/profileApi";
import {
    dispatchError,
    dispatchErrorMessage,
    dispatchSuccessMessage,
    fetchProfileAndDispatch
} from "../../../service/functions";
import {colors} from "../../../styles/Theme";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {useMutation} from "@tanstack/react-query";
import FallbackLoader from "../../../component/loaders/fallbackLoader";

const ProfileDataEditFields = () => {

    const profileSelector = useSelector((state)=> state.profile);
    const [options, setOptions] = useState([]);
    const [linkRef, isLinkFocused] = useIsInputFocused();
    const [textAreaRef, isTextAreaFocused] = useIsInputFocused();
    const dispatch = useDispatch();
    const {width} = useWindowDimensions();
    const [profileData, setProfileData] = useState({});
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (profileSelector && profileSelector.name && profileSelector.name.length > 0) {
            setProfileData({
                name: profileSelector.name,
                bio: profileSelector.bio,
                link: profileSelector.link,
                profileTag: profileSelector.profileTag,
            })
            setIsChecking(false);
        }

        return () => setIsChecking(true);
    }, [profileSelector]);

    const handleChange = (event, property) => {
        setProfileData(prevState => ({
            ...prevState, [property]: event.target.value
        }))
    }

    useEffect(() => {
        profileTagsList()
            .then((response) => {
                setOptions(response.data?.tags);
            }).catch((error) => {
            dispatchError(dispatch, error);
        })
    }, [])

    const updateProfileMutation = useMutation({
        mutationFn: () => updateProfileApi(profileData),
        onSuccess: async () => {
            dispatchSuccessMessage(dispatch, "Profile updated successfully to Bloggios")
            await fetchProfileAndDispatch(dispatch);
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    })

    const isButtonDisabled = () => {
        const previousData = {
            name: profileSelector.name,
            bio: profileSelector.bio,
            link: profileSelector.link,
            profileTag: profileSelector.profileTag,
        }
        return JSON.stringify(previousData) === JSON.stringify(profileData);
    }

    const handleUpdate = () => {
        if (profileData.name?.length < 2) {
            dispatchErrorMessage(dispatch, "Please enter correct Name");
            return;
        } else if (profileData.link?.length > 0) {
            if (profileData.link.startsWith('http://')) {
                dispatchErrorMessage(dispatch, 'Unsecured Link is not allowed');
                return;
            }
            setProfileData(prevState => ({
                ...prevState,
                link: profileData.link?.length > 0 && profileData.link.startsWith('https://') ? profileData.link : `https://${profileData.link}`
            }))
        } else if (profileData.link?.length > 150) {
            dispatchErrorMessage(dispatch, 'Bio must be less than 150 Characters');
            return;
        } else if (profileData.bio.length > 0) {
            const newlineCount = (profileData.bio.match(/\n/g) || []).length;
            if (newlineCount > 3) {
                dispatchErrorMessage(dispatch, 'Bio must be less than 3 Lines');
                return;
            }
        }
        updateProfileMutation.mutate();
    }

    const getLink = (link) => {
        if (link?.startsWith('https://')) {
            link = link.slice(8);
        }
        return link;
    }

    if (isChecking) {
        return <FallbackLoader width={'100%'} height={'250px'} />
    }

    return (
        <ProfileEditFields>
            <Bg.Field>
                <Bg.Label>
                    Name
                </Bg.Label>

                <Bg.Input
                    placeholder={'Name'}
                    value={profileData.name}
                    onChange={(e)=> handleChange(e, 'name')}
                    inputMode={'text'}
                    type={'text'}
                />
            </Bg.Field>

            <Bg.Field>
                <Bg.Label>
                    Bio
                </Bg.Label>

                <Bg.TextAreaContainer
                    isFocused={isTextAreaFocused}
                >
                    <Bg.TextArea
                        ref={textAreaRef}
                        rows={3}
                        spellCheck={false}
                        maxLength={150}
                        placeholder={'Future biographer needed! \nBriefly introduce yourself'}
                        value={profileData.bio}
                        onChange={(e)=> handleChange(e, 'bio')}
                    />
                    <span>
                            {profileData.bio?.length}/{150}
                        </span>
                </Bg.TextAreaContainer>
            </Bg.Field>

            <Bg.Field>
                <Bg.Label>
                    Link
                </Bg.Label>

                <Bg.LinkInput
                    isFocused={isLinkFocused}
                >
                        <span>
                            https://
                        </span>
                    <input
                        ref={linkRef}
                        type={'text'}
                        placeholder={'Enter Link here'}
                        maxLength={200}
                        value={getLink(profileData.link)}
                        onChange={(e) => handleChange(e, 'link')}
                    />
                </Bg.LinkInput>
            </Bg.Field>

            <Bg.Field>
                <Bg.Label>
                    Profile Tag
                </Bg.Label>

                <Bg.SelectStyle
                    value={profileData.profileTag}
                    onChange={(event) => handleChange(event, 'profileTag')}
                >
                    {options.map((option) => (
                        <option key={option} value={option.value}>
                            {option}
                        </option>
                    ))}
                </Bg.SelectStyle>

                <div className={'select__arrow-button'}/>
            </Bg.Field>

            <FetchLoaderButton
                isLoading={updateProfileMutation.isPending}
                text={'Update'}
                onClick={handleUpdate}
                loaderSize={'2px'}
                loaderDotsSize={'2px'}
                disabled={isButtonDisabled() || updateProfileMutation.isPending}
                dBgColor={colors.accent60}
                bgColor={colors.accent100}
                hBgColor={colors.accent80}
                aBgColor={colors.accent100}
                color={colors.white80}
                hColor={colors.white100}
                aColor={colors.white100}
                borderRadius={'10px'}
                padding={width > 500 ? '0 16px' : '0 8px'}
                style={{
                    height: width > 500 ? 40 : 34,
                    width: width > 500 ? 140 : 100,
                    border: 'none',
                    outline: 'none',
                    fontSize: width > 500 ? 16 : 14,
                    alignSelf: 'flex-end',
                    fontFamily: "'Poppins', san-serif",
                    letterSpacing: 1,
                    fontWeight: 400,
                    marginTop: 25,
                }}
            />
        </ProfileEditFields>
    );
};

const ProfileEditFields = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default ProfileDataEditFields;