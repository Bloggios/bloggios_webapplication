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
import {colors} from "../../../styles/Theme";
import Avatar from "../../../component/avatars/avatar";
import {bgBlackRounded, notFound} from "../../../asset/svg";
import {ColumnWrapper} from "../../../styles/StyledComponent";
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import '../../../styles/PostSwiperStyles.css';
import Divider from "../../../component/divider/divider";
import {FaHeart, FaRegCommentDots, FaRegHeart} from "react-icons/fa";
import {useMutation, useQuery} from "@tanstack/react-query";
import {addPostLike, removePostLike} from "../../../restservices/likeApi";
import {
    dispatchError,
    dispatchErrorMessage,
    dispatchSuccessMessage,
    dispatchWarningMessage
} from "../../../service/functions";
import {getLikeCommentCount} from "../../../restservices/postApi";
import {useDispatch} from "react-redux";
import LoaderIconButton from "../../../component/buttons/LoaderIconButton";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {countLines, countWords} from "../../../util/StringUtil";
import {setIsCreated} from "../../../state/isCreatedSlice";
import {addPostComment} from "../../../restservices/commentApi";
import {POST_DETAILS_COMMENT_LIST_SECTION} from "../../../constant/ElementIdConstants";
import {scrollIntoView} from "../../../service/handleElementIdScroll";
import CommentList from "../../../component/List/CommentList";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import IconButton from "../../../component/buttons/IconButton";
import useBackAvailable from "../../../hooks/useBackAvailable";
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {POST_PAGE} from "../../../constant/pathConstants";

