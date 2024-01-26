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

import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {BsChevronDown} from "react-icons/bs";
import Typography from "../../../component/typography/typography";

const GENDER_OPTIONS = ['RATHER_NOT_TO_SAY', 'MALE', 'FEMALE', 'OTHERS', ];
const MONTH_OPTIONS = ['Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const dropdownContainerStyles = {
    width: '100%',
    height: '43px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '7px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    color: 'rgba(255, 255, 255, 0.6)',
};

const openStyles = {
    border: '1px solid rgba(255, 255, 255, 0.7)',
    color: 'rgba(255, 255, 255, 0.8)',
};

const GenderAndDobStepper = ({ data, setData }) => {

    const yearList = ['Year'];

    for (let year = 1950; year <= 2015; year++) {
        yearList.push(year);
    }

    const daysList = ['Day'];

    for (let day = 1; day <= 31; day++) {
        daysList.push(day);
    }

    const [isOpen, setIsOpen] = useState(false);
    const [isDayOpen, setIsDayOpen] = useState(false);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [gender, setGender] = useState(GENDER_OPTIONS[0]);
    const [month, setMonth] = useState(MONTH_OPTIONS[0]);
    const [year, setYear] = useState(yearList[0]);
    const [day, setDay] = useState(daysList[0]);
    const [date, setDate] = useState('');
    const dropdownRef = useRef(null);
    const dropdownDayRef = useRef(null);
    const dropdownMonthRef = useRef(null);
    const dropdownYearRef = useRef(null);

    const handleGenderChange = (option) => {
        setGender(option);
    }

    useEffect(() => {
        setData({
            ...data,
            gender: gender,
            dob: date
        });
    }, [gender, date]);

    useEffect(() => {
        if (day !== 'Day' && month !== 'Month' && year !== 'Year') {
            let birthDay = day;
            if (day < 10) {
                birthDay = '0' + day;
            }
            setDate(year + '-' + month + '-' + birthDay);
        } else if (day === 'Day' && month === 'Month' && year === 'Year') {
            setDate('');
        }
    }, [day, month, year]);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
        if (dropdownDayRef.current && !dropdownDayRef.current.contains(e.target)) {
            setIsDayOpen(false);
        }
        if (dropdownMonthRef.current && !dropdownMonthRef.current.contains(e.target)) {
            setIsMonthOpen(false);
        }
        if (dropdownYearRef.current && !dropdownYearRef.current.contains(e.target)) {
            setIsYearOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <LabelDropdownWrapper>
                <Typography text={'Select Gender'} type={'custom'} color={'rgba(255, 255, 255, 0.7)'} spacing={'1px'}/>
                <DropdownContainer ref={dropdownRef} onClick={() => setIsOpen(!isOpen)} style={{
                    ...dropdownContainerStyles,
                    ...isOpen && openStyles,
                }}>
                    <TextSpan>
                        {gender.charAt(0) + gender.slice(1).toLowerCase().replaceAll("_", " ")}
                    </TextSpan>
                    <ChevronWrapper style={{
                        transform: isOpen && 'rotate(180deg)',
                    }}>
                        <BsChevronDown/>
                    </ChevronWrapper>

                    <DropdownContent style={{
                        visibility: isOpen ? 'visible' : 'hidden',
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(5%)' : 'translateY(100%)',
                    }}>
                        {GENDER_OPTIONS.map((option) => (
                            <DropdownItem key={option} onClick={() => handleGenderChange(option)}>
                                {option.charAt(0) + option.slice(1).toLowerCase().replaceAll("_", " ")} {/* Capitalize first letter */}
                            </DropdownItem>
                        ))}
                    </DropdownContent>
                </DropdownContainer>
            </LabelDropdownWrapper>

            <LabelDropdownWrapper>
                <Typography text={'Date of Birth'} type={'custom'} color={'rgba(255, 255, 255, 0.7)'} spacing={'1px'}/>
                <DobContainer>
                    <DropdownContainer ref={dropdownDayRef} onClick={() => setIsDayOpen(!isDayOpen)} style={{
                        ...dropdownContainerStyles,
                        ...isDayOpen && openStyles,
                    }}>
                        <TextSpan>
                            {day}
                        </TextSpan>
                        <ChevronWrapper style={{
                            transform: isDayOpen && 'rotate(180deg)',
                        }}>
                            <BsChevronDown/>
                        </ChevronWrapper>

                        <DropdownContent style={{
                            visibility: isDayOpen ? 'visible' : 'hidden',
                            opacity: isDayOpen ? 1 : 0,
                            transform: isDayOpen ? 'translateY(5%)' : 'translateY(100%)',
                        }}>
                            {daysList.map((option) => (
                                <DropdownItem key={option} onClick={() => setDay(option)}>
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownContent>
                    </DropdownContainer>

                    <DropdownContainer ref={dropdownMonthRef} onClick={() => setIsMonthOpen(!isMonthOpen)} style={{
                        ...dropdownContainerStyles,
                        ...isMonthOpen && openStyles,
                    }}>
                        <TextSpan>
                            {month}
                        </TextSpan>
                        <ChevronWrapper style={{
                            transform: isMonthOpen && 'rotate(180deg)',
                        }}>
                            <BsChevronDown/>
                        </ChevronWrapper>

                        <DropdownContent style={{
                            visibility: isMonthOpen ? 'visible' : 'hidden',
                            opacity: isMonthOpen ? 1 : 0,
                            transform: isMonthOpen ? 'translateY(5%)' : 'translateY(100%)',
                        }}>
                            {MONTH_OPTIONS.map((option) => (
                                <DropdownItem key={option} onClick={() => setMonth(option)}>
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownContent>
                    </DropdownContainer>

                    <DropdownContainer ref={dropdownYearRef} onClick={() => setIsYearOpen(!isYearOpen)} style={{
                        ...dropdownContainerStyles,
                        ...isYearOpen && openStyles,
                    }}>
                        <TextSpan>
                            {year}
                        </TextSpan>
                        <ChevronWrapper style={{
                            transform: isYearOpen && 'rotate(180deg)',
                        }}>
                            <BsChevronDown/>
                        </ChevronWrapper>

                        <DropdownContent style={{
                            visibility: isYearOpen ? 'visible' : 'hidden',
                            opacity: isYearOpen ? 1 : 0,
                            transform: isYearOpen ? 'translateY(5%)' : 'translateY(100%)',
                        }}>
                            {yearList.map((option) => (
                                <DropdownItem key={option} onClick={() => setYear(option)}>
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownContent>
                    </DropdownContainer>
                </DobContainer>
            </LabelDropdownWrapper>
            <NoteSpan>
                In our profile section, the optional inclusion of your gender and date of birth is for demographic purposes only. Your privacy is paramount, and this information is kept confidential, visible only to you, and not used for personal purposes.
            </NoteSpan>
        </>
    );
};

const LabelDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  user-select: none;
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 7px;
  position: relative;
  cursor: pointer;
`;

const TextSpan = styled.div`
  font-size: 16px;
  letter-spacing: 1px;
`;

const ChevronWrapper = styled.div`
  padding: 7px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
`;

const DropdownContent = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  padding: 10px 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  background-color: #37434f;
  left: 0;
  top: 110%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 7px;
  z-index: 2;
  overflow-y: scroll;
  transition: all 150ms ease;
`;

const DropdownItem = styled.div`
  width: 100%;
  height: auto;
  padding: 5px 7px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const DobContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: nowrap;
  
  @media (max-width: 340px) {
    flex-wrap: wrap;
  }
`;

const NoteSpan = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 300;
  text-align: justify;
  color: rgba(255, 255, 255, 0.6);
`;

export default GenderAndDobStepper;