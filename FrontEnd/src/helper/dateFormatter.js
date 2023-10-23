export function formatDate(dateString) {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
