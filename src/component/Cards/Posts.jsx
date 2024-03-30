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

import React, {lazy, Suspense, useCallback, useEffect, useRef, useState} from 'react';
import Avatar from "../avatars/avatar";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import styled from "styled-components";
import Typography from "../typography/typography";
import {SlOptionsVertical} from "react-icons/sl";
import {CgProfile} from "react-icons/cg";
import {MdOutlineReport} from "react-icons/md";
import ImagesSwiper from "../Swiper/ImagesSwiper";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {FaHeart, FaRegCommentDots, FaRegHeart} from "react-icons/fa";
import {IoShareSocialOutline} from "react-icons/io5";
import {getUserProfile} from "../../restservices/profileApi";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RiDeleteBin5Line} from "react-icons/ri";
import {getLikeCommentCount} from "../../restservices/postApi";
import {useMutation, useQuery} from '@tanstack/react-query';
import {getFormattedDate} from "../../service/DateFunctions";
import {handlePostDelete} from "../../service/postApiFunctions";
import SingleColorLoader from "../loaders/SingleColorLoader";
import {addPostLike, removePostLike} from "../../restservices/likeApi";
import {dispatchError} from "../../service/functions";
import FallbackLoader from "../loaders/fallbackLoader";
import {colors} from "../../styles/Theme";

const CommentModel = lazy(() => import("../modal/CommentModel"));

