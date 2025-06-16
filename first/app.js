let commponents = document.querySelectorAll(".handle"),
    openComps = document.querySelectorAll(".handle-open"),
    bluring = document.getElementById("blur"),
    filterFrom = document.getElementById("filterFrom"),
    filterTo = document.getElementById("filterTo"),
    listCity = document.getElementById("listCity"),
    listCity2 = document.getElementById("listCity2"),
    closers = document.querySelectorAll(".from-close"),
    lists = document.querySelectorAll("#listCity li"),
    lists2 = document.querySelectorAll("#listCity2 li"),
    imgClosers = document.querySelectorAll(".info-badges img"),
    parents = document.querySelectorAll(".status-parent"),
    activeComps = null;

function closing(e) {
    bluring.classList.remove("pos-active"), e && e.classList.remove("pos-active")
}

function cityNameOpener(e) {
    e.classList.toggle("pos-active")
}

function addingParams(e, t) {
    e.forEach((e => {
        e.addEventListener("click", (() => {
            let l = document.createElement("div"),
                i = document.createElement("img");
            i.src = "./assets/XCircle.svg", i.alt = "rem", l.classList.add("info-badges", "d-flexb"), l.innerHTML = `<span class="pe-1">${e.textContent}</span>`, l.appendChild(i), t.appendChild(l), i.addEventListener("click", (() => {
                i.parentElement.remove()
            }))
        }))
    }))
}
parents.forEach((e => {
    e.addEventListener("click", (() => {
        e.classList.toggle("offline")
    }))
})), commponents.forEach((e => {
    e.addEventListener("click", (() => {
        bluring.classList.add("pos-active"), openComps.forEach((t => {
            t.classList.remove("pos-active"), e.getAttribute("data-value") == t.getAttribute("data-value") && (activeComps = t, t.classList.add("pos-active"))
        }))
    }))
})), bluring.addEventListener("click", (() => {
    closing(activeComps), activeComps = null
})), closers.forEach((e => {
    e.addEventListener("click", (() => {
        closing(activeComps), activeComps = null
    }))
})), filterFrom.addEventListener("click", (() => {
    cityNameOpener(listCity)
})), filterTo.addEventListener("click", (() => {
    cityNameOpener(listCity2)
})), addingParams(lists, filterFrom), addingParams(lists2, filterTo);