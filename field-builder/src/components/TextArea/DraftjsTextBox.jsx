import React, { useState, useEffect } from 'react';
import { Editor, EditorState, Modifier, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

function HighlightedEditor({ label, id, name, required, rows, cols, onChange }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const maxCharacters = 40;

    const editorStyles = {
        border: '1px solid black',
        padding: '10px',
        minHeight: `${rows * 24}px`, // using rows to set the height
        width: `${cols * 10}px`     // using cols to set the width
    };

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

        const finalEditorState = hasChanges ? EditorState.push(state, newContent, 'change-inline-style') : state;
        setEditorState(finalEditorState);
        localStorage.setItem(id, finalEditorState.getCurrentContent().getPlainText());

        // Call the passed-in function from the parent component
        if (onChange) {
            onChange(finalEditorState);
        }
    };

    useEffect(() => {
        const savedValue = localStorage.getItem(id);
        if (savedValue) {
            const contentState = ContentState.createFromText(savedValue);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, [id]);

    return (
        <div className="row form-group align-items-center">
            <label className="col-md-2" htmlFor={id}>{label}</label>
            <div className="col-md-10">
                <div style={editorStyles}>
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
            </div>
        </div>
    );
}

export default HighlightedEditor;
