import axios from "axios";
import {getTenTags} from "../restservices/postApi";
import {setSnackbar} from "../state/snackbarSlice";
import {dispatchError} from "./functions";

export const fetchTags = (value, setSuggestions) => {
    getTenTags(value)
        .then((response) => {
            if (response.data?.object) {
                const newTags = response.data.object.map(tagItem => ({
                    tagId: tagItem.tagId,
                    tag: tagItem.tag
                }));
                setSuggestions(newTags)
            }
        })
        .catch((error) => {
            dispatchError(error);
        });
}

export const handleSuggestionClick = (suggestion, inputValue, setInputValue, setShowSuggestions) => {
    const words = inputValue.split(' ');
    words[words.length - 1] = `${suggestion.tag}`;
    setInputValue(words.join(' '));
    setInputValue(prevState => prevState + " ");
    setShowSuggestions(false);
};

export const addHashTag = (
    showSuggestions, inputValue, setInputValue
) => {
    if (!showSuggestions) {
        if (inputValue.endsWith('#')) {
            setInputValue(inputValue.slice(0, -1)); // Remove the last character if it's a #
        } else {
            if (inputValue.endsWith(' ')) {
                setInputValue(inputValue + '#');
            } else {
                setInputValue(inputValue + ' #');
            }
        }
    }
}

export const validatePostData = (inputValue, dispatch, selectedImages) => {
    if (inputValue === '') {
        const message = "There is nothing to share in your Post";
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
        return true;
    } else if (selectedImages.length > 6) {
        const message = "You cannot add more than 5 Images";
        const snackBarData = {
            isSnackbar: true,
            message: message,
            snackbarType: 'Error',
        };
        dispatch(setSnackbar(snackBarData));
        return true;
    }
    return false;
}

export const handleImageChange = (event, setSelectedImages) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => {
        return {
            name: file.name,
            size: (file.size / 1024).toFixed(1),
            file,
        };
    });
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
};

export const handleImageUploadEvent = (imageRef) => {
    imageRef.current.click();
}

export const removeImage = (index, selectedImages, setSelectedImages) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
};