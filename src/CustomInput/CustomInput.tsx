// custom input component using forwardRef with parent component can get the value also 
//define custom input props type

import React, { forwardRef } from 'react';
export type CustomInputProps = {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;


}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, type, value, onChange, ...rest }, ref) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      };
  
      return (
        <>
          <input
           {...rest}
            type={type}
            value={value}
            onChange={handleChange}
            ref={ref}
           
          />
        </>
      );
    }
  );
  
export default CustomInput;