export const truncate = (text: string, length = 200): string => {
  if (text.length <= length) return text;

  const shortText = text.slice(0, length);

  return `${shortText}...`;
};
