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

import {
    CHATS_PAGE,
    HOME_PAGE,
    LOGIN_PAGE,
    NOTIFICATIONS_PAGE, PROFILE_PAGE,
    REPORT_BUG_PAGE,
    SERVICES_PAGE,
    SIGNUP_PAGE,
    SUPPORT_PAGE
} from "./pathConstants";
import {BiHelpCircle, BiHomeAlt2, BiLogInCircle} from "react-icons/bi";
import {BsChatDots} from "react-icons/bs";
import {IoNotificationsOutline} from "react-icons/io5";
import {VscSettingsGear} from "react-icons/vsc";
import {AiOutlineBug, AiOutlineUserAdd} from "react-icons/ai";
import {FaRegUser} from "react-icons/fa";
import {IoMdLogOut} from "react-icons/io";

export const navItems = [
    { page: HOME_PAGE, tooltip: 'Home', icon: <BiHomeAlt2 /> },
    { page: CHATS_PAGE, tooltip: 'Chats', icon: <BsChatDots /> },
    { page: NOTIFICATIONS_PAGE, tooltip: 'Notifications', icon: <IoNotificationsOutline /> },
    { page: SERVICES_PAGE, tooltip: 'Services', icon: <VscSettingsGear /> },
];

export const navbarProfileNotLoggedInList = [
    {
        id: 1,
        icon: <BiLogInCircle fontSize={'18px'} />,
        label: 'Login',
        path: LOGIN_PAGE
    },
    {
        id: 2,
        icon: <AiOutlineUserAdd fontSize={'18px'} />,
        label: 'Signup',
        path: SIGNUP_PAGE
    },
    {
        id: 3,
        icon: <BiHelpCircle fontSize={'18px'} />,
        label: 'Help',
        path: SUPPORT_PAGE
    },
    {
        id: 4,
        icon: <AiOutlineBug fontSize={'18px'} />,
        label: 'Report Bug',
        path: REPORT_BUG_PAGE
    }
]

export const navbarProfileLoggedInList = [
    {
        id: 1,
        icon: <FaRegUser fontSize={'18px'} />,
        label: 'Profile',
        path: PROFILE_PAGE
    },
    {
        id: 2,
        icon: <BiHelpCircle fontSize={'18px'} />,
        label: 'Help',
        path: SUPPORT_PAGE
    },
    {
        id: 3,
        icon: <AiOutlineBug fontSize={'18px'} />,
        label: 'Report Bug',
        path: REPORT_BUG_PAGE
    },
    {
        id: 4,
        icon: <IoMdLogOut fontSize={'18px'} />,
        label: 'Logout',
        path: HOME_PAGE
    },
]

export const navItemsList = [
    {
        icon: <BiHomeAlt2 />,
        path: HOME_PAGE,
        tooltip: 'Home'
    },
    {
        icon: <BsChatDots/>,
        path: CHATS_PAGE,
        tooltip: 'Chats'
    },
    {
        icon: <IoNotificationsOutline/>,
        path: NOTIFICATIONS_PAGE,
        tooltip: 'Notifications'
    },
    {
        icon: <VscSettingsGear/>,
        path: SERVICES_PAGE,
        tooltip: 'Services'
    },
]