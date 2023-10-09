import React, { useState, useEffect } from 'react';
import './form.css'; // Import the CSS file

function SalesRegionForm() {
  const [fieldName, setFieldName] = useState('');
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');
  const [order, setOrder] = useState('Ascending'); // Initialize the state for the "Order" dropdown
  const [choices, setChoices] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value);
    localStorage.setItem('fieldName', e.target.value);
  };

  const handleMultiSelectChange = (e) => {
    setIsMultiSelect(e.target.checked);
    localStorage.setItem('isMultiSelect', e.target.checked);
  };

  const handleDefaultValueChange = (e) => {
    setDefaultValue(e.target.value);
  };

  const handleChoicesChange = (e) => {
    setChoices(e.target.value);
    localStorage.setItem('choices', e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };
    // Use `useEffect` to load form data from localStorage when the component mounts
    useEffect(() => {
        const savedFieldName = localStorage.getItem('fieldName');
        if (savedFieldName) {
          setFieldName(savedFieldName);
        }
    
        const savedIsMultiSelect = localStorage.getItem('isMultiSelect');
        if (savedIsMultiSelect) {
          setIsMultiSelect(savedIsMultiSelect === 'true'); // Convert to boolean
        }
    
        const savedDefaultValue = localStorage.getItem('defaultValue');
        if (savedDefaultValue) {
          setDefaultValue(savedDefaultValue);
        }
    
        const savedOrder = localStorage.getItem('order');
        if (savedOrder) {
          setOrder(savedOrder);
        }
    
        const savedChoices = localStorage.getItem('choices');
        if (savedChoices) {
          setChoices(savedChoices);
        }
    
      }, []); // The empty dependency array ensures this runs once on component mount
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate choices
    const choiceArray = choices.split('\n').map((choice) => choice.trim());
    
    if (choiceArray.length === 0) {
      setValidationError('Please provide at least one choice.');
      return;
    }
    
    if (choiceArray.length > 50) {
      setValidationError('There cannot be more than 50 choices.');
      return;
    }
    
    if (choiceArray.some((choice, index) => choiceArray.indexOf(choice) !== index)) {
      setValidationError('Duplicate choices are not allowed.');
      return;
    }
    
    if (!choiceArray.includes(defaultValue)) {
      // Add the default value to choices
      choiceArray.push(defaultValue);
    }

    // Clear any previous validation errors
    setValidationError('');

    // Create JSON object
    const formData = {
      fieldName,
      isMultiSelect,
      defaultValue,
      order,
      choices: choiceArray,
    };

    // Log JSON object
    console.log('Form Data:', formData);

    // Simulate a POST request (replace with actual API call)
    try {
      const response = await fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear the form
        // setFieldName('');
        // setIsMultiSelect(false);
        // setDefaultValue('');
        // setOrder('Ascending');
        // setChoices('');
      } else {
        console.error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    localStorage.removeItem('fieldName');
    localStorage.removeItem('isMultiSelect');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fieldName">Label</label>
        <input
          type="text"
          id="fieldName"
          name="fieldName"
          value={fieldName}
          onChange={handleFieldNameChange}
          placeholder="Sales Region"
          required
        />
      </div>

      <div>
        <label htmlFor="isMultiSelect">Multi-select</label>
        <div>
          <input
            type="checkbox"
            id="isMultiSelect"
            name="isMultiSelect"
            checked={isMultiSelect}
            onChange={handleMultiSelectChange}
          />
          <span className="required-text">A Value is required</span>
        </div>
      </div>

      <div>
        <label htmlFor="defaultValue">Default Value</label>
        <input
          type="text"
          id="defaultValue"
          name="defaultValue"
          value={defaultValue}
          onChange={handleDefaultValueChange}
          placeholder="Enter default value"
        />
      </div>

      <div>
        <label htmlFor="choices">Choices</label>
        <textarea
          id="choices"
          name="choices"
          value={choices}
          onChange={handleChoicesChange}
          required
        />
      </div>

      <div>
        <label htmlFor="order">Order</label>
        <select
          id="order"
          name="order"
          value={order}
          onChange={handleOrderChange}
        >
          <option value="Ascending">Display Choices in Alphabetical Order</option>
          <option value="Descending">Display Choices in the order they were entered</option>
        </select>
      </div>

      {validationError && <div className="error-message">{validationError}</div>}

      <div className="buttons-container">
        <button type="submit">Save changes</button>
        <button
            type="button"
            onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}>
        Clear Form
        </button>
      </div>
    </form>
  );
}

export default SalesRegionForm;
