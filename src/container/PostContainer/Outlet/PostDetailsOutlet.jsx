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
import {useParams} from "react-router-dom";
import {uuidValidator} from "../../../util/ComponentValidators";
import styled from "styled-components";
import NotFound from "../../../component/NotFound/NotFound";
import {useQuery} from "@tanstack/react-query";
import {getPostDetails} from "../../../restservices/postApi";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {LANDING_PAGE, POST_PAGE, SUPPORT_PAGE} from "../../../constant/pathConstants";
import {bgBlackRounded} from "../../../asset/svg";
import {MdOutlineContactSupport} from "react-icons/md";
import {HiPaperAirplane} from "react-icons/hi2";
import {colors} from "../../../styles/Theme";
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Zoom} from "swiper/modules";
import '../../../styles/PostSwiperStyles.css';
import Avatar from "../../../component/avatars/avatar";
import {ColumnWrapper} from "../../../styles/StyledComponent";
import useUserProfile from "../../../hooks/useUserProfile";
import {detailedProfile, getUserProfile} from "../../../restservices/profileApi";
import {useDispatch, useSelector} from "react-redux";
import {dispatchError} from "../../../service/functions";

const postNotFoundList = [
    {
        id: 1,
        label: 'Post Page',
        text: 'Redirect me to the Post Page',
        button: 'Take Me',
        icon: <HiPaperAirplane />,
        clickAction: POST_PAGE
    },
    {
        id: 2,
        label: 'Home',
        text: 'Take me to the Bloggios Home Page',
        button: 'Take Me',
        icon: <img src={bgBlackRounded} height={'25px'} alt={'Bloggios'}/>,
        clickAction: LANDING_PAGE
    },
    {
        id: 3,
        label: 'Help',
        text: 'Need help, please contact support',
        button: 'Learn more',
        icon: <MdOutlineContactSupport/>,
        clickAction: SUPPORT_PAGE
    }
];

const PostDetailsOutlet = () => {

}

export default PostDetailsOutlet;