import React from 'react';
import { FormContainer, InputWrapper, StyledInput, StyledLabel } from './InputStyles';

interface InputProps {
    label: string;
    type: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputForm: React.FC<InputProps> = ({ label, type, name, value, onChange }) => { 
    return(
        <>
            <InputWrapper>
                <StyledLabel>{label}</StyledLabel>
                <StyledInput type={type} name={name} value={value} onChange={onChange}/>
            </InputWrapper>
        </>
    )
}

export default InputForm