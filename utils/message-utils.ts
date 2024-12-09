const getComCd = (input: string) => {
  const match = input.match(/\[(.*?)\]/);
  return match ? match[1] : '';
}

const getComMsg = (input: string) => {
  const match = input.match(/\[(.*?)\]\s*(.*)/);
  return match ? match[2] : '';
}

export {
  getComCd,
  getComMsg
}
