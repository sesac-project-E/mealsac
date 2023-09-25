module.exports.formatDate = dateString => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const date = new Date(dateString);

  let formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);

  formattedDate = formattedDate
    .replace(/\s/g, ' ')
    .replace(' ', ' ')
    .slice(0, -3);

  return formattedDate;
};
