let commponents = document.querySelectorAll(".handle"),
    openComps = document.querySelectorAll(".handle-open"),
    bluring = document.getElementById("blur"),
    paymentValue = document.getElementById("paymentValue"),
    closers = document.querySelectorAll(".from-close"),
    activeComps = null,
    addNum = document.getElementById("addNum"),
    cursorLine = document.getElementById("cursorLine"),
    secondHandler = document.getElementById("secondHandler"),
    paymentType = document.getElementById("paymentType"),
    withNDS = document.getElementById("withNDS"),
    noNDS = document.getElementById("noNDS"),
    firstPay = document.getElementById("firstPay"),
    extraCursor = document.getElementById("extraCursor"),
    saveParams = document.querySelectorAll(".saveParams"),
    selections = document.querySelectorAll(".selections"),
    showers = document.querySelectorAll(".showers"),
    showHowItworks = document.querySelectorAll(".showHowItworks"),
    showArea = document.querySelectorAll(".show_area"),
    countNums = 1;
showHowItworks.forEach((e => {
    e.addEventListener("mouseover", (() => {
        showArea.forEach((t => {
            e.getAttribute("data-value") == t.getAttribute("data-value") && t.classList.toggle("pos-active")
        }))
    })), e.addEventListener("mouseout", (() => {
        showArea.forEach((t => {
            e.getAttribute("data-value") == t.getAttribute("data-value") && t.classList.remove("pos-active")
        }))
    }))
})), extraCursor.addEventListener("change", (() => {
    extraCursor.style.background = `linear-gradient(to right, var(--blueColor) ${extraCursor.value-1}%, var(--gray)  ${extraCursor.value-1}%)`, firstPay.innerText = `${extraCursor.value}%`
})), paymentType.addEventListener("change", (() => {
    "Оплата частями" == paymentType.value ? secondHandler.style.display = "block" : secondHandler.style.display = "none"
})), paymentValue.addEventListener("input", (() => {
    paymentValue.value >= 1e4 ? cursorLine.style.left = "98%" : cursorLine.style.left = paymentValue.value / 100 - 2 + "%";
    let e = Number(paymentValue.value);
    noNDS.value = e, withNDS.value = e + e / 100 * 12
})), commponents.forEach((e => {
    e.addEventListener("click", (() => {
        bluring.classList.add("pos-active"), openComps.forEach((t => {
            t.classList.remove("pos-active"), e.getAttribute("data-value") == t.getAttribute("data-value") && (activeComps = t, t.classList.add("pos-active"))
        }))
    }))
}));
const addNumField = () => {
    if (countNums >= 3) alert("Вы добавили 3 номера");
    else {
        let e = document.createElement("div");
        e.classList.add("w-100", "mt-2");
        let t = document.createElement("label");
        t.textContent = "Номер телефона";
        let a = document.createElement("input");
        a.classList.add("spec-inp", "mt-1"), a.type = "tel", a.maxLength = 11, a.placeholder = "+7 (---) --- -- --", e.appendChild(t), e.appendChild(a), addNum.before(e), countNums++
    }
};

function closing(e) {
    bluring.classList.remove("pos-active"), e && e.classList.remove("pos-active")
}
let value;
bluring.addEventListener("click", (() => {
    closing(activeComps), activeComps = null 
})), closers.forEach((e => {
    e.addEventListener("click", (() => {
        closing(activeComps), activeComps = null
    }))
})), saveParams.forEach((e => {
    e.addEventListener("click", (t => {
        t.preventDefault(), selections.forEach((t => {
            e.getAttribute("data-value") == t.getAttribute("data-value") && (value = value + t.value + " " || "", value = value.replace(void 0, ""), showers.forEach((e => {
                e.getAttribute("data-show") == t.getAttribute("data-show") && (e.value = value, closing(activeComps))
            })))
        })), value = ""
    }))
})), addNum.addEventListener("click", addNumField);





document.querySelectorAll('.number-selector').forEach((selector, index) => {
    const ul = selector.querySelector('ul');
    const items = ul.querySelectorAll('li');
    let currentIndex = 0;
    let startY = 0;
    let endY = 0;
    const scrollThreshold = 5; // Decreased threshold for smoother scrolling

    const updateInput = () => {
        const weightSelectors = document.querySelectorAll('#weightBox .number-selector');
        const weightValues = Array.from(weightSelectors).map(sel => {
            const activeItem = sel.querySelector('.active');
            return activeItem ? activeItem.textContent : '0';
        });
        document.getElementById('selectedNumber').value = weightValues.join('');

        const kubSelectors = document.querySelectorAll('#kubBox .number-selector');
        const kubValues = Array.from(kubSelectors).map(sel => {
            const activeItem = sel.querySelector('.active');
            return activeItem ? activeItem.textContent : '0';
        });
        document.getElementById('selectedNumber1').value = kubValues.join('');
    };

    const setActive = () => {
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        ul.style.transform = `translateY(${-currentIndex * 30}px)`;
        updateInput();
    };

    selector.addEventListener('wheel', (event) => {
        event.preventDefault();
        currentIndex = (currentIndex + (event.deltaY > 0 ? 1 : -1) + items.length) % items.length;
        setActive();
    });

    selector.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY;
    });

    selector.addEventListener('touchmove', (event) => {
        event.preventDefault();
        endY = event.touches[0].clientY;
    });

    selector.addEventListener('touchend', () => {
        const deltaY = startY - endY;
        if (Math.abs(deltaY) > scrollThreshold) {
            currentIndex = (currentIndex + (deltaY > 0 ? 1 : -1) + items.length) % items.length;
            setActive();
        }
    });

    setActive();
});








 
  