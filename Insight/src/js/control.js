const draggables = document.querySelectorAll('.icon');
const containers = document.querySelectorAll('.place');
const appContainer = document.getElementById('apps-container');
const boxes = document.querySelectorAll('.box');

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

function showApps() {

  if (appContainer.classList.contains('hidden')) {
    appContainer.classList.remove('hidden');
    boxes.forEach(box => {
      box.classList.remove('hidden');
    })
    
    console.log('pridat');
  } else {
    console.log('ostranit');
    appContainer.classList.add('hidden');
    boxes.forEach(box => {
      box.classList.add('hidden');
    })
  }
}


