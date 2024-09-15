export const formatDate = (language: string, now: Date): string => {
  let formattedDate: string;
  if (language === 'es') {
    const dayFormatter = new Intl.DateTimeFormat(language, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    formattedDate = dayFormatter.format(now);

    const [day, month] = formattedDate.split(' de ');
    const capitalizedDay =
      day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    const capitalizedMonth =
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    formattedDate = `${capitalizedDay} de ${capitalizedMonth}`;
  } else {
    formattedDate = new Intl.DateTimeFormat(language, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(now);
  }

  return formattedDate;
};

export const formatTime = (language: string, now: Date) =>
  new Intl.DateTimeFormat(language, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isNight = () => {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 20 || hours < 8;
};
