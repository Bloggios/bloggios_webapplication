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

import React, {lazy, Suspense, useCallback} from 'react';
import BloggiosSidebarBase from "../boundries/bloggiosSidebarBase";
import {Outlet, useParams} from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {uuidValidator} from "../../util/ComponentValidators";
import FallbackLoader from '../../component/loaders/fallbackLoader';
import useComponentSize from "../../hooks/useComponentSize";
import {detailedProfile} from "../../restservices/profileApi";
import PageNotFound from "../catchPages/PageNotFound";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useQuery} from "@tanstack/react-query";

const HorizontalTabs = lazy(() => import("../../component/tabs/HorizontalTabs"));
const ProfileHeader = lazy(() => import("../../component/Cards/ProfileHeader"));
const ProfileSuggestions = lazy(() => import("../../component/Cards/ProfileSuggestions"));

const ProfilePage = () => {

    const {id} = useParams();
    const [rightSectionRef, rightSectionSize] = useComponentSize();
    const authUserId = useSelector((state) => state.auth.userId);
    const profileSelector = useSelector((state) => state.profile);
    const [leftSectionRef, leftSectionSize] = useComponentSize();
    const {width} = useWindowDimensions();

    const fetchProfileData = async () => {
        if (id === authUserId) {
            return profileSelector;
        } else {
            const response = await detailedProfile(id);
            return response.data;
        }
    };

    const {
        isLoading,
        error,
        data: profileData,
        isSuccess,
        isError
    } = useQuery({
        queryKey: ['userProfile', id],
        queryFn: fetchProfileData,
        staleTime: 120000
    })

    const getMainContent = useCallback(() => {
            if (isLoading) {
                return <FallbackLoader width={'100%'} height={'400px'}/>
            } else if (isSuccess && profileData) {
                return (
                    <>
                        <Suspense fallback={<FallbackLoader width={'100%'} height={'100%'}/>}>
                            {id === authUserId ? (
                                <ProfileHeader
                                    name={profileSelector.name}
                                    email={profileSelector.email}
                                    profileImage={profileSelector.profileImage}
                                    coverImage={profileSelector.coverImage}
                                    bio={profileSelector.bio}
                                    id={id}
                                    follower={profileSelector.followers}
                                    following={profileSelector.following}
                                    profileTag={profileSelector.profileTag}
                                    isBadge={profileSelector.isBadge}
                                    profileBadges={profileSelector.profileBadges}
                                    link={profileSelector.link}
                                />
                            ) : (
                                <ProfileHeader
                                    name={profileData.name}
                                    email={profileData.email}
                                    profileImage={profileData.profileImage}
                                    coverImage={profileData.coverImage}
                                    bio={profileData.bio}
                                    id={id}
                                    follower={profileData.followers}
                                    following={profileData.following}
                                    profileTag={profileData.profileTag}
                                    isBadge={profileData.isBadge}
                                    profileBadges={profileData.profileBadges}
                                    link={profileData.link}
                                />
                            )}
                        </Suspense>

                        <ProfileContent>
                            <Suspense>
                                <HorizontalTabs id={id}/>
                            </Suspense>

                            <Suspense>
                                <Outlet/>
                            </Suspense>
                        </ProfileContent>
                    </>
                )
            }
        }, [
            isLoading,
            isSuccess,
            profileData,
            id,
            authUserId,
            profileSelector.name,
            profileSelector.email,
            profileSelector.profileImage,
            profileSelector.coverImage,
            profileSelector.bio,
            profileSelector.followers,
            profileSelector.following,
            profileSelector.profileTag,
            profileSelector.isBadge,
            profileSelector.profileBadges,
            profileSelector.link
        ]
    )

    const getPageContent = useCallback(() => {
        if (uuidValidator(id)) {
            return (
                <BloggiosSidebarBase>
                    <Wrapper>
                        <LeftSection ref={leftSectionRef}>
                            {getMainContent()}
                        </LeftSection>
                        <RightSection ref={rightSectionRef}>
                            {width > 1050 && <ProfileSuggestions/>}
                        </RightSection>
                    </Wrapper>
                </BloggiosSidebarBase>
            )
        } else {
            return <PageNotFound/>
        }
    }, [leftSectionRef, rightSectionRef, width, id, getMainContent])

    return (
        isError || error ?
            <PageNotFound/>
            :
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

    @media (max-width: 700px) {
        padding: 10px;
    }
`;

const LeftSection = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 25px;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1050px) {
        display: none;
    }
`;

const ProfileContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
    background-color: #0c0c0c;
    border-radius: 20px;

    @media (max-width: 500px) {
        padding: 10px;
    }
`;

export default ProfilePage;