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

import React, {useCallback} from 'react';
import styled from "styled-components";
import MemoizedSidebar from "../../component/navbars/Sidebar";
import PropTypes from "prop-types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MemoizedSidebarCompressed from "../../component/navbars/SidebarCompressed";
import LoggedInMobileNavItems from "../../component/navbars/components/LoggedInMobileNavItems";
import MemoizedMobileNavTopItems from "../../component/navbars/components/MobileNavTopItems";

const BloggiosSidebarBase = ({children}) => {

    const {width} = useWindowDimensions();

    const getSidebar = useCallback(() => {
        if (width > 1400) {
            return <MemoizedSidebar/>
        } else if (width > 700) {
            return <MemoizedSidebarCompressed/>
        } else if (width <= 700) {
            return <MemoizedMobileNavTopItems/>
        }
    }, [width])

    return (
        <AppContainer>
            {getSidebar()}
            <ChildrenComponent>{children}</ChildrenComponent>
            {width <= 700 && <LoggedInMobileNavItems/>}
        </AppContainer>
    );
};

const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: #1e1e1e;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

BloggiosSidebarBase.propTypes = {
    children: PropTypes.node.isRequired
};

export default BloggiosSidebarBase;

const ChildrenComponent = ({children}) => <ChildrenContainer>{children}</ChildrenContainer>;

const ChildrenContainer = styled.main`
    width: 100%;
    margin-left: 300px;
    overflow-x: hidden;

    @media (max-width: 1400px) {
        margin-left: 80px;
    }

    @media (max-width: 700px) {
        margin-left: 0;
    }
`;

ChildrenComponent.propTypes = {
    children: PropTypes.node.isRequired,
};