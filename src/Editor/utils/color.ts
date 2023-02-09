export const convertRGBtoHex = (color: string) => {
  const [red, green, blue] = color.match(/\d+/g) ?? [];
  const rgb = Number(blue) | (Number(green) << 8) | (Number(red) << 16);

  return '#' + (0x1000000 | rgb).toString(16).substring(1);
};
