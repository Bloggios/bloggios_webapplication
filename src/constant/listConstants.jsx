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
    CREATE_PAGE,
    HOME_PAGE,
    LANDING_PAGE,
    LOGIN_PAGE,
    NOTIFICATIONS_PAGE,
    PROFILE_PAGE,
    REPORT_BUG_PAGE,
    SERVICES_PAGE,
    SIGNUP_PAGE,
    SUPPORT_PAGE
} from "./pathConstants";
import {BiHelpCircle, BiHomeAlt2, BiLogInCircle, BiSupport} from "react-icons/bi";
import {BsChatDots} from "react-icons/bs";
import {IoNotificationsOutline} from "react-icons/io5";
import {VscSettingsGear} from "react-icons/vsc";
import {AiOutlineBug, AiOutlineUserAdd} from "react-icons/ai";
import {FaCode, FaInfoCircle, FaQuestion, FaRegUser, FaShoppingCart} from "react-icons/fa";
import {IoMdLogOut} from "react-icons/io";
import bloggios_logo from '../asset/svg/bg-accent_rounded.svg'
import {MdContactSupport, MdMiscellaneousServices, MdOutlineNotifications} from "react-icons/md";
import {CgProfile, CgWebsite} from "react-icons/cg";
import bloggios_00_logo from '../asset/svg/bg_logo_rounded_black.svg'
import {TbMessage2Share} from "react-icons/tb";
import {GiChatBubble} from "react-icons/gi";
import {GrServices} from "react-icons/gr";
import {GoPlusCircle} from "react-icons/go";

export const loggedInNavItems = [
    {page: HOME_PAGE, tooltip: 'Home', icon: <BiHomeAlt2/>},
    {page: CHATS_PAGE, tooltip: 'Chats', icon: <BsChatDots/>},
    {page: NOTIFICATIONS_PAGE, tooltip: 'Notifications', icon: <IoNotificationsOutline/>},
    {page: SERVICES_PAGE, tooltip: 'Services', icon: <VscSettingsGear/>},
];

export const loggedOutNavItems = [
    {page: LANDING_PAGE, tooltip: 'Home', icon: <BiHomeAlt2/>},
    {page: SERVICES_PAGE, tooltip: 'Services', icon: <GrServices />},
    {page: CREATE_PAGE, tooltip: 'Create', icon: <GoPlusCircle />},
];

export const navbarProfileNotLoggedInList = [
    {
        id: 1,
        icon: <BiLogInCircle fontSize={'18px'}/>,
        label: 'Login',
        path: LOGIN_PAGE
    },
    {
        id: 2,
        icon: <AiOutlineUserAdd fontSize={'18px'}/>,
        label: 'Signup',
        path: SIGNUP_PAGE
    },
    {
        id: 3,
        icon: <BiHelpCircle fontSize={'18px'}/>,
        label: 'Help',
        path: SUPPORT_PAGE
    },
    {
        id: 4,
        icon: <AiOutlineBug fontSize={'18px'}/>,
        label: 'Report Bug',
        path: REPORT_BUG_PAGE
    }
]

export const navbarProfileLoggedInList = [
    {
        id: 1,
        icon: <FaRegUser fontSize={'18px'}/>,
        label: 'Profile',
        path: PROFILE_PAGE
    },
    {
        id: 2,
        icon: <BiHelpCircle fontSize={'18px'}/>,
        label: 'Help',
        path: SUPPORT_PAGE
    },
    {
        id: 3,
        icon: <AiOutlineBug fontSize={'18px'}/>,
        label: 'Report Bug',
        path: REPORT_BUG_PAGE
    },
    {
        id: 4,
        icon: <IoMdLogOut fontSize={'18px'}/>,
        label: 'Logout',
        path: HOME_PAGE
    },
]

export const navItemsList = [
    {
        icon: <BiHomeAlt2/>,
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
];

export const bloggiosTechLinksList = [
    {
        label: 'Home',
        icon: <img src={bloggios_logo} alt={'Bloggios Tech'} height={'100%'}/>,
        path: 'https://tech.bloggios.com'
    },
    {
        label: 'Services',
        icon: <MdMiscellaneousServices/>,
        path: 'https://tech.bloggios.com/services'
    },
    {
        label: 'About Us',
        icon: <FaInfoCircle/>,
        path: 'https://tech.bloggios.com/about'
    },
    {
        label: 'Software Development',
        icon: <FaCode />,
        path: 'https://tech.bloggios.com/software-development'
    },
    {
        label: 'Website Development',
        icon: <CgWebsite />,
        path: 'https://tech.bloggios.com/website-development'
    },
    {
        label: 'E-Commerce',
        icon: <FaShoppingCart />,
        path: 'https://tech.bloggios.com/ecommerce-development'
    },
    {
        label: 'Software Support',
        icon: <MdContactSupport />,
        path: 'https://tech.bloggios.com/software-support'
    },
    {
        label: 'Contact',
        icon: <BiSupport />,
        path: 'https://tech.bloggios.com/contact'
    }
]

export const bloggiosLinksList = [
    {
        label: 'Home',
        icon: <img src={bloggios_00_logo} alt={'Bloggios'} height={'100%'}/>,
        path: HOME_PAGE
    },
    {
        label: 'Posts',
        icon: <TbMessage2Share />,
        path: HOME_PAGE
    },
    {
        label: 'Chat',
        icon: <GiChatBubble />,
        path: CHATS_PAGE
    },
    {
        label: 'Profile',
        icon: <CgProfile />,
        path: PROFILE_PAGE
    },
    {
        label: 'Notifications',
        icon: <MdOutlineNotifications />,
        path: NOTIFICATIONS_PAGE
    },
    {
        label: 'Q & A',
        icon: <FaQuestion />,
        path: SERVICES_PAGE
    }
];

export const globalSearchList = [
    {
        id: 1,
        label: 'Users'
    },
    {
        id: 2,
        label: 'Posts'
    }
];