const Posts = React.forwardRef(({
    userId,
    location,
    imagesList,
    postBody,
    date,
    postId
}, ref) => {

    const [isShown, setIsShown] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { width } = useWindowDimensions();
    const id = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const fetchPostUser = async () => {
        const response = await getUserProfile(userId);
        return response.data;
    }

    const addLikeMutation = useMutation({
        mutationFn: () => addPostLike(postId),
        onSuccess: async () => {
            await refetchLikeComment();
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    })

    const removeLikeMutation = useMutation({
        mutationFn: () => removePostLike(postId),
        onSuccess: async () => {
            await refetchLikeComment();
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    const handleLike = () => {
        if (likeCommentCount.isLike) {
            removeLikeMutation.mutate();
        } else {
            addLikeMutation.mutate();
        }
    }

    const getLikeCommentCountResponse = async () => {
        return await getLikeCommentCount(postId);
    }

    const {
        isLoading,
        error,
        data: userData,
        isSuccess,
        isError
    } = useQuery({
        queryKey: ['userProfilePost', userId],
        queryFn: fetchPostUser,
        staleTime: 70000
    })

    const {
        isLoading: lcIsLoading,
        error: lcError,
        isSuccess: lcIsSuccess,
        data: likeCommentCount,
        isError: lcIsError,
        refetch: refetchLikeComment
    } = useQuery({
        queryKey: ['lcCount', postId],
        queryFn: getLikeCommentCountResponse,
        staleTime: 70000,
        retry: 2
    })

    const getPostEntries = useCallback(() => {
        if (lcIsLoading) {
            return <SingleColorLoader height={'2px'} width={'2px'} size={'2px'} />
        } else if (lcIsSuccess && likeCommentCount) {
            return `${likeCommentCount.like} Likes ● ${likeCommentCount.comment} Comments`
        } else if (lcError || lcIsError) {
            return 'Error Occurred'
        } else {
            return 'Error Occurred'
        }
    }, [lcIsError, lcIsLoading, lcIsSuccess, lcError, likeCommentCount])

    const getReadMoreValue = () => {
        const split = postBody.split('\n');
        if (postBody.length > 250 || split.length > 3) {
            return true;
        }
        return false;
    }

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsShown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const getLikeIcon = useCallback(()=> {
        if (lcIsLoading || removeLikeMutation.isPending || addLikeMutation.isPending) {
            return <SingleColorLoader height={'2px'} width={'2px'} size={'2px'} />;
        } else if (lcIsSuccess && likeCommentCount) {
            if (likeCommentCount.isLike) {
                return <FaHeart color={'red'} />
            } else {
                return <FaRegHeart />
            }
        } else {
            return <FaRegHeart />
        }
    }, [lcIsLoading, removeLikeMutation.isPending, addLikeMutation.isPending, lcIsSuccess, likeCommentCount])

    const getPostFooter = useCallback(() => {
        if (lcIsLoading) {
            return <PostFooter>
                <LikeCommentShareWrapper style={{
                    height: '44px',
                    width: '100px'
                }}>
                    <SingleColorLoader height={'2px'} width={'2px'} size={'2px'} />
                </LikeCommentShareWrapper>
            </PostFooter>
        } else if (lcIsSuccess && likeCommentCount) {
            return (
                <PostFooter>
                    <LikeCommentShareWrapper>
                        <IconButton onClick={handleLike}>
                            {getLikeIcon()}
                        </IconButton>
                        <IconButton onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
                            <FaRegCommentDots />
                        </IconButton>
                        <IconButton>
                            <IoShareSocialOutline />
                        </IconButton>
                    </LikeCommentShareWrapper>
                </PostFooter>
            )
        } else if (lcError || lcIsError) {
            return (
                <PostFooter>
                    <LikeCommentShareWrapper>
                        <IconButton>
                            <FaRegHeart />
                        </IconButton>
                        <IconButton>
                            <FaRegCommentDots />
                        </IconButton>
                        <IconButton>
                            <IoShareSocialOutline />
                        </IconButton>
                    </LikeCommentShareWrapper>
                </PostFooter>
            )
        }
    }, [lcIsError, lcIsLoading, lcIsSuccess, lcError, likeCommentCount, isCommentBoxOpen, setIsCommentBoxOpen, getLikeIcon])

    const getNameContent = useCallback(() => {
        if (isLoading) {
            return (
                <>
                    <Avatar
                        size={width > 500 ? '50px' : '40px'}
                        position={'relative'}
                        image={bloggios_logo}
                    />
                    <ColumnWrapper>
                        <SingleColorLoader height={'2px'} width={'2px'} size={'2px'} margin={'0 10px'} />
                    </ColumnWrapper>
                </>
            )
        } else if (isSuccess && userData) {
            return (
                <>
                    <Avatar
                        size={width > 500 ? '50px' : '40px'}
                        position={'relative'}
                        image={userData.profileImageLink ? userData.profileImageLink : bloggios_logo}
                    />
                    <ColumnWrapper>
                        <NameSpan>
                            {userData.name}
                        </NameSpan>
                        <TimeSpan>
                            {getFormattedDate(date)}
                        </TimeSpan>
                    </ColumnWrapper>
                </>
            )
        } else if (isError || error) {
            return (
                <>
                    <Avatar
                        size={width > 500 ? '50px' : '40px'}
                        position={'relative'}
                        image={bloggios_logo}
                    />
                    <ColumnWrapper>
                        <NameSpan>
                            Error Occurred
                        </NameSpan>
                        <TimeSpan>
                            {getFormattedDate(date)}
                        </TimeSpan>
                    </ColumnWrapper>
                </>
            )
        }
    }, [userData, isLoading, isSuccess, width, date, isError, error])

    const postJsxBody = (
        <>
            <PostHeader>
                <LogoNameWrapper>
                    {getNameContent()}
                </LogoNameWrapper>

                <OptionsMenu ref={dropdownRef} onClick={() => setIsShown(!isShown)}>
                    <SlOptionsVertical />
                    <DropdownWrapper style={{
                        opacity: isShown ? 1 : 0,
                        visibility: isShown ? 'visible' : 'hidden',
                        transform: isShown ? 'translateX(0)' : 'translateX(100%)'
                    }}>
                        <DropDownItemWrapper onClick={() => navigate(`/profile/${userId}`)}>
                            <Typography text={'View Profile'} type={'custom'} size={'14px'} />
                            <CgProfile fontSize={'18px'} />
                        </DropDownItemWrapper>

                        <DropDownItemWrapper>
                            <Typography text={'Report Post'} type={'custom'} size={'14px'} />
                            <MdOutlineReport fontSize={'20px'} />
                        </DropDownItemWrapper>

                        {id === userId && (
                            <DropDownItemWrapper onClick={() => handlePostDelete(postId, dispatch)}>
                                <Typography text={'Delete'} type={'custom'} size={'14px'} />
                                <RiDeleteBin5Line fontSize={'18px'} color={'rgb(223,56,56)'} />
                            </DropDownItemWrapper>
                        )}
                    </DropdownWrapper>
                </OptionsMenu>
            </PostHeader>

            {postBody && (
                <PostBodyWrapper style={{
                    margin: imagesList ? '20px 0' : '20px 0 0 0'
                }}>
                    <TextContainer dangerouslySetInnerHTML={{
                        __html: postBody
                    }} style={{
                        height: isExpanded ? 'auto' : '65px'
                    }}>
                    </TextContainer>
                    {getReadMoreValue() && (
                        <ReadMoreButton onClick={toggleReadMore}>
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </ReadMoreButton>
                    )}
                </PostBodyWrapper>
            )}

            {imagesList && (
                <ImageSwiperWrapper style={{
                    marginTop: !postBody && '20px'
                }}>
                    <ImagesSwiper swiperItems={imagesList} />
                </ImageSwiperWrapper>
            )}

            <PostEntriesWrapper style={{
                marginTop: imagesList && '10px'
            }}>
                {getPostEntries()}
            </PostEntriesWrapper>

            {getPostFooter()}

            {isCommentBoxOpen && (
                <Suspense fallback={<FallbackLoader height={'200px'} width={'100%'} />}>
                    <CommentModel
                        name={userData.name}
                        postId={postId}
                        refetch={refetchLikeComment}
                        postUserId={userId}
                        isModalOpen={isCommentBoxOpen}
                        closeModal={() => setIsCommentBoxOpen(false)}
                    />
                </Suspense>
            )}
        </>
    );

    return ref
        ? <Wrapper ref={ref}>{postJsxBody}</Wrapper>
        : <Wrapper>{postJsxBody}</Wrapper>;
});

const Wrapper = styled.div`
    min-width: 100%;
    max-width: 200px; /* Set a maximum width to prevent it from growing indefinitely */
    margin: 0 auto; /* Center the form horizontally */
    height: auto;
    background-color: ${colors.black200};
    border-radius: 20px;
    padding: 20px;
    overflow: hidden; /* Hide any potential overflow */
    box-sizing: border-box; /* Include padding in the width calculation */
    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
        padding: 10px;
    }
`;

const PostHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    user-select: none;
`;

const LogoNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
`;

const NameSpan = styled.span`
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 500px) {
        font-size: 14px;
    }
`;

const TimeSpan = styled.span`
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 1px;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const OptionsMenu = styled.button`
    height: 34px;
    width: 34px;
    background-color: ${colors.black150};
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: background 150ms ease;

    &:hover, &:active {
        color: rgba(255, 255, 255, 0.8);
        background-color: ${colors.black150};
    }
`;

const DropdownWrapper = styled.div`
    position: absolute;
    height: auto;
    width: 160px;
    padding: 10px;
    background: rgba(28, 28, 28, 1);
    top: 105%;
    right: 10%;
    border-radius: 16px;
    transition: all 250ms ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    z-index: 2;
`;

const DropDownItemWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
    z-index: 2;
    transition: all 150ms ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const PostBodyWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 10px 10px 7px 10px;
`;

const ReadMoreButton = styled.button`
    border: none;
    background: linear-gradient(to right, rgba(39, 39, 39, 0.5), rgba(39, 39, 39, 0.8), rgba(39, 39, 39, 1));
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    align-self: flex-end;
    bottom: -14px;
`;

const TextContainer = styled.div`
    overflow: hidden;
    transition: all 500ms ease-in-out;
    text-align: justify;
    line-height: 22px;
    font-weight: 300;
    white-space: pre-line;

    @media (max-width: 500px) {
        font-size: 14px;
    }
`;

const ImageSwiperWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const PostFooter = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 500px) {
        margin-top: 14px;
        padding: 5px;
    }
`;

const LikeCommentShareWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 20px;

    @media (max-width: 450px) {
        gap: 5px;
    }
`;

const IconButton = styled.button`
    height: 44px;
    width: 44px;
    border-radius: 50%;
    flex-shrink: 0;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    transition: all 150ms ease;

    &:hover {
        color: rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.1);
    }

    &:active {
        color: rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.07);
    }

    @media (max-width: 400px) {
        height: 34px;
        width: 34px;
        font-size: 18px;
    }
`;

const TimingWrapper = styled.div`
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    font-weight: 200;
`;

const PostEntriesWrapper = styled.span`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
    letter-spacing: 1px;
    margin-left: 10px;
    display: flex;
`;

const Footer = styled.div`

`;

export default Posts;