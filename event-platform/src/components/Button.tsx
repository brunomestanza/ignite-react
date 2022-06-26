import { DiscordLogo, Lightning } from "phosphor-react";

interface ButtonProps {
  variant: 'primary' | 'secondary';
  title: string;
}

export function Button({ variant, title }: ButtonProps) {
  if (variant === 'primary') {
    return (
      <a href="" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
        <DiscordLogo size={24}  />
        {title}
      </a>
    )
  } else {
    return (
      <a href="" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
        <Lightning size={24}  />
        {title}
      </a>
    )
  }
};