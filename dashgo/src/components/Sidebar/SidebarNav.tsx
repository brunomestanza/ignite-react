import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboard2Line, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack align="flex-start" spacing="12">
      <NavSection title='GERAL'>
        <NavLink icon={RiDashboard2Line} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
      </NavSection>
      <NavSection title='AUTOMAÇÃO'>
        <NavLink icon={RiInputMethodLine} href="/forms">Formuários</NavLink>
        <NavLink icon={RiGitMergeLine} href="/automation">Automação</NavLink>
      </NavSection> 
    </Stack>
  );
};