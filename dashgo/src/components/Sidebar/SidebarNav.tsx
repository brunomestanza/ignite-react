import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboard2Line, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack align="flex-start" spacing="12">
      <NavSection title='GERAL'>
        <NavLink icon={RiDashboard2Line }>Dashboard</NavLink>
        <NavLink icon={RiContactsLine }>Usuários</NavLink>
      </NavSection>
      <NavSection title='AUTOMAÇÃO'>
        <NavLink icon={RiInputMethodLine }>Formuários</NavLink>
        <NavLink icon={RiGitMergeLine}>Automação</NavLink>
      </NavSection> 
    </Stack>
  );
};