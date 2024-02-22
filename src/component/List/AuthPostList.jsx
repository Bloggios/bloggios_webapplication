import React, {Suspense, useCallback, useRef, useState} from 'react';
import useBloggiosPost from "../../hooks/useBloggiosPost";
import DataNotFound from "../NotFound/DataNotFound";
import Posts from "../Cards/Posts";
import FallbackLoader from "../loaders/fallbackLoader";
import styled from "styled-components";
import useBloggiosAuthPost from "../../hooks/useBloggiosAuthPost";

const AuthPostList = () => {
    const [pageNum, setPageNum] = useState(0);
    const {
        isLoading,
        isError,
        error,
        data,
        hasNextPage
    } = useBloggiosAuthPost(pageNum);
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
                {postData}
            </Suspense>
            {isLoading && <FallbackLoader width={'100%'} height={'100px'} />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 100%;
    max-width: 250px; /* Set a maximum width to prevent it from growing indefinitely */
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export default AuthPostList;