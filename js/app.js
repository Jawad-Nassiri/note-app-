document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.create-button');
  const modalScreen = document.querySelector('.modal-screen');
  const modal = document.querySelector('.modal');
  const closeButton = document.querySelector('.close');
  const closeButtonX = document.querySelector('.close-x-btn');
  const notesContainer = document.querySelector('.notes-container');
  const textarea = document.querySelector("textarea");
  const continueBtn = document.querySelector('.continue');
  const noteElements = document.querySelectorAll('.note');
  const colorBoxes = document.querySelectorAll('.color-box');
  const searchBtn = document.querySelector('.search-card > button');
  const searchInput = document.querySelector('input[placeholder="Search"]');

  continueBtn.disabled = true;
  let mainColor;

 

  addButton.addEventListener('click', showModal);
  closeButton.addEventListener('click', hideModal);
  closeButtonX.addEventListener('click', hideModal);
  continueBtn.addEventListener('click', addNote);
  textarea.addEventListener('input', toggleContinueBtnState);
  searchInput.addEventListener('input', searchInNotes);
  searchBtn.addEventListener('click', searchInNotes);
  
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


  colorBoxes.forEach((colorBox) => {
    colorBox.addEventListener('click', (evt) => {
      //! way1
      // colorBoxes.forEach(colorBox => colorBox.classList.remove('selected'));
      // evt.target.classList.add('selected');

      //! way2 (recommended)
      document.querySelector('.selected').classList.remove('selected');
      evt.target.classList.add('selected');

      mainColor = evt.target.dataset.color;
    })
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
    parentArticleElem.style.background = mainColor;
  
    const noteContentElem = document.createElement("p");
    noteContentElem.classList.add("note-content");
    noteContentElem.innerHTML = note;
  
    const trashParentDiv = document.createElement("div");
    const noteTrashElem = document.createElement("i");
    noteTrashElem.className = "fa-solid fa-trash delete";
    trashParentDiv.addEventListener('click', (evt) => {
      evt.target.closest('article').remove()
    })
  
    trashParentDiv.append(noteTrashElem);
    parentArticleElem.append(noteContentElem);
    parentArticleElem.append(trashParentDiv);
  
    notesContainer.append(parentArticleElem);
    hideModal();
    textarea.value = "";

  }

  function toggleContinueBtnState() {
      continueBtn.disabled = textarea.value.trim() === "";
  }


  function searchInNotes() {
    let searchValue = searchInput.value;
    const noteElements = document.querySelectorAll('.note');

    noteElements.forEach((noteElement) => {
      const noteContent = noteElement.querySelector('.note-content');
      
      if(noteContent.textContent.includes(searchValue)) {
        noteElement.style.display = 'flex';
      } else {
        noteElement.style.display = 'none';
      }
    })

  }
})