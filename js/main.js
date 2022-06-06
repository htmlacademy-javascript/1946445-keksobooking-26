function getNumber (minNumber, maxNumber, fractionNumber) {
  const randomNumber = Math.random() * (maxNumber - minNumber) + minNumber;
  if (minNumber >= maxNumber || minNumber < 0) {
    return('Ошибка');
  }
  return randomNumber.toFixed(fractionNumber);
}

getNumber(0, 10, 2);
