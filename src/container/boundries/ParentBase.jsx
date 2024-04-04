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

import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useBloggiosSnackbar from "../../hooks/useBloggiosSnackbar";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import MemoizedLoaderPage from "../../component/loaders/loaderPage";
import useBloggiosStomp from "../../hooks/useBloggiosStomp";
import ErrorPage from "../catchPages/ErrorPage";
import {Toaster} from "sonner";
import ReportModal from "../../component/modal/ReportModal";
import PrivacyModal from "../../component/modal/PrivacyModal";
import {PRIVACY_TERMS_KEY_LOCAL_STORAGE} from "../../constant/ServiceConstants";
import {dispatchWarningMessage} from "../../service/functions";

const ParentBase = ({children}) => {

    const dispatch = useDispatch();
    const { width, height } = useWindowDimensions();
    const {isLoading} = useSelector(state=> state.loading);
    const {isError, errorMessage} = useSelector(state=> state.error);
    const [reportModal, setReportModal] = useState(false);
    const [information, setInformation] = useState({});
    const [privacyModal, setPrivacyModal] = useState(false);
    useBloggiosSnackbar();
    useBloggiosStomp();

    useEffect(()=> {
        if (!privacyModal) {
            let isAccepted = localStorage.getItem(PRIVACY_TERMS_KEY_LOCAL_STORAGE);
            if (!isAccepted || isAccepted === 'false') {
                setPrivacyModal(true);
            }
        }
    }, []);

    const handlePrivacyModalClose = () => {
        let isAccepted = localStorage.getItem(PRIVACY_TERMS_KEY_LOCAL_STORAGE);
        if (!isAccepted || isAccepted === 'false') {
            window.alert('To proceed, kindly acknowledge our Terms and Privacy Policy');
            dispatchWarningMessage(dispatch, 'To proceed, kindly acknowledge our Terms and Privacy Policy');
        } else {
            window.location.reload();
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'E') {
                if (!reportModal) {
                    setReportModal(true);
                }
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            setReportModal(false);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        const handleShake = (event) => {
            const { x, y, z } = event.accelerationIncludingGravity || event.acceleration;
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            const shakeThreshold = 61;
            if (acceleration > shakeThreshold) {
                if (!reportModal) {
                    if (privacyModal) {
                        setPrivacyModal(false);
                    }
                    setReportModal(true)
                }
            }
        };
        window.addEventListener('devicemotion', handleShake);
        return () => {
            window.removeEventListener('devicemotion', handleShake);
        };
    }, []);


    const handleReportModalClose = () => {
        setReportModal(false);
    };

    const getSystemInformation = () => {
        return {
            userAgent: navigator.userAgent,
            connectionStatus: navigator.onLine ? 'ONLINE' : 'OFFLINE',
            cookiesEnabled: navigator.cookieEnabled,
            appVersion: navigator.appVersion,
            path: window.location.pathname,
            dimensions: {
                width: window.screen.width,
                height: window.screen.height,
                windowWidth: width,
                windowHeight: height
            },
            position: {
                scrollY: window.scrollY,
                scrollX: window.scrollX
            }
        }
    }

    useEffect(() => {
        if (reportModal) {
            setInformation(getSystemInformation)
        }
    }, [reportModal]);

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
                        position={width > 600 ? "bottom-right" : "bottom-center"}
                        richColors={true}
                        closeButton={true}
                    />

                    {reportModal && (
                        <ReportModal
                            isModelOpen={reportModal}
                            onClose={handleReportModalClose}
                            data={information}
                        />
                    )}

                    {privacyModal && (
                        <PrivacyModal
                            isModelOpen={privacyModal}
                            onClose={handlePrivacyModalClose}
                        />
                    )}
                </AppContainer>
            )
        }
    }, [isLoading, children, width, isError, errorMessage, reportModal, information, privacyModal])

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
    color: antiquewhite;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 700px) {
        margin-bottom: 60px;
    }
`;

export default ParentBase;