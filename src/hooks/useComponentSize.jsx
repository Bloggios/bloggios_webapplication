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

import {useCallback, useEffect, useState} from 'react';

const useComponentSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [node, setNode] = useState(null);

    const handleResize = useCallback(() => {
        if (node) {
            const { width, height } = node.getBoundingClientRect();
            setSize({ width, height });
        }
    }, [node]);

    useEffect(() => {
        handleResize();
        const handleResizeThrottled = throttle(handleResize, 200);
        window.addEventListener('resize', handleResizeThrottled);
        return () => {
            window.removeEventListener('resize', handleResizeThrottled);
        };
    }, [node, handleResize]);
    return [setNode, size];
};

const throttle = (callback, delay) => {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            callback(...args);
        }
    };
};

export default useComponentSize;