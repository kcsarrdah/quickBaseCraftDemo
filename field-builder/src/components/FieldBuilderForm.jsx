import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Field from './Field/Field';
import Checkbox from './CheckBox/CheckBox';
import Select from './SelectComponent/SelectComponent';
import SubmitButton from './SubmitButton/SubmitButton';
import { FieldService } from '../Utils/MockService';
import { EditorState, ContentState } from 'draft-js';
import HighlightedEditor from './TextArea/DraftjsTextBox';
import { validateForm } from '../Utils/fieldValidations'


function FieldBuilderForm() {

    const orderOptions = [
        { label: 'Display Choices in Alphabetical Order', value: 'Choice1' },
        { label: 'Display Choices in the order they were entered', value: 'Choice2' },
    ];

    // Hooks Setup
    const [validationErrors, setValidationErrors] = useState([]);
    const [fieldValue, setFieldValue] = useState('');
    const [isMultiSelect, setIsMultiSelect] = useState(false);
    const [defaultValue, setDefaultValue] = useState('');
    const [order, setOrder] = useState('Choice1');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [skills, setSkills] = useState([]);


    const handleInputChange = (event) => {
        const value = event.target.value;
        setFieldValue(value);
        localStorage.setItem('fieldName', value);
        console.log(value)
    };

    const handleMultiSelectChange = (event) => {
        setIsMultiSelect(event.target.checked);
        localStorage.setItem('isMultiSelect', event.target.checked);
    };

    const handleDefaultValueChange = (event) => {
        setDefaultValue(event.target.value);
    };

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
        console.log(order)
    };

    const handleClearForm = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };


    useEffect(() => {
        const savedFieldName = localStorage.getItem('fieldName');
        const savedIsMultiSelect = localStorage.getItem('isMultiSelect') === 'true';
        const savedEditorContent = localStorage.getItem('choices'); 
    
        if (savedFieldName) {
            setFieldValue(savedFieldName);
        }
        if (savedIsMultiSelect) {
            setIsMultiSelect(savedIsMultiSelect);
        }
    
        if (savedEditorContent) {
            const contentState = ContentState.createFromText(savedEditorContent);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);

        const defaultInput = document.getElementById('defaultValue');
        const defaultVal = defaultInput.value.trim();

        const choicesArray =  skills;

        //if the default value added is not in the list added, add them to the list
        if (defaultVal && !choicesArray.includes(defaultVal)) {
            choicesArray.push(defaultVal);
        }

        //trim all chices above 40 characters
        const cleanedArray = choicesArray.map(choice => choice.substring(0, 40)).filter(item => item !== "");
        const errors = validateForm(cleanedArray, document.getElementById('fieldName').value);


        if (errors.length === 0) {
            // Create a JSON object based on the form data

            const checkbox = document.getElementById('isMultiSelect');
            const value = checkbox.checked;
            const fieldData = {
                label: document.getElementById('fieldName').value.trim(),
                multiSelect: value,
                defaultValue: defaultVal,
                choices: cleanedArray,
                order: document.getElementById('order').value
            };
            console.log('Field Data:', fieldData);

            try {
                const response = await FieldService.saveField(fieldData);
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }

        } else {
            setValidationErrors(errors);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-info border-opacity-10 ">
                        <div className="card-header bg-info bg-opacity-10 text-black text-left mb-4">Field Builder</div>
                        <form onSubmit={handleSubmit} className="p-4 mb-4">
                            <div className="mb-5 mt-5 ms-2 me-2">
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
                            </div>
                            <div className="mb-5 mt-5 ms-2 me-2">
                                <Checkbox
                                    label="Multi-select"
                                    id="isMultiSelect"
                                    name="isMultiSelect"
                                    checked={isMultiSelect}
                                />
                            </div>
                            <div className="mb-5 mt-5 ms-2 me-2">
                                <Field
                                    label="Default Value"
                                    id="defaultValue"
                                    name="defaultValue"
                                    type="text"
                                    placeholder="Enter default value"
                                    value={defaultValue}
                                    onChange={handleDefaultValueChange}
                                />
                            </div>

                            <div className="mb-5 mt-5 ms-2 me-2">
                                <HighlightedEditor
                                    label="Choices"
                                    id="choices"
                                    name="choices"
                                    required
                                    rows={4}
                                    cols={40}
                                    editorState={editorState}
                                    onChange={handleEditorStateChange}
                                    skills={skills}
                                    setSkills={setSkills}        
                                />
                            </div>
                            
                            <div className="mb-5 mt-5 ms-2 me-2">
                                <Select label="Order" id="order" name="order" options={orderOptions} onChange={handleOrderChange} />
                            </div>
                            <div className="d-flex justify-content-center mb-5 mt-5 ms-3 me-3">
                                <SubmitButton id="SaveChanges" onClick={handleSubmit} loading={false} className="btn btn-success p">
                                    Save Changes
                                </SubmitButton>
                                <span className='m-2'>Or</span>
                                <SubmitButton onClick={handleClearForm} loading={false} className="btn btn-danger m">
                                    Clear Form
                                </SubmitButton>
                            </div>
                        </form>

                        {validationErrors.length > 0 && (
                            <div className="alert alert-danger mt-3">
                                <ul>
                                    {validationErrors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FieldBuilderForm;
