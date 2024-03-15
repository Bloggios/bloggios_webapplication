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

import React, {useEffect} from "react";
import styled from "styled-components";

const BloggiosTechTabs = () => {

    useEffect(() => {
        const handleScroll = () => {
            const tabs = document.getElementById('bloggiosTechTabs');
            const boundingClientRect = tabs.getBoundingClientRect();
            if (boundingClientRect.top === 0) {
                tabs.style.visibility = 'visible';
                tabs.style.opacity = '1';
            } else {
                tabs.style.visibility = 'hidden';
                tabs.style.opacity = '0';
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
      <Wrapper id={'bloggiosTechTabs'}>
          Rohit
      </Wrapper>
  )
};

const Wrapper = styled.div`
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    position: sticky;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(99, 116, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.17);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    visibility: hidden;
    opacity: 0;
    transition: 500ms ease-in-out;
`;

export default BloggiosTechTabs;
