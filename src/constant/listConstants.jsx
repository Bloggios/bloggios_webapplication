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
    NOTIFICATIONS_PAGE, POST_PAGE, PRIVACY_POLICY,
    PROFILE_PAGE,
    QUESTION_PAGE,
    REPORT_BUG_PAGE,
    SERVICES_PAGE,
    SIGNUP_PAGE,
    SUPPORT_PAGE
} from "./pathConstants";
import {BiHelpCircle, BiHomeAlt2, BiLogInCircle, BiSupport} from "react-icons/bi";
import {BsChatDots, BsFillDatabaseFill, BsQuestionCircle} from "react-icons/bs";
import {IoNotificationsOutline} from "react-icons/io5";
import {VscSettingsGear} from "react-icons/vsc";
import {AiOutlineBug, AiOutlineUserAdd} from "react-icons/ai";
import {FaBug, FaCode, FaInfoCircle, FaQuestion, FaRegUserCircle, FaShoppingCart} from "react-icons/fa";
import bloggios_logo from '../asset/svg/bg-accent_rounded.svg'
import {
    MdContactSupport,
    MdMiscellaneousServices,
    MdOutlineContactSupport,
    MdOutlineNotifications, MdOutlinePolicy
} from "react-icons/md";
import {CgMoreO, CgProfile, CgWebsite} from "react-icons/cg";
import bloggios_00_logo from '../asset/svg/bg_logo_rounded_black.svg'
import {TbMessage2Share, TbPasswordUser} from "react-icons/tb";
import {GiChatBubble} from "react-icons/gi";
import {GrServices} from "react-icons/gr";
import {GoHome, GoPlusCircle} from "react-icons/go";
import React from "react";
import {BLOGGIOS_TECH_LINK} from "./ServiceConstants";
import {
    ecommerce,
    flutter,
    forms,
    javaOutlined,
    learn,
    messaging,
    polls,
    qAndA,
    reactOutlined,
    socialMedia,
    testing
} from "../asset/marquee";
import {
    bankingDevelopment,
    bgAccentRounded, bgBlackRounded,
    ecommerceDevelopment,
    educationDevelopment,
    erpDevelopment,
    healthcareDevelopment,
    ottDevelopment
} from "../asset/svg";
import {
    BLOGGIOS_TECH_CONTACT_US,
    BLOGGIOS_TECH_SERVICE_TAB,
    BLOGGIOS_TECH_TECH_STACK,
    BLOGGIOS_TECH_WHY_BLOGGIOS
} from './ElementIdConstants';
import {
    agile,
    coding,
    partnership,
    scalability,
    techSupport,
    transparency,
    visionarySolutions,
    workWithBest
} from '../asset/whyUs/index';
import Avatar from "../component/avatars/avatar";
import {IoIosHelpCircleOutline} from "react-icons/io";
import {RiAccountPinCircleLine, RiLockPasswordLine, RiLoginCircleLine, RiVerifiedBadgeLine} from "react-icons/ri";

export const loggedInNavItems = [
    {page: HOME_PAGE, tooltip: 'Home', icon: <BiHomeAlt2/>, tooltipId: 'navitems__home--tooltip'},
    {page: SERVICES_PAGE, tooltip: 'Services', icon: <FaCode />, tooltipId: 'navitems__services-tooltip'},
];

export const loggedOutNavItems = [
    {page: LANDING_PAGE, tooltip: 'Home', icon: <BiHomeAlt2/>, tooltipId: 'navitems__home--tooltip'},
    {page: SERVICES_PAGE, tooltip: 'Services', icon: <FaCode />, tooltipId: 'navitems__services-tooltip'},
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
        label: 'Landing',
        icon: <img src={bgAccentRounded} alt={'Bloggios Tech'} height={'100%'}/>,
        path: LANDING_PAGE
    },
    {
        label: 'Services',
        icon: <MdMiscellaneousServices/>,
        path: SERVICES_PAGE
    },
    {
        label: 'Product Development',
        icon: <FaCode />,
        path: '/services/product-development'
    },
    {
        label: 'Web Development',
        icon: <CgWebsite />,
        path: '/services/product-development#webDevelopmentSection'
    },
    {
        label: 'Privacy Policy',
        icon: <MdOutlinePolicy />,
        path: PRIVACY_POLICY
    },
    {
        label: 'Help',
        icon: <IoIosHelpCircleOutline />,
        path: SUPPORT_PAGE
    },
    {
        label: 'Report Bug',
        icon: <FaBug />,
        path: REPORT_BUG_PAGE
    },
    {
        label: 'Contact Us',
        icon: <BiSupport />,
        path: '/#bloggiosTechEnquirySection'
    }
]

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

