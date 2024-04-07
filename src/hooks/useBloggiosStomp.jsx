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

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dispatchErrorMessage} from "../service/functions";
import {addError} from "../state/errorSlice";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {SEND_MESSAGE} from "../constant/WebsocketEndpoint";
import {createReceiveMessage} from "../state/receiveMessageSlice";
import {setSnackbar} from "../state/snackbarSlice";

let stompClient = null;
const useBloggiosStomp = () => {

    const [isConnected, setIsConnected] = useState(false);
    const {isAuthenticated, userId, accessToken, remoteAddress} = useSelector(state=> state.auth);
    const messageSelector = useSelector((state)=> state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            connect();
        }
    }, [isAuthenticated]);

    useEffect(()=> {
        if (
            messageSelector.hasOwnProperty('message') &&
            messageSelector.hasOwnProperty('receiverId') &&
            messageSelector['message'] !== null && messageSelector['message'] !== undefined &&
            messageSelector['receiverId'] !== null && messageSelector['receiverId'] !== undefined &&
            isConnected
        ) {
            const sendMessagePayload = {
                senderId: userId,
                receiverId: messageSelector.receiverId,
                message: messageSelector.message,
            }
            stompClient.send(SEND_MESSAGE, {}, JSON.stringify(sendMessagePayload));
        }
    }, [messageSelector])

    const connect = () => {
        if (isAuthenticated && userId) {
            const socket = new SockJS(process.env.REACT_APP_WEBSOCKET_URI);
            stompClient = over(socket);
            if (stompClient) {
                stompClient.debug = null;
            }
            stompClient.connect({
                accessToken: accessToken,
                userId: userId,
                remoteAddress: remoteAddress
            }, onConnected, onError);
        }
    }

    const onPrivateNotification = (payload) => {
        console.log(payload)
        const notificationPayload =  {
            snackbarType: 'notification',
            message: 'You received a new notification',
            isSnackbar: true,
        };
        dispatch(setSnackbar(notificationPayload));
    }

    const onPrivateChat = (payload) => {
        let body = JSON.parse(payload.body);
        const data = {
            message: body.message,
            senderId: body.senderId,
            receiverId: body.receiverId
        }
        dispatch(createReceiveMessage(data));
        const notificationPayload =  {
            snackbarType: 'notification',
            message: 'You received a new message',
            isSnackbar: true,
            path: `chats/${body.senderId}`
        };
        dispatch(setSnackbar(notificationPayload));
    }

    const stompSubscribe = () => {
        stompClient.subscribe(`/user/${userId}/private/notify`, onPrivateNotification);
        stompClient.subscribe(`/user/${userId}/private/chat`, onPrivateChat);

    }

    const onConnected = () => {
        setIsConnected(true);
        stompSubscribe();
    }

    const onError = (errorFrame) => {
        dispatchErrorMessage(dispatch, "Error connecting with Server");
        setIsConnected(false);
        dispatch(addError({
            isError: true,
            errorMessage: errorFrame
        }));
    }
};

export default useBloggiosStomp;