import React, { useState, useEffect } from 'react';
import { Editor, EditorState, Modifier, ContentState, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './DraftjsTextBox.css';

function HighlightedEditor({ label, id, name, required, rows, cols, onChange, skills, setSkills}) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const maxCharacters = 40;  

    const handleInternalEditorChange = (state) => {
        let newContent = state.getCurrentContent();
        let hasChanges = false;

        newContent.getBlockMap().forEach((block) => {
            const blockText = block.getText();
            let charCount = 0;

            for (let i = 0; i < blockText.length; i++) {
                const char = blockText[i];

                if (char === '\n') {
                    charCount = 0;
                    continue;
                }

                charCount++;

                const currentStyles = block.getInlineStyleAt(i);
                const shouldHighlight = charCount > maxCharacters;

                if (shouldHighlight && !currentStyles.has('HIGHLIGHT')) {
                    const selection = state.getSelection().merge({
                        anchorKey: block.getKey(),
                        focusKey: block.getKey(),
                        anchorOffset: i,
                        focusOffset: i + 1,
                    });

                    newContent = Modifier.applyInlineStyle(newContent, selection, 'HIGHLIGHT');
                    hasChanges = true;
                } else if (!shouldHighlight && currentStyles.has('HIGHLIGHT')) {
                    const selection = state.getSelection().merge({
                        anchorKey: block.getKey(),
                        focusKey: block.getKey(),
                        anchorOffset: i,
                        focusOffset: i + 1,
                    });

                    newContent = Modifier.removeInlineStyle(newContent, selection, 'HIGHLIGHT');
                    hasChanges = true;
                }
            }
        });

        const currentText = newContent.getPlainText();
        const lines = currentText.split('\n');
        let lastValue = lines[lines.length - 2]?.trim();
        if (lastValue && lastValue.length > maxCharacters) {
            lastValue = lastValue.substring(0, maxCharacters);
        }

        if (lastValue) {
            setSkills(prevSkills => {
                if (!prevSkills.includes(lastValue)) {  // Check if lastValue is not already in the skills
                    const updatedSkills = [...prevSkills, lastValue];
                    localStorage.setItem(id, updatedSkills.join('\n'));  // Store updated skills to local storage
                    return updatedSkills;
                }
                else alert("The Choices Field Cannot Contain Duplicate Values");
                return prevSkills;  // if the lastValue is already present, return the previous state
            });

            // Clear the editor
            let newEditorState = EditorState.createEmpty();
            newEditorState = moveSelectionToEnd(newEditorState);
            setEditorState(newEditorState);
        } else {
            const finalEditorState = hasChanges ? EditorState.push(state, newContent, 'change-inline-style') : state;
            setEditorState(finalEditorState);
        }
    };
    function moveSelectionToEnd(editorState) {
        const content = editorState.getCurrentContent();
        const blockMap = content.getBlockMap();
    
        const key = blockMap.last().getKey();
        const length = blockMap.last().getLength();
    
        const selection = new SelectionState({
            anchorKey: key,
            anchorOffset: length,
            focusKey: key,
            focusOffset: length,
        });
    
        return EditorState.forceSelection(editorState, selection);
    }

    const removeSkill = (indexToRemove, event) => {
        event.preventDefault();  // Prevent default behavior
        event.stopPropagation(); // Stop the event from bubbling up
    
        setSkills(prevSkills => {
            const updatedSkills = prevSkills.filter((_, index) => index !== indexToRemove);
            localStorage.setItem(id, updatedSkills.join('\n'));  // Update local storage with new skills
            return updatedSkills;
        });
    };

    useEffect(() => {
        const savedValue = localStorage.getItem(id);
        if (savedValue) {
            const savedSkills = savedValue.split('\n').filter(skill => skill);
            setSkills(savedSkills);
        }
    }, [id]);

    return (
        <div className="row form-group align-items-center">
            <label className="col-md-2" htmlFor={id}>{label}</label>
            <div className="col-md-10">
                <div className="editorStyle" style={{ minHeight: `${rows * 24}px`, width: `${cols * 10}px` }}>
                    <Editor
                        id={id}
                        name={name}
                        required={required}
                        editorState={editorState}
                        onChange={handleInternalEditorChange}
                        customStyleMap={{
                            HIGHLIGHT: {
                                color: 'red',
                            },
                        }}
                    />
                </div>
                <div className="skillContainer">
                    {skills.map((skill, index) => (
                        <div key={index} className="skillChip">
                            {skill}
                            <button className="removeSkill" onClick={(event) => removeSkill(index, event)}>✖</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HighlightedEditor;