export const notFoundPageList = [
    {
        id: 1,
        label: 'Home',
        text: 'Redirect me to the Bloggios Home Page',
        button: 'Take Me',
        icon: <GoHome />,
        clickAction: HOME_PAGE
    },
    {
        id: 2,
        label: 'Bloggios Tech',
        text: 'Take me to the Bloggios Tech Home Page',
        button: 'Redirect Me',
        icon: <img src={bloggios_logo} height={'25px'}  alt={'Bloggios'}/>,
        clickAction: BLOGGIOS_TECH_LINK
    },
    {
        id: 3,
        label: 'SupportContainer',
        text: 'Need help, please contact support',
        button: 'Learn more',
        icon: <MdOutlineContactSupport />,
        clickAction: SUPPORT_PAGE
    }
];

export const errorPageList = [
    {
        id: 1,
        label: 'Home',
        text: 'Redirect me to the Bloggios Home Page',
        button: 'Take Me',
        icon: <GoHome />,
        clickAction: HOME_PAGE
    },
    {
        id: 3,
        label: 'SupportContainer',
        text: 'Need help, please contact support',
        button: 'Learn more',
        icon: <MdOutlineContactSupport />,
        clickAction: SUPPORT_PAGE
    }
];

export const authProfileTabsList = [
    {
        id: 1,
        label: 'About',
        path: ""
    },
    {
        id: 2,
        label: 'Posts',
        path: 'posts'
    },
    {
        id: 3,
        label: 'Questions',
        path: 'questions'
    },
    {
        id: 4,
        label: 'Likes',
        path: 'like'
    },
    {
        id: 5,
        label: 'Saved',
        path: 'saved'
    },
    {
        id: 6,
        label: 'Reports',
        path: 'reports'
    }
];

export const userProfileTabsList = [
    {
        id: 1,
        label: 'About',
        path: ""
    },
    {
        id: 2,
        label: 'Featured',
        path: 'featured'
    },
    {
        id: 3,
        label: 'Posts',
        path: 'posts'
    },
    {
        id: 4,
        label: 'Questions',
        path: 'questions'
    }
];

export const homeMarqueeList = [
    {
        id: 1,
        icon: ecommerce
    },
    {
        id: 2,
        icon: flutter
    },
    {
        id: 3,
        icon: forms
    },
    {
        id: 4,
        icon: javaOutlined
    },
    {
        id: 5,
        icon: learn
    },
    {
        id: 6,
        icon: messaging
    },
    {
        id: 7,
        icon: qAndA
    },
    {
        id: 8,
        icon: reactOutlined
    },
    {
        id: 9,
        icon: socialMedia
    },
    {
        id: 10,
        icon: polls
    },
    {
        id: 11,
        icon: testing
    },
    {
        id: 12,
        icon: bgAccentRounded
    }
];

export const askQuestionDescription = [
    {
        id: 1,
        title: "Title - The Spark of Inquiry",
        description: "Ignite curiosity with a title that encapsulates the essence of your question. Make it crisp, clear, and irresistible – a spark that draws readers in."
    },
    {
        id: 2,
        title: "Details - Unraveling the Tapestry",
        description: "Dive into the heart of your inquiry in the details section. Unravel the layers of your question, share the story behind it, and paint a vivid picture for your readers. Let them feel the pulse of your curiosity."
    },
    {
        id: 3,
        title: "Tags - Navigational Signposts",
        description: "Sprinkle your question with tags like topics, guiding users to the realms of knowledge they seek. Whether it's tech, science, life musings, or anything in between, let the tags be signposts leading to your question."
    },
    {
        id: 4,
        title: "Review Question - Polishing the Gem",
        description: "Before unveiling your question to the Bloggios community, take a moment to polish it. Ensure clarity, check for any hidden gems you might have missed, and make certain it's a shining beacon of curiosity."
    },
    {
        id: 5,
        title: "Post to Bloggios - Unleashing Curiosity",
        description: "With your question finely crafted, release it into the wilds of Bloggios. Invite readers and thinkers alike to join the journey of exploration, adding their unique perspectives to the tapestry of knowledge."
    },
];

export const bloggiosTechTabsConstants = [
    {
        id: 1,
        label: 'Why Bloggios',
        elementId: BLOGGIOS_TECH_WHY_BLOGGIOS
    },
    {
        id: 2,
        label: 'Services',
        elementId: BLOGGIOS_TECH_SERVICE_TAB
    },
    {
        id: 3,
        label: 'Tech Stack',
        elementId: BLOGGIOS_TECH_TECH_STACK
    },
    {
        id: 4,
        label: 'Contact Us',
        elementId: BLOGGIOS_TECH_CONTACT_US
    }
];

