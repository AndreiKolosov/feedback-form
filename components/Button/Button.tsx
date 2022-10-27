import cx from 'classnames';
import { FC } from 'react';
import styles from './Button.module.css';
import { IButtonProps } from './Button.props';

const Button: FC<IButtonProps> = ({
  children,
  type,
  variant = 'secondary',
  size = 'm',
  fullWidth = false,
  onClick,
  disabled,
  className,
  ...props
}) => (
  <button
    type={type === 'button' ? 'button' : 'submit'}
    disabled={disabled}
    onClick={onClick}
    className={cx(styles.button, className, {
      [styles[`${variant}`]]: variant,
      [styles['fullWidth']]: fullWidth,
      [styles[`${size}`]]: size,
    })}
    {...props}
  >
    {children}
  </button>
);

export default Button;
