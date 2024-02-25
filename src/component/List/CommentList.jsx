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

import React, {lazy, Suspense, useCallback, useRef, useState} from 'react';
import DataNotFound from "../NotFound/DataNotFound";
import useBloggiosPostComments from "../../hooks/useBloggiosPostComments";
import FallbackLoader from "../loaders/fallbackLoader";

const Comments = lazy(()=> import("../Cards/Comments"));
const NoCommentFound = lazy(()=> import('../independent/NoCommentFound'));

const CommentList = ({postId, postUserId, refetch}) => {

    const [pageNum, setPageNum] = useState(0);
    const {
        isLoading,
        isError,
        error,
        data,
        hasNextPage
    } = useBloggiosPostComments(pageNum, postId);

    const intObserver = useRef();

    const lastCommentRef = useCallback(post => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                setPageNum(prevState => prevState + 1);
            }
        });

        if (post) intObserver.current.observe(post);
    }, [isLoading, hasNextPage]);

    if (isError) {
        return <DataNotFound/>
    }

    const commentData = data.map((comment, i) => {
        if (data.length === i + 1) {
            return (
                <Suspense fallback={<FallbackLoader width={'100%'} height={'60px'}/>}>
                    <Comments
                        ref={lastCommentRef}
                        key={comment.commentId}
                        commentId={comment.commentId}
                        userId={comment.userId}
                        comment={comment.comment}
                        postUserId={postUserId}
                        dateCreated={comment.dateCreated}
                        dateUpdated={comment.dateUpdated}
                        refetch={refetch}
                    />
                </Suspense>
            )
        }
        return (
            <Suspense fallback={<FallbackLoader width={'100%'} height={'60px'}/>}>
                <Comments
                    key={comment.commentId}
                    commentId={comment.commentId}
                    userId={comment.userId}
                    comment={comment.comment}
                    postUserId={postUserId}
                    dateCreated={comment.dateCreated}
                    dateUpdated={comment.dateUpdated}
                    refetch={refetch}
                />
            </Suspense>
        )
    })

    return (
        <>
            {commentData.length > 0 ? commentData : <NoCommentFound/>}
            {isLoading && <FallbackLoader width={'100%'} height={'70px'}/>}
        </>
    );
};

export default CommentList;