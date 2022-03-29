export const getMinBirthday = (): string  => {
  const now = new Date();

  const year = now.getFullYear() - 19;
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
};

const gen832 = new Date(2021, 10, 8);
export const getGeneration = (): number => {
  const diff = Date.now() - gen832.getTime();

  return 832 + ~~(diff / (1000 * 60 * 60 * 24 * 31));
}
