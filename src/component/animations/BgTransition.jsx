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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";

const BgTransition = ({
    children,
    type,
    delay = 0,
    style,
    component: Node,
    duration = 1,
                      }) => {

    const targetElement = useRef(null);
    const [isVisible, setIsVisible] = useState(null);

    useEffect(()=> {
        const observerOptions = {
            threshold: 0.5
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else if (delay === 0) {
                    setIsVisible(false);
                }
            });
        };

        const observer = new IntersectionObserver(
            handleIntersection,
            observerOptions
        );

        if (targetElement.current) {
            observer.observe(targetElement.current);
        }

        return () => {
            if (targetElement.current) {
                observer.unobserve(targetElement.current);
            }
        };
    }, []);

    const getContent = useCallback(()=> {
        if (type === 'bg__fi') {
            const bgFiStyle = {
                opacity: isVisible ? 1 : 0,
                transition: `opacity ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgFiStyle, ...style};
            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        } else if (type === 'bg__lr') {
            const bgLrStyle = {
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
                transition: `opacity ${duration}s ease-in-out ${delay}s, transform ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgLrStyle, ...style};

            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        } else if (type === 'bg__rl') {
            const bgRlStyle = {
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
                transition: `opacity ${duration}s ease-in-out ${delay}s, transform ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgRlStyle, ...style};

            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        } else if (type === 'bg__zi') {
            const bgRlStyle = {
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: `opacity ${duration}s ease-in-out ${delay}s, transform ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgRlStyle, ...style};

            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        } else if (type === 'bg__ud') {
            const bgRlStyle = {
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                transition: `opacity ${duration}s ease-in-out ${delay}s, transform ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgRlStyle, ...style};
            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        } else if (type === 'bg__du') {
            const bgRlStyle = {
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: `opacity ${duration}s ease-in-out ${delay}s, transform ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgRlStyle, ...style};
            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        } else {
            const bgFiStyle = {
                opacity: isVisible ? 1 : 0,
                transition: `opacity ${duration}s ease-in-out ${delay}s`,
            }
            const finalStyle = {...bgFiStyle, ...style};
            return (
                <Node
                    style={finalStyle}
                    ref={targetElement}
                >
                    {children}
                </Node>
            )
        }
    }, [type, children, isVisible, duration, delay, style])

    return getContent();
};

BgTransition.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([
        'bg__fi',
        'bg__lr',
        'bg__rl',
        'bg__zi',
        'bg__ud'
    ]),
}

export default BgTransition;