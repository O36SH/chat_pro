export const generateUserId = (): string => {
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += Math.floor(Math.random() * 10).toString();
  }
  return id;
};