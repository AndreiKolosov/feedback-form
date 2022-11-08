import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

export interface ICustomCheckboxProps {
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  className?: string;
  inputExtraClass?: string;
  isValidated?: boolean;
  children?: string
  errors?: FieldError;
}
