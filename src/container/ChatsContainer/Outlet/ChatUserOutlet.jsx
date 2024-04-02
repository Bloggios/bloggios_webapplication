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

import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import {GrSend} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, sendMessage} from "../../../state/chatSlice";
import {SlOptionsVertical} from "react-icons/sl";
import MessageData from "../../../component/Messaging/NestedComponents/MessageData";
import useBloggiosUserChat from "../../../hooks/useBloggiosUserChat";
import {v4 as uuidv4} from 'uuid';
import {clearReceiveMessage} from "../../../state/receiveMessageSlice";

const ChatUserOutlet = () => {

    const {userId} = useParams();
    const authUserId = useSelector(state => state.auth.userId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [queryEnabled, setQueryEnabled] = useState(false);
    const [message, setMessage] = useState("");
    const {message: stateMessage, receiverId} = useSelector((state)=> state.chat);
    const [pageNum, setPageNum] = useState(0);
    const [chatList, setChatList] = useState([]);
    const intObserver = useRef();
    const receiveMessageSelector = useSelector((state)=> state.receiveMessage);
    const {
        isLoading,
        error,
        profileData,
        isSuccess,
        isError,
        isPending,
        refetch
    } = useUserProfile(userId, queryEnabled);
    const {
        isLoading : isUserChatLoading,
        isError : isUserChatError,
        error : userChatError,
        data : userChatData,
        hasNextPage : hasUserChatNextPage
    } = useBloggiosUserChat(authUserId, userId, pageNum, chatList);

    useEffect(()=> {
        if (userChatData) {
            setChatList(userChatData);
        }
    }, [userChatData])

    useEffect(()=> {
        if (
            receiveMessageSelector &&
            receiveMessageSelector.hasOwnProperty('message') &&
            receiveMessageSelector.hasOwnProperty('receiverId') &&
            receiveMessageSelector['message'] !== null && receiveMessageSelector['message'] !== undefined &&
            receiveMessageSelector['receiverId'] !== null && receiveMessageSelector['receiverId'] !== undefined
        ) {
            const payload = {
                chatId : uuidv4,
                chatKey : receiveMessageSelector.senderId + "_" + receiveMessageSelector.receiverId,
                message : receiveMessageSelector.message,
                chatType : 'RECEIVER',
                senderId : receiveMessageSelector.senderId,
                receiverId : receiveMessageSelector.receiverId,
                chatStatus : 'SENT'
            }
            chatList.unshift(payload);
            dispatch(clearReceiveMessage())
        }
    }, [receiveMessageSelector]);

    useLayoutEffect(()=> {
        const isValid = uuidValidator(userId);
        if (!isValid || authUserId === userId) {
            navigate(CHATS_PAGE, {
                replace: true
            });
        } else {
            setPageNum(0)
            setChatList([])
            setQueryEnabled(true);
        }
    }, [userId]);

    const handleSend = () => {
        if (stateMessage || receiverId) {
            dispatch(clearMessage());
        }
        if (message.length > 0 && profileData) {
            const payload = {
                chatId : uuidv4,
                chatKey : authUserId + "_" + userId,
                message : message,
                chatType : 'SENDER',
                senderId : authUserId,
                receiverId : userId,
                chatStatus : 'SENT'
            }
            chatList.unshift(payload);
            dispatch(sendMessage({
                message: message,
                receiverId: profileData.userId
            }));
            setMessage('');
        }
    }

    const lastChatRef = useCallback(chat => {
        if (isUserChatLoading) return;
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(chats => {
            if (chats[0].isIntersecting && hasUserChatNextPage) {
                setPageNum(prevState => prevState + 1);
            }
        });

        if (chat) intObserver.current.observe(chat);
    }, [hasUserChatNextPage, isUserChatLoading]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const getChatHeader = useCallback(()=> {
        if (profileData) {
            return (
                <>
                    <RowWrapper>
                        <HeaderImage
                            src={profileData.profileImage ? profileData.profileImage : bgBlackRounded}
                            alt={profileData.name}
                        />
                        <HeaderData>
                            <h5>{profileData.name}</h5>
                            <span>{profileData.email}</span>
                        </HeaderData>
                    </RowWrapper>

                    <IconButton
                        style={{
                            flexShrink: 0
                        }}
                    >
                        <SlOptionsVertical />
                    </IconButton>
                </>
            )
        }
    }, [profileData])

    const getMessageListContent = useCallback(()=> {
        if (userChatData && userChatData.length > 0 && chatList.length > 0) {
            return (
                chatList.map((item, i)=> {
                    if (chatList.length === i + 1) {
                        return (
                            <MessageData
                                ref={lastChatRef}
                                key={item.chatId}
                                message={item.message}
                                senderId={item.senderId}
                                receiverId={item.receiverId}
                                chatId={item.chatId}
                                chatStatus={item.chatStatus}
                                chatType={item.chatType}
                            />
                        )
                    }
                    return (
                        <MessageData
                            key={item.chatId}
                            message={item.message}
                            senderId={item.senderId}
                            chatId={item.chatId}
                            receiverId={item.receiverId}
                            chatStatus={item.chatStatus}
                            chatType={item.chatType}
                        />
                    )
                })
            )
        }
    }, [lastChatRef, userChatData, chatList])

    const getMainContent = useCallback(()=> {
        if (isLoading || isPending) {
            return (
                <FallbackLoader width={'100%'} height={'100%'} />
            )
        } else if (isSuccess && !isLoading && !isError && profileData) {
            return (
                <>
                    <MessageHeader>
                        {getChatHeader()}
                    </MessageHeader>

                    <MessagesList>
                        {getMessageListContent()}
                    </MessagesList>

                    <InputField>
                        <input
                            type="text"
                            inputMode={'search'}
                            placeholder={`Send Message to ${profileData.name ? profileData.name.split(' ')[0] : 'User'}`}
                            value={message}
                            onChange={(event)=> setMessage(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <IconButton
                            color={'#7081ff'}
                            hColor={'#7081ff'}
                            aColor={'#7081ff'}
                            fontSize={'25px'}
                            padding={'7px'}
                            onClick={handleSend}
                        >
                            <GrSend />
                        </IconButton>
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
    }, [isLoading, isPending, isSuccess, isError, profileData, getChatHeader, message, refetch, getMessageListContent])

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
    box-sizing: border-box;
    
    @media (max-width: 600px) {
        height: 95%;
    }
`;

const MessageHeader = styled.div`
    width: 100%;
    height: auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
    padding: 0 0 10px 0;
`;

const MessagesList = styled.div`
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    padding: 4px 0;
`;

const InputField = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    gap: 5px;
    padding: 10px 0 0 0;
    
    & input {
        flex: 1;
        min-width: 100px;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 10px;
        font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: normal;
        
    }
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
    height: 60px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    
    @media (max-width: 500px) {
        height: 44px;
    }
`;

const RowWrapper = styled.div`
    width: 70%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const HeaderData = styled.div`
    width: 200px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    @media (max-width: 500px) {
        gap: 2px;
    }
`;

export default ChatUserOutlet;