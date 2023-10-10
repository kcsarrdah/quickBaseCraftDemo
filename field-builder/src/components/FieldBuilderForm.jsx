import React, { useState, useEffect } from 'react';
import './form.css'; // Import the CSS file
import Field from './Field/Field';
import Checkbox from './CheckBox/CheckBox';
import TextArea from './TextArea/TextArea';
import Select from './SelectComponent/SelectComponent';
import SubmitButton from './SubmitButton/SubmitButton';

function FieldBuilderForm() {

  const orderOptions = [
    { label: 'Display Choices in Alphabetical Order', value: 'Choice1' },
    { label: 'Display Choices in the order they were entered', value: 'Choice2' },
  ];

  const [validationErrors, setValidationErrors] = useState([]);
  const [fieldValue, setFieldValue] = useState('');
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');
  const [choices, setChoices] = useState('');
  const [order, setOrder] = useState('Choice1');

  // Function to handle input changes
  const handleInputChange = (event) => {
    const value = event.target.value;
    setFieldValue(value);
    localStorage.setItem(fieldValue, value); // Save the value to localStorage
  };

  const handleMultiSelectChange = (event) => {
    const value = event.target.value;
    setIsMultiSelect(event.target.checked);
    localStorage.setItem('isMultiSelect', event.target.checked);
  };

  const handleDefaultValueChange = (event) => {
    setDefaultValue(event.target.value);
  };

  const handleChoicesChange = (event) => {
    const newChoices = event.target.value;
    setChoices(newChoices);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleClearForm = () => {
    localStorage.clear();
    window.location.reload();
  };


  useEffect(() => {
    const savedValue = localStorage.getItem(fieldValue);
    if (savedValue !== null) {
      setFieldValue(savedValue);
    }
  }, [fieldValue]);
  

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
          value={fieldValue} // Set the input value from state
        onChange={handleInputChange} // Handle input changes
        />

        <Checkbox 
        label="Multi-select" 
        id="isMultiSelect" 
        name="isMultiSelect"  
        checked={isMultiSelect}
        onChange={handleMultiSelectChange}/>

        <Field
          label="Default Value"
          id="defaultValue"
          name="defaultValue"
          type="text"
          placeholder="Enter default value"
          value={defaultValue}
          onChange={handleDefaultValueChange}
        />

        <TextArea label="Choices" id="choices" name="choices" required rows={4} cols={50} value={defaultValue}
          onChange={handleChoicesChange}/>


        <Select label="Order" id="order" name="order" options={orderOptions} />

        <div className="buttons-container">
          
        <SubmitButton id="SaveChanges" onClick={handleSubmit} loading={false}>
          Save Changes
        </SubmitButton>

        <SubmitButton onClick={handleClearForm} loading={false}>
          Clear Form
        </SubmitButton>


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
