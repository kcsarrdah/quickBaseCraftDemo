export const validateForm = (editorState, fieldValue) => {
    const errors = [];

    if (!fieldValue.trim()) {
        errors.push('Label cannot be empty.');
    }

    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();

    const choiceArray = text.split('\n')
        .map((choice) => choice.trim())
        .filter((choice) => choice !== '');

    const uniqueChoices = new Set(choiceArray);
    if (choiceArray.length !== uniqueChoices.size) {
        errors.push('Duplicate choices are not allowed.');
    }
    if (choiceArray.length > 50) {
        errors.push('There cannot be more than 50 choices.');
    }
    return errors;
};
