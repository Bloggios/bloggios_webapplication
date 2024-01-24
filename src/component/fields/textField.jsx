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

import React, {useState} from 'react';
import styled from "styled-components";
import Typography from "../typography/typography";
import useComponentSize from "../../hooks/useComponentSize";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import PropTypes from "prop-types";

const TextField = ({
                       label,
                       labelSize,
                       labelColor,
                       direction,
                       gap,
                       fontSize,
                       padding,
                       fontFamily,
                       letterSpacing,
                       background,
                       borderRadius,
                       hoveredBorder,
                       hoveredBackground,
                       color,
                       placeholderColor,
                       placeholder,
                       value,
                       onChange,
                       onKeyUp,
                       onKeyDown,
                       onBlur,
                       border,
                       fontWeight,
                       helperTextAllowed,
                       helperText,
                       helperTextColor,
                       passwordVisibilityIcon,
                       textType,
                       isPassword,
                       maxLength,
                       isDisabled,
                   }) => {

    const [ref, size] = useComponentSize();
    const [passwordShown, setPasswordShown] = useState(false);

    const getTextType = () => {
        if (isPassword) {
            return passwordShown ? 'text' : 'password';
        } else {
            return textType;
        }
    }

    return (
        <TextFieldWrapper style={{
            display: 'flex',
            flexDirection: direction === 'row' ? 'row' : 'column',
            gap: gap,
            alignItems: direction === 'row' && 'center',
        }}>
            {
                label && (
                    <Typography
                        text={label}
                        type={'custom'}
                        size={labelSize}
                        color={labelColor}
                        family={'Poppins'}
                        weight={200}
                    />
                )
            }
            <InputFieldWrapper
                ref={ref}
                type={getTextType()}
                fontSize={fontSize}
                padding={padding}
                fontFamily={fontFamily}
                letterSpacing={letterSpacing}
                hoveredBorder={hoveredBorder}
                hoveredBackground={hoveredBackground}
                placeholderColor={placeholderColor}
                placeholder={placeholder}
                border={border}
                value={value}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                maxLength={maxLength}
                disabled={isDisabled}
                style={{
                    background: background,
                    borderRadius: borderRadius,
                    color: color,
                    fontWeight: fontWeight,
                    cursor: isDisabled ? 'not-allowed' : 'text'
                }}
            />
            {
                passwordVisibilityIcon && (
                    <FieldIcon
                        onClick={() => setPasswordShown(!passwordShown)}
                        style={{
                            height: size.height * 0.75,
                            width: size.height * 0.75,
                            top: size.height * 0.125,
                            right: '10px'
                        }}>
                        {
                            passwordShown ? <MdVisibility/> : <MdVisibilityOff/>
                        }
                    </FieldIcon>
                )
            }
            {
                helperTextAllowed && (
                    <HelperTextWrapper style={{
                        visibility: helperText ? 'visible' : 'hidden'
                    }}>
                        <Typography
                            text={helperText || '-'}
                            type={'custom'}
                            size={'12px'}
                            weight={200}
                            spacing={'1px'}
                            family={'Inter'}
                            color={helperTextColor}
                        />
                    </HelperTextWrapper>
                )
            }
        </TextFieldWrapper>
    );
};

const TextFieldWrapper = styled.div`
  height: auto;
  position: relative;
`;

const InputFieldWrapper = styled.input`
  width: inherit;
  position: relative;
  flex: 1;
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  font-family: ${(props) => props.fontFamily};
  letter-spacing: ${(props) => props.letterSpacing};
  border: ${(props) => props.border};
  outline: none;
  transition: all 150ms;

  &:focus {
    border: ${(props) => props.hoveredBorder};
  }

  &:hover {
    background: ${(props) => props.hoveredBackground};
  }

  &::placeholder {
    color: ${(props) => props.placeholderColor};
    font-weight: 300;
  }
`;

const HelperTextWrapper = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  position: relative;
  left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FieldIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 50%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

TextField.propTypes = {
    label: PropTypes.string,
    labelSize: PropTypes.string,
    labelColor: PropTypes.string,
    direction: PropTypes.string,
    gap: PropTypes.string,
    fontSize: PropTypes.string,
    padding: PropTypes.string,
    fontFamily: PropTypes.string,
    letterSpacing: PropTypes.string,
    background: PropTypes.string,
    borderRadius: PropTypes.string,
    hoveredBorder: PropTypes.string,
    hoveredBackground: PropTypes.string,
    color: PropTypes.string,
    placeholderColor: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
    border: PropTypes.string,
    fontWeight: PropTypes.string,
    helperTextAllowed: PropTypes.bool,
    helperText: PropTypes.string,
    helperTextColor: PropTypes.string,
    passwordVisibilityIcon: PropTypes.bool,
    textType: PropTypes.string,
    isPassword: PropTypes.bool,
    maxLength: PropTypes.number,
    isDisabled: PropTypes.bool
}

TextField.defaultProps = {
    border: 'none',
    color: '#e5e5e5',
    letterSpacing: '2px',
    fontFamily: "'Inter', san-serif",
    fontWeight: '200',
    helperTextAllowed: false,
    helperTextColor: '#e80b0b',
    passwordVisibilityIcon: false,
    textType: 'text',
    isDisabled: false
}

export default TextField;