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

const Wrapper = styled.div`
    width: clamp(220px, 90%, 440px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
`;

const Logo = styled.img`
    height: 65px;
    aspect-ratio: 1/1;
`;

const Header = styled.div`
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    & h2 {
        font-size: clamp(1rem, 0.7926rem + 1.2766vw, 1.75rem);
        color: #f9f9f9;
        font-weight: 600;
    }

    & p {
        font-size: clamp(0.625rem, 0.5213rem + 0.6383vw, 1rem);
        color: rgba(249, 249, 249, 0.8);
        font-weight: 300;
    }
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 14px;
`;

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

const Input = styled.input`
    ${FieldStyle};
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

const ForgetPassword = styled.span`
    ${FieldStyle};
    border: none;
    outline: none;
    background: none;
    color: rgba(24, 123, 240, 0.8);
    align-self: flex-end;
    margin-top: 2px;
    cursor: pointer;
    touch-action: manipulation !important;
    -ms-touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        color: rgba(24, 123, 240, 1);
    }

    &:active {
        color: rgba(24, 123, 240, 0.88);
    }
`;

const TermsSpan = styled.span`
    font-size: clamp(0.625rem, 0.5811rem + 0.2703vw, 0.75rem);
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
    letter-spacing: 1px;
    margin-top: 16px;
    color: rgba(245, 245, 245, 0.8);
    touch-action: manipulation !important;
    -ms-touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent;
    
    & strong {
        cursor: pointer;
        
        &:hover {
            color: rgba(245, 245, 245, 1);
        }
    }
`;

const Divider = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    font-size: 10px;
    font-weight: 200;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    padding: 0 10px;

    & div {
        height: 1px;
        width: 25%;
        background: rgba(255, 255, 255, 0.2);
        margin: 0 10px;
    }
`;

const AddAccount = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    font-size: 12px;
    font-weight: 200;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    cursor: pointer;
    touch-action: manipulation !important;
    -ms-touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent;

    & span {
        color: rgba(24, 123, 240, 0.8);
        text-decoration: underline;
        text-decoration-style: solid;
        font-weight: 500;

        &:hover {
            color: rgba(24, 123, 240, 1);
        }

        &:active {
            color: rgba(24, 123, 240, 0.88);
        }
    }
`;

export {
    Wrapper,
    Logo,
    Header,
    Form,
    Field,
    Label,
    Input,
    ForgetPassword,
    TermsSpan,
    Divider,
    AddAccount
}