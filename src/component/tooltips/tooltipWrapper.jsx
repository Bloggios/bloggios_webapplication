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

import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

const TooltipWrapper = ({
                            children,
                            backgroundColor,
                            position,
                            color,
                            tooltip,
                            fontSize,
                            hoverTranslate,
                            width,
                            height,
                            isTooltipAllowed,
                            textWidth,
                            textAlign,
                            whiteSpace
                        }) => {

    const [tooltipPosition, setTooltipPosition] = useState({});

    const getPosition = () => {
        switch (position) {
            case 'top':
                setTooltipPosition({bottom: '100%', left: '50%', transform: 'translate(-50%, 60%)'});
                break;
            case 'bottom':
                setTooltipPosition({top: '100%', left: '50%', transform: 'translate(-50%, 60%)'});
                break;
            case 'right' :
                setTooltipPosition({top: '50%', left: '160%', transform: 'translate(-50%, 0)'});
                break;
            default:
                setTooltipPosition({bottom: '100%', left: '50%', transform: 'translate(-50%, 60%)'});
        }
    };


    useEffect(() => {
        getPosition(); // eslint-disable-next-line
    }, []);

    return (
        <Wrapper
            data-tooltip={tooltip}
            background={backgroundColor}
            color={color}
            fontSize={fontSize}
            translate={hoverTranslate}
            height={height}
            width={width}
            display={!isTooltipAllowed && 'none'}
            textWidth={textWidth}
            textAlign={textAlign}
            whiteSpace={whiteSpace}
            {...tooltipPosition}
        >
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.span`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &::before {
    content: attr(data-tooltip);
    z-index: 1;
    position: absolute;
    padding: 3px 6px;
    width: ${(props)=> props.textWidth};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: ${(props)=> props.whiteSpace};
    text-align: ${(props)=> props.textAlign};
    border-radius: 4px;
    transition: 0.3s;
    display: ${(props) => props.display};
    opacity: 0;
    visibility: hidden;
    top: ${(props) => props.top};
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    background: ${(props) => props.background};
    transform: ${(props) => props.transform};
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize};
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
    translate: ${(props) => props.translate};
  }
`;

TooltipWrapper.propTypes = {
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    children: PropTypes.element.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    tooltip: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    hoverTranslate: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    isTooltipAllowed: PropTypes.bool,
    textWidth: PropTypes.string,
    textAlign: PropTypes.string,
    whiteSpace: PropTypes.string
};

TooltipWrapper.defaultProps = {
    color: '#282a3a',
    fontSize: '12px',
    hoverTranslate: '0 -50%',
    backgroundColor: '#d9d9d9',
    position: 'bottom',
    isTooltipAllowed: true,
};

export default TooltipWrapper;