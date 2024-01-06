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

const BioStepper = ({data, setData}) => {

    const [bioValue, setBioValue] = useState('');

    const handleChange = (event) => {
        const lines = event.target.value.split('\n');
        if (lines.length <=3) {
            setBioValue(event.target.value);
        } else {
            setBioValue(lines.slice(0, 3).join('\n'));
        }
    }

    useEffect(() => {
        setData({
            ...data,
            bio: bioValue
        })
    }, [bioValue]);

    return (
        <>
            <TextArea
                rows={2}
                value={bioValue}
                onChange={handleChange}
                maxLength={100}
                placeholder={'Enter your Bio'}
            />
            <NoteSpan>
                Crafting a bio is optional yet recommended for a comprehensive profile. Your bio is publicly visible, serving as an introduction to others. It adds depth to your profile, facilitating meaningful connections and professional engagements.
            </NoteSpan>
        </>
    );
};

const TextArea = styled.textarea`
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 7px;
  resize: none;
  padding: 10px 7px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  font-size: 16px;
  line-height: 25px;
  
  &:focus {
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
  
  &::placeholder {
    font-family: 'Inter', sans-serif;
    font-weight: 200;
  }
`;

const NoteSpan = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 300;
  text-align: justify;
  color: rgba(255, 255, 255, 0.6);
`;

export default BioStepper;