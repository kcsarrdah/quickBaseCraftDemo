import React, { useState } from 'react';
import './form.css'; // Import the CSS file
import Field from './Field/Field';
import Checkbox from './CheckBox/CheckBox';
import TextArea from './TextArea/TextArea';
import Select from './SelectComponent/SelectComponent';

function FieldBuilderForm() {
  const orderOptions = [
    { label: 'Display Choices in Alphabetical Order', value: 'Choice1' },
    { label: 'Display Choices in the order they were entered', value: 'Choice2' },
  ];

  const [validationErrors, setValidationErrors] = useState([]);
  

  const validateForm = () => {
    const errors = [];

    // Check for duplicate choices
    const choices = document.getElementById('choices').value;

    const choiceArray = choices.split('\n')
      .map((choice) => choice.trim()) // Remove leading and trailing whitespace
      .filter((choice) => choice !== ''); // Filter out empty choices;

    const uniqueChoices = new Set(choiceArray);
    if (choiceArray.length !== uniqueChoices.size) {
      errors.push('Duplicate choices are not allowed.');
    }

    // Check if there are more than 50 choices
    if (choiceArray.length > 50) {
      errors.push('There cannot be more than 50 choices.');
    }

    // Check other form validation rules as needed

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length === 0) {
      // Continue with form submission or other actions
      
      
    } else {
      // Display validation errors to the user
      setValidationErrors(errors);
    }

    // Check if the default value is one of the choices
    const defaultInput = document.getElementById('defaultValue');
    const choicesTextArea = document.getElementById('choices');
    const choices = choicesTextArea.value.split('\n');
    const defaultValue = defaultInput.value.trim();

    if (defaultValue && !choices.includes(defaultValue)) {
      // Add the default value to the list of choices
      choices.push(defaultValue);
      choicesTextArea.value = choices.join('\n');
    }

    const formData = {
        label: document.getElementById('fieldName').value,
        isMultiSelect: document.getElementById('isMultiSelect').checked,
        defaultValue: document.getElementById('defaultValue').value,
        choices: document.getElementById('choices').value
          .split('\n')
          .map((choice) => choice.trim())
          .filter((choice) => choice !== ''),
        order: document.getElementById('order').value,
      };

      // Log the JSON data to the console
      console.log(formData);

      // Post the JSON data to the specified endpoint
      try {
        const response = await fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Handle a successful response if needed
          console.log('Data posted successfully!');
        } else {
          // Handle an error response if needed
          console.error('Error posting data:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while posting data:', error);
      }
  };

  return (
    <div className="form-container">
      <div className="form-title">Field Builder</div>
      <form onSubmit={handleSubmit}>
        <Field
          label="Label"
          id="fieldName"
          name="fieldName"
          type="text"
          placeholder="Sales Region"
          required
        />

        <Checkbox label="Multi-select" id="isMultiSelect" name="isMultiSelect" />

        <Field
          label="Default Value"
          id="defaultValue"
          name="defaultValue"
          type="text"
          placeholder="Enter default value"
        />

        <TextArea label="Choices" id="choices" name="choices" required rows={4} cols={50} />

        <Select label="Order" id="order" name="order" options={orderOptions} />

        <div className="buttons-container">
          
          <button type="submit">Save Changes</button>

          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear Form
          </button>

        </div>
      </form>

      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FieldBuilderForm;
