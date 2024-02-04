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

import React, {useEffect, useRef, useState} from 'react';
import FadeModal from "./FadeModal";
import styled from "styled-components";
import {IoIosSearch} from "react-icons/io";
import Typography from "../typography/typography";
import {bloggiosLinksList, bloggiosTechLinksList} from "../../constant/listConstants";
import {useNavigate} from "react-router-dom";

const WebSearchBar = ({
    isOpen,
    onClose
                      }) => {

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        const debounce = setTimeout(()=> {
            if (inputValue.length > 0) {
                fetchSearch(inputValue);
            }
        }, 500)

        return ()=> clearTimeout(debounce);
    }, [inputValue])

    const fetchSearch = (input) => {
        console.log(input);
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            inputRef.current.focus();
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleBloggiosPathClick = (path) => {
        navigate(path);
        onClose();
    }

    return (
        <>
            {isOpen && (
                <FadeModal
                    height={'fit-content'}
                    width={'clamp(250px, 95%, 550px)'}
                    borderRadius={'7px'}
                    margin={'70px 0 0 0'}
                    isOpen={isOpen}
                    onClose={onClose}
                    bgColor={'#272727'}
                    padding={'0 0 10px 0'}
                    border={'1px solid rgba(255, 255, 255, 0.1)'}
                >
                    <ModelHeader>
                        <IoIosSearch />
                        <SearchBar
                            autoFocus={true}
                            type={"text"}
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e)=> setInputValue(e.target.value)}
                        />
                    </ModelHeader>

                    <ModelContentWrapper>
                        {
                            inputValue.length > 0 ? (
                                <Typography text={'Not Results Found'} />
                            ) : (
                                <Wrapper>
                                    <BloggiosWrapper style={{
                                        paddingBottom: '16px',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                                    }} >
                                        <TextSpan style={{
                                            textAlign: 'center'
                                        }}>
                                            Bloggios
                                        </TextSpan>

                                        <BloggiosTechGrid>
                                            {bloggiosLinksList.map((item)=> (
                                                <BloggiosTechItems
                                                    key={item.label}
                                                    onClick={()=> handleBloggiosPathClick(item.path)}
                                                >
                                                    <div style={{
                                                        height: '25px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '22px',
                                                    }}>
                                                        {item.icon}
                                                    </div>

                                                    <ListTextSpan>
                                                        {item.label}
                                                    </ListTextSpan>
                                                </BloggiosTechItems>
                                            ))}
                                        </BloggiosTechGrid>
                                    </BloggiosWrapper>
                                    <BloggiosWrapper>
                                        <TextSpan style={{
                                            textAlign: 'center'
                                        }}>
                                            Bloggios Tech
                                        </TextSpan>

                                        <BloggiosTechGrid>
                                            {bloggiosTechLinksList.map((item)=> (
                                                <BloggiosTechItems
                                                    key={item.label}
                                                    onClick={()=> window.open(item.path, '_blank')}
                                                >
                                                    <div style={{
                                                        height: '25px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '22px',
                                                    }}>
                                                        {item.icon}
                                                    </div>

                                                    <ListTextSpan>
                                                        {item.label}
                                                    </ListTextSpan>
                                                </BloggiosTechItems>
                                            ))}
                                        </BloggiosTechGrid>
                                    </BloggiosWrapper>
                                </Wrapper>
                            )
                        }
                    </ModelContentWrapper>
                </FadeModal>
            )}
        </>
    );
};

const ModelHeader = styled.div`
    height: 50px;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    padding: 0 10px;
    font-size: 22px;
    gap: 10px;
`;

const SearchBar = styled.input`
    flex: 1;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 1px;
    outline: none;
    border: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
`;

const ModelContentWrapper = styled.div`
    width: 100%;
    max-height: 550px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    flex-direction: column;
`;

const BloggiosWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const TextSpan = styled.span`
    font-size: clamp(10px, 2rem, 16px);
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    letter-spacing: 1px;
`;

const BloggiosTechGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(110px, 1fr));
    gap: 10px;
    margin-top: 16px;
    box-sizing: border-box;
    height: 100%;
`;

const BloggiosTechItems = styled.button`
    width: 100%;
    height: 100%;
    outline: 1px solid rgba(255, 255, 255, 0.1);
    border: none;
    background-color: rgba(16, 23, 32, 0.2);
    color: #f5f5f5;
    border-radius: 10px;
    padding: 7px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 50ms ease;

    &:hover {
        outline: 1px solid rgba(255, 255, 255, 0.4);
        background-color: rgba(16, 23, 32, 0.4);
        color: rgba(255, 255, 255, 0.8);
    }
`;

const ListTextSpan = styled.span`
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export default WebSearchBar;