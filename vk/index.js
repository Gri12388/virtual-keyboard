import {
  createBackground,
  createFooter,
  keyDown,
  keyUp,
  monitorTextArea,
  mouseDown,
  mouseUp,
  putSign,
  showLang,
} from './functions.js';

createBackground();
createFooter();

if (!localStorage.getItem('langgri12388060522')) localStorage.setItem('langgri12388060522', '0');

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.querySelectorAll('.key').forEach((item) => item.addEventListener('mousedown', mouseDown));
document.getElementById('keyboard').addEventListener('mouseup', mouseUp);
document.getElementById('textarea').addEventListener('click', monitorTextArea);

putSign();
showLang();
