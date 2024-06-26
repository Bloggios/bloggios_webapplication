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

import React, {useCallback} from 'react';
import styled from "styled-components";
import {useMutation, useQuery} from "@tanstack/react-query";
import {detailedProfile} from "../../restservices/profileApi";
import SingleColorLoader from "../loaders/SingleColorLoader";
import {getFormattedDate} from "../../service/DateFunctions";
import {useDispatch, useSelector} from "react-redux";
import {dispatchError, dispatchSuccessMessage} from "../../service/functions";
import {deleteComment} from "../../restservices/commentApi";
import {setIsCreated} from "../../state/isCreatedSlice";
import {RiDeleteBin5Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {FaRegHeart} from "react-icons/fa";
import {bgBlackRounded, notFound} from "../../asset/svg";
import {colors} from "../../styles/Theme";
import Avatar from "../avatars/avatar";
import {MdBlock} from "react-icons/md";

const Comments = React.forwardRef(({
                                       postId,
                                       comment,
                                       commentId,
                                       userId,
                                       dateCreated,
                                       dateUpdated,
                                       postUserId,
                                       refetch
                                   }, ref) => {

    const authId = useSelector((state)=> state.auth.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchPostUser = async () => {
        const response = await detailedProfile(userId);
        return response.data;
    }

    const {
        isLoading,
        error,
        data: userData,
        isSuccess,
        isError
    } = useQuery({
        queryKey: ['userProfile', userId],
        queryFn: fetchPostUser,
        staleTime: 70000
    })

    const handleOnSuccess = async () => {
        dispatchSuccessMessage(dispatch, "Comment Deleted");
        dispatch(setIsCreated({
            isFollowed: false,
            isPost: false,
            isComment: true
        }));
        await refetch();
    }

    const deleteCommentMutation = useMutation({
        mutationFn: () => deleteComment(commentId),
        onSuccess: handleOnSuccess,
        onError: (error) => {
            dispatchError(dispatch, error)
        }
    });

    const getDeleteButton = useCallback(()=> {
        if (authId === postUserId || authId === userId) {
            return (
                <ButtonIcon disabled={deleteCommentMutation.isPending} style={{color: 'rgb(188, 46, 46)'}} onClick={()=> deleteCommentMutation.mutate()}>
                    {deleteCommentMutation.isPending
                    ? <SingleColorLoader width={'2px'} height={'2px'} size={'2px'} />
                    : <RiDeleteBin5Line />}
                </ButtonIcon>
            )
        }
    }, [authId, postUserId, deleteCommentMutation, userId])

    const getUserInfo = useCallback(()=> {
        if (isLoading) {
            return (
                <RowWrapper>
                    <SingleColorLoader width={'2px'} height={'2px'} size={'2px'} />
                </RowWrapper>
            )
        } else if (isSuccess && userData) {
            return (
                <RowWrapper
                    title={`Visit ${userData ? userData.name + "'s" : ''} Profile`}
                    style={{
                    justifyContent: 'space-between'
                }}
                >
                    <RowWrapper onClick={()=> navigate(`/profile/${userId}`)}>
                        <Avatar
                            size={'55px'}
                            image={userData.profileImage ? userData.profileImage : bgBlackRounded}
                            fallbackImage={notFound}
                            borderRadius={'50%'}
                        />
                        <ColumnWrapper style={{
                            gap: 0
                        }}>
                            <NameSpan>
                                {userData.name}
                            </NameSpan>
                            <DateEditedSpan>
                                {dateUpdated
                                    ? `${getFormattedDate(dateCreated)} ● Edited`
                                    : getFormattedDate(dateCreated)}
                            </DateEditedSpan>
                        </ColumnWrapper>
                    </RowWrapper>
                    {getDeleteButton()}
                </RowWrapper>
            )
        }
    }, [isLoading, isSuccess, userData, dateUpdated, dateCreated, getDeleteButton, navigate, userId])

    const getCommentData = useCallback(()=> {
        return (
            <ColumnWrapper>
                <CommentSpan>
                    {comment}
                </CommentSpan>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px'
                }}>
                    <ButtonIcon title={'Like Comment'} style={{color: 'rgba(255, 255, 255, 0.6)', paddingTop: '2px', alignSelf: 'flex-start'}}>
                        <FaRegHeart />
                    </ButtonIcon>
                    <ButtonIcon title={'Report Comment'} style={{color: 'rgba(255, 255, 255, 0.6)', alignSelf: 'flex-start'}}>
                        <MdBlock />
                    </ButtonIcon>
                </div>
            </ColumnWrapper>
        )
    }, [])

    const commentJsxBody = (
        <>
            {getUserInfo()}
            {getCommentData()}
        </>
    )

    return ref
        ? <Wrapper ref={ref}>{commentJsxBody}</Wrapper>
        : <Wrapper>{commentJsxBody}</Wrapper>
})

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 7px 7px 10px 7px;
    font-family: "Poppins", sans-serif;
    border-bottom: 1px solid ${colors.white10};
`;

const NameSpan = styled.span`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    letter-spacing: 1px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    color: ${colors.white80};
    font-family: inherit;
`;

const DateEditedSpan = styled.span`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    letter-spacing: 1px;
    font-weight: 300;
    color: ${colors.white60};
    font-family: inherit;
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: row;
    width: 100%;
    cursor: pointer;
    
    &:hover {
        ${NameSpan} {
            color: rgba(255, 255, 255, 1);
        }

        ${DateEditedSpan} {
            color: rgba(255, 255, 255, 0.8);
        }
    }
`;

const ColumnWrapper = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    gap: 5px;
    justify-content: center;
    flex-direction: column;
`;

const ButtonIcon = styled.button`
    height: 34px;
    border: none;
    outline: none;
    background: transparent;
    aspect-ratio: 1/1;
    border-radius: 50%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    &:active {
        background: rgba(255, 255, 255, 0.07);
    }
`;

const CommentSpan = styled.span`
    font-size: clamp(0.75rem, 0.7257rem + 0.1493vw, 0.875rem);
    letter-spacing: 1px;
    flex: 1;
    font-family: inherit;
    color: ${colors.white80};
    hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
    word-wrap: break-word;
`;

export default Comments;