import React, {useCallback} from "react";
import useUserProfile from "../../../hooks/useUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../styles/Theme";
import { dispatchErrorMessage, dispatchWarningMessage } from "../../../service/functions";
import { uuidValidator } from "../../../util/ComponentValidators";
import { bgBlackRounded } from "../../../asset/svg";
import FallbackLoader from "../../loaders/fallbackLoader";

const MessagingUserDataCard = ({ id }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const {
    isLoading,
    error,
    profileData,
    isSuccess,
    isError,
    isPending,
    refetch,
  } = useUserProfile(id, true);

  const handleUserCardClick = (id) => {
    if (id === userId) {
        dispatchWarningMessage(dispatch, 'Self Messaging is not allowed');
    } else if (!id || !uuidValidator(id)) {
        dispatchErrorMessage(dispatch, 'User not exists for given data');
    } else {
        navigate(`${id}`);
    }
};

  const getCardContent = useCallback(()=> {
    if (isLoading) {
      return <FallbackLoader width={'100%'} height={'50px'} thickness={'2px'}/>
    } else if (isSuccess && profileData) {
      return (
          <>
            <img src={profileData.profileImage || bgBlackRounded} alt={profileData.name}/>
            <div>
              <h6>{profileData.name}</h6>
              <span>{profileData.email}</span>
            </div>
          </>
      )
    } else if (isError && !isSuccess) {
      return <span>Error Occurred</span>
    }
  }, [isSuccess, profileData, isError, isLoading])

  return (
      <UserCard
          onClick={() => handleUserCardClick(profileData && profileData.userId)}
      >
        {getCardContent()}
    </UserCard>
  );
};

const UserCard = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 7px;
    padding: 5px;
    border-radius: 7px;
    background: ${colors.black200};
    cursor: pointer;
    box-shadow: none;
    transition: all 150ms ease-in-out;

    & > img {
        height: 44px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        object-fit: cover;
    }

    & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: ${colors.white80};

        & > h6 {
            font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            letter-spacing: 1px;
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        & > span {
            font-size: clamp(0.625rem, 0.5904rem + 0.2128vw, 0.75rem);
            font-family: "Poppins", sans-serif;
            font-weight: 300;
            letter-spacing: 1px;
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &:hover,
    &:active {
    }
`;

export default MessagingUserDataCard;
