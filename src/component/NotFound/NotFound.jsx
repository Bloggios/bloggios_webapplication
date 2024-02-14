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
import {FaLongArrowAltRight} from "react-icons/fa";
import {notFoundPageList} from "../../constant/listConstants";
import {useNavigate} from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    const handleClick = (path) => {
        if (path.startsWith('https://')) {
            window.open(path, '_blank');
        } else {
            navigate(path);
        }
    }

    return (
        <Wrapper>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <NotFoundSpan>
                    <strong>404</strong>
                    &nbsp;Not Found
                </NotFoundSpan>

                <TitleSpan>
                    Page Not Found
                </TitleSpan>

                <MessageSpan>
                    Sorry, the page you are looking for could not be found or has been removed
                </MessageSpan>
            </div>

            <ItemsWrapper>
                {notFoundPageList.map((item)=> (
                    <Item
                        key={item.id}
                        style={{
                            borderTop: item.id > 1 && '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <IconWrapper>
                            {item.icon}
                        </IconWrapper>

                        <ColumnWrapper>
                            <HeadSpan>
                                {item.label}
                            </HeadSpan>

                            <SubtitleSpan>
                                {item.text}
                            </SubtitleSpan>

                            <RedirectButton
                                onClick={()=> handleClick(item.clickAction)}
                            >
                                {item.button}
                                <FaLongArrowAltRight />
                            </RedirectButton>
                        </ColumnWrapper>
                    </Item>
                ))}
            </ItemsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: clamp(250px, 95%, 450px);
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const NotFoundSpan = styled.span`
    color: #8d9bff;
    font-size: clamp(12px, 1vw, 15px);
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 10px;
`;

const TitleSpan = styled.span`
    font-size: clamp(18px, 2.5vw, 34px);
    text-align: center;
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
`;

const MessageSpan = styled.span`
    font-size: clamp(12px, 1vw, 15px);
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
`;

const ItemsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
`;

const Item = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-top: 16px;
`;

const IconWrapper = styled.div`
    height: 50px;
    width: 50px;
    background: #4258ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
    flex-shrink: 0;
    
    @media (max-width: 400px) {
        height: 40px;
        width: 40px;
        font-size: 16px;
    }
`;

const ColumnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const HeadSpan = styled.span`
    font-size: clamp(12px, 1.5vw, 16px);
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
`;

const SubtitleSpan = styled.span`
    font-size: clamp(10px, 1vw, 14px);
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
`;

const RedirectButton = styled.button`
    width: fit-content;
    outline: none;
    border: none;
    background: transparent;
    color: #8d9bff;
    font-size: clamp(12px, 1.5vw, 14px);
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: gap 150ms ease-in-out;

    &:hover {
        gap: 7px;
    }

    &:active {
        color: rgba(141, 155, 255, 0.8);
    }
`;

export default NotFound;