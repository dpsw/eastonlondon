export const formatDate = (date) => {
  if (!date || !(date instanceof Date)) { return ''; }
  const options = { weekday: 'short', day: '2-digit' };
  return date.toLocaleDateString('en-US', options).split(' ').reverse().join(' ');
};
