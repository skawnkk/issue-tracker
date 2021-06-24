interface colorType {
  r: number;
  g: number;
  b: number;
  textColor?: string;
}

interface labelColorType {
  backgroundColorCode: string;
  textColorCode: string;
}

const pipe =
  (...fns: any[]) =>
  (args: any) =>
    fns.reduce((res, fn) => fn(res), args);

//랜덤 color 구하기
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
};
//textColor 구하기
const isDarkColor = ({ r, g, b }: colorType) => {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 150;
};
const getTextColor = (brightness: boolean) => (brightness ? '#fff' : '#000');
const getTextColorCode = pipe(isDarkColor, getTextColor);

//rgb값으로 colorCode 구하기
const numToHex = (num: number) => num.toString(16).toUpperCase();
const rgbToString = ({ r, g, b }: colorType): string =>
  `#${numToHex(r)}${numToHex(g)}${numToHex(b)}`;

//backgroundColor, testColor 구하기
export const getRandomLabelColor = (): labelColorType => {
  const randomColor = getRandomColor();

  const backgroundColorCode = rgbToString(randomColor);
  const textColorCode = getTextColorCode(randomColor);

  return { backgroundColorCode, textColorCode };
};
