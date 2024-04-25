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

import React, {useState} from 'react';
import * as Bg from '../Components/StyledComponent';
import styled from "styled-components";
import {colors} from "../../../styles/Theme";
import IconButton from "../../../component/buttons/IconButton";
import {RiDeleteBin5Line} from "react-icons/ri";
import useIsInputFocused from "../../../hooks/useIsInputFocused";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";
import {dispatchError, dispatchErrorMessage, dispatchSuccessMessage} from "../../../service/functions";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {badgeRequestApi} from "../../../restservices/profileApi";

const BadgeVerificationOutlet = () => {

    const [identityImage, setIdentityImage] = useState(null);
    const [linkRef, isLinkFocused] = useIsInputFocused();
    const [textAreaRef, isTextAreaFocused] = useIsInputFocused();
    const [verificationData, setVerificationData] = useState({});
    const dispatch = useDispatch();
    const {width} = useWindowDimensions();

    const handleIdentityImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const payload =  {
                name: file.name,
                file,
            };
            setIdentityImage(payload);
        }
    }

    const deleteImage = () => {
        setIdentityImage(null);
    }

    const handleChange = (event, property) => {
        setVerificationData(prevState => ({
            ...prevState, [property]: event.target.value
        }))
    }

    const getLink = (link) => {
        if (link?.startsWith('https://')) {
            link = link.slice(8);
        }
        return link;
    }

    const badgeRequestMutation = useMutation({
        mutationFn: (formData) => badgeRequestApi(formData),
        onSuccess: async (response) => {
            dispatchSuccessMessage(dispatch, response.message);
        },
        onError: (error) => {
            dispatchError(dispatch, error);
        }
    });

    const handleSubmit = () => {
        if (!verificationData?.link && !identityImage) {
            dispatchErrorMessage(dispatch, 'Upload Identity Proof Image or add link to it');
            return;
        }
        let isFormDataAdded = false;
        const formData = new FormData();
        identityImage && formData.append('image', identityImage.file);
        verificationData?.link && formData.append('link', verificationData.link);
        verificationData?.description && formData.append('text', verificationData?.description);
        isFormDataAdded = true;
        isFormDataAdded && badgeRequestMutation.mutate(formData);
    }

    return (
        <Bg.Wrapper>
            <Bg.Heading2>
                Badge Request
            </Bg.Heading2>

            <Bg.Paragraph>
                Verified accounts on Bloggios are distinguished by a <span className={'gradient__light-blue'}>Blue</span> or <span className={'gradient__dark-orange'}>Golden</span> Badge next to their name, serving as an assurance of authenticity by Bloggios for public figures, celebrities, brands, or entities associated with the platform.
            </Bg.Paragraph>

            <Bg.Paragraph2>
                To request a Badge on Bloggios, a minimal document is required along with one form of ID proof. You can upload an image or provide a link to an image for verification purposes. Additionally, a brief description is needed, including details such as your target audience, profession, or any relevant information about your presence on the platform.
                <br/>
                It's important to note that Bloggios maintains strict privacy policies and does not share any personal information with third parties. Users can also request access to all their data present on Bloggios for enhanced transparency and control over their information.
            </Bg.Paragraph2>

            <Bg.Field>
                <Bg.Label>
                    Upload any Identity Proof
                </Bg.Label>

                <Button disabled={verificationData.link && verificationData.link.length > 0}>
                    {verificationData.link && verificationData.link.length > 0
                    ? 'Link of Image added' : 'Upload Identity Proof'}

                    <input
                        disabled={verificationData.link && verificationData.link.length > 0}
                        type="file"
                        accept={"image/*"}
                        onChange={handleIdentityImageChange}
                        style={{display: 'none'}}
                    />
                </Button>

                <Bg.Paragraph2>
                    Image Size should be less than 1MB
                    <br/>
                    Accepted Formats : jpg, jpeg, png, bmp
                </Bg.Paragraph2>

                {identityImage && (
                    <ImageDetailsWrapper>
                        <span>{identityImage.name}</span>
                        <IconButton onClick={deleteImage}>
                            <RiDeleteBin5Line color={'rgb(223,56,56)'}/>
                        </IconButton>
                    </ImageDetailsWrapper>
                )}
            </Bg.Field>

            <Bg.Field>
                <Bg.Label>
                    Link of Identity
                </Bg.Label>

                <Bg.Paragraph2>
                    Either add Link of Identity Proof or Upload the Image
                </Bg.Paragraph2>

                <Bg.LinkInput
                    isFocused={isLinkFocused}
                >
                        <span>
                            https://
                        </span>
                    <input
                        ref={linkRef}
                        type={'text'}
                        placeholder={identityImage ? 'Image already Uploaded' : 'Enter Link here'}
                        readOnly={identityImage}
                        disabled={identityImage}
                        maxLength={200}
                        value={getLink(verificationData.link)}
                        onChange={(e) => handleChange(e, 'link')}
                    />
                </Bg.LinkInput>
            </Bg.Field>

            <Bg.Field>
                <Bg.Label>
                    Description
                </Bg.Label>

                <Bg.TextAreaContainer
                    isFocused={isTextAreaFocused}
                >
                    <Bg.TextArea
                        ref={textAreaRef}
                        rows={4}
                        spellCheck={false}
                        maxLength={1000}
                        placeholder={'Tell us more about yourself! \nThis will be helpful for Verification'}
                        value={verificationData.description}
                        onChange={(e)=> handleChange(e, 'description')}
                    />
                    <span>
                            {verificationData.description?.length || 0}/{1000}
                        </span>
                </Bg.TextAreaContainer>
            </Bg.Field>

            <FetchLoaderButton
                isLoading={false}
                text={'Submit'}
                onClick={handleSubmit}
                loaderSize={'2px'}
                loaderDotsSize={'2px'}
                disabled={false}
                dBgColor={colors.accent60}
                bgColor={colors.accent100}
                hBgColor={colors.accent80}
                aBgColor={colors.accent100}
                color={colors.white80}
                hColor={colors.white100}
                aColor={colors.white100}
                borderRadius={'10px'}
                padding={width > 500 ? '0 16px' : '0 8px'}
                style={{
                    height: width > 500 ? 40 : 34,
                    width: width > 500 ? 140 : 100,
                    border: 'none',
                    outline: 'none',
                    fontSize: width > 500 ? 16 : 14,
                    alignSelf: 'flex-end',
                    fontFamily: "'Poppins', san-serif",
                    letterSpacing: 1,
                    fontWeight: 400,
                    marginTop: 25,
                }}
            />
        </Bg.Wrapper>
    );
};

const Button = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    border-radius: 10px;
    background-color: ${({disabled}) => (disabled ? colors.accent60 : colors.accent80)};
    color: ${colors.white80};
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
    
    &:hover, &:active {
        background-color: ${colors.accent100};
        color: ${colors.white100};
    }
`;

const ImageDetailsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    
    & > span {
        font-size: clamp(0.75rem, 0.625rem + 0.4vw, 0.875rem);
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
        color: ${colors.white80};
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export default BadgeVerificationOutlet;