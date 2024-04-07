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

import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {clearSnackbar} from "../state/snackbarSlice";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const useBloggiosSnackbar = (audioRef) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { snackbarType, message, isSnackbar, path } = useSelector((state) => state.snackbar);

    const handleSnackbarAction = () => {
        if (path) {
            navigate(path);
        }
    }

    const getToast = useCallback(() => {
        switch (snackbarType.toLowerCase()) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "warning":
                toast.warning(message)
                break;
            case "Info":
                toast.info(message);
                break;
            case "notification":
                toast(message, {
                    action: path && {
                        label: 'View',
                        onClick: handleSnackbarAction
                    }
                });
                break;
            default:
                toast(message);
        }
    }, [snackbarType, message, path]);

    const handleSnackbar = useCallback(() => {
        if (isSnackbar) {
            getToast();
            if (snackbarType === 'notification' && audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.error('Failed to play notification sound:', error);
                });
            }
            dispatch(clearSnackbar());
        }
    }, [isSnackbar, dispatch, getToast, snackbarType, audioRef.current]);

    useEffect(() => {
        handleSnackbar();
    }, [handleSnackbar]);
};

export default useBloggiosSnackbar;