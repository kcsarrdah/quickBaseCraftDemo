import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function bootstraptextBox({ label, id, onChoiceChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const rawValue = event.target.value;

        // Split the input based on spaces or newlines to get individual words/choices
        const choicesArray = rawValue.split(/[\s\n]+/);

        // Go through each choice and check its length
        const processedChoices = choicesArray.map(choice => {
            if (choice.length > 40) {
                // Separate the valid part and the excess part
                const validPart = choice.slice(0, 40);
                const excessPart = choice.slice(40);

                // Return the choice with a span around the excess characters
                return validPart + "<span style='color: red;'>" + excessPart + "</span>";
            }
            return choice;
        });

        // Join the choices back together into a single string
        const processedValue = processedChoices.join(' ');
        setInputValue(processedValue);

        // Provide the raw input value to the parent component for further processing or validation
        onChoiceChange(rawValue);
    };

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                className="form-control"
                id={id}
                value={inputValue}
                onChange={handleInputChange}
                dangerouslySetInnerHTML={{ __html: inputValue }}
            />
        </div>
    );
}

export default bootstraptextBox;
