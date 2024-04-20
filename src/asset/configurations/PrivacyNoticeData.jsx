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

import styled from "styled-components";
import {colors} from "../../styles/Theme";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: "Poppins", sans-serif;
    letter-spacing: 1px;
`;

const Heading2 = styled.h2`
    font-size: clamp(1.125rem, 1.0765rem + 0.2985vw, 1.375rem);
    letter-spacing: 2px;
    font-weight: 400;
    color: ${colors.white80};
    font-family: inherit;
`;

const Heading1 = styled.h1`
    font-size: clamp(1.5625rem, 1.4069rem + 0.9574vw, 2.125rem);
    letter-spacing: 2px;
    font-weight: 700;
    color: ${colors.white100};
    font-family: inherit;
`;

const Paragraph = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    padding: 10px 0;
`;

const Link = styled.a`
    font-family: "Poppins", sans-serif;
    font-size: inherit;
    text-decoration: none;
    color: #007bff;
`;

const UnorderedList = styled.ul`
    font-family: "Poppins", sans-serif;
    font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
    line-height: normal;
    letter-spacing: 1px;
    color: ${colors.white80};
    display: flex;
    flex-direction: column;
    
    & > li {
        font-family: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        color: inherit;
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
    gap: 10px;
    
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

const getPrivacyPolicy = () => {
    return (
        <Wrapper>
            <Heading1>
                Privacy Policy
            </Heading1>
            <Heading2>Last Updated : <strong>March 16, 2024</strong></Heading2>
            <Paragraph style={{
                marginTop: '25px'
            }}>
                This Privacy Policy describes how <strong>Bloggios</strong> (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from <Link href="https://www.bloggios.com">Bloggios</Link> (the "Site") or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy. Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
            </Paragraph>
        </Wrapper>
    )
}

const getPersonalData = () => {
    return (
        <Wrapper>
            <Heading1>
                Personal Data
            </Heading1>
            <Paragraph style={{
                marginTop: 25
            }}>
                We value your privacy and strive to ensure transparency in our data collection practices. In the course of utilizing our application, we may request certain personally identifiable information from you. This information is crucial for us to effectively communicate with you and to tailor our services to your needs. Personally identifiable information may encompass, but is not restricted to:
            </Paragraph>
            <UnorderedList style={{
                paddingLeft: '25px'
            }}>
                <li>Email Address</li>
                <li>Name</li>
                <li>Phone Number</li>
                <li>Specific data you have added</li>
                <li>Description of the services or project you intend to collaborate on with Bloggios</li>
                <li>Remote Address</li>
                <li>Cookies</li>
            </UnorderedList>
            <Paragraph>
                Rest assured, we handle your personal data with the utmost care and in compliance with relevant data protection regulations. Your trust and satisfaction are paramount to us, and we are committed to safeguarding your privacy throughout your interactions with our application.
            </Paragraph>
        </Wrapper>
    )
}

const getUsageData = () => {
    return (
        <Wrapper>
            <Heading1>
                Usage Data
            </Heading1>
            <Paragraph style={{
                marginTop: 25
            }}>
                We may gather information pertaining to the usage of our services, commonly referred to as "Usage Data". This data may encompass various details, including but not limited to, your computer's <strong>Internet Protocol (IP) address</strong>, <strong>browser type</strong>, <strong>browser version</strong>, the specific pages within our services that you <strong>visit</strong>, the date and time of your visits, unique device identifiers, and other diagnostic data. This information aids us in enhancing the functionality and user experience of our services, allowing us to better cater to your needs and preferences. Rest assured, we handle this data with the utmost confidentiality and in accordance with applicable privacy laws and regulations.
            </Paragraph>
        </Wrapper>
    )
}

const getSocialLogin = () => {
    return (
        <Wrapper>
            <Heading1>
                Social Login
            </Heading1>
            <Paragraph style={{
                marginTop: 25
            }}>
                Our Services provide the option for registration and login through third-party social media accounts, such as Google or Facebook, offering you added convenience. If you choose this method, we will receive specific profile information from your selected social media provider. This may include your name, email address, friends list, profile picture, and any other details you've opted to share publicly on the platform.
            </Paragraph>

            <Paragraph>
                It's essential to emphasize that the information we receive is strictly utilized for the purposes outlined within this privacy notice or as explicitly communicated within our Services. We maintain a commitment to safeguarding your data, ensuring that nobody, apart from our authorized personnel with specific access privileges, has any form of access to the information received from your social media account.
            </Paragraph>

            <Paragraph>
                However, it's important to acknowledge that we do not exercise control over, nor can we assume responsibility for, any further handling of your personal data by your chosen third-party social media provider. We strongly encourage you to review their privacy notice to gain a comprehensive understanding of how they collect, use, and share your personal information. Additionally, their privacy notice typically outlines the mechanisms available for you to adjust your privacy preferences directly within their platforms and applications. Rest assured, we prioritize the protection of your data and operate in full compliance with applicable privacy laws and regulations.
            </Paragraph>
        </Wrapper>
    )
}

const getDataDisclosure = () => {
    return (
        <Wrapper>
            <Heading1>
                Data Disclosure
            </Heading1>

            <Paragraph>
                Bloggios may, in certain circumstances, disclose your Personal Data with utmost discretion and integrity, guided by the following principles:
            </Paragraph>

            <OrderedList style={{
                paddingLeft: 25
            }}>
                <li>
                    <strong>Compliance with Legal Obligations:</strong>
                    We may disclose your Personal Data when compelled by law, regulations, or legal proceedings, ensuring adherence to our legal obligations.
                </li>
                <li>
                    <strong>Protection and Defense of Rights:</strong> In situations where it is necessary to safeguard and uphold the rights or property of Bloggios, we may disclose your Personal Data in good faith.
                </li>
                <li>
                    <strong>Investigation of Wrongdoing:</strong> In the event of suspected wrongdoing or malfeasance associated with our services, we may disclose Personal Data to investigate and address such concerns effectively.
                </li>
                <li>
                    <strong>Ensuring Personal Safety:</strong> Your Personal Data may be disclosed if it is deemed essential to protect the personal safety of users of our services or the general public, prioritizing the well-being of individuals.
                </li>
                <li>
                    <strong>Protection Against Legal Liability:</strong> To mitigate legal risks and uphold legal obligations, Bloggios may disclose Personal Data when necessary to protect against potential legal liabilities.
                </li>
            </OrderedList>

            <Paragraph>
                Rest assured, such disclosures are conducted with meticulous care and discretion, always prioritizing the protection of your privacy and in compliance with relevant laws and regulations.
            </Paragraph>
        </Wrapper>
    )
}

const getGDPR = () => {
    return (
        <Wrapper>
            <Heading1>
                GDPR
            </Heading1>
            <Heading2>
                General Data Protection Regulation
            </Heading2>

            <Paragraph>
                At Bloggios, we prioritize the protection of your personal data and adhere to the strict standards set forth by the General Data Protection Regulation (GDPR). When you utilize our website, we may gather and process specific personally identifiable information, including but not limited to email addresses, names, phone numbers, and other pertinent details, with the sole intention of fulfilling the purposes outlined in this Privacy Policy.
            </Paragraph>

            <Paragraph>
                Our collection and processing of your personal data are carried out under various legal bases, such as your explicit consent or when necessary to fulfill contractual obligations, comply with legal requirements, safeguard vital interests, perform tasks in the public interest, or pursue legitimate interests, whether by Bloggios or a third party.
            </Paragraph>

            <Paragraph>
                Rest assured, your personal data is securely stored and accessed solely by authorized personnel who require access for the precise purposes delineated in this Privacy Policy. We uphold a strict policy of non-disclosure or transfer of your personal data to third parties, except when explicit consent is provided or when such action is imperative for service provision, legal compliance, or safeguarding legitimate interests.
            </Paragraph>

            <Paragraph>
                As a valued data subject, you possess certain rights under the GDPR, including the right to access, rectify, delete, restrict processing, and obtain a copy of your personal data. Additionally, you have the prerogative to withdraw consent at any time and the right to lodge a complaint with a supervisory authority. Should you wish to exercise any of these rights or seek clarification regarding the processing of your personal data, please don't hesitate to reach out to us using the provided contact information. Kindly note that we may request identity verification before addressing such requests.
            </Paragraph>

            <Paragraph>
                By utilizing our website and entrusting us with your personal data, you acknowledge having read and comprehended this Privacy Policy. Moreover, you consent to the collection, processing, and storage of your personal data in strict adherence to the GDPR and the principles outlined within this Privacy Policy. Your trust and confidence in Bloggios are paramount, and we are committed to upholding the highest standards of data protection and privacy compliance.
            </Paragraph>
        </Wrapper>
    )
}

const getPrivacyPolicyUpdates = () => {
    return (
        <Wrapper>
            <Heading1>
                Privacy Policy Updates
            </Heading1>

            <Paragraph>
                We reserve the right to periodically update this privacy notice to ensure alignment with evolving legal requirements, technological advancements, and our business practices. Any updates or modifications will be clearly indicated by revising the "Revised" date at the top of this notice, and the revised version will become effective immediately upon its availability.
            </Paragraph>

            <Paragraph>
                In the event of material changes to this privacy notice that significantly impact your rights or our data processing practices, we may notify you through conspicuous means, such as prominently posting a notice on our website or directly sending you a notification via email or other contact information you have provided.
            </Paragraph>

            <Paragraph>
                We strongly encourage you to review this privacy notice regularly to stay informed about how we protect your information and any updates or changes to our practices. Your continued use of our services after the posting of any revised privacy notice signifies your acknowledgment and acceptance of the updated terms. Should you have any questions or concerns regarding these changes or our privacy practices, please do not hesitate to contact us. Your privacy and trust are of utmost importance to us, and we are committed to transparently communicating any changes that may affect you.
            </Paragraph>
        </Wrapper>
    )
}

const getContactUs = () => {
    return (
        <Wrapper>
            <Heading1>
                Contact Us
            </Heading1>

            <Paragraph>
                If you have any inquiries, concerns, or require clarification regarding the contents of this Privacy Policy, we encourage you to reach out to our dedicated Privacy Team. Your questions are vital to us, and we are committed to providing you with the necessary assistance and information.
            </Paragraph>

            <Paragraph>
                You can contact us via the following channels: <br/>
                Email : <Link href={'mailto:support@bloggios.com'}>support@bloggios.com</Link> <br/>
                Link : <Link href={'https://bloggios.com/raise-query'} target={'_blank'}>Raise Query</Link>
            </Paragraph>

            <Paragraph>
                When reaching out, please provide as much detail as possible regarding your query to enable us to assist you effectively. For instance, if you are concerned about the handling of your personal data or wish to exercise your rights under the GDPR, kindly specify the nature of your request, along with any relevant details or identifiers.
            </Paragraph>

            <Paragraph>
                Our Privacy Team is dedicated to ensuring that your privacy concerns are addressed promptly and comprehensively. Rest assured, your inquiries will be handled with the utmost confidentiality and professionalism.
            </Paragraph>

            <Paragraph>
                Thank you for entrusting us with your privacy, and we appreciate the opportunity to address any questions or concerns you may have regarding our Privacy Policy.
            </Paragraph>

            <strong>
                Regards, Bloggios Privacy Team
            </strong>
        </Wrapper>
    )
}

export const privacyNoticeData = {
    'Introduction' : getPrivacyPolicy(),
    'Personal Data' : getPersonalData(),
    'Usage Data' : getUsageData(),
    'Social Login' : getSocialLogin(),
    'Data Disclosure' : getDataDisclosure(),
    'General Data Protection Regulation' : getGDPR(),
    'Privacy Policy Updates' : getPrivacyPolicyUpdates(),
    'Contact Us' : getContactUs()
}