import React, { Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import header_image from '../../asset/svg/home-header_bg.svg'
import Avatar from "../avatars/avatar";
import bloggios_logo from '../../asset/svg/bg-accent_rounded.svg'
import ImageUploadModal from "../modal/ImageUploadModal";
import { SlOptionsVertical } from "react-icons/sl";
import FallbackLoader from "../loaders/fallbackLoader";
import ProfileUpdateModal from "../modal/ProfileUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { checkFollowing, followUser, unfollowUser } from "../../restservices/followApi";
import LoaderButton from "../buttons/loaderButton";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import SingleColorLoader from "../loaders/SingleColorLoader";
import { setSnackbar } from '../../state/snackbarSlice';
import {setIsCreated} from '../../state/isCreatedSlice'

const ProfileHeader = ({
    name,
    email,
    bio,
    profileImage,
    coverImage,
    id
}) => {

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { userId } = useSelector((state) => state.auth);
    const [fetchFollowing, setFetchFollowing] = useState({
        isFollowing: false,
        isChecking: true
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        checkFollowing(id)
            .then((response)=> {
                setFetchFollowing({
                    isFollowing: response.data.isFollowing,
                    isChecking: false
                })
            }).catch((error)=> {
                setFetchFollowing({
                    isFollowing: false,
                    isChecking: false
                })
            })
    }, [id]);

    const handleFollowing = useCallback(
        (event) => {
            event.preventDefault();

            setFetchFollowing({
                isFollowing: !fetchFollowing.isFollowing,
                isChecking: true
            });

            const followAction = fetchFollowing.isFollowing ? unfollowUser : followUser;

            followAction(id)
                .then((response) => {
                    setFetchFollowing({
                        isFollowing: !fetchFollowing.isFollowing,
                        isChecking: false
                    });
                    const snackbarData = {
                        isSnackbar: true,
                        message: response.data?.message,
                        snackbarType: 'Success',
                    };
                    dispatch(setSnackbar(snackbarData));
                    const payload = {
                        isFollowed: true
                    }
                    dispatch(setIsCreated(payload));
                })
                .catch((error) => {
                    const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                });
        },
        [dispatch, fetchFollowing, id]
    );

    return (
        <>
            <Wrapper>
                <CoverImage>
                    <CoverImageTag src={coverImage ? coverImage : header_image} alt="Bloggios" />
                    <Avatar
                        position={'absolute'}
                        size={'140px'}
                        borderRadius={'50%'}
                        image={profileImage ? profileImage : bloggios_logo}
                        top={'100%'}
                        translate={'translate(20px, -50%)'}
                    />
                </CoverImage>

                <UserDetails>
                    {id === userId ? (
                        <EditProfileWrapper>
                            <AccentButton onClick={() => setIsEditMode(true)}>
                                Edit Profile
                            </AccentButton>

                            <FloatingButton onClick={openModal}>
                                <SlOptionsVertical />
                            </FloatingButton>
                        </EditProfileWrapper>
                    ) : (
                        <FollowWrapper>

                            <FetchLoaderButton
                                isLoading={fetchFollowing.isChecking}
                                text={fetchFollowing.isFollowing ? 'Unfollow' : 'Follow'}
                                onClick={handleFollowing}
                                loaderSize={'2px'}
                                loaderDotsSize={'2px'}
                                bgColor={'#4258ff'}
                                hBgColor={'rgba(66, 88, 255, 0.9)'}
                                aBgColor={'#4258ff'}
                                color={'rgba(255, 255, 255, 0.8)'}
                                hColor={'rgba(255, 255, 255, 1)'}
                                borderRadius={'10px'}
                                padding={'0 16px'}
                                style={{
                                    height: '28px',
                                    width: '80px',
                                    border: 'none',
                                    outline: 'none'
                                }}
                            />
                        </FollowWrapper>
                    )}

                    <ColumnWrapper>
                        <NameSpan>
                            {name ? name : 'Not Loaded'}
                        </NameSpan>

                        <EmailAnchor href={`mailto:${email}`}>
                            {email}
                        </EmailAnchor>

                        <BioSpan>
                            {bio}
                        </BioSpan>
                    </ColumnWrapper>
                </UserDetails>
            </Wrapper>

            <Suspense fallback={<FallbackLoader height={'100%'} width={'100%'} />}>
                <ImageUploadModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            </Suspense>

            <Suspense fallback={<FallbackLoader height={'100%'} width={'100%'} />}>
                <ProfileUpdateModal
                    isModelOpen={isEditMode}
                    onClose={() => setIsEditMode(false)}
                    name={name}
                />
            </Suspense>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
`;

const CoverImage = styled.div`
    width: 100%;
    height: 220px;
    position: relative;
`;

const CoverImageTag = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center center;
`;

const UserDetails = styled.div`
    width: 100%;
    height: auto;
    background: #0c0c0c;
    display: flex;
    flex-direction: column;
`;

const EditProfileWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
    align-items: center;
    padding: 0 20px;
    justify-content: flex-end;
    gap: 20px;
`;

const FloatingButton = styled.button`
    height: 30px;
    width: 30px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.8);
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 0, 0, 0.8);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const AccentButton = styled.button`
    height: 30px;
    padding: 0 10px;
    border-radius: 7px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background-color: #4258ff;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 150ms ease-in-out;

    &:hover {
        background-color: rgba(66, 88, 255, 0.9);
        color: rgba(255, 255, 255, 0.8);
    }

    &:active {
        background-color: #4258ff;
        color: rgba(255, 255, 255, 0.6);
    }
`;

const ColumnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 16px 25px;
`;

const NameSpan = styled.span`
    font-size: clamp(20px, 4vw, 30px);
    letter-spacing: 1px;
    font-weight: 600;
    color: #f5f5f5;
    font-family: 'Dosis', sans-serif;
`;

const EmailAnchor = styled.a`
    width: fit-content;
    font-size: clamp(12px, 2vw, 16px);
    letter-spacing: 1px;
    text-decoration: none;
    color: rgb(85, 116, 193);
    font-weight: 400;
    font-family: 'Dosis', sans-serif;
    cursor: pointer;
    transition: all 150ms ease-in-out;

    &:hover {
        color: rgb(47, 85, 176);
    }

    &:active {
        color: rgb(79, 113, 200);
    }
`;

const BioSpan = styled.span`
    font-size: clamp(12px, 2vw, 20px);
    letter-spacing: 1px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
    font-family: 'Dosis', sans-serif;
    white-space: pre-line;
    margin: 5px 0;
`;

const FollowWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
    align-items: center;
    padding: 0 20px;
    justify-content: flex-end;
    gap: 20px;
`;

export default ProfileHeader