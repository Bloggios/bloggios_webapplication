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

export const Base64URItoMultipartFile = (base64URI, fileName) => {
    const base64Content = base64URI.split(';base64,').pop();
    const byteCharacters = atob(base64Content);
    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    const byteArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], {type: Base64URItoMultipartFile.extractContentType(base64URI)});
    return new File([blob], fileName, {type: blob.type});
};

Base64URItoMultipartFile.extractContentType = (base64URI) => {
    const contentTypeRegex = /^data:(.+);base64,/; // Regex to extract content type
    const matches = base64URI.match(contentTypeRegex);

    if (matches && matches.length > 1) {
        console.log(matches[1]);
        return matches[1];
    } else {
        return '';
    }
};