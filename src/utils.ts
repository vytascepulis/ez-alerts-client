export const formatText = (text: string) => {
  let replaced = text;
  replaced = replaced.replaceAll('<special>', '<span class="special">');
  replaced = replaced.replaceAll('</special>', '</span>');

  return replaced;
};
