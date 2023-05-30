export const getNameInitials = (name: string): string => {
  const subNames = name.split(' ');
  let initials = subNames[0].substring(0, 1).toUpperCase();

  if (subNames.length > 1) initials += subNames[subNames.length - 1].substring(0, 1).toUpperCase();

  return initials;
};
