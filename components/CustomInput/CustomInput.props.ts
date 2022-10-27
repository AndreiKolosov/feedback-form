import { ChangeEvent, ReactElement } from 'react';

export interface ICustomInputProps {
  name: string;
  onChange?: () => void | ((e: ChangeEvent) => void);
  onBlur?: () => void | ((e: ChangeEvent) => void);
  placeholder?: string;
  type: 'text' | 'number';
  value?: string | number;
  className?: string;
  inputExtraClass?: string;
  validationField?: ReactElement;
}