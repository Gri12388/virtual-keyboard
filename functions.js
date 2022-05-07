import Info from './Info.js';
import Database from './Database.js';

const database = new Database();
const info = new Info();

let element;

const regAlt = /Alt(Left)|(Right)/;
const regShift = /Shift(Left)|(Right)/;

let lang = +localStorage.getItem('langgri12388060522');
let capsLock = 0;

let Alt = false;
let Shift = false;

export function addEnter() {
  const br = document.createElement('br');
  document.getElementById('textcursor').before(br);
}

export function addSpace() {
  const pre = document.createElement('pre');
  pre.textContent = ' ';
  document.getElementById('textcursor').before(pre);
}

export function addTab() {
  const pre = document.createElement('pre');
  pre.textContent = '    ';
  document.getElementById('textcursor').before(pre);
}

export function changeCase() {
  capsLock = (capsLock + 1) % 2;
  if (capsLock === 1) document.getElementById('CapsLock').classList.add('on');
  else document.getElementById('CapsLock').classList.remove('on');
}

export function showLang() {
  document.getElementById('lang').textContent = lang === 0 ? 'Eng' : 'Rus';
}

export function putSign() {
  const signs = document.querySelectorAll('.sign');
  if (Shift) {
    signs.forEach((item) => {
      if (database[item.id][0][lang + capsLock]
        !== database[item.id][0][lang + ((capsLock + 1) % 2)]) {
        item.textContent = database[item.id][0][lang + ((capsLock + 1) % 2)];
      } else item.textContent = database[item.id][1][lang / 2];
    });
  } else {
    signs.forEach((item) => {
      item.textContent = database[item.id][0][lang + capsLock];
    });
  }
  document.getElementById('os').textContent = info.os[lang / 2];
  document.getElementById('switcher').textContent = info.switcher[lang / 2];
}

export function changeLang() {
  lang = (lang + 2) % 4;
  localStorage.setItem('langgri12388060522', lang);
  putSign();
  showLang();
}

export function createBackground() {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  const os = document.createElement('div');
  const switcher = document.createElement('div');

  container.classList.add('container');
  container.innerHTML = `
  <div class="textarea" id="textarea"><span id="textcursor"></span></div>
  <div class="keyboard" id="keyboard">
    <div class="key grey sign square" id="Backquote"></div>
    <div class="key grey sign square" id="Digit1"></div>
    <div class="key grey sign square" id="Digit2"></div>
    <div class="key grey sign square" id="Digit3"></div>
    <div class="key grey sign square" id="Digit4"></div>
    <div class="key grey sign square" id="Digit5"></div>
    <div class="key grey sign square" id="Digit6"></div>
    <div class="key grey sign square" id="Digit7"></div>
    <div class="key grey sign square" id="Digit8"></div>
    <div class="key grey sign square" id="Digit9"></div>
    <div class="key grey sign square" id="Digit0"></div>
    <div class="key grey sign square" id="Minus"></div>
    <div class="key grey sign square" id="Equal"></div>
    <div class="key rect" id="Backspace">Backspace</div>
    <div class="key square" id="Tab">Tab</div>
    <div class="key grey sign square" id="KeyQ"></div>
    <div class="key grey sign square" id="KeyW"></div>
    <div class="key grey sign square" id="KeyE"></div>
    <div class="key grey sign square" id="KeyR"></div>
    <div class="key grey sign square" id="KeyT"></div>
    <div class="key grey sign square" id="KeyY"></div>
    <div class="key grey sign square" id="KeyU"></div>
    <div class="key grey sign square" id="KeyI"></div>
    <div class="key grey sign square" id="KeyO"></div>
    <div class="key grey sign square" id="KeyP"></div>
    <div class="key grey sign square" id="BracketLeft"></div>
    <div class="key grey sign square" id="BracketRight"></div>
    <div class="key grey sign square" id="Backslash"></div>
    <div class="key square" id="Delete">Del</div>
    <div class="key rect" id="CapsLock">Caps Lock</div>
    <div class="key grey sign square" id="KeyA"></div>
    <div class="key grey sign square" id="KeyS"></div>
    <div class="key grey sign square" id="KeyD"></div>
    <div class="key grey sign square" id="KeyF"></div>
    <div class="key grey sign square" id="KeyG"></div>
    <div class="key grey sign square" id="KeyH"></div>
    <div class="key grey sign square" id="KeyJ"></div>
    <div class="key grey sign square" id="KeyK"></div>
    <div class="key grey sign square" id="KeyL"></div>
    <div class="key grey sign square" id="Semicolon"></div>
    <div class="key grey sign square" id="Quote"></div>
    <div class="key rect" id="Enter">Enter</div>
    <div class="key rect" id="ShiftLeft">Shift</div>
    <div class="key grey sign square" id="KeyZ"></div>
    <div class="key grey sign square" id="KeyX"></div>
    <div class="key grey sign square" id="KeyC"></div>
    <div class="key grey sign square" id="KeyV"></div>
    <div class="key grey sign square" id="KeyB"></div>
    <div class="key grey sign square" id="KeyN"></div>
    <div class="key grey sign square" id="KeyM"></div>
    <div class="key grey sign square" id="Comma"></div>
    <div class="key grey sign square" id="Period"></div>
    <div class="key grey sign square" id="Slash"></div>
    <div class="key sign square" id="ArrowUp">🠕</div>
    <div class="key rect" id="ShiftRight">Shift</div>
    <div class="key square" id="ControlLeft">Ctrl</div>
    <div class="key square" id="AltLeft">Alt</div>
    <div class="key space rect" id="Space"></div>
    <div class="key square" id="AltRight">Alt</div>
    <div class="key square" id="ControlRight">Ctrl</div>
    <div class="key sign square" id="ArrowLeft">🠔</div>
    <div class="key sign square" id="ArrowDown">🠗</div>
    <div class="key sign square" id="ArrowRight">🠖</div>
    <div class="lang" id="lang"></div>
  </div>
  `;

  os.classList.add('info');
  os.id = 'os';

  switcher.classList.add('info');
  switcher.id = 'switcher';

  body.appendChild(container);
  body.appendChild(os);
  body.appendChild(switcher);
}

