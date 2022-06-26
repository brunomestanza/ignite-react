import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  title: string;
}

export function Input({ type, title, ...rest }: InputProps) {
  return (
    <input {...rest} className="bg-gray-900 rounded px-5 h-14" type={type} placeholder={title} />
  );
};
