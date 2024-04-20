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

import React, {useCallback} from 'react';
import {colors} from "../../styles/Theme";
import FadeModal from "./FadeModal";
import styled from "styled-components";
import Divider from "../divider/divider";
import {useInfiniteQuery} from "@tanstack/react-query";
import {FOLLOWER_FOLLOWING_LIST_API} from "../../constant/apiConstants";
import {followerFollowingListApi} from "../../restservices/profileApi";
import {useSelector} from "react-redux";
import FallbackLoader from "../loaders/fallbackLoader";
import QuestionCard from "../../container/questionContainer/components/QuestionCard";
import SearchUserSmallComponent from "../Cards/SearchUserSmallComponent";
import IconButton from "../buttons/IconButton";
import {FiPlusCircle} from "react-icons/fi";

const FollowFollowingModal = ({
                                  isModelOpen,
                                  onClose,
                                  type = 'follower'
                              }) => {

    const {userId} = useSelector(state => state.auth);

    const fetchList = async ({pageParam}) => {
        const filterKey = type === 'following' ? 'followedBy' : 'followTo';
        return followerFollowingListApi(filterKey, userId, pageParam - 1);
    }

    const {
        data: listData,
        error,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        isSuccess
    } = useInfiniteQuery({
        queryKey: ['followFollowingList'],
        queryFn: fetchList,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.object?.length ? allPages?.length + 1 : undefined
        },
        retry: 2
    })

    const listDataContent = listData?.pages.map((value) => {
        return value?.object.map((item) => (
            <SearchUserSmallComponent
                key={item.followId}
                onClose={onClose}
                name={item.name}
                fetchedUserId={item.userId}
                email={item.email}
                image={item.profileImage}
            />
        ))
    });

    const getListData = useCallback(() => {
        if (isLoading && !isFetchingNextPage) {
            return <FallbackLoader width={'100%'} height={'100px'}/>
        } else if (isSuccess && listData && !isLoading && !isError) {
            return (
                <ListWrapper>
                    {listDataContent}
                </ListWrapper>
            );
        } else if (isError && error) {
            return (
                <span className={'span__center-text error__color'}>Error Occurred</span>
            )
        }
    }, [isLoading, isFetchingNextPage, isSuccess, isError, error, listData]);

    const getLoadingOrFetchMoreContent = useCallback(()=> {
        if (!isLoading && isFetchingNextPage) {
            return <FallbackLoader width={'100%'} height={'70px'} />
        } else if (!isLoading && hasNextPage) {
            return (
                <FetchMoreButtonWrapper>
                    <IconButton onClick={fetchNextPage} fontSize={'34px'} padding={'0'}>
                        <FiPlusCircle />
                    </IconButton>
                </FetchMoreButtonWrapper>
            )
        }
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage])

    return (
        <FadeModal
            isOpen={isModelOpen}
            onClose={onClose}
            height={'fit-content'}
            width={'clamp(250px, 95%, 550px)'}
            bgColor={colors.black70}
            padding={'20px'}
            margin={'70px 0 0 0'}
            borderRadius={'20px'}
        >
            <Wrapper>
                <header>
                    {type === 'following' ? 'Following' : 'Follower'}
                </header>

                <Divider width={'70%'} color={colors.white20} verticalSpacing={'2px'}/>

                <MainContent>
                    {getListData()}
                    {getLoadingOrFetchMoreContent()}
                </MainContent>
            </Wrapper>
        </FadeModal>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > header {
        font-size: clamp(1.125rem, 0.952rem + 0.814vw, 1.5625rem);
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
        align-self: center;
    }
`;

const MainContent = styled.div`
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    overflow-y: auto;
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
`;

const FetchMoreButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default FollowFollowingModal;