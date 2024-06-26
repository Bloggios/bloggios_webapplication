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

import React, {Suspense, useCallback, useRef, useState} from 'react';
import styled from "styled-components";
import FallbackLoader from "../loaders/fallbackLoader";
import useBloggiosPost from "../../hooks/useBloggiosPost";
import Posts from "../Cards/Posts";
import DataNotFound from "../NotFound/DataNotFound";

const PostList = () => {
    const [pageNum, setPageNum] = useState(0);
    const {
        isLoading,
        isError,
        error,
        data,
        hasNextPage
    } = useBloggiosPost(pageNum);
    const intObserver = useRef();

    const lastPostRef = useCallback(post => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                setPageNum(prevState => prevState + 1);
            }
        });

        if (post) intObserver.current.observe(post);
    }, [isLoading, hasNextPage])

    if (isError) {
        return <DataNotFound />
    }

    const postData = data.map((post, i)=> {
        if (data.length === i + 1) {
            return (
                <Posts
                    ref={lastPostRef}
                    key={post.postId}
                    postId={post.postId}
                    imagesList={post.imagesLink.length > 0 && post.imagesLink ? post.imagesLink : null}
                    postBody={post.body}
                    location={post.location}
                    userId={post.userId}
                    date={post.dateCreated}
                />
            )
        }
        return (
            <Posts
                key={post.postId}
                postId={post.postId}
                imagesList={post.imagesLink.length > 0 && post.imagesLink ? post.imagesLink : null}
                postBody={post.body}
                location={post.location}
                userId={post.userId}
                date={post.dateCreated}
            />
        )
    })

    return (
        <Wrapper>
            <Suspense fallback={<FallbackLoader width={'100%'} height={'280px'} />}>
                {postData.length > 0 ? postData : <NotPresentSpan>
                    No Post(s) Present 🙅‍♂️
                </NotPresentSpan>}
            </Suspense>
            {isLoading && <FallbackLoader width={'100%'} height={'100px'} />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 95%;
    max-width: 250px; /* Set a maximum width to prevent it from growing indefinitely */
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 25px;
`;

const NotPresentSpan = styled.span`
    font-size: clamp(16px, 2vw, 20px);
    letter-spacing: 1px;
    font-weight: 400;
    color: #a1afff;
    text-align: center;
    margin-top: 10px;
`;

export default PostList;

