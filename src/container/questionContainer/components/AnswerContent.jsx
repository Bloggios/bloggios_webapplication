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

import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import HtmlContent from "../../../component/HtmlContent/HtmlContent";
import useComponentSize from "../../../hooks/useComponentSize";
import Avatar from "../../../component/avatars/avatar";
import {bgBlackRounded, notFound} from "../../../asset/svg";
import {ColumnWrapper} from "../../../styles/StyledComponent";
import IconButton from "../../../component/buttons/IconButton";
import {colors} from "../../../styles/Theme";
import useUserProfile from "../../../hooks/useUserProfile";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import Divider from "../../../component/divider/divider";
import {SlUserFollow} from "react-icons/sl";
import {CiBookmarkPlus} from "react-icons/ci";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const AnswerContent = ({
                           answer,
                           questionUserId
                       }) => {

    const {userId} = useSelector((state)=> state.auth);
    const navigate = useNavigate();

    const {
        isLoading,
        error,
        profileData,
        isSuccess,
        isError,
        isPending,
        refetch,
    } = useUserProfile(answer?.userId, true);

    const [modifiedHtmlData, setModifiedHtmlData] = useState('');
    const [wrapperRef, wrapperSize] = useComponentSize();

    useEffect(() => {
        if (answer && answer.detailsHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = answer.detailsHtml;
            const imgTags = tempDiv.getElementsByTagName('img');
            for (let i = 0; i < imgTags.length; i++) {
                imgTags[i].classList.add('html-data__img-tag');
            }
            setModifiedHtmlData(tempDiv.innerHTML);
            return () => {
                tempDiv.remove();
            };
        }
    }, [answer]);

    const RenderUserInfoSection = useCallback(()=> {
        if (isLoading && !isSuccess) {
            return <FallbackLoader width={'10%'} height={'70px'} thickness={2} />
        } else if (isSuccess && profileData && !isError && !isPending) {
            return (
                <UserInfoSection>
                    <Avatar
                        size={'60px'}
                        borderRadius={'50%'}
                        image={profileData.profileImage ? profileData.profileImage : bgBlackRounded}
                        fallbackImage={notFound}
                        onClick={()=> navigate(`/profile/${profileData.userId}`)}
                    />

                    <ColumnWrapper
                        onClick={()=> navigate(`/profile/${profileData.userId}`)}
                        style={{
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        <Heading5>
                            {profileData.name}
                        </Heading5>

                        <Caption>
                            {profileData.email}
                        </Caption>
                    </ColumnWrapper>
                </UserInfoSection>
            )
        } else if (isError && !isLoading) {
            return (
                <UserInfoSection>
                    <Heading5>Error Occurred ⚠️</Heading5>
                </UserInfoSection>
            )
        }
    }, [isLoading, isSuccess, profileData, isError, isPending])

    return (
        <Wrapper ref={wrapperRef}>
            <RenderUserInfoSection />
            <HtmlContent htmlData={modifiedHtmlData} wrapperSize={wrapperSize}/>

            <IconsGroup>
                <div style={{
                    width: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16
                }}>
                    <IconButton
                        bgColor={colors.black80}
                        hBgColor={colors.black150}
                        aBgColor={colors.black150}
                        fontSize={'22px'}
                        padding={'6px'}
                    >
                        <SlUserFollow />
                    </IconButton>
                    {userId === questionUserId && (
                        <AcceptedButton>
                            Accept Answer ✅
                        </AcceptedButton>
                    )}
                </div>

                <IconButton
                    fontSize={'25px'}
                    padding={'6px'}
                >
                    <CiBookmarkPlus />
                </IconButton>
            </IconsGroup>

            <Divider width={'60%'} verticalSpacing={'4px'} color={colors.white20} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: "Poppins", sans-serif;
`;

const UserInfoSection = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    position: relative;
`;

const TextOverFlowStyle = css`
    font-family: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Heading5 = styled.h5`
    width: 100%;
    font-size: clamp(1rem, 0.9515rem + 0.2985vw, 1.25rem);
    letter-spacing: inherit;
    font-weight: 500;
    ${TextOverFlowStyle};
`;

const Caption = styled.span`
    width: 100%;
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    color: ${colors.whiteOpaque40};
    font-weight: 400;
    ${TextOverFlowStyle};
`;

const IconsGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

const AcceptedButton = styled.button`
    border: none;
    outline: none;
    font-size: 14px;
    color: ${colors.white80};
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    background-color: ${colors.black80};
    border-radius: 10px;
    padding: 5px 10px;
    
    &:hover, &:active {
        color: ${colors.white100};
        background-color: ${colors.black150};
    }
`;

export default AnswerContent;