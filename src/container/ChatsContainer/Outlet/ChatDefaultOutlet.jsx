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
import styled from "styled-components";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import MessagingUserDataCard from "../../../component/Messaging/NestedComponents/MessagingUserDataCard";
import {userChatHistory as chatHistoryApi} from "../../../restservices/WebsocketsApi";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {colors} from "../../../styles/Theme";

const ChatDefaultOutlet = () => {

    const {width} = useWindowDimensions();
    const {userId} = useSelector((state)=> state.auth);

    const fetchUserChatHistory = async () => {
        const response = await chatHistoryApi(userId);
        return response.object;
    }

    const {
        isLoading,
        error,
        data,
        isSuccess,
        isError,
        refetch
    } = useQuery({
        queryKey: ['userChatHistory', userId],
        queryFn: fetchUserChatHistory,
        staleTime: 120000
    });

    const getWebData = useCallback(()=> {
        return (
            <WebDataWrapper>
                <SpanText>
                    Select User to start Messaging<br/>💬
                </SpanText>
            </WebDataWrapper>
        )
    }, []);

    const getMobileData = useCallback(()=> {
        if (isLoading) {
            return <FallbackLoader width={'100%'} height={'100%'} />
        } else if (isSuccess && data && data.length > 0) {
            return (
                <UserList>
                    {data.map((item) => (
                        <MessagingUserDataCard
                            id={item.receiverId}
                            key={item.receiverId}
                        />
                    ))}
                </UserList>
            )
        } else if (isSuccess && (data || data.length === 0)) {
            return (
                <SpanText>
                    Search user to Start Messaging
                </SpanText>
            )
        } else if (isError && error) {
            return (
                <SpanText>
                    Error Occurred
                </SpanText>
            )
        }
    }, [isLoading, isSuccess, data, isError, error])

    return (
        <Wrapper>
            {width > 600 ? getWebData() : getMobileData()}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const UserList = styled.div`
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 10px;
    box-sizing: border-box;
`;

const SpanText = styled.h6`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    letter-spacing: 1px;
    font-weight: 400;
    text-align: center;
    color: ${colors.white80};
`;

const WebDataWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;

export default ChatDefaultOutlet;