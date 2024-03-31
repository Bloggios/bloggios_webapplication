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
import {FaLinkedin} from "react-icons/fa";
import styled from "styled-components";
import {colors} from "../../styles/Theme";
import ContactInformation from '../../asset/configurations/static/ContactInformation.json';
import {TbBrandGithubFilled} from "react-icons/tb";
import {GrInstagram} from "react-icons/gr";
import {BsThreads, BsTwitterX} from "react-icons/bs";

const SocialLinks = ({
                         direction = 'row',
                         align = 'center',
                         gap = '16px',
                         data = ContactInformation.data.links,
                         color,
                         hColor
                     }) => {

    const linksStyle = {
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        gap: gap
    }

    const getIcon = (type) => {
        if (type === 'linkedin') {
            return <FaLinkedin/>;
        } else if (type === 'github') {
            return <TbBrandGithubFilled/>
        } else if (type === 'instagram') {
            return <GrInstagram/>
        } else if (type === 'threads') {
            return <BsThreads/>
        } else if (type === 'twitter') {
            return <BsTwitterX/>
        } else {
            throw new Error('Type is invalid and cannot be used in SocialLinks Component');
        }
    }

    return (
        <div style={linksStyle}>
            {data.map((item, index) => (
                <Link
                    key={index}
                    bgColor={item.bgColor ? item.bgColor : colors.white10}
                    hBgColor={item.hBgColor ? item.hBgColor : colors.white10}
                    color={color}
                    hColor={hColor}
                    onClick={() => window.open(item.link, '_blank')}
                >
                    {getIcon(item.type)}
                </Link>
            ))}
        </div>
    );
};

const Link = styled.div`
    height: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid ${colors.white100};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.bgColor};
    z-index: 0;
    cursor: pointer;

    &::before {
        content: "";
        height: 40px;
        aspect-ratio: 1/1;
        z-index: -1;
        position: absolute;
        background-color: ${(props) => props.hBgColor};
        border-radius: 50%;
        transform: scale(0);
        transition: 0.3s ease-in-out;
    }

    &:hover::before {
        transform: scale(0.92);
    }
`;

export default SocialLinks;