import React, {Suspense, useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import header_image from '../../asset/svg/home-header_bg.svg'
import ImageUploadModal from "../modal/ImageUploadModal";
import FallbackLoader from "../loaders/fallbackLoader";
import ProfileUpdateModal from "../modal/ProfileUpdateModal";
import {useDispatch, useSelector} from "react-redux";
import {checkFollowing, followUser, unfollowUser} from "../../restservices/followApi";
import {setSnackbar} from '../../state/snackbarSlice';
import {setIsCreated} from '../../state/isCreatedSlice'
import {MdOutlinePhotoCameraFront} from "react-icons/md";
import {CgClose} from "react-icons/cg";
import {handleImageChange} from "../../service/functions";
import bloggios_logo from '../../asset/svg/bg_logo_rounded_black.svg'
import Avatar from "../avatars/avatar";
import FetchLoaderButton from "../buttons/FetchLoaderButton";

const ProfileHeader = ({
    name,
    email,
    bio,
    profileImage,
    coverImage,
    id,
    follower
}) => {

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { userId } = useSelector((state) => state.auth);
    const [isCoverImage, setIsCoverImage] = useState(false);
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

    const handleImageUpload = (e, type) => {
        const isCompleted = handleImageChange(e, type, dispatch);
        if (isCompleted) {
            setIsCoverImage(false);
        }
    }

    useEffect(()=> {
        console.log(coverImage)
    }, [coverImage])

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
                    setFetchFollowing({
                        isFollowing: false,
                        isChecking: false
                    });
                    const message = error?.response?.data?.message || 'Something went wrong. Please try again later';
                    const snackBarData = {
                        isSnackbar: true,
                        message: message,
                        snackbarType: 'Error',
                    };
                    dispatch(setSnackbar(snackBarData));
                });
        },
        [dispatch, id, fetchFollowing.isFollowing]
    );

    return (
        <>
            <Wrapper>
                <CoverImage>
                    <CoverImageTag
                        src={coverImage ? coverImage : header_image}
                        style={{
                            filter: isCoverImage ? 'blur(4px)' : 'blur(0)'
                        }}
                        alt="Bloggios"
                    />
                    {id === userId && (
                        isCoverImage ? (
                                <ButtonGroupWrapper>
                                    <EditImage>
                                        Edit Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image-input"
                                            style={{display: 'none'}}
                                            onChange={(e) => handleImageUpload(e, 'cover')}
                                        />
                                    </EditImage>

                                    <RemoveImage>
                                        Remove Image
                                    </RemoveImage>

                                    <CancelButton onClick={() => setIsCoverImage(false)}>
                                        <CgClose />
                                    </CancelButton>
                                </ButtonGroupWrapper>
                            ) : (
                                <ChangeCoverImageButton onClick={()=> setIsCoverImage(true)}>
                                    <MdOutlinePhotoCameraFront fontSize={'16px'} />
                                    Edit Cover Image
                                </ChangeCoverImageButton>
                            )
                    )}

                        <Avatar
                            image={profileImage ? profileImage : bloggios_logo}
                            alt={name}
                            size={'140px'}
                            position={'absolute'}
                            top={'100%'}
                            translate={'translate(20px, -50%)'}
                            borderRadius={'50%'}
                            border={'4px solid #0c0c0c'}
                        />

                    {id === userId && (
                        <ProfileImageChangeButton>
                            <MdOutlinePhotoCameraFront/>
                            <input
                                type="file"
                                accept="image/*"
                                id="image-input"
                                style={{display: 'none'}}
                                onChange={(e) => handleImageUpload(e, 'profile')}
                            />
                        </ProfileImageChangeButton>
                    )}
                </CoverImage>

                <UserDetails>
                    <PrimaryDetails>
                        <ColumnWrapper>
                            <NameSpan>
                                {name}
                            </NameSpan>
                            <FollowerSpan>
                                {follower} Followers
                            </FollowerSpan>
                        </ColumnWrapper>

                        {id !== userId && (
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
                        )}
                    </PrimaryDetails>
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
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PrimaryDetails = styled.div`
    width: 100%;
    height: 70px;
    background-color: #0c0c0c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 170px;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const NameSpan = styled.span`
    font-family: 'Dosis', sans-serif;
    font-size: clamp(20px, 2vw, 34px);
    font-weight: 600;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
`;

const FollowerSpan = styled.span`
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 1vw, 15px);
    color: rgba(255, 255, 255, 0.6);
`;

const ChangeCoverImageButton = styled.button`
    position: relative;
    bottom: 40px;
    float: right;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    color: rgba(0, 0, 0, 0.8);
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    border: none;
    outline: none;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
    
    &:hover {
        background-color: rgba(255, 255, 255, 1);
        color: rgba(0, 0, 0, 1);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.8);
        color: rgba(0, 0, 0, 0.9);
    }
`;

const ButtonGroupWrapper = styled.div`
    position: relative;
    bottom: 40px;
    float: right;
    right: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

const EditImage = styled.label`
    border: none;
    outline: none;
    padding: 5px 10px;
    background-color: rgba(25, 188, 19, 0.8);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: rgba(25, 188, 19, 1);
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(25, 188, 19, 0.9);
        color: rgba(255, 255, 255, 0.9);
    }
`;

const RemoveImage = styled.label`
    border: none;
    outline: none;
    padding: 5px 10px;
    background-color: rgb(208, 90, 46);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: rgba(213, 85, 37, 1);
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: rgba(213, 85, 37, 1);
        color: rgba(255, 255, 255, 0.9);
    }
`;

const CancelButton = styled.button`
    border: none;
    outline: none;
    height: 22px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileImageChangeButton = styled.label`
    position: absolute;
    height: 34px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: #4258ff;
    left: 120px;
    bottom: -65px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
    cursor: pointer;

    &:hover {
        background-color: #4659f3;
        color: rgba(255, 255, 255, 1);
    }

    &:active {
        background-color: #4f62f4;
        color: rgba(255, 255, 255, 0.9);
    }
`;

export default ProfileHeader