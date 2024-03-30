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

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dispatchErrorMessage} from "../service/functions";
import {addError} from "../state/errorSlice";
import SockJS from "sockjs-client";
import {over} from "stompjs";

let stompClient = null;
const useBloggiosStomp = () => {

    const {isAuthenticated, userId, accessToken, remoteAddress} = useSelector(state=> state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            connect();
        }
    }, [isAuthenticated]);

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
    }

    const stompSubscribe = () => {
        stompClient.subscribe(`/user/${userId}/private/notify`, onPrivateNotification)
    }

    const onConnected = () => {
        stompSubscribe();
        
    }

    const onError = (errorFrame) => {
        dispatchErrorMessage(dispatch, "Error connecting with Server");
        dispatch(addError({
            isError: true,
            errorMessage: errorFrame
        }));
    }
};

export default useBloggiosStomp;