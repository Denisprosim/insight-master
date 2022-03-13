const draggables = document.querySelectorAll('.icon');
const containers = document.querySelectorAll('.place');
const appContainer = document.getElementById('apps-container');
const safari = document.getElementById('safari');
const boxes = document.querySelectorAll('.box');

safari.addEventListener('mousedown', mousedown);

function mousedown(e) {
  window.addEventListener('mousemove',mousemove);
  window.addEventListener('mouseup',mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    const rect = safari.getBoundingClientRect();

    safari.style.left = rect.left - newX + "px";
    safari.style.top = rect.top - newY + "px";

    prevX = e.clientX;
    prevY = e.clientY;
  }

  function mouseup() {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup',mouseup);
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

function showApp(divId) {
  console.log(divId);

if (app.classList.contains('hidden')) {
  app.classList.remove('hidden');
  boxes.forEach(box => {
    box.classList.remove('hidden');
  })
  
  console.log('pridat');
} else {
  console.log('ostranit');
  app.classList.add('hidden');
  boxes.forEach(box => {
    box.classList.add('hidden');
  })
}
}


