const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const closed = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () =>{
    modal.classList.remove("hide")
})

closed.addEventListener("click", () =>{
    modal.classList.add("hide")
})

