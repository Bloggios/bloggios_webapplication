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
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.span`
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => `'${props.fontFamily}', sans-serif`};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  letter-spacing: ${(props) => props.letterSpacing};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: ${(props) => props.textAlign};
  flex-shrink: 0;
`;

/**
 *
 * Confluence Page : https://bloggios.atlassian.net/wiki/spaces/B/pages/5242910/Typography
 * @param family
 * @param text
 * @param type
 * @param color
 * @param size
 * @param weight
 * @param spacing
 * @param textAlign
 * @returns {Element}
 * @constructor
 */
const Typography = ({
                        family,
                        text,
                        type,
                        color,
                        size,
                        weight,
                        spacing,
                        textAlign
                    }) => {

    const getFontFamily = (family) => {
        return family;
    };

    const getTypographyData = () => {
        switch (type) {
            case 'heading':
                return {
                    fontSize: size || '50px',
                    color: '#f5f5f5',
                    letterSpacing: '1px',
                    fontWeight: 800,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
            case 'subHeading':
                return {
                    fontSize: size || '40px',
                    color: '#f9f9f9',
                    letterSpacing: '1px',
                    fontWeight: 500,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
            case 'title':
                return {
                    fontSize: size || '28px',
                    color: '#f9f9f9',
                    letterSpacing: '1px',
                    fontWeight: 500,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
            case 'normal':
                return {
                    fontSize: size || '16px',
                    color: '#e5e5e5',
                    letterSpacing: '1px',
                    fontWeight: 300,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
            case 'caption':
                return {
                    fontSize: size || '14px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: 200,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
            case 'custom':
                return {
                    fontSize: size,
                    color,
                    fontWeight: weight,
                    letterSpacing: spacing,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
            default:
                return {
                    fontSize: size,
                    color,
                    fontWeight: weight,
                    letterSpacing: spacing,
                    fontFamily: getFontFamily(family),
                    textAlign: textAlign
                };
        }
    };

    const [typographyData, setTypographyData] = useState(getTypographyData());

    useEffect(() => {
        setTypographyData(getTypographyData()); // eslint-disable-next-line
    }, [type, family, size, color, weight, spacing]);

    return <Wrapper {...typographyData}>{text}</Wrapper>;
};

Typography.propTypes = {
    family: PropTypes.oneOf(['Inter', 'Poppins', 'Agbalumo', 'Dosis']),
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['heading', 'subHeading', 'normal', 'caption', 'custom', 'title']),
    color: PropTypes.string,
    size: PropTypes.string,
    weight: PropTypes.number,
    spacing: PropTypes.string,
    textAlign: PropTypes.string
};

Typography.defaultProps = {
    type: 'normal',
};

export default Typography;