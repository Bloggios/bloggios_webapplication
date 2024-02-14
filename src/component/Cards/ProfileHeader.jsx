import React from 'react'
import styled from 'styled-components'
import header_image from '../../asset/svg/home-header_bg.svg'
import { useSelector } from 'react-redux'

const ProfileHeader = () => {

    const {profileImage, coverImage} = useSelector((state)=> state.profile);

    return (
        <Wrapper>
            <CoverImage>
                <CoverImageTag src={coverImage ? coverImage : header_image} alt="Bloggios" />
            </CoverImage>

            <UserDetails>

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
`;

const CoverImage = styled.div`
    width: 100%;
    height: 280px;
`;

const CoverImageTag = styled.img`
    width: 100%;
    height: 280px;
    object-fit: cover;
    object-position: center center;
`;

const UserDetails = styled.div`
    width: 100%;
    height: 250px;
    background: #0c0c0c;
    display: flex;
`;

export default ProfileHeader