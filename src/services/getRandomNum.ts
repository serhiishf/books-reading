export default function getRandomNum() {
  const min = Math.ceil(0);
  const max = Math.floor(11);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
