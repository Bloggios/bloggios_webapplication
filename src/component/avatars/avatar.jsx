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

import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {bgBlackRounded} from "../../asset/svg";

const Avatar = ({
                    image,
                    position = 'relative',
                    top,
                    left,
                    right,
                    bottom,
                    size,
                    borderRadius = '20px',
                    border = '4px solid #1a1a1a',
                    translate,
                    fallbackImage = bgBlackRounded,
                    onClick
                }) => {

    const handleImageError = (event) => {
        event.target.src = fallbackImage
    }

    return (
        <ProfileImageWrapper
            onClick={onClick}
            style={{
                position,
                top,
                left,
                right,
                bottom,
                height: size,
                width: size,
                borderRadius,
                border,
                transform: translate,
                minWidth: size
            }}
        >
            <ProfileImage loading={"lazy"} src={image} onError={handleImageError}/>
        </ProfileImageWrapper>
    );
};

const ProfileImageWrapper = styled.div`
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    object-fit: cover;
    aspect-ratio: 1/1;
    height: 100%;
    width: 100%;
    transition: all 250ms ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.08);
    }
`;

Avatar.propTypes = {
    image: PropTypes.any.isRequired,
    position: PropTypes.oneOf(['absolute', 'relative']),
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    size: PropTypes.string.isRequired,
    borderRadius: PropTypes.string,
    border: PropTypes.string,
    translate: PropTypes.string,
};

export default Avatar;