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
import FadeModal from "./FadeModal";
import styled from "styled-components";

const CommentModel = ({
    isModalOpen,
    closeModal
                      }) => {
    return (
        <FadeModal
            height={'fit-content'}
            width={'clamp(250px, 90%, 550px)'}
            padding={'20px'}
            borderRadius={'16px'}
            margin={'40px 0 0 0'}
            isOpen={isModalOpen}
            onClose={closeModal}
            bgColor={'#272727'}
        >
            <InputAreaWrapper>

            </InputAreaWrapper>
        </FadeModal>
    );
};

const InputAreaWrapper = styled.div`
    
`;

export default CommentModel;