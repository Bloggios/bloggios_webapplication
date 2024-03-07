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
import {Toaster} from "react-hot-toast";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useBloggiosSnackbar from "../../hooks/useBloggiosSnackbar";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import MemoizedLoaderPage from "../../component/loaders/loaderPage";
import useBloggiosStomp from "../../hooks/useBloggiosStomp";
import ErrorPage from "../catchPages/ErrorPage";

const ParentBase = ({children}) => {

    const { width } = useWindowDimensions();
    const {isLoading} = useSelector(state=> state.loading);
    const {isError, errorMessage} = useSelector(state=> state.error);
    useBloggiosSnackbar();
    useBloggiosStomp();

    const getBaseContent = useCallback(()=> {
        if (isError && errorMessage) {
            return <ErrorPage />
        } else if (isLoading) {
            return (
                <AppContainer>
                    <MemoizedLoaderPage />
                </AppContainer>
            )
        } else {
            return (
                <AppContainer>
                    {children}
                    <Toaster
                        position={width > 600 ? "top-right" : "bottom-center"}
                        gutter={7}
                        toastOptions={{
                            duration: 4000,
                        }}
                        reverseOrder={true}
                        containerStyle={{
                            userSelect: 'none',
                        }}
                    />
                </AppContainer>
            )
        }
    }, [isLoading, children, width, isError, errorMessage])

    return getBaseContent();
};

const ChildrenComponent = ({children}) => <>{children}</>;

ChildrenComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

const AppContainer = styled.main`
    width: auto;
    height: auto;
    overflow-x: hidden;
    background-color: #121212 !important;
    color: antiquewhite;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export default ParentBase;