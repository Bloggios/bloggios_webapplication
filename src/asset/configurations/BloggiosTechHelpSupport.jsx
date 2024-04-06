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

import * as Bg from './StyledComponent';
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

const getBloggiosSoftwareDevelopmentServices = () => {
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                Bloggios offers a wide range of Software Services
            </Bg.Paragraph>

            <Bg.UnorderedList>
                <li><strong>Custom Software Development: </strong>Tailored solutions designed to meet unique business
                    needs.
                </li>
                <li><strong>Software Support: </strong>Ongoing maintenance, bug fixing, and updates for software
                    products.
                </li>
                <li><strong>QA Assistance: </strong>Ensuring software quality through testing, debugging, and quality
                    control.
                </li>
                <li><strong>Corporate Training: </strong>Programs to enhance team skills in development technologies and
                    methodologies.
                </li>
                <li><strong>Team Extension: </strong>Augmenting client teams with additional development resources.</li>
                <li><strong>Backend Development: </strong>Building server-side components and database management.</li>
                <li><strong>Frontend Development: </strong>Creating user interfaces and interactive elements for
                    seamless user
                    experiences.
                </li>
                <li><strong>Mobile Application Development: </strong>Crafting native or cross-platform apps for Android,
                    iOS, and
                    others.
                </li>
                <li><strong>Platform-Specific App Development: </strong>Designing apps tailored for specific platforms
                    like Android, iOS,
                    Mac OS, or Windows.
                </li>
            </Bg.UnorderedList>

            <MoreInformation/>
        </Bg.Wrapper>
    )
};

const getBloggiosCustomSoftwareBenefitBusiness = () => {
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                Our Custom Software Development service offers tailored solutions designed specifically to address your
                business's unique challenges and requirements. By collaborating closely with you, we ensure that the
                software aligns perfectly with your goals, workflows, and processes. This personalized approach enhances
                operational efficiency, productivity, and competitiveness, while also providing scalability and
                flexibility to adapt to evolving business needs seamlessly. Ultimately, our custom solutions empower
                your business to thrive in a dynamic and competitive marketplace.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
};

const getBloggiosOngoingApplicationSupport = () => {
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                <strong>Yes</strong>, we offer comprehensive ongoing support for all software developed by our team. Our
                dedicated
                support team ensures that your software remains functional, secure, and up-to-date long after the
                initial development phase. We provide timely assistance for troubleshooting, bug fixing, performance
                optimization, and any other maintenance needs that may arise. Our commitment to continuous support aims
                to minimize disruptions, maximize efficiency, and ensure the continued success of your software
                solution.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
};

const getBloggiosQaAssistanceImportance = () => {
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                QA Assistance refers to quality assurance support provided throughout the software development
                lifecycle. It involves testing, bug fixing, and ensuring that the software meets quality standards. This
                service is crucial for delivering a reliable and high-quality product to users.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
};

const getBloggiosTechQuoteDetails = () => {
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                Effortless and User-Friendly Process for Requesting a Quote on Bloggios
            </Bg.Paragraph>

            <Bg.OrderedList>
                <li>Navigate&nbsp;
                    <Bg.RouterLink to={{
                        pathname: LANDING_PAGE,
                        hash: '#' + BLOGGIOS_TECH_ENQUIRY_SECTION
                    }}>
                        Here
                    </Bg.RouterLink>
                </li>
                <li>Scroll down to find our inquiry form.</li>
                <li>If your name and email are not already filled in, please enter them.</li>
                <li>Choose the type of request you're making from the options provided.</li>
                <li>Provide a detailed description of your idea or query in the message section.</li>
                <li>Double-check all your inputs for accuracy and completeness.</li>
                <li>Finally, click on the submit button to send your request.</li>
            </Bg.OrderedList>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}

export const bloggiosTechHelpData = [
    {
        id: 1,
        title: 'What types of software development services do you offer?',
        details: getBloggiosSoftwareDevelopmentServices()
    },
    {
        id: 2,
        title: 'How can your Custom Software Development service benefit my business?',
        details: getBloggiosCustomSoftwareBenefitBusiness()
    },
    {
        id: 3,
        title: 'Do you provide ongoing support for the software developed by your team?',
        details: getBloggiosOngoingApplicationSupport()
    },
    {
        id: 4,
        title: 'What is QA Assistance, and why is it important?',
        details: getBloggiosQaAssistanceImportance()
    },
    {
        id: 5,
        title: 'How can I formally request a quotation for software development services?',
        details: getBloggiosTechQuoteDetails()
    }
]