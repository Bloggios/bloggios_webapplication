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
import styled from "styled-components";
import HtmlContent from "../../../component/HtmlContent/HtmlContent";
import useComponentSize from "../../../hooks/useComponentSize";

const AnswerContent = ({
                           answer,
    questionUserId
                       }) => {

    const [modifiedHtmlData, setModifiedHtmlData] = useState('');
    const [wrapperRef, wrapperSize] = useComponentSize();

    useEffect(() => {
        if (answer && answer.detailsHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = answer.detailsHtml;
            const imgTags = tempDiv.getElementsByTagName('img');
            for (let i = 0; i < imgTags.length; i++) {
                imgTags[i].classList.add('html-data__img-tag');
            }
            setModifiedHtmlData(tempDiv.innerHTML);
            return () => {
                tempDiv.remove();
            };
        }
    }, [answer]);

    return (
        <Wrapper ref={wrapperRef}>
            <UserInfoSection>

            </UserInfoSection>
            <HtmlContent htmlData={modifiedHtmlData} wrapperSize={wrapperSize}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: "Poppins", sans-serif;
`;

export default AnswerContent;