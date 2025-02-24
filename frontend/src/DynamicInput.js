import React, { useState } from 'react';

const DynamicInput = () => {
  const [inputs, setInputs] = useState([{ value: '' }]);

  const handleChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  const handleAdd = () => {
    setInputs([...inputs, { value: '' }]);
  };

  const handleRemove = (index) => {
    if (inputs.length > 1) {
      const values = [...inputs];
      values.splice(index, 1);
      setInputs(values);
    }
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleChange(index, event)}
          />
          {inputs.length > 1 && (
            <button type="button" onClick={() => handleRemove(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAdd}>
        Add Input
      </button>
    </div>
  );
};

export default DynamicInput;