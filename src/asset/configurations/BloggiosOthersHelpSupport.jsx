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

import * as Bg from "./StyledComponent";
import {LANDING_PAGE} from "../../constant/pathConstants";
import {BLOGGIOS_TECH_ENQUIRY_SECTION} from "../../constant/ElementIdConstants";

const MoreInformation = () => {
    return (
        <>
            <Bg.HorizontalDivider/>
            <Bg.FlexParagraph>
                If your inquiry remains unresolved, please do not hesitate to contact us via email at the address
                provided below:
                <br/>
                <Bg.BgLink href={'mailto:support@bloggios.com'}>support@bloggios.com</Bg.BgLink>
                <br/>
                Our team typically responds to inquiries within 1 to 48 hours. We appreciate your patience and look
                forward to assisting you further.
            </Bg.FlexParagraph>
        </>
    )
}
const getDevelopmentRequirementForEnquiry = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            <Bg.UnorderedList>
                <li><strong>Navigate to Bloggios: </strong>Visit <Bg.RouterLink
                    to={{pathname: LANDING_PAGE, hash: BLOGGIOS_TECH_ENQUIRY_SECTION}}>Here</Bg.RouterLink> to access Scroll Down to Enquiry Form.
                </li>
                <li>
                 <strong>Fill in Required Fields:</strong> Provide all the necessary details about your project in the designated fields.
                 </li>
                 <li>
                  <strong>Review Your Requirements:</strong> Take a moment to review the information you've provided to ensure completeness and accuracy.
                 </li>
                <li>
              <strong>Submit Your Requirements:</strong> Once you're satisfied, click on the submit button to send your development requirements.
                </li>
                <li>
                 <strong>Confirmation:</strong> Upon submission, our team will review your requirements and get in touch with you shortly.
                 </li>
            </Bg.UnorderedList>    
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getDevelopmentPlatformOffer = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            Our development platform provides a comprehensive set of tools and resources to streamline the software development process. From project management to collaboration tools, version control, and deployment capabilities, our platform ensures efficient and seamless development workflows.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getTechnicalTraining = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            <strong>Yes</strong>, we provide tech training sessions tailored to various skill levels and technology stacks. Whether you're a beginner looking to learn the basics or an experienced developer aiming to enhance your skills, our training programs cover a wide range of topics to meet your learning needs.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const  getReportBugApplication = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            If you encounter any bugs or issues while using our platform, you can easily report them through our bug reporting feature. Simply navigate to the "Report Bug" section, describe the issue you're facing in detail, and submit it. Our development team will investigate the issue promptly and work towards resolving it.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getQAFeatureWork = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
                Our Q&A feature allows users to post questions related to software development, technology, or any other relevant topics. You can browse existing questions, provide answers, or post your own queries to seek assistance from the community. Our platform fosters knowledge sharing and collaboration among users to facilitate learning and problem-solving.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getLimitOfDevelopmentRequirement = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            Our enquiry form allows you to submit multiple development requirements. There's no limit to the number of submissions you can make, so feel free to submit as many as needed for your projects.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const GetSoonIExpectResponse = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            We strive to address reported bugs in a timely manner. After you submit a bug report, our development team will review the issue and prioritize it based on its severity and impact. You can expect to receive a response acknowledging your report and providing an estimated timeline for resolution.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
export const bloggiosOthersHelpSupport = [
        {
            id: 1,
            title: 'How can I submit my development requirements using the enquiry form?',
            details: getDevelopmentRequirementForEnquiry()
        },
        {
            id: 2,
            title: 'What features does your development platform offer?',
            details: getDevelopmentPlatformOffer()
        },
        {
            id: 3,
            title: 'Do you offer technical training as part of your services?',
            details: getTechnicalTraining()
        },
        {
            id: 4,
            title: 'How can I report a bug related to the application?',
            details: getReportBugApplication()
        },
        {
            id: 5,
            title: 'How does the Q&A feature work?',
            details: getQAFeatureWork()
        },
        {
            id: 6,
            title: ' Is there a limit to the number of development requirements I can submit through the enquiry form?',
            details: getLimitOfDevelopmentRequirement()
        },
        {
            id: 7,
            title: 'How soon can I expect a response after reporting a bug?',
            details: GetSoonIExpectResponse()
        }
]
