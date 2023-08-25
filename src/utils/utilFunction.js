export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.toLocaleString('default', { month: 'long' });
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return `${day} ${month} ${year} ${formattedTime}`;
};

export const formatedTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return `${formattedTime}`;
};