const RenderImagesPostDetails = ({
                                     pdData,
                                     profileData
                                 }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {width} = useWindowDimensions();
    const [isApiCallBlocked, setIsApiCallBlocked] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [isCommentsList, setIsCommentsList] = useState(false);
    const isPreviousPageAvailable = useBackAvailable();

    useEffect(() => {
        let timeout;
        if (isApiCallBlocked) {
            timeout = setTimeout(() => {
                setIsApiCallBlocked(false);
            }, 500);
        }

        return () => clearTimeout(timeout); // Clean up the timeout on unmount or when loading changes
    }, [isApiCallBlocked]);

    useEffect(() => {
        if (isCommentsList) {
            scrollIntoView(POST_DETAILS_COMMENT_LIST_SECTION);
        }
    }, [isCommentsList]);

    const wrapHashtagsWithAnchorTags = () => {
        const regex = /#[^\s#]+/g;
        const replacedText = pdData.body.replace(regex, (match) => `<a class="anchor__post-details-inner-html">${match}</a>`);
        return replacedText.replace(/\n/g, '<br/>');
    }

    const addLikeMutation = useMutation({
        mutationFn: () => addPostLike(pdData.postId),
        onSuccess: async () => {
            await refetchLikeComment();
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        },
    })

    const removeLikeMutation = useMutation({
        mutationFn: () => removePostLike(pdData.postId),
        onSuccess: async () => {
            await refetchLikeComment();
            setIsApiCallBlocked(true)
        },
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    const handleLike = (event) => {
        if (!isApiCallBlocked && likeCommentCount && !lcIsLoading && !lcIsError) {
            if (likeCommentCount.isLike) {
                removeLikeMutation.mutate();
            } else {
                addLikeMutation.mutate();
            }
        } else {
            dispatchWarningMessage(dispatch, 'Consecutive clicks is not allowed');
        }
    }

    const getLikeCommentCountResponse = async () => {
        return getLikeCommentCount(pdData.postId);
    }

    const {
        isLoading: lcIsLoading,
        error: lcError,
        isSuccess: lcIsSuccess,
        data: likeCommentCount,
        isError: lcIsError,
        refetch: refetchLikeComment,
        status
    } = useQuery({
        queryKey: ['lcCount', pdData.postId],
        queryFn: getLikeCommentCountResponse,
        staleTime: 70000,
        retry: 2
    })

    const validateComment = useCallback(() => {
        if (commentInput.length < 2 || commentInput.length === 0) {
            dispatchErrorMessage(dispatch, "Comment is not valid to be Posted")
            return false;
        } else if (commentInput.length > 250) {
            dispatchErrorMessage(dispatch, "Comment is too long");
            return false;
        } else if (countWords(commentInput) > 40) {
            dispatchErrorMessage(dispatch, "Comment cannot contains more than 40 Words");
            return false;
        } else if (countLines(commentInput) > 3) {
            dispatchErrorMessage(dispatch, "You cannot add more than 3 Lines in a Comment");
            return false;
        } else {
            return true;
        }
    }, [dispatch, commentInput])

    const handleCommentRefetch = () => {
        setIsCommentsList(false);
        setTimeout(() => {
            setIsCommentsList(true);
        }, 50)
    }

    const handleCommentPosted = () => {
        setCommentInput('');
        dispatchSuccessMessage(dispatch, "Comment Added");
        dispatch(setIsCreated({
            isFollowed: false,
            isPost: false,
            isComment: true
        }));
        handleCommentRefetch();
    }

    const addCommentMutation = useMutation({
        mutationFn: (payload) => addPostComment(payload),
        onSuccess: handleCommentPosted,
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    const handleComment = () => {
        if (validateComment()) {
            const payload = {
                comment: commentInput,
                postId: pdData.postId
            }
            addCommentMutation.mutate(payload);
        }
    }

    const getPostActions = () => {
        if (lcIsLoading) {
            return <FallbackLoader width={'10%'} height={'20px'} thickness={2}/>
        } else if (lcIsSuccess && !lcIsLoading && !lcIsError && status === 'success') {
            return (
                <>
                    <LoaderIconButton onClick={handleLike}>
                        {likeCommentCount.isLike ? <FaHeart color={'red'}/> : <FaRegHeart/>}
                    </LoaderIconButton>
                    <LoaderIconButton onClick={() => setIsCommentsList(!isCommentsList)}>
                        <FaRegCommentDots/>
                    </LoaderIconButton>
                </>
            )
        } else {
            return (
                <Caption>Error Occurred</Caption>
            )
        }
    }

    const LikeCommentCountDetails = useCallback(() => {
        if (lcIsLoading) {
            return <FallbackLoader width={'10%'} height={'10px'} thickness={2}/>
        } else if (lcIsSuccess && !lcIsLoading && !lcIsError && status === 'success' && likeCommentCount) {
            if (likeCommentCount.like !== 1 && likeCommentCount.comment !== 1) {
                return (
                    <>
                        <strong>
                            {likeCommentCount.like}
                        </strong>
                        &nbsp;Likes <strong>·</strong>&nbsp;
                        <strong>
                            {likeCommentCount.comment}
                        </strong>
                        &nbsp;Comments
                    </>
                )
            } else if (likeCommentCount.like === 1) {
                return (
                    <>
                        <strong>
                            {likeCommentCount.like}
                        </strong>
                        &nbsp;Like <strong>·</strong>&nbsp;
                        <strong>
                            {likeCommentCount.comment}
                        </strong>
                        &nbsp;Comments
                    </>
                )
            } else if (likeCommentCount.comment === 1) {
                return (
                    <>
                        <strong>
                            {likeCommentCount.like}
                        </strong>
                        &nbsp;Likes <strong>·</strong>&nbsp;
                        <strong>
                            {likeCommentCount.comment}
                        </strong>
                        &nbsp;Comment
                    </>
                )
            }
        } else {
            return (
                <Caption>Error Occurred</Caption>
            )
        }
    }, [lcIsLoading, lcIsSuccess, lcIsError, status, likeCommentCount]);

    const RenderUserInfoSection = () => {
        return (
            <UserInfoSection>
                <Avatar
                    size={'70px'}
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

                <IconButton
                    onClick={()=> isPreviousPageAvailable ? window.history.back() : navigate(POST_PAGE)}
                    style={{
                        position: 'absolute',
                        right: '10px'
                    }}
                >
                    <AiOutlineClose />
                </IconButton>
            </UserInfoSection>
        )
    }

    return (
        <Wrapper
            isImages={pdData.imagesLink && pdData.imagesLink.length > 0}
        >

            {width <= 600 && (
                <RenderUserInfoSection/>
            )}

            {pdData.imagesLink && pdData.imagesLink.length > 0 && (
                <ImagesSection>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        lazy={true}
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + '"></span>';
                            },
                        }}
                        modules={[Pagination]}
                        className='bloggios-post-swiper-main'
                    >
                        {pdData.imagesLink.map((image, index) => (
                            <SwiperSlide
                                key={index}
                            >
                                <Image src={image} alt="Bloggios"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ImagesSection>
            )}

            <DetailsSection
                isImages={!!(pdData.imagesLink && pdData.imagesLink.length > 0)}
            >
                {width > 600 && (
                    <>
                        <RenderUserInfoSection/>
                        <Divider width={'70%'} verticalSpacing={'2px'} color={colors.white20}/>
                    </>
                )}

                <PostDetails dangerouslySetInnerHTML={{__html: wrapHashtagsWithAnchorTags()}}/>

                <LikeCommentDetails>
                    <LikeCommentCountDetails/>
                </LikeCommentDetails>

                <PostActionsWrapper>
                    {getPostActions()}
                </PostActionsWrapper>

                <Divider width={'70%'} verticalSpacing={'2px'} color={colors.white20}/>

                <CommentField>
                    <TextArea
                        rows={2}
                        spellCheck={false}
                        maxLength={200}
                        value={commentInput}
                        onChange={(event) => setCommentInput(event.target.value)}
                        placeholder={`Share your thoughts on ${profileData ? profileData.name.split(' ')[0] + "'s" : 'this'} Post`}
                    />

                    <FetchLoaderButton
                        isLoading={addCommentMutation.isPending}
                        onClick={handleComment}
                        text={'Comment'}
                        loaderSize={'2px'}
                        loaderDotsSize={'2px'}
                        bgColor={'#4258ff'}
                        hBgColor={'rgba(66, 88, 255, 0.9)'}
                        aBgColor={'#4258ff'}
                        color={'rgba(255, 255, 255, 0.8)'}
                        hColor={'rgba(255, 255, 255, 1)'}
                        borderRadius={'4px'}
                        padding={'10px 0'}
                        style={{
                            width: '80px',
                            height: '28px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '12px',
                            fontFamily: "'Poppins', san-serif",
                            alignSelf: 'flex-end'
                        }}
                    />
                </CommentField>

                {isCommentsList && (
                    <PostCommentListSection id={POST_DETAILS_COMMENT_LIST_SECTION}>
                        <CommentList
                            postId={pdData.postId}
                            postUserId={pdData.userId}
                            refetch={handleCommentRefetch}
                        />
                    </PostCommentListSection>
                )}
            </DetailsSection>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: ${({isImages}) => (isImages ? '70vw' : '50vw')};
    height: ${({isImages}) => (isImages ? '80vh' : 'fit-content')};
    max-height: 80vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${colors.black500};
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
    user-select: none;
    overflow-y: auto;

    @media (max-width: 1600px) {
        width: 85vw;
    }

    @media (max-width: 1000px) {
        width: 95%;
    }

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const ImagesSection = styled.div`
    width: 60%;

    @media (max-width: 850px) {
        width: 50%;
    }

    @media (max-width: 600px) {
        width: 100%;
        height: 40%;
    }
`;

const DetailsSection = styled.div`
    width: ${({isImages}) => (isImages ? '40%' : '100%')};
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 850px) {
        width: 50%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
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

const PostDetails = styled.div`
    font-size: clamp(0.75rem, 0.7015rem + 0.2985vw, 1rem);
    color: ${colors.white80};
    user-select: text;
    font-family: inherit;
    hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
    word-wrap: break-word;

    &::selection {
        background: ${colors.accent100};
        color: ${colors.white100};
    }
`;

const LikeCommentDetails = styled.div`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    letter-spacing: 1px;
    font-family: inherit;
    color: ${colors.white60};
    align-self: flex-end;
    margin-top: 10px;
`;

const PostActionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

const CommentField = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: none;
    outline: none;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
    resize: none;

    &:focus {
        color: rgba(245, 245, 245, 1);
    }
`;

const PostCommentListSection = styled.div`

`;

export default RenderImagesPostDetails;