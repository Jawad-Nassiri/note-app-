document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.create-button');
  const modalScreen = document.querySelector('.modal-screen');
  const modal = document.querySelector('.modal');
  const closeButton = document.querySelector('.close');
  const closeButtonX = document.querySelector('.close-x-btn');
  const notesContainer = document.querySelector('.notes-container');
  const textarea = document.querySelector("textarea");
  const continueBtn = document.querySelector('.continue');


  addButton.addEventListener('click', showModal);
  closeButton.addEventListener('click', hideModal);
  closeButtonX.addEventListener('click', hideModal);
  continueBtn.addEventListener('click', addNote);
  
  document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
      hideModal();
    }
  })


  document.addEventListener('click', (evt) => {
    if(!modal.contains(evt.target) && !addButton.contains(evt.target)) {
      hideModal();
    }
  })


  document.addEventListener('keydown', (evt) => {
    if(evt.key === "Enter") {
      addNote();
    }
  })


  notesContainer.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('delete')) {
      evt.target.closest('article').remove();
    }
  });



  function showModal() {
    modalScreen.classList.remove('hidden');
  }

  function hideModal() {
    modalScreen.classList.add('hidden');
  }

  function addNote() {
    const note = textarea.value;
  
    const parentArticleElem = document.createElement("article");
    parentArticleElem.classList.add("note");
  
    const noteContentElem = document.createElement("p");
    noteContentElem.classList.add("note-content");
    noteContentElem.innerHTML = note;
  
    const trashParentDiv = document.createElement("div");
    const noteTrashElem = document.createElement("i");
    noteTrashElem.className = "fa-solid fa-trash delete";
  
    trashParentDiv.append(noteTrashElem);
    parentArticleElem.append(noteContentElem);
    parentArticleElem.append(trashParentDiv);
  
    notesContainer.append(parentArticleElem);
    hideModal();
    textarea.value = "";
  }
})