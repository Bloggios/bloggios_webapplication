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

import React, {useState} from 'react';
import styled, {css} from "styled-components";
import {bgBlackRounded, notFound} from "../../../asset/svg";
import {colors} from "../../../styles/Theme";
import {Tooltip} from "react-tooltip";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {getFormattedDate} from "../../../service/DateFunctions";
import IconButton from "../../../component/buttons/IconButton";
import {CiBookmarkPlus} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import useUserProfile from "../../../hooks/useUserProfile";
import FallbackLoader from "../../../component/loaders/fallbackLoader";

const QuestionCard = ({
    questionId,
    userId,
    title,
    tags,
    dateCreated,
    imageLink,
    detailsText,
    isResolved
                      }) => {

    const [imageLoadError, setImageLoadError] = useState(false);
    const navigate = useNavigate();
    const {width} = useWindowDimensions();
    const {
        isLoading,
        error,
        profileData,
        isSuccess,
        isError,
        isPending,
        refetch
    } = useUserProfile(userId, true);

    const handleImageError = (event) => {
        event.target.src = notFound;
        setImageLoadError(true);
    }

    const getDetailsText = () => {
        console.log(detailsText.length)
        if (detailsText && detailsText.length > 0) {
            const split = detailsText.split('\n');
            return detailsText.length > 250 || split.length > 3;
        }
        return false;
    }

    const UserInformation = () => {
        if (isLoading) {
            return <FallbackLoader width={'10%'} height={'25px'} thickness={1} />
        } else if (isSuccess && profileData && !isLoading && !isError) {
            return (
                <UserInfo>
                    <img src={profileData.profileImage ? profileData.profileImage : bgBlackRounded} alt="Bloggios"/>
                    <span>{profileData.name}</span>
                </UserInfo>
            )
        } else if (isError && !isLoading) {
            return (
                <UserInfo>
                    <img src={bgBlackRounded} alt="Bloggios"/>
                    <span>Error Occurred ⛔️</span>
                </UserInfo>
            )
        }
    }

    return (
        <Wrapper onClick={()=> navigate(questionId)}>
            <UserInformation />

            <Main>
                <QuestionContent>
                    <QuestionDetails style={{
                        width: imageLink ? '70%' : '100%'
                    }}>
                        <h2>{title}</h2>
                        <DetailsText style={{
                            maxHeight: 75
                        }}>
                            {detailsText && detailsText.length > 0 && detailsText}
                        </DetailsText>
                    </QuestionDetails>

                    {imageLink && (
                        <Image
                            data-tooltip-id={'question__image--load-tooltip'}
                            data-tooltip-content={imageLoadError ? 'Image Not Found' : ''}
                        >
                            <img
                                src={imageLink}
                                alt="Bloggios"
                                onError={handleImageError}
                            />
                        </Image>
                    )}
                </QuestionContent>

                <QuestionInfo>
                    {tags && tags.length > 0 && (
                        <Tags>
                            {tags.map((tag, i)=> (
                                <button key={tag + '_' + i}>
                                    {tag}
                                </button>
                            ))}
                        </Tags>
                    )}
                    <Information>
                        <span>
                            {`${getFormattedDate(dateCreated)} ${isResolved ? '· Resolved ✅' : ''} `}
                        </span>

                        <IconButton
                            tooltipId={'question__save--icon-tooltip'}
                            tooltipContent={'Save Question'}
                            fontSize={'25px'}
                            padding={'6px'}
                        >
                            <CiBookmarkPlus />
                        </IconButton>
                    </Information>
                </QuestionInfo>
            </Main>
            {width > 600 && (
                <>
                    <Tooltip
                        id={'question__image--load-tooltip'}
                        variant={"error"}
                    />
                    <Tooltip
                        id={'question__save--icon-tooltip'}
                        variant={"light"}
                    />
                </>
            )}

            <Divider />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 20px 10px 20px;
    cursor: pointer;
    
    @media (max-width: 600px) {
        padding: 16px 7px 10px 7px;
    }
`;

const SpanStyles = css`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    font-weight: 400;
    color: ${colors.white80};
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
`;

const UserInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    
    & > img {
        height: 25px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
    }
    
    & > span {
        ${SpanStyles};
    }
`;

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
`;

const QuestionContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const QuestionInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 7px;
`;

const QuestionDetails = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    letter-spacing: 1px;
    font-family: "Poppins", sans-serif;
    
    & > h2 {
        font-size: clamp(1.25rem, 1.2985rem + -0.2985vw, 1rem);
        font-weight: 600;
        hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        -webkit-hyphens: auto;
        overflow: hidden;
        word-wrap: break-word;
    }
`;

const DetailsText = styled.p`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    font-weight: 400;
    color: ${colors.white80};
    white-space: pre-line;
    line-height: 18px;
    overflow: hidden;
`;

const Image = styled.div`
    width: 29%;
    height: auto;
    
    & > img {
        width: 100%;
        object-fit: contain;
        max-height: 250px;
    }
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
    flex-wrap: wrap;
    
    & > button {
        width: fit-content;
        padding: 2px 7px;
        display: flex;
        align-items: center;
        background: ${colors.accent100};
        cursor: pointer;
        border-radius: 20px;
        font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
        letter-spacing: 1px;
        font-family: "Poppins", sans-serif;
    }
`;

const Information = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    & > span {
        ${SpanStyles};
    }
`;

const ReadMoreLink = styled.span`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    letter-spacing: 1px;
    font-family: "Poppins", sans-serif;
    text-decoration: none;
    width: fit-content;
    background: transparent;
    color: #007bff;
    cursor: pointer;
    margin-top: 0;
`;

const Divider = styled.div`
    width: 70%;
    align-self: center;
    height: 1px;
    background: ${colors.white10};
    margin-top: 10px;
`;

export default QuestionCard;