export function delNext() {
  const el = document.getElementById('textcursor');
  if (el.nextElementSibling) el.nextElementSibling.remove();
}

export function delPrev() {
  const el = document.getElementById('textcursor');
  if (el.previousElementSibling) el.previousElementSibling.remove();
}

export function keystroke(code) {
  const span = document.createElement('span');
  if (Shift) {
    if (database[code][0][lang + capsLock]
      !== database[code][0][lang + ((capsLock + 1) % 2)]) {
      span.textContent = database[code][0][lang + ((capsLock + 1) % 2)];
    } else span.textContent = database[code][1][lang / 2];
  } else {
    span.textContent = database[code][0][lang + capsLock];
  }
  document.getElementById('textcursor').before(span);
}

export function makeChoice(id, repeat) {
  switch (id) {
    case 'KeyA':
    case 'KeyB':
    case 'KeyC':
    case 'KeyD':
    case 'KeyE':
    case 'KeyF':
    case 'KeyG':
    case 'KeyH':
    case 'KeyI':
    case 'KeyJ':
    case 'KeyK':
    case 'KeyL':
    case 'KeyM':
    case 'KeyN':
    case 'KeyO':
    case 'KeyP':
    case 'KeyQ':
    case 'KeyR':
    case 'KeyS':
    case 'KeyT':
    case 'KeyU':
    case 'KeyV':
    case 'KeyW':
    case 'KeyX':
    case 'KeyY':
    case 'KeyZ':
    case 'BracketLeft':
    case 'BracketRight':
    case 'Semicolon':
    case 'Quote':
    case 'Backquote':
    case 'Comma':
    case 'Period':
    case 'Backslash':
    case 'Slash':
    case 'Minus':
    case 'Equal':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'Digit0':
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
    case 'Digit6':
    case 'Digit7':
    case 'Digit8':
    case 'Digit9':
      keystroke(id);
      break;
    case 'Backspace':
      delPrev();
      break;
    case 'Delete':
      delNext();
      break;
    case 'CapsLock':
      if (!repeat) {
        changeCase();
        putSign();
      }
      break;
    case 'Tab':
      addTab();
      break;
    case 'Space':
      addSpace();
      break;
    case 'Enter':
      addEnter();
      break;
    case 'AltLeft':
    case 'AltRight':
      if (!repeat) Alt = true;
      if (Alt && Shift) changeLang();
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      if (!repeat) Shift = true;
      if (Alt && Shift) changeLang();
      else if (!Alt && Shift) putSign();
      break;
    default: break;
  }
}

export function keyDown(e) {
  e.preventDefault();
  const temp = document.getElementById(e.code);
  if (temp.classList.contains('square')) temp.classList.add('square_pressed');
  else temp.classList.add('rect_pressed');
  makeChoice(e.code, e.repeat);
}

export function keyUp(e) {
  e.preventDefault();
  const el = document.getElementById(e.code);
  if (!el) return;
  if (regAlt.test(e.code)) Alt = false;
  if (regShift.test(e.code)) {
    Shift = false;
    putSign();
  }
  if (el.classList.contains('square')) el.classList.remove('square_pressed');
  else el.classList.remove('rect_pressed');
}

export function monitorTextArea(e) {
  let textCursor = document.getElementById('textcursor');
  if (e.currentTarget === e.target) {
    if (e.target.lastElementChild !== textCursor) {
      textCursor.remove();
      textCursor = document.createElement('span');
      textCursor.id = 'textcursor';
      e.currentTarget.appendChild(textCursor);
    }
  } else {
    textCursor.remove();
    textCursor = document.createElement('span');
    textCursor.id = 'textcursor';
    e.target.before(textCursor);
  }
}

export function mouseDown(e) {
  element = e.currentTarget;
  if (e.currentTarget.classList.contains('square')) e.currentTarget.classList.add('square_pressed');
  else e.currentTarget.classList.add('rect_pressed');
  makeChoice(e.currentTarget.id, false);
}

export function mouseUp() {
  if (element !== undefined && element !== null) {
    if (element.classList.contains('square')) element.classList.remove('square_pressed');
    else element.classList.remove('rect_pressed');
    if (regAlt.test(element.id)) Alt = false;
    if (regShift.test(element.id)) Shift = false;
    element = null;
  }
}
