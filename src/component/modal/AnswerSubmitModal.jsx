/*
 * Copyright © 2023-2024 Rohit Parihar and Bloggios
 * All rights reserved.
 * This software is the property of Rohit Parihar and is protected by copyright law.
 * The software, including its source code, documentation, and associated files, may not be used, copied, modified, distributed, or sublicensed without the express written consent of Rohit Parihar.
 * For licensing and usage inquiries, please contact Rohit Parihar at rohitparih@gmail.com, or you can also contact support@bloggios.com.
 * This software is provided as-is, and no warranties or guarantees are made regarding its fitness for any particular purpose or compatibility with any specific technology.
 * For license information and terms of use, please refer to the accompanying LICENSE file or visit http://www.apache.org/licenses/LICENSE-2.0.
 * Unauthorized use of this software may result in legal action and liability for damages.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, {useEffect, useState} from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {addAnswer, addQuestion} from "../../restservices/QuestionApi";
import {dispatchError, dispatchSuccessMessage} from "../../service/functions";
import {QUESTION_PAGE} from "../../constant/pathConstants";
import FadeModal from "./FadeModal";
import {colors} from "../../styles/Theme";
import IconButton from "../buttons/IconButton";
import FallbackLoader from "../loaders/fallbackLoader";
import {IoCheckmarkOutline} from "react-icons/io5";
import {AiOutlineClose} from "react-icons/ai";
import {Tooltip} from "react-tooltip";
import styled from "styled-components";

const AnswerSubmitModal = ({
    isModelOpen,
    onClose,
    data
                           }) => {

    const {width} = useWindowDimensions();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        console.log(data);
    }, [data]);

    const addAnswerMutation = useMutation({
        mutationFn: (formData) => addAnswer(formData),
        onSuccess: async (response) => {
            dispatchSuccessMessage(dispatch, response.message);
            onClose();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        onError: (error) => {
            dispatchError(dispatch, error);
            onClose();
        }
    });

    const handleSubmit = () => {
        let isFormDataAdded = false;
        const formData = new FormData();
        if (data.images) {
            const images = data.images;
            for (let i=0 ; i<images.length ; i++) {
                let fileType = 'png';
                const blob = images[i];
                if (blob.type) {
                    const mimeType = blob.type;
                    fileType = mimeType.split('/')[1];
                }
                const fileName = `index_${i}.${fileType}`;
                const file = new File([images[i]], fileName, {type: fileType})
                formData.append('images', file);
            }
        }
        formData.append('questionId', data.questionId);
        if (data.detailsHtml) {
            formData.append('detailsHtml', data.detailsHtml);
        }
        if (data.detailsText) {
            formData.append('detailsText', data.detailsText);
        }
        isFormDataAdded = true;
        isFormDataAdded && addAnswerMutation.mutate(formData);
    }

    return (
        <FadeModal
            isOpen={isModelOpen}
            onClose={onClose}
            height={'fit-content'}
            width={'clamp(250px, 95%, 550px)'}
            bgColor={colors.black70}
            padding={'20px'}
            margin={'70px 0 0 0'}
            borderRadius={'20px'}
        >
            <Wrapper>
                <Title>
                    Almost there!
                </Title>

                <Tips>
                    <h6>Quick Tips:</h6>
                    <ul>
                        <li>Double-check your question</li>
                        <li>Is your question clear and concise?</li>
                        <li>Did you include all relevant details?</li>
                    </ul>
                </Tips>

                <ButtonsWrapper>
                    <IconButton
                        onClick={handleSubmit}
                        fontSize={'clamp(1.5625rem, 1.3032rem + 1.5957vw, 2.5rem)'}
                        bgColor={'#018749'}
                        hBgColor={'#006400'}
                        aBgColor={'#006400'}
                        color={colors.white80}
                        hColor={colors.white100}
                        aColor={colors.white100}
                        tooltipId={'answer-model-submit-icon-button'}
                        tooltipContent={'Submit'}
                        tooltipDelay={500}
                    >
                        {addAnswerMutation.isPending
                            ? <FallbackLoader height={'40px'} width={'40px'} />
                            : <IoCheckmarkOutline />}
                    </IconButton>

                    <IconButton
                        onClick={onClose}
                        fontSize={'clamp(1.5625rem, 1.3032rem + 1.5957vw, 2.5rem)'}
                        bgColor={'#960018'}
                        hBgColor={'#800020'}
                        aBgColor={'#800020'}
                        color={colors.white80}
                        hColor={colors.white100}
                        aColor={colors.white100}
                        tooltipId={'answer-model-cancel-icon-button'}
                        tooltipContent={'Cancel'}
                        tooltipDelay={500}
                    >
                        <AiOutlineClose/>
                    </IconButton>
                </ButtonsWrapper>
            </Wrapper>

            {width > 600 && (
                <>
                    <Tooltip id={'answer-model-submit-icon-button'}/>
                    <Tooltip id={'answer-model-cancel-icon-button'}/>
                </>
            )}
        </FadeModal>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h4`
    font-size: clamp(1rem, 0.8444rem + 0.9574vw, 1.5625rem);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 600;
    background: -webkit-linear-gradient(224deg, #e7e9f3 0%, #b5d3d8 100%) 36% 55%/140% 151%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Tips = styled.div`

    display: flex;
    flex-direction: column;
    gap: 20px;

    & h6 {
        font-size: clamp(0.875rem, 0.7713rem + 0.6383vw, 1.25rem);
        font-family: 'Poppins', sans-serif;
        letter-spacing: 1px;
        font-weight: 400;
        color: ${colors.white80};
    }

    & ul {
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
        padding-left: 20px;
        margin-top: 7px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        color: ${colors.white70};
    }
`;

const ButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
`;

export default AnswerSubmitModal;