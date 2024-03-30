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
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {uuidValidator} from "../../../util/ComponentValidators";
import {CHATS_PAGE} from "../../../constant/pathConstants";
import useUserProfile from "../../../hooks/useUserProfile";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {BiRefresh, BiSolidError} from "react-icons/bi";
import IconButton from "../../../component/buttons/IconButton";
import {colors} from "../../../styles/Theme";
import {bgBlackRounded} from "../../../asset/svg";

const ChatUserOutlet = () => {

    const {userId} = useParams();
    const navigate = useNavigate();
    const [queryEnabled, setQueryEnabled] = useState(false);
    const {
        isLoading,
        error,
        profileData,
        isSuccess,
        isError,
        isPending,
        refetch
    } = useUserProfile(userId, queryEnabled);

    useLayoutEffect(()=> {
        const isValid = uuidValidator(userId);
        if (!isValid) {
            navigate(CHATS_PAGE, {
                replace: true
            });
        } else {
            setQueryEnabled(true);
        }
    }, [userId])

    const getChatHeader = useCallback(()=> {
        if (profileData) {
            return (
                <>
                    <RowWrapper>
                        <HeaderImage
                            src={profileData.profileImage ? profileData.profileImage : bgBlackRounded}
                            alt={profileData.name}
                            title={'View Profile'}
                            onClick={()=> navigate(`/profile/${userId}`)}
                        />
                        <HeaderData>
                            <h5>{profileData.name}</h5>
                            <span>{profileData.email}</span>
                        </HeaderData>
                    </RowWrapper>
                </>
            )
        }
    }, [profileData, navigate, userId])

    const getMainContent = () => {
        if (isLoading || isPending) {
            return (
                <FallbackLoader width={'100%'} height={'100%'} />
            )
        } else if (isSuccess && !isLoading && !isError) {
            return (
                <>
                    <MessageHeader>
                        {getChatHeader()}
                    </MessageHeader>

                    <MessagesList>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22].reverse().map((i)=> (
                            <span>Item {i}</span>
                        ))}
                    </MessagesList>

                    <InputField>

                    </InputField>
                </>
            )
        } else {
            return (
                <ErrorWrapper>
                    <BiSolidError color={'rgb(216,144,20)'} />
                    <span>Try Again</span>
                    <IconButton
                        padding={'6px'}
                        color={colors.accent100}
                        onClick={refetch}
                        fontSize={'28px'}
                    >
                        <BiRefresh />
                    </IconButton>
                </ErrorWrapper>
            )
        }
    }

    return (
        <Wrapper>
            {getMainContent()}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const MessageHeader = styled.div`
    width: 100%;
    height: 10%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
`;

const MessagesList = styled.div`
    width: 100%;
    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
`;

const InputField = styled.div`
    width: 100%;
    height: 10%;
    background: #dfda7d;
`;

const ErrorWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: clamp(1.25rem, 0.9043rem + 2.1277vw, 2.5rem);
    
    & span {
        color: ${colors.white80};
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 400;
    }
`;

const HeaderImage = styled.img`
    height: 70%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    cursor: pointer;
`;

const RowWrapper = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const HeaderData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: inherit;
    
    & h5 {
        font-size: clamp(0.875rem, 0.8311rem + 0.2703vw, 1rem);
        letter-spacing: 1px;
        color: ${colors.white100};
    }
    
    & span {
        font-size: clamp(0.625rem, 0.5372rem + 0.5405vw, 0.875rem);
        font-weight: 300;
        color: ${colors.white80};
    }
`;

export default ChatUserOutlet;