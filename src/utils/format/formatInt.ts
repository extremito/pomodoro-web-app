const formatInt = (value: number, digits: number) => {
  let strValue = value.toString();
  if (strValue.length > digits) return strValue;
  const zeroes = digits - strValue.length;
  for (let i = 0; i < zeroes; ++i) {
    strValue = "0" + strValue;
  }
  return strValue;
};

export default formatInt;
