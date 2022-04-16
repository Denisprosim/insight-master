const draggables = document.querySelectorAll('.icon');
const containers = document.querySelectorAll('.place');
const appContainer = document.getElementById('appstore');
const panels = document.querySelectorAll('.panel')

const boxes = document.querySelectorAll('.box');
const resizers = document.querySelectorAll('.resizer');

let isResizing = false;

function makeActive(element) {
  var activeElement = document.querySelector('.active');
  if (activeElement !== null) {
    activeElement.classList.remove('active');
  }
  console.log('chyba');
  element.classList.add('active');
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//Drag'n'drop window
for (let panel of panels) {
  panel.addEventListener('mousedown', mousedown);
  function mousedown(e) {
    let block = e.target.parentNode;
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
    if (!block.classList.contains('dots') && !block.classList.contains('panel')) {
      makeActive(block);
    }
    let prevX = e.clientX;
    let prevY = e.clientY;
  
    function mousemove(e) {
      e.preventDefault();
      if (!isResizing && !block.classList.contains('fullsize') && 
          !block.classList.contains('dots') && !block.classList.contains('panel')) {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
  
        const rect = block.getBoundingClientRect();
        console.log(isInViewport(block));
        block.style.left = rect.left - newX + "px";
        if(e.clientY < 0) {   
          block.style.top = 0;
        } else {
          block.style.top = rect.top - newY + "px";
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
}

//Resizing window
for (let resizer of resizers) {
  resizer.addEventListener('mousedown', mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    let block = e.target.parentNode;
    isResizing = true;
    makeActive(block);
    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup)

    function mousemove(e) {
      e.preventDefault();
      const rect = block.getBoundingClientRect();

      if (currentResizer.classList.contains('se')) {
          block.style.width = (e.clientX - block.offsetLeft) + 'px';
          block.style.height = (e.clientY - block.offsetTop) + 'px';     
      }

      if (currentResizer.classList.contains('ne')) {
        block.style.width = (e.clientX - block.offsetLeft) + 'px';
        block.style.height = (e.clientY - block.offsetTop) + 'px';    
      }

      if (currentResizer.classList.contains('sw')) {
        block.style.width = (e.clientX - block.offsetLeft) + 'px';
        block.style.height = (e.clientY - block.offsetTop) + 'px'; 
        block.style.left = (block.offsetLeft - e.clientX) + 'px';
      }

      if (currentResizer.classList.contains('nw')) {
        block.style.width = (e.clientX - block.offsetLeft) + 'px';   
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

//Drag'n'drop icon
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
      makeActive(app);
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
    makeActive(app);
    app.classList.remove('fullsize');
    app.classList.add('windowed');
  } else {
    app.style.left = null;
    app.style.top = null;
    app.style.width = null;
    app.style.height = null;
    makeActive(app);
    app.classList.add('fullsize');
    app.classList.remove('windowed');
  }
}

