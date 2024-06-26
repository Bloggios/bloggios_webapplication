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

import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isAdded: false,
        name: null
    },
    reducers: {
        setProfile: (state, action) => {
            const { isAdded, name, bio, email, profileImage, coverImage, followers, following, userId, link, isBadge, profileBadges, profileTag } = action.payload;
            state.isAdded = isAdded;
            state.name = name;
            state.bio = bio;
            state.email = email;
            state.profileImage = profileImage;
            state.coverImage = coverImage;
            state.followers = followers;
            state.following = following;
            state.userId = userId;
            state.link = link;
            state.isBadge = isBadge;
            state.profileBadges = profileBadges;
            state.profileTag = profileTag
        },
        clearProfile: (state) => {
            state.isAdded = false;
            state.name = null;
        }
    }
});

export { profileSlice }

export const { setProfile, clearProfile } = profileSlice.actions;