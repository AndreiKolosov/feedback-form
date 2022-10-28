import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

export interface ICustomTextAreaProps {
  name: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  className?: string;
  isValidated?: boolean;
  inputExtraClass?: string;
  errors?: FieldError;
}
