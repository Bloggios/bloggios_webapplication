import React, {useLayoutEffect, useState} from 'react';
import Avatar from "../../../component/avatars/avatar";
import {bgBlackRounded, notFound} from "../../../asset/svg";
import {ColumnWrapper} from "../../../styles/StyledComponent";
import * as Bg from "./StyledComponent";
import styled from "styled-components";
import {colors} from "../../../styles/Theme";
import {useDispatch, useSelector} from "react-redux";
import FallbackLoader from "../../../component/loaders/fallbackLoader";
import {handleImageChange} from "../../../service/functions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {TbEditCircle} from "react-icons/tb";

const ProfilePhotoContainer = () => {

    const {name, email, profileImage, coverImage, link, profileTag} = useSelector((state)=> state.profile);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const {width} = useWindowDimensions();

    useLayoutEffect(() => {
        if (name && name.length > 0) {
            setIsLoading(false);
        }
    }, [name]);

    if (isLoading) {
        return <FallbackLoader width={'100%'} height={'70px'} thickness={2} />
    }

    return (
        <ProfileContainer>
            <InfoWrapper>
                <Avatar
                    size={width > 500 ? '60px' : '44px'}
                    image={profileImage ? profileImage : bgBlackRounded}
                    fallbackImage={notFound}
                    borderRadius={'50%'}
                />

                <ColumnWrapper style={{gap: 1}}>
                    <Bg.Span>
                        {name}
                    </Bg.Span>

                    <Bg.Caption>
                        {email}
                    </Bg.Caption>
                </ColumnWrapper>
            </InfoWrapper>

            <Button title={'Change Profile Photo'}>
                {width > 500 ? 'Change Photo' : <TbEditCircle />}
                <input
                    type="file"
                    accept="image/*"
                    id="image-input"
                    style={{display: 'none'}}
                    onChange={(e) => handleImageChange(e, 'profile', dispatch)}
                />
            </Button>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 16px;
    background: ${colors.black100};
    margin-top: 25px;
`;

const InfoWrapper = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-shrink: 0;
    gap: 10px;
`;

const Button = styled.label`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 10px;
    border-radius: 10px;
    background-color: ${colors.accent80};
    color: ${colors.white80};
    font-size: clamp(0.875rem, 0.8333rem + 0.1667vw, 1rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    
    @media (max-width: 500px) {
        border-radius: 50%;
        flex-shrink: 0;
        padding: 6px;
        
        & > svg {
            font-size: 20px;
        }
    }
    
    &:hover, &:active {
        background-color: ${colors.accent100};
        color: ${colors.white100};
    }
`;

export default ProfilePhotoContainer;