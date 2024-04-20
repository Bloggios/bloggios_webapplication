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

import React, {useCallback, useLayoutEffect} from "react";
import styled from "styled-components";
import {colors} from "../../../styles/Theme";

const MessageData = React.forwardRef(({
                                          chatId,
                                          chatKey,
                                          message,
                                          chatType = 'RECEIVER',
                                          senderId,
                                          receiverId,
                                          chatStatus
                                      }, ref) => {

    const SENDER = "SENDER";

    useLayoutEffect(()=> {
        if (!chatType || !message || !senderId || !receiverId) {
            throw new Error('One of the mandatory prop is missing (chatType, message, senderId, receiverId)')
        }
    }, [])

    const getMessageContent = useCallback(()=> {
        return (
            <span
                style={{
                    borderRadius: chatType === SENDER ? '16px 20px 7px 16px' : '20px 16px 16px 7px'
                }}
            >
                {message ? message : 'Error Fetching Message ⛔️'}
            </span>
        )
    }, [chatType, message])

    return ref ?
        (
            <Wrapper
                ref={ref}
                chatType={chatType}
                style={{
                    alignSelf: chatType === SENDER ? 'flex-end' : 'flex-start',
                }}
            >
                {getMessageContent()}
            </Wrapper>
        ) :
        (
            <Wrapper
                chatType={chatType}
                style={{
                    alignSelf: chatType === SENDER ? 'flex-end' : 'flex-start',
                }}
            >
                {getMessageContent()}
            </Wrapper>
        )
})

const Wrapper = styled.div`
    width: auto;
    min-width: 10%;
    max-width: 60%;
    display: flex;
    flex-direction: column;
    
    & > span {
        width: 100%;
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
        white-space: pre-line;
        letter-spacing: 1px;
        background: ${({ chatType }) => chatType === 'SENDER' ? '#6a3093' : '#aa076b'};
        background: ${({ chatType }) => chatType === 'SENDER' ? '-webkit-linear-gradient(to right, #4776e6, #8e54e9)' : '-webkit-linear-gradient(to right, #aa076b, #61045f)'};
        background: ${({ chatType }) => chatType === 'SENDER' ? 'linear-gradient(to right, #4776e6, #8e54e9)' : 'linear-gradient(to right, #aa076b, #61045f)'};
        color: ${colors.white100};
        padding: 8px;
        hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        -webkit-hyphens: auto;
        overflow: hidden;
        word-wrap: break-word;
    }
`;

export default MessageData;