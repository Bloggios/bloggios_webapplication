import React, {Suspense, useCallback, useRef, useState} from 'react';
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
                {postData.length > 0 ? postData : <NotPresentSpan>
                    No Post(s) Present 🙅‍♂️
                </NotPresentSpan>}
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

const NotPresentSpan = styled.span`
    font-size: clamp(16px, 2vw, 20px);
    letter-spacing: 1px;
    font-weight: 400;
    color: #a1afff;
    text-align: center;
    margin-top: 10px;
`;

export default AuthPostList;