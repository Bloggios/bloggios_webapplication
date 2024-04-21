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
import * as Bg from '../Components/StyledComponent';
import styled from "styled-components";
import {colors} from "../../../styles/Theme";

const BadgeVerificationOutlet = () => {
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

                <Button>
                    Upload Identity Proof
                </Button>

                <Bg.Paragraph2>
                    Image Size should be less than 1MB
                    <br/>
                    Accepted Formats : jpg, jpeg, png, bmp
                </Bg.Paragraph2>
            </Bg.Field>
        </Bg.Wrapper>
    );
};

const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    border-radius: 10px;
    background-color: ${colors.accent80};
    color: ${colors.white80};
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    
    &:hover, &:active {
        background-color: ${colors.accent100};
        color: ${colors.white100};
    }
`;

export default BadgeVerificationOutlet;