export const whyUsCardListConstants = [
    {
        id: 1,
        icon: scalability,
        label: 'Product Scalability'
    },
    {
        id: 2,
        icon: techSupport,
        label: 'Best Tech SupportContainer'
    },
    {
        id: 3,
        icon: agile,
        label: 'Agile Excellence'
    },
    {
        id: 4,
        icon: transparency,
        label: 'Transparent Innovation'
    },
    {
        id: 5,
        icon: workWithBest,
        label: 'Work with Best'
    },
    {
        id: 6,
        icon: visionarySolutions,
        label: 'Visionary Solutions'
    },
    {
        id: 7,
        icon: partnership,
        label: 'Future-Proof Partnerships'
    },
    {
        id: 8,
        icon: coding,
        label: 'Precision Engineering'
    },
];

export const mainStreamServiceBloggiosTech = [
    {
        id: 1,
        icon: coding,
        label: 'Product Development',
        path: '/services/product-development',
        text: 'Envisioning a solution to delivering delight – full-cycle development bridges the product gap.'
    },
    {
        id: 2,
        icon: scalability,
        label: 'Product Ideation',
        path: '/services#productIdeationServicePageSection',
        text: 'Leverage research to inform a comprehensive product development roadmap.'
    },
    {
        id: 3,
        icon: visionarySolutions,
        label: 'Technical Support',
        path: '/services#technicalSupportServicePageSection',
        text: 'Provide ongoing technical support or deliver software development training.'
    },
    {
        id: 4,
        icon: workWithBest,
        label: 'Technical Training',
        path: '/services#technicalExpertServicePageSection',
        text: 'Uncover the perfect candidate by combining technical challenges.'
    },
];

export const productDevelopment = [
    {
        id: 1,
        title: 'E-Commerce Development',
        description: 'Tailor-made software solutions for retail and ecommerce, optimizing customer experiences, managing inventory, and streamlining transactions. Enhance sales, automate processes, and stay ahead of the competition with our comprehensive development services.',
        icon: ecommerceDevelopment
    },
    {
        id: 2,
        title: 'Healthcare Management Development',
        description: 'Efficient software solutions for retail and healthcare management, optimizing operations, patient care, and inventory tracking. Improve customer service, streamline workflows, and ensure compliance with our specialized development expertise.',
        icon: healthcareDevelopment
    },
    {
        id: 3,
        title: 'Banking and Finance Development',
        description: 'Cutting-edge software solutions for banking and finance, enhancing security, transaction speed, and customer experience. Streamline operations, manage assets, and stay compliant with our tailored development services.',
        icon: bankingDevelopment
    },
    {
        id: 4,
        title: 'OTT Development',
        description: 'Empower your OTT platform with our advanced software development solutions. Deliver seamless streaming experiences, personalized content recommendations, and robust user management features to captivate audiences and drive growth.',
        icon: ottDevelopment
    },
    {
        id: 5,
        title: 'Education Service Development',
        description: 'Revolutionize education with our software development solutions. Enhance learning experiences, manage resources efficiently, and facilitate remote education. From e-learning platforms to student management systems, we\'ve got you covered.',
        icon: educationDevelopment
    },
    {
        id: 6,
        title: 'ERP Development',
        description: 'Maximize efficiency with our ERP development solutions. Streamline business processes, integrate operations, and enhance decision-making with real-time insights. Tailored to your needs for seamless enterprise management.',
        icon: erpDevelopment
    },
];

export const settingListItems = [
    {
        id: 1,
        label: 'Edit Profile',
        icon: <FaRegUserCircle />,
        path: '/setting/edit-profile',
    },
    {
        id: 2,
        label: 'Verification',
        icon: <RiVerifiedBadgeLine />,
        path: '/setting/verification',
    },
    {
        id: 3,
        label: 'Change Password',
        icon: <RiLockPasswordLine />,
        path: '/setting/change-password',
    },
    {
        id: 4,
        label: 'Account',
        icon: <RiAccountPinCircleLine />,
        path: '/setting/privacy',
    },
    {
        id: 5,
        label: 'Login Activity',
        icon: <RiLoginCircleLine />,
        path: '/setting/login-activity'
    },
    {
        id: 6,
        label: 'My Data',
        icon: <BsFillDatabaseFill />,
        path: '/setting/my-data',
    }
]