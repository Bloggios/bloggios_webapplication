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

import React, {useCallback} from 'react';
import styled from "styled-components";
import {colors} from "../../styles/Theme";
import {laptopSvg, mobileSvg} from "../../asset/svg";
import UnAuthBloggiosBase from "../boundries/UnAuthBloggiosBase";
import {Heading1} from "../TermsContainer/styles/StyledComponent";
import {reportBugMobile} from "../../asset/webp";

const ReportBugPage = () => {

    const [selectedDevice, setSelectedDevice] = React.useState(null);

    const handleSelectedDevice = (device) => {
        if (selectedDevice === device) {
            setSelectedDevice(null);
        } else {
            setSelectedDevice(device)
        }
    }

    const getInformationPart = useCallback(() => {
        if (selectedDevice === 'mobile') {
            return (
                <InformationPart>
                    <div>
                        <Heading1>
                            Reporting Bug
                        </Heading1>

                        <Paragraph>
                            Please follow the below guide detailing the steps for reporting a bug on any mobile, tablet
                            or iPad Device
                        </Paragraph>
                    </div>

                    <OrderedList>
                        <li>
                            <strong>Navigate to the Problematic Page: </strong>Please navigate to the page where you
                            encountered the issue and scroll to the position where the bug occurred.
                        </li>
                        <li style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <strong>Open Bug Report Dialog:</strong>
                            On your mobile device, initiate the action of shaking it until the report dialog opens,
                            resembling the image provided below:
                            <img src={reportBugMobile} alt="Report Bug"/>
                        </li>
                        <li>
                            <strong>Provide Your Information: </strong>
                            If your name and email are not already filled in, kindly enter them into the designated
                            fields.
                        </li>
                        <li>
                            <strong>Describe the Issue: </strong>
                            In the message text box, provide a comprehensive description of the bug, including all
                            relevant details necessary for us to effectively address and rectify the issue.
                        </li>
                        <li>
                            <strong>Submit Your Report: </strong>
                            Once you've thoroughly described the bug, please proceed by clicking on the '<strong>Report</strong>' button
                            to submit your report.
                        </li>
                    </OrderedList>

                    <Paragraph>
                        Your assistance in reporting this bug is invaluable to us. We greatly appreciate your
                        contribution to improving our platform's performance and ensuring a seamless user experience for
                        all our users. Thank you for your cooperation.
                    </Paragraph>
                </InformationPart>
            )
        } else if (selectedDevice === 'laptop') {
            return (
                <InformationPart>
                    <Heading1>
                        Reporting Bug
                    </Heading1>

                    <Paragraph>
                        Please follow the below guide detailing the steps for reporting a bug on any device equipped
                        with an attached Keyboard
                    </Paragraph>

                    <OrderedList>
                        <li>
                            <strong>Navigate to the Problematic Page:</strong> Please navigate to the page where you
                            encountered the issue and scroll to the position where the bug occurred.
                        </li>
                        <li>
                            <strong>Open Bug Report Dialog:</strong>
                            <br/>
                            <ul style={{paddingLeft: 25, listStyle: 'disc'}}>
                                <li>For Windows Users: Initiate the process by pressing Ctrl + Shift + E.</li>
                                <li>For macOS Users: The corresponding key combination is ⌃ + ⇧ + E. This action will prompt the opening of the 'Report Bug' dialog.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Provide Your Information: </strong>
                            If your name and email are not already filled in, kindly enter them into the designated fields.
                        </li>
                        <li>
                            <strong>Describe the Issue: </strong>
                            In the message text box, provide a comprehensive description of the bug, including all relevant details necessary for us to effectively address and rectify the issue.
                        </li>
                        <li>
                            <strong>Submit Your Report: </strong>
                            Once you've thoroughly described the bug, please proceed by clicking on the '<strong>Report</strong>' button to submit your report.
                        </li>
                    </OrderedList>

                    <Paragraph>
                        Your assistance in reporting this bug is invaluable to us. We greatly appreciate your contribution to improving our platform's performance and ensuring a seamless user experience for all our users. Thank you for your cooperation.
                    </Paragraph>
                </InformationPart>
            )
        } else {
            return (
                <InformationPart style={{
                    justifyContent: 'space-around',
                }}>
                    <div>
                        <Heading>
                            Found a Bug? Let Us Know!
                        </Heading>
                        <Paragraph>
                            Reporting bugs is crucial for ensuring our application operates seamlessly. Your reports
                            provide valuable insights that enable us to identify and resolve issues promptly, resulting
                            in a smoother user experience. By reporting bugs, you actively contribute to the enhancement
                            of our application's performance, stability, and overall functionality.
                        </Paragraph>
                    </div>

                    <div>
                        <Heading2>
                            Select your device type
                        </Heading2>

                        <UnorderedList>
                            <li>
                                <strong>Device Type:</strong>
                                &nbsp;Select your device type from left pane
                            </li>

                            <li>
                                <strong>Steps:</strong>
                                &nbsp;Follow the steps mentioned there to Report a bug efficiently
                            </li>
                        </UnorderedList>
                    </div>
                </InformationPart>
            )
        }
    }, [selectedDevice])

    return (
        <UnAuthBloggiosBase>
            <Wrapper>
                <MainContainer>
                    <DeviceSelectPart>
                        <DeviceCard
                            onClick={() => handleSelectedDevice('laptop')}
                            isActive={selectedDevice === 'laptop'}
                        >
                            <img src={laptopSvg} alt="Laptop"/>
                            <span>
                                Desktop / Laptop
                            </span>
                        </DeviceCard>

                        <DeviceCard
                            onClick={() => handleSelectedDevice('mobile')}
                            isActive={selectedDevice === 'mobile'}
                        >
                            <img src={mobileSvg} alt="Mobile"/>
                            <span>
                                Mobile / Tablet / iPad
                            </span>
                        </DeviceCard>
                    </DeviceSelectPart>

                    {getInformationPart()}
                </MainContainer>
            </Wrapper>
        </UnAuthBloggiosBase>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 72px);
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: all 400ms ease-in-out;

    @media (max-width: 700px) {
        margin-bottom: 74px;
    }

    @media (orientation: portrait) {
        justify-content: flex-start;
        height: auto;
        min-height: auto;
    }

    @media (orientation: portrait) and (max-width: 700px) {
        height: auto;
    }
    
    @media (height: 670px) {
        margin-top: 25px;
    }
`;

const MainContainer = styled.div`
    width: 70%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: auto;
    border-radius: 10px;
    background: ${colors.black400};

    @media (orientation: portrait) {
        margin-top: 25px;
    }

    @media (max-width: 1200px) {
        width: 82%;
    }

    @media (max-width: 1000px) {
        width: 95%;
    }

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const DeviceSelectPart = styled.div`
    width: 28%;
    height: 100%;
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 700px) {
        width: 100%;
        flex-direction: row;
    }
`;

const InformationPart = styled.div`
    width: 72%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 10px;
    padding: 20px;
    overflow: auto;

    @media (max-width: 700px) {
        width: 100%;
        height: auto;
        gap: 25px;
    }
`;

const DeviceCard = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;

    background: ${props => props.isActive ? 'rgba(34, 35, 42, 0.4)' : 'rgba(34, 35, 42, 0.2)'};
    cursor: pointer;
    box-shadow: ${props => props.isActive ? 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.4), 0 0 0 1px hsla(230, 13%, 9%, 0.075),0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)' : 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075),0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)'};
    transition: all 250ms ease-in-out;

    & > img {
        width: 50%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    & > img:last-child {
        transform: scale(0.9);
    }

    & > span {
        font-size: clamp(0.875rem, 0.8404rem + 0.2128vw, 1rem);
        font-family: "Poppins", sans-serif;
        letter-spacing: 1px;
        color: ${colors.white80};
        text-align: center;
    }

    &:hover, &:active {
        box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.5),
        0 0 0 1px hsla(230, 13%, 9%, 0.075),
        0 0.3px 0.4px hsla(230, 13%, 9%, 0.02),
        0 0.9px 1.5px hsla(230, 13%, 9%, 0.045),
        0 3.5px 6px hsla(230, 13%, 9%, 0.09);
        background: rgba(34, 35, 42, 0.6);
    }

    @media (max-width: 500px) {
        height: 200px;
    }

    @media (max-width: 400px) {
        height: 170px;
    }
`;

const Heading = styled.h2`
    font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
    font-weight: 600;
    text-align: center;
`;

const Paragraph = styled.p`
    font-size: clamp(0.875rem, 0.8404rem + 0.2128vw, 1rem);
    letter-spacing: 1px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    text-align: justify;
    color: ${colors.white80};
    margin-top: 20px;
`;

const Heading2 = styled.h4`
    font-size: clamp(1.125rem, 1.0559rem + 0.4255vw, 1.375rem);
    letter-spacing: 1px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
`;

const UnorderedList = styled.ul`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    padding-left: 25px;
    margin-top: 20px;

    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
    }

    & strong {
        color: ${colors.white100};
    }
`;

const OrderedList = styled.ol`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 25px;
    list-style: none;

    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;

        & > img {
            width: 200px;
            padding: 20px;
        }
    }

    & strong {
        color: ${colors.white100};
    }
`;

export default ReportBugPage;