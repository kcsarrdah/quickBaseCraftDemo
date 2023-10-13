export const validateForm = (cleanedArray, fieldValue) => {
    const errors = [];

    if (!fieldValue.trim()) {
        errors.push('Label cannot be empty.');
    }


    const uniqueChoices = new Set(cleanedArray);
    if (cleanedArray.length !== uniqueChoices.size) {
        errors.push('Duplicate choices are not allowed.');
    }
    if (cleanedArray.length > 50) {
        errors.push('There cannot be more than 50 choices.');
    }
    return errors;
};
