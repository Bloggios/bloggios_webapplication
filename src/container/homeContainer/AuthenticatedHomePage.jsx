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
import PostList from "../../component/List/PostList";
import {postList} from "../../restservices/postApi";
import {debounce} from "lodash";
import {dispatchError} from "../../service/functions";

const ProfileCard = lazy(() => import('../../component/Cards/ProfileCard'));
const CreatePost = lazy(() => import('../../component/CreatePost/createPostWeb'));
const CreatePostMobile = lazy(() => import('../../component/CreatePost/createPostMobile'));

const AuthenticatedHomePage = () => {

    useSeo('homepage')

    const {width} = useWindowDimensions();
    const {name, bio, email, profileImage, coverImage} = useSelector((state) => state.profile);
    const [middleSectionRef, middleSectionSize] = useComponentSize();
    const [leftSectionRef, leftSectionSize] = useComponentSize();
    const [postListLoading, setPostListLoading] = useState(true);
    const [postListData, setPostListData] = useState([]);
    const {isCreated} = useSelector((state) => state.postCreate);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);

    const fetchPostList = useCallback(async () => {
        setPostListLoading(true);
        try {
            const response = await postList(page);
            setPostListData((prevData) => [...prevData, ...response.data?.object]);
        } catch (error) {
            dispatchError(dispatch, error)
        } finally {
            setPostListLoading(false);
        }
    }, [setPostListData, setPostListLoading, page, dispatch]);

    useEffect(() => {
        fetchPostList();
    }, [fetchPostList]);

    useEffect(() => {
        if (isCreated) {
            setPostListLoading(true);
            setPostListData([]);
            const debouncedFetch = debounce(fetchPostList, 400);
            debouncedFetch();
            return () => debouncedFetch.cancel();
        }
    }, [isCreated]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Wrapper>
            <LeftBar ref={leftSectionRef}>
                <Suspense fallback={<FallbackLoader height={'400px'} width={leftSectionSize.width}/>}>
                    <ProfileCard
                        name={name}
                        bio={bio}
                        coverImage={coverImage ? coverImage : 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        profileImage={profileImage ? profileImage : bloggios_logo}
                        path={'/beingrohit-exe'}
                        followers={0}
                        following={0}
                        email={email}
                    />
                </Suspense>
            </LeftBar>
            <RightBar></RightBar>
            <MiddleBar ref={middleSectionRef}>
                <Suspense fallback={<FallbackLoader width={middleSectionSize.width} height={'200px'}/>}>
                    {width > 500 ? <CreatePost image={profileImage ? profileImage : bloggios_logo}/> :
                        <CreatePostMobile/>}
                </Suspense>
                {postListData && (
                    <Suspense fallback={<FallbackLoader width={middleSectionSize.width} height={'400px'}/>}>
                        <PostList postList={postListData}/>
                        {postListLoading && <FallbackLoader width={middleSectionSize.width} height={'100px'} />}
                    </Suspense>
                )}
            </MiddleBar>
        </Wrapper>
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
    margin-bottom: 20px;

    @media (max-width: 500px) {
        margin-bottom: 70px;
    }
`;

export default AuthenticatedHomePage;