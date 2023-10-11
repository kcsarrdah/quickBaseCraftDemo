import React, { useState } from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

function HighlightedEditor({ label, id, name, required, rows, cols }) {
    const [textValue, setTextValue] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorChange = (state) => {
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
                const shouldHighlight = charCount > 40;
    
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
    
        if (hasChanges) {
            const newState = EditorState.push(state, newContent, 'change-inline-style');
            setEditorState(newState);
        } else {
            setEditorState(state);
        }
    };
    

    return (
        <div className="row form-group align-items-center">
      <label className="col-md-2" htmlFor={id}>
        {label}
      </label>
      <div className="col-md-10">
        <div style={{ border: '1px solid black', padding: '10px', minHeight: '100px' }}>
        <Editor
  id={id}
  name={name}
  required={required}
  rows={rows}
  editorState={editorState} // Use editorState internally
  onChange={handleEditorChange} // Handle changes internally
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
