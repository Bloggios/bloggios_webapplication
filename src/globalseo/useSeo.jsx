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

import {useEffect} from 'react';

const useSeo = (seoPayload) => {

    useEffect(() => {

        const environment = process.env.REACT_APP_ENVIRONMENT;

        if (environment !== 'production') {
            return;
        }

        const {
            title,
            description,
            keywords,
            author,
            ogType,
            ogUrl,
            ogImage,
            ogTitle,
            ogDescription
        } = seoPayload;

        document.title = title;

        const updateMetaTag = (tagName, tagContent) => {
            const tag = document.querySelector(`meta[name="${tagName}"], meta[property="${tagName}"]`);
            if (tag) {
                tag.content = tagContent;
            } else {
                const newTag = document.createElement('meta');
                newTag[tagName ? 'name' : 'property'] = tagName;
                newTag.content = tagContent;
                document.head.appendChild(newTag);
            }
        };

        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);
        updateMetaTag('author', author);
        updateMetaTag('title', title);
        updateMetaTag('og:title', ogTitle);
        updateMetaTag('og:description', ogDescription);
        updateMetaTag('og:type', ogType);
        updateMetaTag('og:url', ogUrl);
        updateMetaTag('og:image', ogImage);

        return () => {
            const metaTags = document.querySelectorAll('meta[name^="description"], meta[property^="og:"]');
            metaTags.forEach((tag) => {
                document.head.removeChild(tag);
            });
        };
    }, [seoPayload]);
};

export default useSeo;