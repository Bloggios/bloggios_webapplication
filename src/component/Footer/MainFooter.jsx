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

import React, {lazy, Suspense} from "react";
import styled from "styled-components";
import FallbackLoader from "../loaders/fallbackLoader";
import {colors} from "../../styles/Theme";
import {useNavigate} from "react-router-dom";
import {PRIVACY_POLICY, TERMS_CONDITION} from "../../constant/pathConstants";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NewsletterSection = lazy(() =>
    import("../miscellaneous/NewsletterSection")
);
const FooterSections = lazy(() => import("../miscellaneous/FooterSections"));

const MainFooter = () => {

    const navigate = useNavigate();
    const {width} = useWindowDimensions();

    return (
        <Wrapper>
            <Suspense
                fallback={
                    <FallbackLoader width={"100%"} height={"50px"} thickness={"4px"}/>
                }
            >
                <NewsletterSection/>
            </Suspense>

            <Suspense fallback={<FallbackLoader width={"100%"} height={"160px"}/>}>
                <FooterSections/>
            </Suspense>

            <Summary>
                <Divider/>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: width > 500 ? 'row' : 'column',
                        justifyContent: "space-around",
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <span>Copyright © 2024 | Bloggios</span>

                    <TermsPrivacy>
                        <span onClick={() => navigate(TERMS_CONDITION)}>Terms and Condition</span>
                        <span onClick={() => navigate(PRIVACY_POLICY)}>Privacy Policy</span>
                    </TermsPrivacy>
                </div>
            </Summary>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px 16vw 0 16vw;
    margin-top: 40px;
    gap: 40px;

    @media (max-width: 1000px) {
        padding: 40px 20px 10px 20px;
    }

    @media (max-width: 1000px) {
        padding: 28px 10px 10px 10px;
    }
`;

const Divider = styled.div`
    width: 80%;
    display: flex;
    margin: 10px 0;
    align-items: center;
    align-self: center;
    border-top: 1px solid #8192ff65;
`;

const Summary = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;

    & span {
        font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
        letter-spacing: 1px;
        font-weight: 400;
        color: ${colors.white80};
    }
`;

const TermsPrivacy = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: underline;

    & span {
        color: ${colors.white80};
        cursor: pointer;

        &:hover,
        &:active {
            color: ${colors.white100};
        }
    }
`;

export default MainFooter;
