export default function getRandomNum() {
  const min = Math.ceil(1);
  const max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
