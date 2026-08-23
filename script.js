console.log("Script chargé");

// ==========================
// ÉLÉMENTS HTML
// ==========================

const calendar = document.getElementById("calendar");

const dayModal = document.getElementById("dayModal");
const closeModal = document.getElementById("closeModal");
const selectedDate = document.getElementById("selectedDate");

const dose1 = document.getElementById("dose1");
const dose2 = document.getElementById("dose2");

const yearView = document.getElementById("yearView");
const monthView = document.getElementById("monthView");
const weekView = document.getElementById("weekView");
const dayView = document.getElementById("dayView");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const currentPeriod = document.getElementById("currentPeriod");


// ==========================
// DATE ACTUELLE
// ==========================

const today = new Date();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let currentDay = today.getDate();


// ==========================
// MODE ACTUEL
// ==========================

let currentView = "year";


// ==========================
// DONNÉES SAUVEGARDÉES
// ==========================

const medicationData =
    JSON.parse(localStorage.getItem("medicationData")) || {};


// ==========================
// SAUVEGARDE
// ==========================

function sauvegarder() {

    localStorage.setItem(
        "medicationData",
        JSON.stringify(medicationData)
    );
}


// ==========================
// OUVRIR UN JOUR
// ==========================

function openDay(year, month, day) {

    const dateKey =
        `${year}-${month + 1}-${day}`;

    if (!medicationData[dateKey]) {

        medicationData[dateKey] = {
            dose1: false,
            dose2: false
        };
    }

    const date =
        new Date(year, month, day);

    selectedDate.textContent =
        date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    dose1.checked =
        medicationData[dateKey].dose1;

    dose2.checked =
        medicationData[dateKey].dose2;

    dayModal.dataset.dateKey =
        dateKey;

    dayModal.style.display =
        "block";
}


// ==========================
// CRÉER UN BOUTON JOUR
// ==========================

function createDayButton(year, month, day) {

    const button =
        document.createElement("button");

    button.textContent = day;

    button.addEventListener("click", function () {

        openDay(year, month, day);

    });

    return button;
}


// ==========================
// AFFICHAGE ANNÉE
// ==========================

function showYear() {

    calendar.innerHTML = "";

    currentPeriod.textContent =
        currentYear;

    for (let month = 0; month < 12; month++) {

        const monthElement =
            document.createElement("div");

        const monthTitle =
            document.createElement("h2");

        const date =
            new Date(currentYear, month, 1);

        monthTitle.textContent =
            date.toLocaleString("fr-FR", {
                month: "long"
            });

        monthElement.appendChild(
            monthTitle
        );

        const numberOfDays =
            new Date(
                currentYear,
                month + 1,
                0
            ).getDate();

        for (
            let day = 1;
            day <= numberOfDays;
            day++
        ) {

            const dayButton =
                createDayButton(
                    currentYear,
                    month,
                    day
                );

            monthElement.appendChild(
                dayButton
            );
        }

        calendar.appendChild(
            monthElement
        );
    }
}


// ==========================
// AFFICHAGE MOIS
// ==========================

function showMonth() {

    calendar.innerHTML = "";

    const date =
        new Date(
            currentYear,
            currentMonth,
            1
        );

    currentPeriod.textContent =
        date.toLocaleString("fr-FR", {
            month: "long",
            year: "numeric"
        });

    const monthElement =
        document.createElement("div");

    const monthTitle =
        document.createElement("h2");

    monthTitle.textContent =
        date.toLocaleString("fr-FR", {
            month: "long",
            year: "numeric"
        });

    monthElement.appendChild(
        monthTitle
    );

    const numberOfDays =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

    for (
        let day = 1;
        day <= numberOfDays;
        day++
    ) {

        const dayButton =
            createDayButton(
                currentYear,
                currentMonth,
                day
            );

        monthElement.appendChild(
            dayButton
        );
    }

    calendar.appendChild(
        monthElement
    );
}


// ==========================
// AFFICHAGE SEMAINE
// ==========================

function showWeek() {

    calendar.innerHTML = "";

    const selectedDate =
        new Date(
            currentYear,
            currentMonth,
            currentDay
        );

    let dayOfWeek =
        selectedDate.getDay();

    if (dayOfWeek === 0) {
        dayOfWeek = 7;
    }

    const monday =
        new Date(selectedDate);

    monday.setDate(
        selectedDate.getDate()
        - dayOfWeek
        + 1
    );

    const sunday =
        new Date(monday);

    sunday.setDate(
        monday.getDate() + 6
    );

    currentPeriod.textContent =
        monday.toLocaleDateString("fr-FR")
        + " - "
        + sunday.toLocaleDateString("fr-FR");

    const weekElement =
        document.createElement("div");

    const weekTitle =
        document.createElement("h2");

    weekTitle.textContent =
        "Semaine";

    weekElement.appendChild(
        weekTitle
    );

    for (let i = 0; i < 7; i++) {

        const date =
            new Date(monday);

        date.setDate(
            monday.getDate() + i
        );

        const dayContainer =
            document.createElement("div");

        const dayName =
            document.createElement("strong");

        dayName.textContent =
            date.toLocaleDateString(
                "fr-FR",
                {
                    weekday: "long"
                }
            );

        const dayButton =
            createDayButton(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );

        dayContainer.appendChild(
            dayName
        );

        dayContainer.appendChild(
            dayButton
        );

        weekElement.appendChild(
            dayContainer
        );
    }

    calendar.appendChild(
        weekElement
    );
}


