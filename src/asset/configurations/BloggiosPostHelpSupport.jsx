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

const getCreateNewPost = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            <Bg.UnorderedList>
                <li><strong>Navigate to Bloggios: </strong>Visit <Bg.RouterLink
                    to={{pathname: 'Bloggios.cloud/post'}}>Here</Bg.RouterLink> to access the Post page.
                </li>

                <li>
                <strong>Provide Content:</strong> Fill in all the required information such as title, description, and any media or attachments in the provided fields.
                </li>

                <li>
                <strong>Review Your Post:</strong> Take a moment to review the content you've entered to ensure it's accurate and engaging.
                </li>

                <li>
                <strong>Publish Your Post:</strong> Once satisfied, click on the publish button to share your post with the community.
                </li>

                <li>
                <strong>Consider Recommendations (Optional):</strong> If any recommendations or suggestions are provided, consider incorporating them to enhance your post.
                </li>

                <li>
                <strong>Confirmation:</strong> After publishing, you'll receive a confirmation message, and your post will be visible to others in the community.
                </li>
            </Bg.UnorderedList>
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getPostFeature = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
                The post feature in our application enables users to create and share content with the community. It serves as a platform for users to express their thoughts, share experiences, ask questions, and provide valuable insights on various topics related to software development.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getContentCanIShare = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            You can share a wide range of content through the post feature, including text-based posts, images, code snippets, links to articles or resources and more. This versatility allows users to convey their ideas effectively and engage with the community in various formats.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getCanICustomizeTheVisibility = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            <strong>No</strong>You don't have authority over customizing the visibility of your posts.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const getEngageWithUserPost = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
                <strong>Yes,</strong>You can engage with other users' posts by liking, commenting, or sharing them. Simply click on the respective buttons below the post to express your reaction, leave a comment, or share the post with your followers.
            </Bg.Paragraph>
        </Bg.Wrapper>
    )
}
const getAnyGuidelinesForPost = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
            While we encourage freedom of expression and creativity, we have community guidelines in place to ensure a positive and respectful environment for all users. Please refrain from posting content that is offensive, illegal, or violates our terms of service. Any such content may be removed, and repeat offenders may face account suspension or termination
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}
const GetHowCanIDicoverNewPost = () => {
    return(
        <Bg.Wrapper>
            <Bg.Paragraph>
                 You can discover new posts and explore content from other users by browsing the "Explore" or "Discover" section of the application. Here, you'll find a curated selection of trending posts, popular topics, and recommendations based on your interests and activity.
            </Bg.Paragraph>

            <MoreInformation/>
        </Bg.Wrapper>
    )
}

export const bloggiosPostHelpSupport = [
    {
        Id: 1,
        title: 'How do I create a new post in the application?',
        details: getCreateNewPost()
    },
    {
        id: 2,
        title: 'What is the post feature in your application?',
        details: getPostFeature()
    },
    {
        id: 3,
        title: 'What types of content can I share through the post feature?',
        details: getContentCanIShare()
    },
    {
        id: 4,
        title: 'Can I customize the visibility of my posts?',
        details: getCanICustomizeTheVisibility()
    },
    {
        id: 5,
        title: 'How can I engage with other users posts?',
        details: getEngageWithUserPost()
    },
    {
        id: 6,
        title: 'Are there any guidelines or restrictions on the content I can post?',
        details: getAnyGuidelinesForPost()

    },
    {
        id: 7,
        title: 'How can I discover new posts and explore content from other users?',
        details: GetHowCanIDicoverNewPost()
    }
]
