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

const getHowToAskQuestion = () => {
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                Please follow the below steps to ask a question on <strong>Bloggios</strong>
            </Bg.Paragraph>

            <Bg.UnorderedList>
                <li><strong>Navigate to Bloggios: </strong>Visit <Bg.RouterLink
                    to={{pathname: '/question/ask-question'}}>Here</Bg.RouterLink> to access the question submission
                    page.
                </li>

                <li><strong>Fill in Required Information: </strong>Provide all the necessary details such as title,
                    description, tags,
                    etc., in the designated fields.
                </li>

                <li><strong>Review Your Question: </strong>Take a moment to review the information you've provided to
                    ensure accuracy and
                    clarity.
                </li>

                <li><strong>Submit Your Question: </strong>Once you're satisfied with your question, click on the submit
                    button to send it
                    for review.
                </li>

                <li><strong>Follow Suggestions (Optional): </strong>If Bloggios provides any suggestions or
                    recommendations, consider
                    incorporating them to enhance your question.
                </li>

                <li><strong>Confirmation: </strong>Upon submission, you will receive a confirmation message, and your
                    question will be
                    forwarded for processing.
                </li>
            </Bg.UnorderedList>

            <Bg.Paragraph>
                Asking questions on Bloggios is a simple and efficient process. By following these steps, you can submit your queries and receive timely responses from our community.
            </Bg.Paragraph>

            <MoreInformation />
        </Bg.Wrapper>
    )
};

export const bloggiosQAAHelpSupportData = [
    {
        id: 1,
        title: 'How can I ask a question in the Q&A section?',
        details: getHowToAskQuestion()
    }
]