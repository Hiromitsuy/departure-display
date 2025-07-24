export default function formatTime(datetime: Date) {
  const hour = ("00" + datetime.getHours()).slice(-2);
  const minute = ("00" + datetime.getMinutes()).slice(-2);

  return `${hour}:${minute}`;
}