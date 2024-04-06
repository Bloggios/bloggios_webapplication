import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import header_image from '../../asset/svg/home-header_bg.svg'
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
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {colors} from "../../styles/Theme";
import {BgLink} from "../../styles/StyledComponent";

const ProfileHeader = ({
                           name,
                           email,
                           bio,
                           profileImage,
                           coverImage,
                           id,
                           follower,
                           following,
                           profileTag,
                           isBadge,
                           profileBadges,
                           link
                       }) => {

    const dispatch = useDispatch();
    const {width} = useWindowDimensions();
    const {userId} = useSelector((state) => state.auth);
    const [isCoverImage, setIsCoverImage] = useState(false);
    const [fetchFollowing, setFetchFollowing] = useState({
        isFollowing: false,
        isChecking: true
    });

    useEffect(() => {
        checkFollowing(id)
            .then((response) => {
                setFetchFollowing({
                    isFollowing: response.data.isFollowing,
                    isChecking: false
                })
            }).catch((error) => {
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
                                <CgClose/>
                            </CancelButton>
                        </ButtonGroupWrapper>
                    ) : (
                        <ChangeCoverImageButton onClick={() => setIsCoverImage(true)}>
                            <MdOutlinePhotoCameraFront fontSize={width > 400 ? '16px' : '12px'}/>
                            Edit Cover Image
                        </ChangeCoverImageButton>
                    )
                )}

                <Avatar
                    image={profileImage ? profileImage : bloggios_logo}
                    alt={name}
                    size={width > 700 ? '140px' : width > 500 ? '120px' : '80px'}
                    position={'absolute'}
                    top={'100%'}
                    translate={width > 500 ? 'translate(20px, -50%)' : 'translate(6px, -45%)'}
                    borderRadius={'50%'}
                    border={width > 500 ? '4px solid #0c0c0c' : '2px solid #0c0c0c'}
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
                <ColumnWrapper>
                    <NameSpan>
                        {name}
                    </NameSpan>
                    <ProfileTagSpan>
                        {profileTag}
                    </ProfileTagSpan>
                </ColumnWrapper>

                <BioFollowWrapper>
                    {bio && (
                        <BioWrapper>
                            {bio}
                        </BioWrapper>
                    )}

                    {link && (
                        <BgLink>

                        </BgLink>
                    )}

                    {id !== userId && (
                        <FetchLoaderButton
                            isLoading={fetchFollowing.isChecking}
                            text={fetchFollowing.isFollowing ? 'Unfollow' : 'Follow'}
                            onClick={handleFollowing}
                            loaderSize={'2px'}
                            loaderDotsSize={'2px'}
                            bgColor={colors.accent100}
                            hBgColor={colors.accent80}
                            aBgColor={colors.accent100}
                            color={colors.white80}
                            hColor={colors.white100}
                            aColor={colors.white100}
                            borderRadius={'10px'}
                            padding={width > 500 ? '0 16px' : '0 8px'}
                            style={{
                                height: width > 500 ? '28px' : '24px',
                                width: width > 500 ? '80px' : '72px',
                                border: 'none',
                                outline: 'none',
                                fontSize: width > 500 ? '14px' : '12px',
                                alignSelf: 'flex-end',
                                fontFamily: 'inherit',
                                letterSpacing: 1,
                                fontWeight: 400
                            }}
                        />
                    )}
                </BioFollowWrapper>
            </UserDetails>
        </Wrapper>
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

    @media (max-width: 700px) {
        height: 180px;
    }

    @media (max-width: 500px) {
        height: 140px;
    }

    @media (max-width: 320px) {
        height: 120px;
    }
`;

const CoverImageTag = styled.img`
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center center;

    @media (max-width: 700px) {
        height: 180px;
    }

    @media (max-width: 500px) {
        height: 140px;
    }

    @media (max-width: 320px) {
        height: 120px;
    }
`;

const UserDetails = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0c0c0c;
`;

const ColumnWrapper = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 170px;

    @media (max-width: 700px) {
        padding: 0 20px 0 150px;
        height: 58px;
    }

    @media (max-width: 500px) {
        padding: 0 10px 0 95px;
        height: 40px;
    }
`;

const NameSpan = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 500px) {
        font-size: clamp(16px, 5vw, 20px);
    }

    @media (max-width: 350px) {
        font-size: clamp(16px, 5vw, 20px);
    }
`;

const ProfileTagSpan = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
    color: rgba(255, 255, 255, 0.6);
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 500px) {
        width: 140px;
    }

    @media (max-width: 350px) {
        width: 100px;
    }
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

    @media (max-width: 400px) {
        font-size: 10px;
        bottom: 95%;
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
    font-size: 14px;

    @media (max-width: 400px) {
        gap: 5px;
        font-size: 10px;
        bottom: 95%;
    }
`;

const EditImage = styled.label`
    border: none;
    outline: none;
    padding: 5px 10px;
    background-color: rgba(25, 188, 19, 0.8);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
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

    @media (max-width: 700px) {
        font-size: 16px;
        height: 28px;
        left: 105px;
        bottom: -55px;
    }

    @media (max-width: 500px) {
        font-size: 14px;
        height: 22px;
        left: 65px;
        bottom: -42px;
    }
`;

const BioFollowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 28px;
    letter-spacing: 1px;
    font-family: 'Poppins', sans-serif;
    
    @media (max-width: 500px) {
        padding: 10px 16px;
    }
`;

const BioWrapper = styled.div`
    width: 100%;
    display: flex;
    font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
    color: ${colors.white80};
    font-family: inherit;
    letter-spacing: inherit;
    word-wrap: normal;
    white-space: break-spaces;
`;

export default ProfileHeader