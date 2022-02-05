import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', () => {
  timer.start();
  refs.btnStart.disabled = true;
});

let TimeFinish = null;
let interval = null;

const timer = {
  start() {
    interval = setInterval(() => {
      refs.input.disabled = true;
      const currentTime = Date.now();

      if (Math.floor(currentTime / 1000) === Math.floor(TimeFinish / 1000)) {
        return this.stop();
      }

      const interval = TimeFinish - currentTime;
      parsTime(convertMs(interval));
    }, 1000);
  },
  stop() {
    clearInterval(interval);
    refs.input.disabled = false;
  },
};

const parsTime = ({ days, hours, minutes, seconds }) => {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    TimeFinish = selectedDates[0].getTime();
    if (TimeFinish <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
