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

import React, {useEffect} from 'react';
import styled from "styled-components";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
    backdrop-filter: blur(${({isOpen}) => (isOpen ? '10px' : '0')});
    visibility: ${({isOpen}) => (isOpen ? 'visible' : 'hidden')};
    z-index: 20;
    will-change: opacity, visibility;
    transform: translateZ(0); /* Hardware acceleration */
    transition: all 0.3s ease-in-out;
`;

const ModalContent = styled.div`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        //transform: ${({isOpen}) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')} translateZ(0); /* Hardware acceleration */
    transform: translateZ(0);
    will-change: transform;
    transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
`;

const FadeModal = ({
                       isOpen,
                       onClose,
                       children,
                       height,
                       width,
                       margin,
                       padding,
                       borderRadius,
                       bgColor,
                       border,
                       ref,
                       gap
                   }) => {
    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        const handleBodyOverflow = () => {
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        };

        handleBodyOverflow();

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <ModalWrapper isOpen={isOpen} onClick={handleClose}>
            <ModalContent ref={ref} style={{
                height: height,
                width: width,
                margin: margin,
                padding: padding,
                borderRadius: borderRadius,
                backgroundColor: bgColor,
                border: border,
                display: 'flex',
                flexDirection: 'column',
                gap: gap
            }} isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalContent>
        </ModalWrapper>
    );
};

export default FadeModal;