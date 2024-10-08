// script.js
const numberMap = {
  '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
  '5': '五', '6': '六', '7': '七', '8': '八', '9': '九'
};

const unitMap = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];

function convertNumberToChinese(num) {
  let str = num.toString();
  let result = '';
  let len = str.length;

  for (let i = 0; i < len; i++) {
      let n = str[i];
      if (n !== '0') {
          result += numberMap[n] + unitMap[len - i - 1];
      } else {
          if (result[result.length - 1] !== '零') {
              result += numberMap[n];
          }
      }
  }
  return result.replace(/零+$/, '');
}

function convertExpressionToChinese(expression) {
  const operators = {
      '+': '加',
      '-': '減',
      '*': '乘',
      '/': '除',
      '=': '等於'
  };

  let result = '';
  let num = '';

  for (let char of expression) {
      if (char in numberMap) {
          num += char;
      } else {
          if (num) {
              result += convertNumberToChinese(num);
              num = '';
          }
          if (char in operators) {
              result += ' ' + operators[char] + ' ';
          }
      }
  }

  if (num) {
      result += convertNumberToChinese(num);
  }

  return result;
}

document.getElementById('convertButton').addEventListener('click', () => {
  const input = document.getElementById('input').value;
  const output = convertExpressionToChinese(input);
  const outputDiv = document.getElementById('output');
  outputDiv.textContent = output;

  outputDiv.addEventListener('click', () => {
    speechSynthesis.cancel(); // 既存の音声出力をキャンセル
      const utterance = new SpeechSynthesisUtterance(output);
      utterance.lang = 'zh-CN';
      speechSynthesis.speak(utterance);
  });
});

document.getElementById('clearButton').addEventListener('click', () => {
  document.getElementById('input').value = '';
  document.getElementById('output').textContent = '';
});