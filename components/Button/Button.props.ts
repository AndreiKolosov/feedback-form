import { DetailedHTMLProps, HTMLAttributes } from 'react';
export interface IButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  type: 'button' | 'submit';
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}