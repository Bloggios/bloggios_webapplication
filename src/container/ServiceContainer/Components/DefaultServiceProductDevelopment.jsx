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

import React, {memo} from 'react';
import styled from "styled-components";
import {Card, CardButton, Cards, Heading4, Heading6, Paragraph1, Paragraph2} from "./DefaultServiceStyledComponents";
import ListConfiguration from '../../../asset/configurations/static/BloggiosTechServicesConfiguration.json';
import {FaArrowRightLong} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const DefaultServiceProductDevelopment = () => {

    const {productDevelopment} = ListConfiguration;
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Heading4>
                Product Development
            </Heading4>

            <Paragraph1>
                Experience seamless software development with <strong className={'gradient__light-yellow-green'}>Bloggios</strong>. Our expert team crafts custom web and mobile applications tailored to your needs. From concept to launch, we provide top-notch solutions, ensuring innovation and efficiency every step of the way. Whether you need web development, mobile apps, or ongoing support, we've got you covered. Elevate your business with our trusted expertise.
            </Paragraph1>

            <Cards>
                {productDevelopment.map((item, index)=> (
                    <Card key={index}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <Heading6 className={'gradient__dark-orange'} style={{
                                fontWeight: 600
                            }}>{item.title}</Heading6>
                            <Paragraph2 style={{
                                width: '100%'
                            }}>
                                {item.description}
                            </Paragraph2>
                        </div>

                        <CardButton onClick={()=> navigate(item.path)}>
                            Explore <FaArrowRightLong />
                        </CardButton>
                    </Card>
                ))}
            </Cards>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 6vw;
    
    @media (max-width: 700px) {
        padding: 20px 10px;
    }
    
    @media (max-width: 350px) {
        padding: 16px 6px;
    }
`;

export default memo(DefaultServiceProductDevelopment);