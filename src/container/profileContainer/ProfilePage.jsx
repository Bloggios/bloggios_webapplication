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

import React, {lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState} from 'react';
import BloggiosSidebarBase from "../baseContainer/bloggiosSidebarBase";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {clearLoading, initiateLoading} from "../../state/loadingSlice";
import {uuidValidator} from "../../util/ComponentValidators";
import FallbackLoader from '../../component/loaders/fallbackLoader';
import useComponentSize from "../../hooks/useComponentSize";
import {detailedProfile} from "../../restservices/profileApi";
import LoaderPage from "../../component/loaders/loaderPage";
import PageNotFound from "../NotFoundPage/PageNotFound";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const WrappedNotFound = lazy(() => import("../../component/NotFound/WrappedNotFound"));
const ProfileHeader = lazy(() => import("../../component/Cards/ProfileHeader"));
const ProfileSuggestions = lazy(() => import("../../component/Cards/ProfileSuggestions"));

const ProfilePage = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [validUuid, setValidUuid] = useState(false);
    const [rightSectionRef, rightSectionSize] = useComponentSize();
    const authUserId = useSelector((state) => state.auth.userId);
    const profileSelector = useSelector((state) => state.profile);
    const [profileLoading, setProfileLoading] = useState(true);
    const [leftSectionRef, leftSectionSize] = useComponentSize();
    const {width} = useWindowDimensions();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        bio: '',
        profileImage: '',
        coverImage: '',
        followers: '',
        following: ''
    })

    useLayoutEffect(() => {
        const isValidUuid = uuidValidator(id);
        setValidUuid(true);
        if (!isValidUuid) {
            setValidUuid(false);
            setProfileLoading(false);
        } else {
            if (id === authUserId) {
                setProfileData(profileSelector);
                setProfileLoading(false);
            } else {
                detailedProfile(id)
                    .then((response) => {
                        setProfileData(response.data);
                        setProfileLoading(false);
                    }).catch((error) => {
                    setValidUuid(false);
                    setProfileLoading(false);
                })
            }
        }
    }, [id, profileSelector])

    const getPageContent = useCallback(() => {
        if (validUuid) {
            return (
                <BloggiosSidebarBase>
                    <Wrapper>
                        <LeftSection ref={leftSectionRef}>
                            {
                                profileLoading ? (
                                    <FallbackLoader height={'500px'} width={'100%'}/>
                                ) : (
                                    <Suspense fallback={<FallbackLoader width={'100%'} height={'100%'}/>}>
                                        <ProfileHeader
                                            name={profileData.name}
                                            email={profileData.email}
                                            profileImage={profileData.profileImage}
                                            coverImage={profileData.coverImage}
                                            bio={profileData.bio}
                                            id={id}
                                            follower={profileData.followers}
                                        />
                                    </Suspense>
                                )
                            }
                        </LeftSection>
                        <RightSection ref={rightSectionRef}>
                            {width > 1050 && <ProfileSuggestions profileData={profileData} />}
                        </RightSection>
                    </Wrapper>
                </BloggiosSidebarBase>
            )
        } else {
            return <PageNotFound/>
        }
    }, [validUuid, leftSectionRef, profileLoading, id, rightSectionRef, profileData.email, profileData.profileImage, profileData.coverImage, profileData.bio, width, profileData, profileData.followers])

    return (
        getPageContent()
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 20px 20px 20px 10px;
    gap: 20px;
`;

const LeftSection = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1600px) {
        flex: 0;
    }
`;

export default ProfilePage;