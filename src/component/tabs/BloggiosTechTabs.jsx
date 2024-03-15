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
import {BLOGGIOS_TECH_TABS} from "../../constant/ElementIdConstants";
import {bloggiosTechTabsConstants} from '../../constant/listConstants';

const BloggiosTechTabs = () => {

    useEffect(() => {
        const handleScroll = () => {
            const tabs = document.getElementById(BLOGGIOS_TECH_TABS);
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
      <Wrapper id={BLOGGIOS_TECH_TABS}>
          <TabContainer>
              {bloggiosTechTabsConstants.map((item)=> (
                  <TabButton key={item.id}>
                      {item.label}
                  </TabButton>
              ))}
          </TabContainer>
      </Wrapper>
  )
};

const Wrapper = styled.div`
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    position: sticky;
    padding: 10px;
    background: transparent;
    visibility: hidden;
    opacity: 0;
    transition: 500ms ease-in-out;

    @media (max-width: 400px) {
        padding: 0;
    }
`;

const TabContainer = styled.div`
    background: #4258ff;
    padding: 16px 20px;
    width: fit-content;
    margin: 0 auto;
    border-radius: 50px;
    display: flex;
    gap: 40px;

    @media (max-width: 600px) {
        padding: 10px;
        gap: 16px;
    }

    @media (max-width: 400px) {
        border-radius: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
    }
`;

const TabButton  = styled.button`
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: rgba(245, 245, 245, 0.85);
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    font-size: clamp(0.625rem, 0.4493rem + 1.0811vw, 1.125rem);
    font-weight: 300;
    position: relative;
    cursor: pointer;
    transition: color .2s ease-in-out;

    &::before {
        content: '';
        position: absolute;
        top: 100%;
        width: 100%;
        height: 2px;
        background-color: rgba(245, 245, 245, 0.9);
        transform: scale(0);
        border-radius: 20px;
        transition: all 300ms ease-in-out;
        
        @media (max-width: 400px) {
            display: none;
        }
    }

    &:hover {
        color: rgba(245, 245, 245, 0.9);
    }
    
    &:active {
        color: rgba(245, 245, 245, 1);
    }

    &:hover::before {
        transform: scale(1);
    }
`;

export default BloggiosTechTabs;
