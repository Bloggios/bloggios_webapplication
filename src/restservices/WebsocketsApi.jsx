import {USER_CHAT_HISTORY, USER_CHAT_LIST} from "../constant/apiConstants"
import { authenticatedAxios } from "./baseAxios"

export const userChatHistory = (userId) => {
    return authenticatedAxios.get(USER_CHAT_HISTORY, {
        params : {
            "userId": userId,
            page: 0
        }
    }).then(response => response.data)
}

export const userChatList = (userId, receiverId, page, signal) => {
    return authenticatedAxios.get(USER_CHAT_LIST, {
        params : {
            "senderId": userId,
            "receiverId": receiverId,
            "page": page
        },
        signal: signal
    }).then(response => response.data)
}
