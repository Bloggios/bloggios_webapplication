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
import styled from "styled-components";
import SmallProfileCard from "./SmallProfileCard";
import {LuRefreshCcw} from "react-icons/lu";
import {profileSuggestions} from "../../restservices/profileApi";
import FallbackLoader from "../loaders/fallbackLoader";
import {setSnackbar} from "../../state/snackbarSlice";
import {useDispatch} from "react-redux";

const ProfileSuggestions = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [profileList, setProfileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataMessage, setResponseDataMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProfileSuggestions(currentPage);
    }, [currentPage]);

    const fetchProfileSuggestions = (page) => {
        if (!isLoading) {
            setIsLoading(true);
            const payload = {
                page: page,
                size: 10
            };
            profileSuggestions(payload)
                .then((response) => {
                    const data = response.data;
                    setIsLoading(false);
                    setTotalRecords(data.totalRecordsCount);
                    setProfileList(data.object);
                }).catch((error)=> {
                    console.log(error);
            })
        }
    }

    const handleNextPage = () => {
        const nextPage = (currentPage + 1) % Math.ceil(totalRecords / 10);
        if (currentPage === 0 && nextPage === 0) {
            const snackbarData = {
                isSnackbar: true,
                message: 'No more profiles for suggestion',
                snackbarType: 'Warning'
            };
            dispatch(setSnackbar(snackbarData))
        }
        setCurrentPage(nextPage);
    };

    return (
        <Wrapper>
            <RowWrapper>
                <TitleSpan>
                    New Accounts
                </TitleSpan>
                <RefreshButton onClick={handleNextPage}>
                    <LuRefreshCcw/>
                </RefreshButton>
            </RowWrapper>

            <ProfileCardWrapper>
                {isLoading ? (
                    <FallbackLoader width={'100%'} height={'200px'}/>
                ) : (
                    profileList.length > 0 ? (
                        profileList.map((item)=> (
                            <SmallProfileCard
                                key={item.profileId}
                                userId={item.userId}
                                name={item.name}
                                bio={item.bio}
                                image={item.profileImage}
                                email={item.email}
                            />
                        ))
                    ) : (
                        <ErrorText>
                            No Profile's Found
                        </ErrorText>
                    )
                )}
            </ProfileCardWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    height: auto;
    width: clamp(200px, 95%, 300px);
    background-color: #272727;
    border-radius: 20px;
    overflow: hidden;
    user-select: none;
    padding: 20px 16px;
    flex-direction: column;
    gap: 20px;
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TitleSpan = styled.span`
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 1px;
`;

const RefreshButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    padding: 7px;
    border-radius: 50%;
    background-color: #4258ff;
    color: rgba(255, 255, 255, 0.6);
    font-size: 18px;
    cursor: pointer;
    transition: all 100ms ease;

    &:hover {
        background-color: rgba(66, 88, 255, 0.9);
        color: rgba(255, 255, 255, 0.8);
    }

    &:active {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 0.6);
    }
`;

const ProfileCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

const ErrorText = styled.span`
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
`;

export default ProfileSuggestions;