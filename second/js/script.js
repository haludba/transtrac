let openers = document.querySelectorAll(".openers"),
    nav_cards = document.querySelectorAll(".nav_cards"),
    darkMode = !1,
    darkModeChanger = document.querySelectorAll(".dark_mode"),
    mode_changer = document.querySelectorAll(".changeMode");
const iframe = document.getElementById("map"),
    info = document.getElementById("info");

function replacerClass() {
    mode_changer.forEach((e => {
        e.classList.toggle("toDarkMode")
    })), document.body.classList.toggle("toDarkMode")
}
darkModeChanger.forEach((e => {
    e.addEventListener("click", (() => {
        darkMode ? (replacerClass(), darkMode = !1, e.src = "icons/light.svg") : (replacerClass(), darkMode = !0, e.src = "icons/dark.svg")
    }))
}));
let ordersBox = document.getElementById("orders"),
    commponents = document.querySelectorAll(".handle"),
    closers = document.querySelectorAll(".closers"),
    openComps = document.querySelectorAll(".handle-open"),
    bluring = document.getElementById("blur"),
    activeComps = null;
const closing = function () {
    bluring.classList.remove("pos-active"), activeComps.classList.remove("pos-active")
};

function toggleDarkMode(e) {
    e ? document.body.classList.add("toDarkMode") : document.body.classList.remove("toDarkMode")
}

function reDel(e, t) {
    t.forEach((e => {
        e.classList.remove("active_ride")
    })), e.forEach((e => {
        e.classList.remove("activeIcon")
    }))
}

function init(e) {
    let t = !1;
    e.forEach((a => {
        a.addEventListener("click", (() => {
            quichHide.style.display = "block", filter.classList.remove("active_ride50"), reDel(e, nav_cards), a.classList.add("activeIcon"), nav_cards.forEach(((e, o) => {
                e.getAttribute("data-value") == a.getAttribute("data-value") ? t == o + 1 ? (e.classList.remove("active_ride"), a.classList.remove("activeIcon"), t = !1) : (t = o + 1, e.classList.add("active_ride")) : "map" == a.getAttribute("data-value") && reDel(nav_cards)
            }))
        }))
    }))
}
closers.forEach((e => {
    e.addEventListener("click", closing)
})), commponents.forEach((e => {
    e.addEventListener("click", (() => {
        bluring.classList.add("pos-active"), openComps.forEach((t => {
            t.classList.remove("pos-active"), e.getAttribute("data-value") == t.getAttribute("data-value") && (activeComps = t, t.classList.add("pos-active"))
        }))
    }))
})), init(openers), document.getElementById("copyBtn").addEventListener("click", (async function () {
    var e = document.getElementById("myInput");
    try {
        await navigator.clipboard.writeText(e.value), alert("Nusxa olish muvaffaqiyatli!")
    } catch (e) {
        alert("Xato yuz berdi.")
    }
}));



// input range elementlarini topamiz
const redRadius = document.getElementById("redRadius");
const greenRadius = document.getElementById("greenRadius");

// yashiriladigan element
const quichHide = document.getElementById("quichHide");

// umumiy funksiya
function hideElement() {
  quichHide.style.display = "none";
}

// har bir range element uchun hodisa tinglovchisini o'rnatamiz
redRadius.addEventListener("input", hideElement);
greenRadius.addEventListener("input", hideElement);