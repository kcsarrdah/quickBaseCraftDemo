import React, { useState, useEffect } from 'react';
import './form.css';
import Field from './Field/Field';
import Checkbox from './CheckBox/CheckBox';
import TextArea from './TextArea/TextArea';
import Select from './SelectComponent/SelectComponent';
import SubmitButton from './SubmitButton/SubmitButton';
import { FieldService } from '../MockService';

function FieldBuilderForm() {

    const orderOptions = [
        { label: 'Display Choices in Alphabetical Order', value: 'Choice1' },
        { label: 'Display Choices in the order they were entered', value: 'Choice2' },
    ];

    //States
    const [validationErrors, setValidationErrors] = useState([]);
    const [fieldValue, setFieldValue] = useState('');
    const [isMultiSelect, setIsMultiSelect] = useState(false);
    const [defaultValue, setDefaultValue] = useState('');
    const [choices, setChoices] = useState('');
    const [order, setOrder] = useState('Choice1');

    const handleInputChange = (event) => {
      const value = event.target.value;
      setFieldValue(value);
      localStorage.setItem('fieldName', value);  // Changed from fieldValue to 'fieldName' as the key
  };
  

    const handleMultiSelectChange = (event) => {
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
      const savedValue = localStorage.getItem('fieldName');  // Using 'fieldName' as the key
      if (savedValue !== null) {
          setFieldValue(savedValue);
      }
  }, []);
  


    const validateForm = () => {
        const errors = [];

        const choicesVal = document.getElementById('choices').value;
        if (!choicesVal.trim()) {
            errors.push('Choices cannot be empty.');
        }
        const choiceArray = choicesVal.split('\n')
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        const defaultInput = document.getElementById('defaultValue');
        const choicesTextArea = document.getElementById('choices');
        const choicesList = choicesTextArea.value.split('\n');
        const defaultVal = defaultInput.value.trim();
        if (defaultVal && !choicesList.includes(defaultVal)) {
            choicesList.push(defaultVal);
            choicesTextArea.value = choicesList.join('\n');
        }

        if (errors.length === 0) {
          // Create a JSON object based on the form data
          const fieldData = {
            label: fieldValue,
            multiSelect: isMultiSelect,
            defaultValue: defaultVal, // Changed to defaultVal
            choices: choicesList, // Changed to choicesList
            order: order
        };
        console.log('Field Data:', fieldData);

        try {
          const response = await FieldService.saveField(fieldData);
          // Handle the response as needed
          console.log(response);
      } catch (error) {
          // Handle any errors that occur during the API call
          console.error('Error:', error);
      }

        } else {
            setValidationErrors(errors);
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
                    value={fieldValue}
                    onChange={handleInputChange}
                />

                <div>
                  <label htmlFor="Type">Type</label>
                <Checkbox
                    label="Multi-select"
                    id="isMultiSelect"
                    name="isMultiSelect"
                    checked={isMultiSelect}
                    onChange={handleMultiSelectChange}
                />
                </div>

                <Checkbox
                    label="Multi-select"
                    id="isMultiSelect"
                    name="isMultiSelect"
                    checked={isMultiSelect}
                    onChange={handleMultiSelectChange}
                />
                <Field
                    label="Default Value"
                    id="defaultValue"
                    name="defaultValue"
                    type="text"
                    placeholder="Enter default value"
                    value={defaultValue}
                    onChange={handleDefaultValueChange}
                />
                <TextArea
                    label="Choices"
                    id="choices"
                    name="choices"
                    required
                    rows={4}
                    cols={50}
                    value={defaultValue}
                    onChange={handleChoicesChange}
                />
                <Select label="Order" id="order" name="order" options={orderOptions} onChange={handleOrderChange}/>
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
