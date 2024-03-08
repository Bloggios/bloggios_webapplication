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

import bloggios_logo from '../asset/svg/bg_logo_black.svg'

const RESERVED_KEYWORDS = 'Bloggios, Rohit Parihar, Rohit Parihar Bloggios, Rohit Bloggios, Bloggios Spring Boot, Bloggios Spring React Application, Bloggios Microservices, Concatenating Perceptions, Bloggios, Bloggios Social Media, Social Media, Bloggios Q & A, Q & A, Encrypted Chatting, Bloggios Chatting, Bloggios Encrypted Chatting, Bloggios IT Solutions, IT Solutions, Bloggios Software development, Software development, IT support, Bloggios IT Support, Bloggios SEO, SEO, Bloggios Marketing, Bloggios Connection platform, Connection Platform, web developer, technology, innovation, online community';

const seoConfigs = {
    signup: {
        title: 'Signup Bloggios',
        description: 'Sign up for a Bloggios account and unlock the full potential of our platform. Enjoy Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions. Join our community and thrive.',
        keywords: `${RESERVED_KEYWORDS}, Bloggios Signup, Bloggios Create Account, Start Concatenating Perceptions, Create account on Bloggios, social media registration, IT Solutions registration, encrypted chatting registration, online community registration`,
        author: 'Rohit Parihar',
        ogType: 'website',
        ogTitle: 'Sign Up for Bloggios - Empowering Connections and IT Solutions',
        ogDescription: 'Sign up for a Bloggios account and unlock the full potential of our platform. Enjoy Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions. Join our community and thrive.',
        ogImage: bloggios_logo,
        ogUrl: 'https://bloggios.com/signup'
    },
    login: {
        title: 'Login Bloggios',
        description: 'Login to your Bloggios account and enjoy Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions. Connect and engage with our vibrant community.',
        keywords: `${RESERVED_KEYWORDS}, Bloggios Login, Bloggios Social Login, Continue Concatenating Perceptions, Login Bloggios`,
        author: 'Rohit Parihar',
        ogType: 'website',
        ogTitle: 'Login to Bloggios - Empowering Connections and IT Solutions',
        ogDescription: 'Login to your Bloggios account and enjoy Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions. Connect and engage with our vibrant community.',
        ogImage: bloggios_logo,
        ogUrl: 'https://bloggios.com/login'
    },
    homePage: {
        title: 'Bloggios - Empowering Connections, Inspiring Solutions',
        description: "Join Bloggios' vibrant social community. Share, engage, and build meaningful connections with like-minded individuals.",
        keywords: `${RESERVED_KEYWORDS}, Bloggios Home, Bloggios Social Login, Continue Concatenating Perceptions`,
        author: 'Rohit Parihar',
        ogType: 'website',
        ogTitle: 'Welcome to Bloggios - Empowering Connections and IT Solutions',
        ogDescription: 'Get Started with Bloggios and explore the dynamic platform offering Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions including Software Development, Support, SEO, and Marketing. Join us to connect and grow!',
        ogImage: bloggios_logo,
        ogUrl: 'https://bloggios.com'
    },
    authHomePage: {
        title: 'Bloggios Home',
        description: "Explore Bloggios, the dynamic platform offering Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions including Software Development, Support, SEO, and Marketing. Join us to connect and grow!",
        keywords: `${RESERVED_KEYWORDS}, Bloggios Home, Create Post, Bloggios Posts, Bloggios Hashtags, #bloggios, Bloggios User Posts, User Posts, All Bloggios Posts, Bloggios data, Bloggios Profile, User Profile, Edit Profile`,
        author: 'Rohit Parihar',
        ogType: 'website',
        ogTitle: 'Welcome to Bloggios - Empowering Connections and IT Solutions',
        ogDescription: 'Explore Bloggios, the dynamic platform offering Social Media, Q & A features, Real-time encrypted chatting, and comprehensive IT Solutions including Software Development, Support, SEO, and Marketing. Join us to connect and grow!',
        ogImage: bloggios_logo,
        ogUrl: 'https://bloggios.com'
    }
}

export default seoConfigs;