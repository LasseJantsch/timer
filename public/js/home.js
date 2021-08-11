
//Open Modals
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const modal_background = document.getElementById('modal_background')

openModalButtons.forEach(button => {
  button.addEventListener('click',  () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    if (modal.classList.contains("active")) {
      closeModal(modal)
    } else {
    openModal(modal)
    }
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})


modal_background.addEventListener("click", ()=>{
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach(modal => {
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  modal_background.classList.add('active')
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  modal_background.classList.remove('active')
}


