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

import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useDispatch, useSelector} from "react-redux";
import FallbackLoader from "../../component/loaders/fallbackLoader";
import useSeo from "../../globalseo/useSeo";
import useComponentSize from "../../hooks/useComponentSize";
import bloggios_logo from '../../asset/svg/bg_logo_black.svg'
import BloggiosBase from "../boundries/bloggiosBase";
import header_image from '../../asset/svg/home-header_bg.svg'
import {clearIsCreated} from "../../state/isCreatedSlice";

const ProfileCard = lazy(() => import('../../component/Cards/ProfileCard'));
const CreatePost = lazy(() => import('../../component/CreatePost/createPost'));
const PostList = lazy(() => import('../../component/List/PostList'));
const ProfileSuggestions = lazy(() => import('../../component/Cards/ProfileSuggestions'));

const AuthenticatedHomePage = () => {

    useSeo('authHomePage');

    const {width} = useWindowDimensions();
    const {
        name,
        bio,
        email,
        profileImage,
        coverImage,
        followers,
        following,
    } = useSelector((state) => state.profile);
    const [middleSectionRef, middleSectionSize] = useComponentSize();
    const [leftSectionRef, leftSectionSize] = useComponentSize();
    const [rightSectionRef, rightSectionSize] = useComponentSize();
    const dispatch = useDispatch();
    const {isPost} = useSelector((state)=> state.isCreated);
    const [postList, setPostList] = useState(true);

    const dispatchClearIsCreated = useCallback(() => dispatch(clearIsCreated()), [dispatch]);

    useEffect(() => {
        if (isPost) {
            setPostList(false);
            setTimeout(() => {
                dispatchClearIsCreated();
                setPostList(true);
            }, 100);
        }
    }, [isPost, dispatchClearIsCreated]);

    return (
        <BloggiosBase>
            <Wrapper>
                {width > 750 && (
                    <LeftBar ref={leftSectionRef}>
                        <Suspense fallback={<FallbackLoader height={'400px'} width={leftSectionSize.width} />}>
                            <ProfileCard
                                name={name}
                                bio={bio}
                                coverImage={coverImage || header_image}
                                profileImage={profileImage || bloggios_logo}
                                followers={followers}
                                following={following}
                                email={email}
                            />
                        </Suspense>
                    </LeftBar>
                )}
                {width > 1200 && (
                    <RightBar ref={rightSectionRef}>
                        <Suspense fallback={<FallbackLoader height={'100vh'} width={rightSectionSize.width} />}>
                            <ProfileSuggestions />
                        </Suspense>
                    </RightBar>
                )}
                <MiddleBar ref={middleSectionRef}>
                    <Suspense fallback={<FallbackLoader width={middleSectionSize.width} height={'200px'} />}>
                        <CreatePost image={profileImage || bloggios_logo} />
                    </Suspense>
                    <Suspense fallback={<FallbackLoader width={middleSectionSize.width} height={'400px'} />}>
                        {postList ? <PostList /> : <FallbackLoader width={middleSectionSize.width} height={'400px'} />}
                    </Suspense>
                </MiddleBar>
            </Wrapper>
        </BloggiosBase>
    );
};

const Wrapper = styled.div`
    display: grid;
    margin-top: 40px;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 0 0;
    grid-auto-flow: row dense;
    grid-template-areas:
        "Left-Bar Middle-Bar Right-Bar";
    box-sizing: border-box;
    margin-bottom: 20px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr 2fr;
    }

    @media (max-width: 750px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "Middle-Bar";
    }
`;

const LeftBar = styled.div`
    grid-area: Left-Bar;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;

    @media (max-width: 750px) {
        display: none;
    }
`;

const RightBar = styled.div`
    grid-area: Right-Bar;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;

    @media (max-width: 1200px) {
        display: none;
    }
`;

const MiddleBar = styled.div`
    grid-area: Middle-Bar;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    row-gap: 50px;

    @media (max-width: 500px) {
        margin-bottom: 70px;
    }
`;

export default AuthenticatedHomePage;