const draggables = document.querySelectorAll('.icon');
const containers = document.querySelectorAll('.place');
const appContainer = document.getElementById('appstore');
const safariPanel = document.querySelector('.safari-panel')
const safari = document.getElementById('safari');
const boxes = document.querySelectorAll('.box');
const resizers = document.querySelectorAll('.resizer');

safariPanel.addEventListener('mousedown', mousedown);

let isResizing = false;

function mousedown(e) {
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    e.preventDefault();
    if (!isResizing) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = safari.getBoundingClientRect();

      safari.style.left = rect.left - newX + "px";
      if(e.clientY < 0) {   
        safari.style.top = 0;
      } else {
        safari.style.top = rect.top - newY + "px";
      }

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup() {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }
}

for (let resizer of resizers) {
  resizer.addEventListener('mousedown', mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup)

    function mousemove(e) {
      e.preventDefault();
      const rect = safari.getBoundingClientRect();

      if (currentResizer.classList.contains('se')) {
          safari.style.width = (e.clientX - safari.offsetLeft) + 'px';
          safari.style.height = (e.clientY - safari.offsetTop) + 'px';     
      }

      if (currentResizer.classList.contains('ne')) {
        safari.style.width = (e.clientX - safari.offsetLeft) + 'px';   
    }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener('mousedown', mousedown);
      window.removeEventListener('mousemove', mousemove);
      isResizing = false;
    }
  }
}

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();

    const draggable = document.querySelector('.dragging');
    container.appendChild(draggable);
  });
})

function showApp(elementId) {
  var app = document.getElementById(elementId);

  if(elementId == "appstore") {
    if (app.classList.contains('hidden')) {
      app.classList.remove('hidden');
    } else {
      app.classList.add('hidden');
  }
  } else {
    if (app.classList.contains('hidden')) {
      app.classList.remove('hidden');
      app.classList.add('grow-animation');
      setTimeout(function () {
        app.classList.remove('grow-animation');
      }, 200);
    } else {
      app.classList.add('shrink-animation');
      setTimeout(function () {
        app.classList.remove('shrink-animation');
        app.classList.add('hidden');
      }, 200);
    }
  }


}

function maximalize(elementId) {
  var app = document.getElementById(elementId);
  if (app.classList.contains('fullsize')) {
    app.classList.remove('fullsize');
    app.classList.add('windowed');
  } else {
    safari.style.left = null;
    safari.style.top = null;
    safari.style.width = null;
    safari.style.height = null;
    app.classList.add('fullsize');
    app.classList.remove('windowed');
  }
}