// ==========================
// AFFICHAGE JOUR
// ==========================

function showDay() {

    calendar.innerHTML = "";

    const date =
        new Date(
            currentYear,
            currentMonth,
            currentDay
        );

    currentPeriod.textContent =
        date.toLocaleDateString(
            "fr-FR",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    const dayElement =
        document.createElement("div");

    const dayTitle =
        document.createElement("h2");

    dayTitle.textContent =
        date.toLocaleDateString(
            "fr-FR",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    dayElement.appendChild(
        dayTitle
    );

    const dayButton =
        createDayButton(
            currentYear,
            currentMonth,
            currentDay
        );

    dayElement.appendChild(
        dayButton
    );

    calendar.appendChild(
        dayElement
    );
}


// ==========================
// NAVIGATION ←
// ==========================

previousButton.addEventListener(
    "click",
    function () {

        if (currentView === "year") {

            currentYear--;

        }

        else if (currentView === "month") {

            currentMonth--;

            if (currentMonth < 0) {

                currentMonth = 11;
                currentYear--;
            }
        }

        else if (currentView === "week") {

            const date =
                new Date(
                    currentYear,
                    currentMonth,
                    currentDay
                );

            date.setDate(
                date.getDate() - 7
            );

            currentYear =
                date.getFullYear();

            currentMonth =
                date.getMonth();

            currentDay =
                date.getDate();
        }

        else if (currentView === "day") {

            const date =
                new Date(
                    currentYear,
                    currentMonth,
                    currentDay
                );

            date.setDate(
                date.getDate() - 1
            );

            currentYear =
                date.getFullYear();

            currentMonth =
                date.getMonth();

            currentDay =
                date.getDate();
        }

        afficher();
    }
);


// ==========================
// NAVIGATION →
// ==========================

nextButton.addEventListener(
    "click",
    function () {

        if (currentView === "year") {

            currentYear++;

        }

        else if (currentView === "month") {

            currentMonth++;

            if (currentMonth > 11) {

                currentMonth = 0;
                currentYear++;
            }
        }

        else if (currentView === "week") {

            const date =
                new Date(
                    currentYear,
                    currentMonth,
                    currentDay
                );

            date.setDate(
                date.getDate() + 7
            );

            currentYear =
                date.getFullYear();

            currentMonth =
                date.getMonth();

            currentDay =
                date.getDate();
        }

        else if (currentView === "day") {

            const date =
                new Date(
                    currentYear,
                    currentMonth,
                    currentDay
                );

            date.setDate(
                date.getDate() + 1
            );

            currentYear =
                date.getFullYear();

            currentMonth =
                date.getMonth();

            currentDay =
                date.getDate();
        }

        afficher();
    }
);


// ==========================
// CHANGER D'AFFICHAGE
// ==========================

function afficher() {

    if (currentView === "year") {

        showYear();

    }

    else if (currentView === "month") {

        showMonth();

    }

    else if (currentView === "week") {

        showWeek();

    }

    else if (currentView === "day") {

        showDay();
    }
}


// ==========================
// BOUTON ANNÉE
// ==========================

yearView.addEventListener(
    "click",
    function () {

        currentView = "year";

        afficher();
    }
);


// ==========================
// BOUTON MOIS
// ==========================

monthView.addEventListener(
    "click",
    function () {

        currentView = "month";

        afficher();
    }
);


// ==========================
// BOUTON SEMAINE
// ==========================

weekView.addEventListener(
    "click",
    function () {

        currentView = "week";

        afficher();
    }
);


// ==========================
// BOUTON JOUR
// ==========================

dayView.addEventListener(
    "click",
    function () {

        currentView = "day";

        afficher();
    }
);


// ==========================
// PRISE 1
// ==========================

dose1.addEventListener(
    "change",
    function () {

        const dateKey =
            dayModal.dataset.dateKey;

        medicationData[dateKey].dose1 =
            dose1.checked;

        sauvegarder();
    }
);


// ==========================
// PRISE 2
// ==========================

dose2.addEventListener(
    "change",
    function () {

        const dateKey =
            dayModal.dataset.dateKey;

        medicationData[dateKey].dose2 =
            dose2.checked;

        sauvegarder();
    }
);


// ==========================
// FERMER LA FENÊTRE
// ==========================

closeModal.addEventListener(
    "click",
    function () {

        dayModal.style.display =
            "none";
    }
);


// ==========================
// AFFICHAGE INITIAL
// ==========================

afficher();