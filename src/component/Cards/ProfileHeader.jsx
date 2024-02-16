import React, {Suspense, useState} from 'react'
import styled from 'styled-components'
import header_image from '../../asset/svg/home-header_bg.svg'
import Avatar from "../avatars/avatar";
import bloggios_logo from '../../asset/svg/bg-accent_rounded.svg'
import ImageUploadModal from "../modal/ImageUploadModal";
import {SlOptionsVertical} from "react-icons/sl";
import FallbackLoader from "../loaders/fallbackLoader";
import ProfileUpdateModal from "../modal/ProfileUpdateModal";
import {useSelector} from "react-redux";

const ProfileHeader = ({
    name,
    email,
    bio,
    profileImage,
    coverImage,
    id
                       }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const {userId} = useSelector((state)=> state.auth);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                    <RowWrapper>
                        {id === userId && (
                            <EditButton onClick={()=> setIsEditMode(true)}>
                                Edit Profile
                            </EditButton>
                        )}

                        <FloatingButton onClick={openModal}>
                            <SlOptionsVertical/>
                        </FloatingButton>
                    </RowWrapper>

                    <ColumnWrapper>
                        <NameSpan>
                            {name ? name : 'Not Loaded'}
                        </NameSpan>

                        <EmailSpan href={`mailto:${email}`}>
                            {email}
                        </EmailSpan>

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

            {id === userId && (
                <Suspense fallback={<FallbackLoader height={'100%'} width={'100%'} />}>
                    <ProfileUpdateModal
                        isModelOpen={isEditMode}
                        onClose={()=> setIsEditMode(false)}
                        name={name}
                    />
                </Suspense>
            )}
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

const RowWrapper = styled.div`
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

const EditButton = styled.button`
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

const EmailSpan = styled.a`
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

export default ProfileHeader