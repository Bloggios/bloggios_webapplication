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

const Heading1 = styled.h1`
    font-size: clamp(1.5625rem, 1.4069rem + 0.9574vw, 2.125rem);
    letter-spacing: 2px;
    font-weight: 700;
    color: ${colors.white100};
    font-family: inherit;
`;

const Heading2 = styled.h2`
    font-size: clamp(1.125rem, 1.0765rem + 0.2985vw, 1.375rem);
    letter-spacing: 2px;
    font-weight: 500;
    color: ${colors.white80};
    font-family: inherit;
`;

const Heading4 = styled.h4`
    font-size: clamp(1.25rem, 1.1117rem + 0.8511vw, 1.75rem);
    letter-spacing: 2px;
    font-weight: 400;
    color: ${colors.white80};
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

const HorizontalDivider = styled.hr`
    color: ${colors.white10};
`;

const getTermsIntroduction = () => {
    return (
        <Wrapper>
            <Heading1>
                Terms of Service
            </Heading1>

            <Heading2>
                Last Updated : <strong>March 16, 2024</strong>
            </Heading2>

            <Heading4 style={{
                marginTop: '25px'
            }}>
                Agreement to <strong>Bloggios</strong> Terms
            </Heading4>
            <Paragraph>
                We are <strong>Bloggios</strong> ('Company', 'we', 'us', or 'our') <br/>
                We operate the website <Link href={'https://www.bloggios.com'} target={'_blank'}>https://www.bloggios.com</Link> (referred to as the 'Site'), the mobile application
                Bloggios (referred to as the 'App') (Under Development), as well as any other related products and
                services that refer or link to these legal terms (referred to collectively as the 'Services'). <br/>
                You can contact us by email at <Link href={'mailto:support@bloggios.com'}>Bloggios Support</Link>
            </Paragraph>

            <Paragraph>
                These Legal Terms constitute a legally binding agreement between the user ('you'), whether personally or
                on behalf of an entity, and the entity operating the Services, concerning your access to and use of the
                Services. By accessing the Services, you acknowledge that you have read, understood, and agreed to be
                bound by all of these Legal Terms. Failure to agree with all of these Legal Terms expressly prohibits
                you from using the Services, and you must discontinue use immediately.
            </Paragraph>

            <Paragraph>
                Prior notice will be provided for any scheduled changes to the Services you are using. Changes to the
                Legal Terms will become effective twenty (20) days after the notice is given, except in cases where
                changes apply to new functionality and security updates, in which case they will be effective
                immediately. By continuing to use the Services after the effective date of any changes, you agree to be
                bound by the modified terms. If you disagree with such changes, you may terminate Services in accordance
                with the 'TERM AND TERMINATION' section.
            </Paragraph>

            <Paragraph>
                The Services are intended for users who are at least 13 years of age. All users who are minors in the
                jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be
                directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have
                your parent or guardian read and agree to these Legal Terms prior to using the Services.
            </Paragraph>
        </Wrapper>
    )
}

const getServices = () => {
    return (
        <Wrapper>
            <Heading1>
                Services
            </Heading1>

            <Paragraph>
                The information provided through the use of the Services is not intended for distribution to or
                utilization by any individual or entity in any jurisdiction or country where such distribution or usage
                would contravene applicable law or regulation, or would necessitate compliance with registration
                requirements within said jurisdiction or country. Consequently, individuals who opt to access the
                Services from locations outside our designated jurisdiction do so at their own volition and bear sole
                responsibility for adhering to local laws, should they be applicable.
            </Paragraph>

            <Paragraph>
                It's important to note that the Services are not customized to ensure compliance with industry-specific
                regulations such as the Health Insurance Portability and Accountability Act (HIPAA), Federal Information
                Security Management Act (FISMA), etc. Therefore, if your interactions would fall under the purview of
                such laws, you are prohibited from utilizing the Services. Furthermore, usage of the Services in any
                manner that would contravene the Gramm-Leach-Bliley Act (GLBA) is strictly prohibited.
            </Paragraph>
        </Wrapper>
    )
}

const getIntellectualPropertyRights = () => {
    return (
        <Wrapper>
            <Heading1>
                Intellectual Property Rights
            </Heading1>

            <Heading4 style={{
                marginTop: 25
            }}>
                Our Intellectual Property
            </Heading4>

            <Paragraph>
                We are the rightful owners or licensees of all intellectual property rights within our Services,
                encompassing source code, databases, functionality, software, website designs, audio, video, text,
                photographs, graphics (collectively referred to as the 'Content'), as well as trademarks, service marks,
                and logos (the 'Marks') contained therein.
                <br/><br/>
                This Content and Marks are safeguarded by copyright and trademark laws, alongside various other
                intellectual property rights and unfair competition laws, both domestically within the United States and
                internationally.
                <br/><br/>
                The Content and Marks provided within or through the Services are offered 'AS IS' for your personal,
                non-commercial use or internal business purpose only.
            </Paragraph>

            <HorizontalDivider/>

            <Heading4 style={{
                marginTop: 25
            }}>
                Your User of Our Services
            </Heading4>

            <Paragraph>
                Subject to your adherence to these Legal Terms, including the 'Prohibited Activities' section below, we
                grant you a non-exclusive, non-transferable, revocable license to access the Services and to download or
                print a copy of any portion of the Content for which you have obtained proper access, solely for your
                personal, non-commercial use or internal business purpose.
                <br/><br/>
                Except as specified in this section or elsewhere in our Legal Terms, no part of the Services, Content,
                or Marks may be exploited for any commercial purpose without our express prior written permission.
                <br/><br/>
                If you wish to utilize the Services, Content, or Marks beyond what is outlined in this section or
                elsewhere in our Legal Terms, please direct your request to: support@bloggios.com. If permission is
                granted for posting, reproducing, or publicly displaying any part of our Services or Content, you must
                ensure appropriate attribution to us as the owners or licensors of the Content.
                <br/><br/>
                We reserve all rights not expressly granted to you concerning the Services, Content, and Marks.
                <br/><br/>
                Violation of these Intellectual Property Rights constitutes a material breach of our Legal Terms,
                resulting in the immediate termination of your right to utilize our Services.
            </Paragraph>

            <HorizontalDivider/>

            <Heading4 style={{
                marginTop: 25
            }}>
                Your Submissions and Contributions:
            </Heading4>

            <Paragraph>
                Prior to utilizing our Services, carefully review this section and the 'Prohibited Activities' section
                to understand the rights and obligations related to posting or uploading any content.
                <br/><br/>
                Submissions: By providing us with any form of Submission, you agree to assign to us all intellectual
                property rights associated with such Submission. We shall have unrestricted rights to use and
                disseminate these Submissions for any lawful purpose without acknowledgment or compensation to you.
                <br/><br/>
                Contributions: The Services may facilitate the creation, submission, and posting of content
                ('Contributions'). By posting Contributions, you grant us an expansive license to utilize and exploit
                your Contributions for any purpose, including commercial use. This license includes the use of your
                name, trademarks, and logos.
                <br/><br/>
                You are solely responsible for your Submissions and Contributions, and you agree to indemnify us for any
                losses incurred due to your breach of these terms.
            </Paragraph>

            <HorizontalDivider/>

            <Heading4 style={{
                marginTop: 25
            }}>
                Copyright Infringement:
            </Heading4>

            <Paragraph>
                We respect the intellectual property rights of others. If you believe that any material available
                through the Services infringes upon your copyright, please refer to the 'Copyright Infringements'
                section below.
                <br/><br/>
                For further details or inquiries, please contact us at: <Link
                href={'mailto:support@bloggios.com'}>support@bloggios.com</Link>
            </Paragraph>
        </Wrapper>
    )
}

const getUserRepresentations = () => {
    return (
        <Wrapper>
            <Heading1>
                User Representations
            </Heading1>

            <Paragraph>
                By utilizing the Services, you affirm and guarantee the following:
            </Paragraph>

            <OrderedList style={{
                paddingLeft: 25
            }}>
                <li>
                    <strong>Accuracy of Information:</strong> You pledge that all registration details you provide will
                    be true, precise, up-to-date, and comprehensive.
                </li>
                <li>
                    <strong>Maintenance of Information:</strong> You commit to maintaining the accuracy of such
                    information and promptly updating any necessary registration details.
                </li>
                <li>
                    <strong>Legal Capacity and Compliance:</strong> You assert that you possess the legal capacity to
                    enter into and abide by these Legal Terms.
                </li>
                <li>
                    <strong>Age Requirement:</strong> You confirm that you are at least 13 years old and are not
                    considered a minor in your jurisdiction of residence. If you are a minor, you affirm that you have
                    obtained parental consent to utilize the Services.
                </li>
                <li>
                    <strong>Prohibition of Automated Access:</strong> You agree not to access the Services through
                    automated or non-human methods, including bots, scripts, or similar means.
                </li>
                <li>
                    <strong>Lawful Usage:</strong> You pledge not to utilize the Services for any illegal or
                    unauthorized purposes.
                </li>
                <li>
                    <strong>Compliance with Applicable Laws:</strong> You assure that your utilization of the Services
                    will not contravene any pertinent laws or regulations.
                </li>
            </OrderedList>

            <Paragraph>
                In the event that you provide information that is found to be untrue, inaccurate, outdated, or
                incomplete, we retain the right to suspend or terminate your account and deny any present or future
                access to the Services (or any part thereof).
            </Paragraph>
        </Wrapper>
    )
}

const getUserRegistration = () => {
    return (
        <Wrapper>
            <Heading1>
                User Registration
            </Heading1>

            <Paragraph>
                Registration may be necessary to access and utilize some of the Services. You consent to maintaining the
                confidentiality of your password and accept responsibility for all activities conducted using your
                account and password. We retain the authority to revoke, reclaim, or modify any username chosen by you
                if, at our sole discretion, we deem it to be inappropriate, obscene, or otherwise objectionable.
            </Paragraph>
        </Wrapper>
    )
}

const getProhibitedActivities = () => {
    return (
        <Wrapper>
            <Heading1>
                Prohibited Activities
            </Heading1>

            <Paragraph>
                You are strictly prohibited from accessing or utilizing the Services for any purpose other than those
                explicitly provided by us. The Services may not be employed for commercial activities unless expressly
                endorsed or approved by us.
                <br/><br/>
                As a user of the Services, you agree to refrain from:
            </Paragraph>

            <OrderedList style={{
                paddingLeft: 25
            }}>
                <li>Systematically retrieving data or other content from the Services to establish a collection,
                    compilation, database, or directory, whether directly or indirectly, without our prior written
                    consent.
                </li>

                <li>Engaging in deceitful, fraudulent, or misleading activities, particularly in attempts to obtain
                    sensitive account information, such as user passwords.
                </li>

                <li>Circumventing, disabling, or otherwise disrupting security features of the Services, including those
                    designed to prevent or limit the use or reproduction of any Content, or to enforce usage
                    restrictions on the Services and/or the Content contained within.
                </li>

                <li>Engaging in actions that, in our judgment, disparage, tarnish, or otherwise harm us and/or the
                    reputation of the Services.
                </li>

                <li>Using any information acquired from the Services to harass, abuse, or cause harm to another
                    individual.
                </li>

                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                <li>Engage in unauthorised framing of or linking to the Services.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material,
                    including excessive use of capital letters and spamming (continuous posting of repetitive text),
                    that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies,
                    impairs, disrupts, alters, or interferes with the use, features, functions, operation, or
                    maintenance of the Services.
                </li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or
                    using any data mining, robots, or similar data gathering and extraction tools.
                </li>
                <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or
                    active information collection or transmission mechanism, including without limitation, clear
                    graphics interchange formats ('gifs'), 1×1 pixels, web bugs, cookies, or other similar devices
                    (sometimes referred to as 'spyware' or 'passive collection mechanisms' or 'pcms').
                </li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services
                    connected to the Services.
                </li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any
                    portion of the Services to you.
                </li>
                <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the
                    Services, or any portion of the Services.
                </li>
                <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or
                    other code.
                </li>
                <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of
                    the software comprising or in any way making up a part of the Services.
                </li>
                <li>Except as may be the result of standard search engine or Internet browser usage, use, launch,
                    develop, or distribute any automated system, including without limitation, any spider, robot, cheat
                    utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorised
                    script or other software.
                </li>
                <li>Make any unauthorised use of the Services, including collecting usernames and/or email addresses of
                    users by electronic or other means for the purpose of sending unsolicited email, or creating user
                    accounts by automated means or under false pretences.
                </li>
                <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the
                    Content for any revenue-generating endeavour or commercial enterprise.
                </li>
                <li>Use the Services to advertise or offer to sell goods and services.</li>
                <li>Sell or otherwise transfer your profile.</li>
            </OrderedList>
        </Wrapper>
    )
}

const getUserGeneratedContributions = () => {
    return (
        <Wrapper>
            <Heading1>
                User Generated Contributions
            </Heading1>

            <Paragraph>
                The Services may offer you the opportunity to engage in various functionalities, such as chats, blog
                contributions, message boards, and online forums, enabling you to create, submit, post, display,
                transmit, perform, publish, distribute, or broadcast content and materials (collectively referred to as
                'Contributions'). These Contributions may be visible to other users of the Services and may also be
                accessible through third-party websites. Therefore, any Contributions you transmit should be considered
                non-confidential and non-proprietary.
                <br/><br/>
                When creating or sharing Contributions, you hereby affirm and warrant that:
            </Paragraph>

            <OrderedList style={{
                paddingLeft: 25
            }}>
                <li>The creation, distribution, transmission, public display, or performance, as well as the accessing,
                    downloading, or copying of your Contributions, do not and will not infringe upon the proprietary
                    rights, including but not limited to copyright, patent, trademark, trade secret, or moral rights of
                    any third party.
                </li>

                <li>You are the rightful creator and owner of your Contributions, or you possess the necessary licenses,
                    rights, consents, releases, and permissions to use and authorize us, the Services, and other users
                    of the Services to utilize your Contributions in any manner envisaged by the Services and these
                    Legal Terms.
                </li>

                <li>You have obtained the written consent, release, and/or permission from each identifiable individual
                    appearing in your Contributions, allowing the use of their name or likeness as required by the
                    Services and these Legal Terms.
                </li>

                <li>Your Contributions are truthful, accurate, and not misleading.</li>

                <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid
                    schemes, chain letters, spam, mass mailings, or other forms of solicitation.
                </li>

                <li>Your Contributions are not offensive, obscene, lewd, lascivious, violent, harassing, libelous,
                    slanderous, or otherwise objectionable, as determined by us.
                </li>

                <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse any individual.</li>

                <li>Your Contributions do not promote violence against a specific person or group, nor are they intended
                    to harass or threaten any individual in a legal sense.
                </li>

                <li>Your Contributions comply with all applicable laws, regulations, and rules.</li>

                <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>

                <li>Your Contributions do not contain offensive comments related to race, national origin, gender,
                    sexual
                    preference, or physical handicap.
                </li>

                <li>Your Contributions do not link to material that violates any provision of these Legal Terms or any
                    applicable law or regulation.
                </li>
            </OrderedList>

            <Paragraph>
                Any use of the Services that contravenes the above stipulations constitutes a violation of these Legal
                Terms and may lead to the termination or suspension of your rights to access and use the Services.
            </Paragraph>
        </Wrapper>
    )
}

const getContributionLicense = () => {
    return (
        <Wrapper>
            <Heading1>
                Contribution License
            </Heading1>

            <Paragraph>
                By posting your Contributions to any part of the Services or making them accessible through your linked
                social networking accounts, you grant us an unrestricted, irrevocable, perpetual, non-exclusive,
                transferable, royalty-free, fully-paid, worldwide license to host, use, copy, reproduce, disclose, sell,
                publish, broadcast, store, cache, publicly perform, publicly display, translate, transmit, excerpt, and
                distribute such Contributions for any purpose, including commercial and advertising purposes. This
                license extends to any form, media, or technology, whether now known or developed in the future.
                <br/><br/>
                This license includes the right to create derivative works of your Contributions and to sublicense these
                rights to others. You waive any moral rights in your Contributions, and you confirm that no moral rights
                have been asserted in them.
                <br/><br/>
                It's important to note that we do not claim ownership over your Contributions, and you retain full
                ownership of all intellectual property rights associated with them. We are not responsible for any
                statements or representations made in your Contributions, and you agree to hold us harmless from any
                legal claims arising from your Contributions.
                <br/><br/>
                We reserve the right, at our discretion, to edit, redact, re-categorize, or delete any Contributions, as
                well as to pre-screen Contributions without notice. However, we have no obligation to monitor your
                Contributions.
            </Paragraph>
        </Wrapper>
    )
}

const getThirdPartyAccountIntegration = () => {
    return (
        <Wrapper>
            <Heading1>
                Third-Part Account Integration
            </Heading1>

            <Paragraph>
                As part of our Services, users have the option to link their accounts with third-party service
                providers, hereafter referred to as 'Third-Party Accounts.' This integration enhances functionality and
                allows for a seamless user experience. There are two methods by which users can link their accounts:
                <br/><br/>
                Users may choose to input their Third-Party Account login credentials directly into our Services.
                Alternatively, users may grant us access to their Third-Party Accounts, in accordance with the terms and
                conditions governing the use of each Third-Party Account.
                <br/><br/>
                By linking a Third-Party Account, users represent and warrant that they are authorized to disclose their
                Third-Party Account login information to us. They also confirm that they are not in breach of any terms
                and conditions governing the use of the Third-Party Account, and they are not subjecting us to any fees
                or usage limitations imposed by the third-party service provider.
                <br/><br/>
                Upon linking a Third-Party Account, users understand that we may access, retrieve, and store any content
                provided by the user on their Third-Party Account ('Social Network Content'). This content becomes
                accessible through our Services via the user's account. Additionally, depending on the Third-Party
                Account, we may exchange additional information with the Third-Party Account, subject to user
                notification.
                <br/><br/>
                Personally identifiable information posted on Third-Party Accounts may be accessible through the user's
                account on our Services, subject to the privacy settings configured by the user. If access to a
                Third-Party Account is terminated or becomes unavailable, Social Network Content may no longer be
                accessible through our Services. Users maintain control over the connection between their account on our
                Services and their Third-Party Accounts and can disable the connection at any time through their account
                settings or by contacting us directly.
                <br/><br/>
                Users acknowledge that their relationship with third-party service providers associated with their
                Third-Party Accounts is governed solely by their agreements with such providers. We do not review Social
                Network Content for accuracy, legality, or non-infringement. We may access users' email address books
                and contacts lists solely for the purpose of identifying contacts registered to use our Services.
                <br/><br/>
                Upon request, we will attempt to delete any information obtained from Third-Party Accounts stored on our
                servers, with the exception of the username and profile picture associated with the user's account. This
                integration enhances user experience while providing transparency, control, and privacy considerations
                regarding the handling of data from Third-Party Accounts.
            </Paragraph>
        </Wrapper>
    )
}

const getServicesManagement = () => {
    return (
        <Wrapper>
            <Heading1>
                Services Management
            </Heading1>

            <Paragraph>
                We retain the right, though not the obligation, to undertake the following actions:
            </Paragraph>

            <OrderedList style={{
                paddingLeft: 25
            }}>
                <li>
                    <strong>Monitoring for Violations:</strong>
                    We may monitor the Services to identify any breaches of these Legal
                    Terms.
                </li>

                <li>
                    <strong>Legal Action:</strong>
                    In our sole discretion, we reserve the right to take appropriate legal measures against
                    any individual who, in our judgment, violates the law or breaches these Legal Terms. This includes
                    reporting such users to law enforcement authorities.
                </li>

                <li>
                    <strong>Content Management:</strong>
                    We have the discretion, without limitation, to refuse, restrict access to, limit
                    availability of, or disable (to the extent technologically feasible) any Contributions or portions
                    thereof, as we deem necessary.
                </li>

                <li>
                    <strong>System Optimization:</strong>
                    At our sole discretion and without prior notice or liability, we may remove from
                    the Services or disable all files and content that are excessively large or burdensome to our
                    systems, thereby ensuring the smooth operation of our services.
                </li>

                <li>
                    <strong>Service Management:</strong>
                    We reserve the right to manage the Services in a manner that safeguards our
                    rights and property and ensures the proper functioning of the Services. This includes implementing
                    measures to maintain the integrity and security of our platform.
                </li>
            </OrderedList>
        </Wrapper>
    )
}

const getPrivacyPolicy = () => {
    return (
        <Wrapper>
            <Heading1>
                Privacy Policy
            </Heading1>

            <Paragraph>
                We prioritize data privacy and security and encourage you to review our comprehensive Privacy Policy
                accessible at http://www.bloggios.com/privacy-policy. By utilizing the Services, you acknowledge and
                agree to adhere to our Privacy Policy, which is an integral part of these Legal Terms.
                <br/><br/>
                It's important to note that the Services are hosted in India. Therefore, if you access the Services from
                any other region governed by laws or regulations concerning the collection, use, or disclosure of
                personal data that diverge from those in India, your continued use of the Services constitutes a
                transfer of your data to India. By doing so, you explicitly consent to the transfer and processing of
                your data in India.
                <br/><br/>
                Additionally, we are committed to compliance with the U.S. Children’s Online Privacy Protection Act.
                Accordingly, we do not knowingly accept, request, or solicit information from children, nor do we
                intentionally market to them. In accordance with this Act, should we become aware that anyone under the
                age of 13 has provided personal information to us without verifiable parental consent, we will promptly
                delete such information from our Services to the best of our ability.
            </Paragraph>
        </Wrapper>
    )
}

const getCopyrightInfringements = () => {
    return (
        <Wrapper>
            <Heading1>
                Copyright Infringements
            </Heading1>

            <Paragraph>
                We hold a deep respect for the intellectual property rights of others. Should you believe that any
                material accessible through the Services violates a copyright you own or control, we encourage you to
                promptly notify us using the contact information provided below (referred to as a 'Notification'). Upon
                receipt of your Notification, we will also forward a copy to the individual responsible for posting or
                storing the material mentioned in your Notification.
                <br/><br/>
                Please be aware that according to applicable law, individuals making material misrepresentations in a
                Notification may be held liable for damages. Therefore, if you are uncertain whether material found on
                or linked to by the Services infringes upon your copyright, we recommend seeking legal advice or
                consulting with an attorney before proceeding with a Notification.
                <br/><br/>
                Contact Information: <br/>
                Mail : <Link href={'mailto:support@bloggios.com'}>support@bloggios.com</Link> <br/>
                <br/><br/>
                Your cooperation is valued as we work together to uphold intellectual property rights and maintain a
                respectful online environment.
            </Paragraph>
        </Wrapper>
    )
}

const getTermAndTermination = () => {
    return (
        <Wrapper>
            <Heading1>
                Term and Termination
            </Heading1>

            <Paragraph>
                These Legal Terms shall remain effective for the duration of your use of the Services. Without prejudice
                to any other provision contained herein, we retain the unilateral right, without prior notice or
                liability, to deny access to and use of the Services, including the blocking of certain IP addresses, to
                any individual, for any reason or for no reason whatsoever. This includes, but is not limited to,
                instances of breach of any representation, warranty, or covenant outlined in these Legal Terms, or
                violation of any applicable law or regulation.
                <br/><br/>
                We reserve the prerogative to terminate your use or involvement in the Services, or to delete your
                account and any associated content or information posted, at any time and without prior notification, at
                our sole discretion.
                <br/><br/>
                Should we terminate or suspend your account for any reason, you are explicitly prohibited from
                re-registering or creating a new account under your own name, a fictitious or borrowed name, or under
                the name of any third party, regardless of whether you are acting on behalf of said third party. In
                addition to account termination or suspension, we retain the right to pursue appropriate legal action,
                which may include civil, criminal, or injunctive remedies.
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
                If you have any inquiries, concerns, or require clarification regarding the contents of this Privacy
                Policy, we encourage you to reach out to our dedicated Privacy Team. Your questions are vital to us, and
                we are committed to providing you with the necessary assistance and information.
            </Paragraph>

            <Paragraph>
                You can contact us via the following channels: <br/>
                Email : <Link href={'mailto:support@bloggios.com'}>support@bloggios.com</Link> <br/>
                Link : <Link href={'https://bloggios.com/raise-query'} target={'_blank'}>Raise Query</Link>
            </Paragraph>

            <Paragraph>
                When reaching out, please provide as much detail as possible regarding your query to enable us to assist
                you effectively. For instance, if you are concerned about the handling of your personal data or wish to
                exercise your rights under the GDPR, kindly specify the nature of your request, along with any relevant
                details or identifiers.
            </Paragraph>

            <Paragraph>
                Our Privacy Team is dedicated to ensuring that your privacy concerns are addressed promptly and
                comprehensively. Rest assured, your inquiries will be handled with the utmost confidentiality and
                professionalism.
            </Paragraph>

            <Paragraph>
                Thank you for entrusting us with your privacy, and we appreciate the opportunity to address any
                questions or concerns you may have regarding our Privacy Policy.
            </Paragraph>

            <strong>
                Regards, Bloggios Privacy Team
            </strong>
        </Wrapper>
    )
}


export const termsNoticeData = {
    'Introduction': getTermsIntroduction(),
    'Services': getServices(),
    'Intellectual Property Rights': getIntellectualPropertyRights(),
    'User Representations': getUserRepresentations(),
    'User Registration': getUserRegistration(),
    'User Generated Contributions': getUserGeneratedContributions(),
    'Prohibited Activities': getProhibitedActivities(),
    'Contribution License': getContributionLicense(),
    'Third-Party Account Integration': getThirdPartyAccountIntegration(),
    'Services Management': getServicesManagement(),
    'Privacy Policy': getPrivacyPolicy(),
    'Copyright Infringements': getCopyrightInfringements(),
    'Term and Termination': getTermAndTermination(),
    'Contact Us': getContactUs()
}