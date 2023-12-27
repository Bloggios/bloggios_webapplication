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

import React, {useCallback, useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {clearSnackbar} from "../../state/snackbarSlice";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MemoizedLoaderPage from "../../component/loaders/loaderPage";
import MemoizedCustomNavbar from "../../component/navbars/customNavbar";

const BloggiosBase = ({ children }) => {

    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { isLoading } = useSelector((state) => state.loading);
    const { snackbarType, message, isSnackbar } = useSelector((state)=> state.snackbar);

    const handleSnackbar = useCallback(() => {
        if (isSnackbar) {
            const toastFunction = toast[snackbarType.toLowerCase()] || toast;
            toastFunction(message);
            dispatch(clearSnackbar());
        }
    }, [isSnackbar, snackbarType, message, dispatch]);

    useEffect(() => {
        handleSnackbar();
    }, [handleSnackbar]);

    return (
        <AppContainer>
            <MemoizedCustomNavbar />
            {isLoading ? <MemoizedLoaderPage /> : <ChildrenComponent>{children}</ChildrenComponent>}
            <ToastContainer
                limit={2}
                position={'bottom-center'}
                newestOnTop={true}
                toastStyle={{
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    fontSize: width > 700 ? '14px' : '10px',
                    fontFamily: "'Inter', san-serif",
                    maxWidth: width > 700 ? '600px' : '90%',
                    width: 'auto'
                }}
            />
        </AppContainer>
    );
};

BloggiosBase.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BloggiosBase;

const ChildrenComponent = ({ children }) => <>{children}</>;

ChildrenComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

const AppContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
  min-width: 250px;
  height: auto;
  overflow-x: hidden;
  background-color: #121212;
  color: antiquewhite;
`;