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

import styled, {css} from "styled-components";

const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    margin-top: 20px;
`;

const FieldStyle = css`
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
`;

const Label = styled.label`
    ${FieldStyle};
    color: rgba(245, 245, 245, 0.8);
`;

const InputStyle = css`
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    color: rgba(245, 245, 245, 0.8);
    border-radius: 4px;
    box-shadow: inset rgba(245, 245, 245, 0.1) 0 0 16px -6px;

    &:focus {
        color: rgba(245, 245, 245, 1);
    }
`;

const Input = styled.input`
    ${FieldStyle};
    ${InputStyle};
`;

const TextArea = styled.textarea`
    ${FieldStyle};
    ${InputStyle};
    resize: none;
`;

export {
    Field,
    Label,
    Input,
    TextArea
}