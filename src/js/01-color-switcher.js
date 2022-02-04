function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let changeColorID = null;

refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', startChangeColor);
refs.btnStop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  changeColorID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
  clearInterval(changeColorID);
}
