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

import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import 'swiper/css/pagination';
import '../../../styles/PostSwiperStyles.css';
import {detailedProfile} from "../../../restservices/profileApi";
import RenderImagesPostDetails from "../component/RenderImagesPostDetails";

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

    const {postId} = useParams();
    const [isError, setIsError] = useState(false);
    const [isPostDetailsEnabled, setIsPostDetailsEnabled] = useState(false);
    const [isProfileEnabled, setIsProfileEnabled] = useState(false);
    const [profileId, setProfileId] = useState(null);


    const fetchProfileData = async () => {
            const response = await detailedProfile(profileId);
            return response.data;
    };

    const fetchPostDetails = async () => {
        const response = await getPostDetails(postId);
        return response.data;
    }

    const {
        isLoading: pdIsLoading,
        error: pdError,
        isError: pdIsError,
        isSuccess: pdIsSuccess,
        data: pdData,
        status: pdStatus
    } = useQuery({
        queryKey: ['post', postId],
        queryFn: fetchPostDetails,
        staleTime: 120000,
        enabled: isPostDetailsEnabled
    });

    const {
        isLoading: pfIsLoading,
        error: pfError,
        data: profileData,
        isSuccess: pfIsSuccess,
        isError: pfIsError,
        isPending: pfIsPending
    } = useQuery({
        queryKey: ['userPostProfile', postId],
        queryFn: fetchProfileData,
        staleTime: 120000,
        enabled: isProfileEnabled
    })

    useLayoutEffect(() => {
        const isValid = uuidValidator(postId);
        if (!isValid) {
            setIsError(true);
        } else {
            setIsPostDetailsEnabled(true);
        }
    }, []);

    useEffect(()=> {
        if (pdIsSuccess) {
            setProfileId(pdData?.userId);
            setIsProfileEnabled(true);
        }
    }, [pdStatus, pdIsSuccess]);

    const RenderPostDetails = () => {
        if (pdIsLoading || (pfIsLoading || pfIsPending)) {
            return <FallbackLoader width={'100%'} height={'100%'} />
        } else if (pdIsSuccess && pfIsSuccess && pdData && profileData) {
            return <RenderImagesPostDetails pdData={pdData} profileData={profileData} />
        } else if (pdIsError || pfIsError) {
            return <NotFound list={postNotFoundList} />
        }
    }

    return (
        <Wrapper>
            {isError ? <NotFound list={postNotFoundList} /> : <RenderPostDetails />}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 600px) {
        align-items: flex-start;
        margin-top: 20px;
    }
`;

export default PostDetailsOutlet;