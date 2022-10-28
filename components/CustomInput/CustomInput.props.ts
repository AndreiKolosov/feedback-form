import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';


export interface ICustomInputProps {
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: 'text' | 'number';
  disabled?: boolean;
  value?: string | number;
  className?: string;
  inputExtraClass?: string;
  isValidated?: boolean;
  errors?: FieldError;
}