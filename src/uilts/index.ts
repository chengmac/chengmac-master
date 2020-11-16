export const randomGenrateColor = (colorList: []) => {
  const random = Math.ceil(Math.random() * 10);
  return colorList[random];
};

export const getBase64 = (img: Blob, callback: Function) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
