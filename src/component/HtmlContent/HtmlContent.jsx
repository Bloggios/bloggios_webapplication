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

import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../../styles/InnerHtmlStyles.css';
import {dispatchSuccessMessage} from "../../service/functions";
import {useDispatch} from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useReloadOnResize from "../../hooks/useReloadOnResize";
import FallbackLoader from "../loaders/fallbackLoader";

const HtmlContent = ({
                         htmlData,
                         wrapperSize
                     }) => {

    const dispatch = useDispatch();
    const {width} = useWindowDimensions();
    const [isChecking, setIsChecking] = useState(true);
    useReloadOnResize();

    const addCopyButton = () => {
        const preElements = document.getElementsByTagName('pre');
        for (let i = 0; i < preElements.length; i++) {
            const preElementInnerHtml = preElements[i].innerText;
            const headerDiv = document.createElement('div');
            headerDiv.innerHTML = `<div class="pre__header-inner-div"><span class="pre__header-span">Snippet</span><button class="pre__header-button">Copy</button></div><p class="pre__tag-text">${preElementInnerHtml}</p>`;
            headerDiv.className = 'pre__header-div';
            preElements[i].replaceWith(headerDiv);
            const copyChild = headerDiv.getElementsByClassName('pre__header-button')[0];
            copyChild.addEventListener('click', () => {
                navigator.clipboard.writeText(preElementInnerHtml)
                    .then(() => {
                        dispatchSuccessMessage(dispatch, 'Snippet copied successfully to clipboard')
                    }).catch(() => {
                    console.log('Error')
                })
            })
        }
    };

    useLayoutEffect(() => {

        const handleImageResize = () => {
            const imgElements = document.getElementsByClassName('html-data__img-tag');

            for (let i = 0; i < imgElements.length; i++) {
                const img = imgElements[i];
                const width = img.getAttribute('width');
                const imageWidth = width ? width : img.naturalWidth;
                console.log(imageWidth)
                if (Number(imageWidth) + 10 > wrapperSize.width) {
                    img.setAttribute('width', wrapperSize.width)
                } else {
                    img.setAttribute('width', imageWidth);
                }
            }
            setIsChecking(false);
        }

        handleImageResize();

        window.addEventListener('resize', handleImageResize);

        return () => {
            window.removeEventListener('resize', handleImageResize);
        }
    }, [width])

    useLayoutEffect(() => {
        if (htmlData) {
            addCopyButton();
        }
    }, [htmlData]);

    if (isChecking) {
        return <FallbackLoader width={'100%'} height={'100%'}/>
    }

    return !isChecking && <div className={'html-content__main-wrapper'} dangerouslySetInnerHTML={{__html: htmlData}}/>
};

export default HtmlContent;