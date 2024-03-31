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

import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {RowSpaceBetweenWrapper} from "../../../styles/StyledComponent";
import IconButton from "../../../component/buttons/IconButton";
import {IoClose} from "react-icons/io5";
import {Tooltip} from "react-tooltip";
import {askQuestionDescription} from "../../../constant/listConstants";

const AskQuestionDescriptionSection = () => {

    const [isDescription, setIsDescription] = useState(true);

    const getHtml = useCallback(()=> {
        if (isDescription) {
            return (
                <Wrapper style={{display: isDescription ? 'flex' : 'none'}}>
                    <RowSpaceBetweenWrapper>
                        <Title>
                            Compose an engaging question
                        </Title>
                        <IconButton
                            tooltipId={'ask-question-description-tooltip-id'}
                            tooltipContent={'Close'}
                            fontSize={'22px'}
                            padding={'8px'}
                            onClick={()=> setIsDescription(false)}
                        >
                            <IoClose />
                        </IconButton>
                    </RowSpaceBetweenWrapper>

                    <DescriptionSpan>
                        Fantastic! It sounds like you're ready to create a compelling and detailed question on Bloggios. Let's structure it seamlessly for an engaging user experience.
                    </DescriptionSpan>

                    <OrderedList>
                        {askQuestionDescription.map((item) => (
                            <ListItem key={item.id} data-index={item.id}>
                                <h4>
                                    {item.title}
                                </h4>

                                <span>
                                {item.description}
                            </span>
                            </ListItem>
                        ))}
                    </OrderedList>
                </Wrapper>
            )
        } else {
            return (
                <LearnButton onClick={()=> setIsDescription(true)}>
                    Learn, How to create an engaging question?
                </LearnButton>
            )
        }
    }, [isDescription])

    return (
        <>
            {getHtml()}
            <Tooltip id={'ask-question-description-tooltip-id'} />
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(144, 157, 255, 0.78);
    border-radius: 16px;
    padding: 16px;
    gap: 10px;
    user-select: none;
`;

const Title = styled.h2`
    font-size: clamp(0.875rem, 0.7432rem + 0.8108vw, 1.25rem);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
`;

const DescriptionSpan = styled.span`
    font-size: clamp(0.625rem, 0.4932rem + 0.8108vw, 1rem);
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
    font-weight: 300;
`;

const OrderedList = styled.ol`
    list-style-type: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 20px;
    
    li {
        &:before {
            content: attr(data-index) ".) ";
            font-weight: bold;
            position: absolute;
        }
    }
`;

const ListItem = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    h4 {
        padding-left: 24px;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 1px;
    }
    
    span {
        letter-spacing: 1px;
        font-weight: 300;
    }
`;

const LearnButton = styled.button`
    width: fit-content;
    border: none;
    outline: none;
    font-size: clamp(0.75rem, 0.7061rem + 0.2703vw, 0.875rem);
    cursor: pointer;
    touch-action: manipulation;
    -ms-touch-action: manipulation;
    letter-spacing: 2px;
    background: transparent;
    color: #c1c8ff;
    padding: 0 10px;
    text-decoration: underline;

    &:hover {
        color: #b0b7ff;
    }

    &:active {
        color: #bbc1ff;
    }
`;

const MemoizedAskQuestionDescription = React.memo(AskQuestionDescriptionSection);

export default MemoizedAskQuestionDescription;