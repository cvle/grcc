import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({className, ...rest}) => {
  return (
    <button className={clsx("button", className)} {...rest} />
  );
};

export default Button;
