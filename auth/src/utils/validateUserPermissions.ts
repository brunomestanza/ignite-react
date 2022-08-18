type User = {
  permissions: string[];
  roles: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({ user, permissions, roles}: ValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => { //Verifica se o user tem todas as permissões
      return user.permissions.includes(permission);
    });
    if (!hasAllPermissions) {
      return false;
    }
  };
  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => { //Verifica se o user alguma das roles
      return user.roles.includes(role);
    });
    if (!hasAllRoles) {
      return false;
    }
  };
}