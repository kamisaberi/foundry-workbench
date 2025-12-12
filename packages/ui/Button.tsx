// This is a basic, reusable Button component from our shared UI package.
// The purpose is to create a consistent design system. Instead of using a
// standard `<button>` tag everywhere, we use our custom `<Button>` component.

import React from 'react';

// We define the "props" (properties) that our component can accept.
// This allows us to customize the button's appearance and behavior.
interface ButtonProps {
  // `children` is a special prop that contains whatever is inside the tag, e.g., the button's text.
  children: React.ReactNode;

  // An optional function to call when the button is clicked.
  onClick?: () => void;

  // Different visual styles for the button.
  variant?: 'primary' | 'secondary' | 'danger';

  // Is the button disabled?
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary', // Default to 'primary' if no variant is provided.
  disabled = false
}) => {
  // We can calculate the CSS class name based on the props.
  const baseClass = 'foundry-button';
  const variantClass = `foundry-button--${variant}`;
  const disabledClass = disabled ? 'foundry-button--disabled' : '';

  // By combining class names, we can style each variant differently in our CSS.
  const className = `${baseClass} ${variantClass} ${disabledClass}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

/*
  In a corresponding CSS file (e.g., Button.css), you would have styles like:
  .foundry-button { ... base styles ... }
  .foundry-button--primary { background-color: blue; color: white; }
  .foundry-button--secondary { background-color: grey; color: black; }
  .foundry-button--disabled { background-color: lightgrey; cursor: not-allowed; }
*/