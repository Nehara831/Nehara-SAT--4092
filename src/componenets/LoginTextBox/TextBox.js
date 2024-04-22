import React, { useState } from 'react';
import './TextBox.css';


const TextBox = ( {initialValue }) => {
    const [text, setText] = useState(initialValue);
  
    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    const handleFocus = () => {
      if (text == initialValue) {
        setText('');
      }
    };
  return (
    <>
    <div className='TextBoxOuter'>
    <div className='TextBoxInner'>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>

    </div>
    </>



   

    
    
  );
   








    
}

export default TextBox;