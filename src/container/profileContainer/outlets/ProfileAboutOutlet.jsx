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
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {FaUserEdit} from "react-icons/fa";
import {MdModeEdit} from "react-icons/md";
import {Tooltip} from "react-tooltip";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import FetchLoaderButton from "../../../component/buttons/FetchLoaderButton";

const ProfileAboutOutlet = () => {

    const {id} = useParams();
    const {width} = useWindowDimensions();
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        console.log(isEditMode)
    }, [isEditMode])

    const handleUpdate = () => {
        setIsEditMode(false);
    }

    return (
        <Wrapper>
            {/*

        Personal Details
        Name, Email, Gender, DOB

        Other Details
        Bio, Link, Tag,

           */}
            {/* Personal Details */}
            <DetailsWrapper>
                <RowWrapper>
                    <TitleWrapper>
                        Personal Details
                    </TitleWrapper>

                    <IconButton
                        onClick={()=> setIsEditMode(!isEditMode)}
                        data-tooltip-id="edit-button"
                        data-tooltip-content="Edit"
                        data-tooltip-variant="light"
                        data-tooltip-delay-show={500}
                        style={{
                            visibility: isEditMode ? 'hidden' : 'visible'
                        }}
                    >
                        <MdModeEdit fontSize={'22px'}/>
                    </IconButton>
                </RowWrapper>

                <Items>
                    <Item>Rohit</Item>
                    <Item>Rohit</Item>
                    <Item>Rohit</Item>
                    <Item>Rohit</Item>
                </Items>

                {isEditMode && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <FetchLoaderButton
                            isLoading={false}
                            text={'Update'}
                            onClick={handleUpdate}
                            loaderSize={'2px'}
                            loaderDotsSize={'2px'}
                            bgColor={'#4258ff'}
                            hBgColor={'rgba(66, 88, 255, 0.9)'}
                            aBgColor={'#4258ff'}
                            color={'rgba(255, 255, 255, 0.8)'}
                            hColor={'rgba(255, 255, 255, 1)'}
                            borderRadius={'10px'}
                            padding={width > 500 ? '10px 20px' : '4px 10px'}
                            style={{
                                width: 'fit-content',
                                border: 'none',
                                outline: 'none',
                                fontSize: width > 500 ? '14px' : '10px',
                                float: 'right'
                            }}
                        />
                    </div>
                )}
            </DetailsWrapper>

            {/* Other Details */}
            <DetailsWrapper>
                <TitleWrapper>
                    Other Details
                </TitleWrapper>
            </DetailsWrapper>

            {width > 600 && <Tooltip id="edit-button"/>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const DetailsWrapper = styled.div`
    width: 100%;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TitleWrapper = styled.h5`
    font-size: clamp(16px, 4vw, 22px);
    font-weight: 300;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: underline;
    text-decoration-thickness: 1px;
`;

const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    gap: 10px;
`;

const Item = styled.div`

`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const IconButton = styled.button`
    height: 40px;
    width: 40px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    outline: none;
    color: rgba(255, 255, 255, 0.8);

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.07);
        color: rgba(255, 255, 255, 1);
    }
`;

export default ProfileAboutOutlet;