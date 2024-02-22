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

export const getFormattedDate = (date) => {
    const originalDate = new Date(date);
    const currentDate = new Date();
    const timeDiffInSeconds = Math.floor((currentDate - originalDate) / 1000);
    if (timeDiffInSeconds < 60) {
        return `${timeDiffInSeconds}s ago`;
    } else if (timeDiffInSeconds < 3600) {
        return `${Math.floor(timeDiffInSeconds / 60)}m ago`;
    } else if (timeDiffInSeconds < 86400) {
        return `${Math.floor(timeDiffInSeconds / 3600)}h ago`;
    } else if (timeDiffInSeconds < 604800) {
        return `${Math.floor(timeDiffInSeconds / 86400)}d ago`;
    } else if (timeDiffInSeconds < 2592000) {
        return `${Math.floor(timeDiffInSeconds / 604800)}w ago`;
    } else if (timeDiffInSeconds < 31536000) {
        return `${Math.floor(timeDiffInSeconds / 2592000)}mo ago`;
    } else {
        return `${Math.floor(timeDiffInSeconds / 31536000)}yr ago`;
    }
}

export const handleDivScroll = (direction) => {
    const scrollContainer = document.getElementById('suggestionWrapper');
    const scrollAmount = 150;

    if (direction === 'left') {
        scrollContainer.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
        scrollContainer.scrollLeft += scrollAmount;
    }
};