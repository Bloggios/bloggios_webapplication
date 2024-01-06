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
import TextField from "../../../component/fields/textField";
import Typography from "../../../component/typography/typography";
import styled from "styled-components";

const NameStepper = ({data, setData, helperText, setHelperText}) => {

    const handleChange = (event) => {
        setData({
            ...data,
            name: event.target.value
        });
        setHelperText(prevHelperText => ({
            ...prevHelperText,
            name: '',
        }));
    }

    return (
        <>
            <TextField
                placeholder={'Name*'}
                fontSize={'16px'}
                padding={'10px 10px'}
                background={'rgba(255, 255, 255, 0.1)'}
                borderRadius={'7px'}
                helperTextAllowed={true}
                fontWeight={'400'}
                helperText={helperText.name}
                helperTextColor={'rgb(255,51,51)'}
                value={data.name || ''}
                onChange={(e) => handleChange(e, 'entryPoint')}
            />
            <TextSpan>
                Build your social presence authentically. Enter your name—it's the first step in creating connections and making your profile uniquely yours. Join us in sharing and connecting with others!
            </TextSpan>
        </>
    );
};

const TextSpan = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 300;
  text-align: justify;
  color: rgba(255, 255, 255, 0.6);
`;

export default NameStepper;