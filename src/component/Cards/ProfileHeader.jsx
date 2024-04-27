import React, {useCallback, useEffect, useState} from 'react'
import header_image from '../../asset/svg/home-header_bg.svg'
import {useDispatch, useSelector} from "react-redux";
import {checkFollowing, followUser, unfollowUser} from "../../restservices/followApi";
import {setSnackbar} from '../../state/snackbarSlice';
import {setIsCreated} from '../../state/isCreatedSlice'
import {MdOutlinePhotoCameraFront} from "react-icons/md";
import {CgClose} from "react-icons/cg";
import {handleImageChange} from "../../service/functions";
import Avatar from "../avatars/avatar";
import FetchLoaderButton from "../buttons/FetchLoaderButton";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {colors} from "../../styles/Theme";
import {BgLink} from "../../styles/StyledComponent";
import {IoIosLink} from "react-icons/io";
import * as Profile from '../../container/profileContainer/Components/StyledComponents';
import Divider from "../divider/divider";
import FollowFollowingModal from "../modal/FollowFollowingModal";
import {bgBlackRounded} from "../../asset/svg";
import useDynamicSeo from "../../globalseo/useDynamicSeo";

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

    useDynamicSeo({
        title: `${name} - ${bio ? bio : email} | View profile at Bloggios`,
        description: `View Profile of ${name} - ${profileTag} at Bloggios, Connect and engage with vibrant community of Bloggios`,
        keywords: `${name}, ${email}, ${bio ? bio : ''}, Bloggios Profile ${name}, ${name} Bloggios, Bloggios, Bloggios Tech, Bloggios WebApplication, Bloggios User Profile`,
        author: 'Rohit Parihar',
        ogType: `profile:${email}`,
        ogUrl: window.location.href,
        ogImage: profileImage,
        ogTitle: `${name} - ${bio ? bio : email} | View profile at Bloggios`,
        ogDescription: `View Profile of ${name} - ${profileTag} at Bloggios, Connect and engage with vibrant community of Bloggios`
    });

    const dispatch = useDispatch();
    const {width} = useWindowDimensions();
    const {userId} = useSelector((state) => state.auth);
    const [isCoverImage, setIsCoverImage] = useState(false);
    const [fetchFollowing, setFetchFollowing] = useState({
        isFollowing: false,
        isChecking: true
    });
    const [followFollowingModal, setFollowFollowingModal] = useState({
        isModel: false,
        type: null
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

    const handleModelClose = () => {
        setFollowFollowingModal({
            isModel: false,
            type: null
        });
    }

    const handleModalOpen = (type) => {
        setFollowFollowingModal({
            isModel: true,
            type: type
        })
    }

    return (
        <>
            <Profile.Wrapper>
                <Profile.CoverImage>
                    <Profile.CoverImageTag
                        src={coverImage ? coverImage : header_image}
                        style={{
                            filter: isCoverImage ? 'blur(4px)' : 'blur(0)'
                        }}
                        alt="Bloggios"
                    />
                    {id === userId && (
                        isCoverImage ? (
                            <Profile.ButtonGroupWrapper>
                                <Profile.EditImage>
                                    Edit Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-input"
                                        style={{display: 'none'}}
                                        onChange={(e) => handleImageUpload(e, 'cover')}
                                    />
                                </Profile.EditImage>

                                <Profile.RemoveImage>
                                    Remove Image
                                </Profile.RemoveImage>

                                <Profile.CancelButton onClick={() => setIsCoverImage(false)}>
                                    <CgClose/>
                                </Profile.CancelButton>
                            </Profile.ButtonGroupWrapper>
                        ) : (
                            <Profile.ChangeCoverImageButton onClick={() => setIsCoverImage(true)}>
                                <MdOutlinePhotoCameraFront fontSize={width > 400 ? '16px' : '12px'}/>
                                Edit Cover Image
                            </Profile.ChangeCoverImageButton>
                        )
                    )}

                    <Avatar
                        image={profileImage ? profileImage : bgBlackRounded}
                        alt={name}
                        size={width > 700 ? '140px' : width > 500 ? '120px' : '80px'}
                        position={'absolute'}
                        top={'100%'}
                        translate={width > 500 ? 'translate(20px, -50%)' : 'translate(6px, -45%)'}
                        borderRadius={'50%'}
                        border={width > 500 ? '4px solid #0c0c0c' : '2px solid #0c0c0c'}
                    />

                    {id === userId && (
                        <Profile.ProfileImageChangeButton>
                            <MdOutlinePhotoCameraFront/>
                            <input
                                type="file"
                                accept="image/*"
                                id="image-input"
                                style={{display: 'none'}}
                                onChange={(e) => handleImageUpload(e, 'profile')}
                            />
                        </Profile.ProfileImageChangeButton>
                    )}
                </Profile.CoverImage>

                <Profile.UserDetails>
                    <Profile.ColumnWrapper>
                        <Profile.NameSpan>
                            {name}
                        </Profile.NameSpan>
                        <Profile.ProfileTagSpan>
                            {profileTag}
                        </Profile.ProfileTagSpan>
                    </Profile.ColumnWrapper>

                    <Profile.BioFollowWrapper>
                        {bio && (
                            <Profile.BioWrapper>
                                {bio}
                            </Profile.BioWrapper>
                        )}

                        {link && (
                            <BgLink href={link} target="_blank" rel="noopener noreferrer">
                                <IoIosLink /> {` : ${name ? name.split(' ')[0] + "'s Link" : 'Link'}`}
                            </BgLink>
                        )}

                        <Divider width={'70%'} color={colors.white20} verticalSpacing={'4px'} />

                        <Profile.RowWrapper>
                            <Profile.FollowGroupWrapper>
                                <button onClick={()=> handleModalOpen('follower')}>
                                    <strong>{follower}</strong>
                                    <span>Followers</span>
                                </button>
                                <button onClick={()=> handleModalOpen('following')}>
                                    <strong>{following}</strong>
                                    <span>Following</span>
                                </button>
                            </Profile.FollowGroupWrapper>
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
                        </Profile.RowWrapper>
                    </Profile.BioFollowWrapper>
                </Profile.UserDetails>
            </Profile.Wrapper>

            {followFollowingModal.isModel && followFollowingModal.type && (
                <FollowFollowingModal
                    isModelOpen={followFollowingModal.isModel}
                    onClose={handleModelClose}
                    type={followFollowingModal.type ? followFollowingModal.type : 'follower'}
                />
            )}
        </>
    )
}

export default ProfileHeader