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
const  getHowCanIAccessMessagingSupportFeature = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>

            <Bg.UnorderedList>
                <li><strong>Navigate to Bloggios: </strong>Visit <Bg.RouterLink
                    to={{pathname: 'https://bloggios.cloud/chats'}}>Here</Bg.RouterLink> to access the Messaging feature of Bloggios.
                </li>

                <li>
                    <strong>Navigate to Chat Section:</strong> Find and click on the "Chat" section in the application's navbar.
                </li>

                <li>
                <strong>Access Messaging Interface:</strong> Once in the chat section, look for the support contact or channel where you want to send your message.
                </li>

                <li>
                    <strong>Find Support Contact:</strong> Identify the appropriate support contact or channel within the chat interface.
                </li>

                <li>
                    <strong>Compose Message:</strong> Click on the contact or channel, then type your message detailing your query or issue.
                </li>

                <li>
                    <strong>Send Message:</strong> After composing your message, hit the send button to dispatch your message to the support contact.
                </li>

                <li>
                    <strong>Confirmation:</strong> You should receive a confirmation indicating that your message has been sent successfully.
                </li>

            </Bg.UnorderedList>

            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const  getMessagelimitICanSend = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
                While there may be a character limit imposed on messages, it's typically generous enough to accommodate most inquiries or issues. However, it's advisable to keep your messages concise and to the point for better clarity and understanding.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getMultipleOngoingConversations = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            <strong>Yes,</strong> you can often have multiple ongoing conversations simultaneously within the messaging support section. This allows you to manage and address different inquiries or issues separately for better organization and efficiency.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const GetSpecificHour = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            The availability of messaging support may vary depending on the platform and the support team's operating hours. Some platforms offer 24/7 support, while others may have designated support hours. Check the support section or contact information for details on availability.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getHowDoISendMessage = () =>{
    return (
        <Bg.Wrapper>
            <Bg.Paragraph>
                To send a message to another user, navigate to the messaging section of the application, find the user you want to message, and click/tap on their profile. Then, look for the option to send a message and type your message before sending it.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}

export const bloggiosMessagingHelpData = [
    {
        id: 1,
        title: 'How can I access the messaging support feature within the application?',
        details: getHowCanIAccessMessagingSupportFeature()
    },
    {
        id: 2,
        title: 'Is there a limit to the message length I can send in the messaging section?',
        details: getMessagelimitICanSend()
    },
    {
        id: 3,
        title: 'Can I have multiple ongoing conversations simultaneously in the messaging section?',
        details: getMultipleOngoingConversations()
    },
    {
        id: 4,
        title: 'Are there specific hours or times when the messaging section is available?',
        details: GetSpecificHour()
    },
    {
        id: 5,
        title: 'How do I send a message to another user??',
        details: getHowDoISendMessage()
    }
]