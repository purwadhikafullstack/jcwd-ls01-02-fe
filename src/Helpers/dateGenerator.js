export const dateGenerator = (data) => {
  data = data.split(" ");
  data[0] = data[0].split("-").join("/");
  data = `${data[0]} ${data[1]}`;
  const current = new Date(`${data} UTC`);
  const date = ("0" + current.getDate()).slice(-2);
  const month = ("0" + (current.getMonth() + 1)).slice(-2);
  const year = current.getFullYear();
  return `${date}/${month}/${year}`;
};

export const fullDateGenerator = (data) => {
  data = data.split(" ");
  data[0] = data[0].split("-").join("/");
  data = `${data[0]} ${data[1]}`;
  let date = new Date(`${data} UTC`).toString().split(" ");
  date[4] = date[4].split(":");
  date[4] = `${date[4][0]}:${date[4][1]}`;
  return `${date[0]}, ${date[1]} ${date[2]} ${date[3]}, ${date[4]}`;
};