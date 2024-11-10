// График работы (время указано для МСК)
const schedule = {
    "Понедельник": [
        { name: "М.И", start: "08:00", end: "15:00" },
        { name: "Т.Б", start: "15:00", end: "22:00" }
    ],
    "Вторник": [
        { name: "М.И", start: "08:00", end: "12:00" },
        { name: "М.И", start: "18:00", end: "22:00" }
    ],
    "Среда": [
        { name: "М.И", start: "08:00", end: "15:00" },
        { name: "Т.Б", start: "15:00", end: "22:00" }
    ],
    "Четверг": [
        { name: "Т.Б", start: "08:00", end: "12:00" },
        { name: "Т.Б", start: "18:00", end: "22:00" }
    ],
    "Пятница": [
        { name: "Т.Б", start: "08:00", end: "12:00" },
        { name: "Т.Б", start: "18:00", end: "22:00" }
    ],
    "Суббота": [
        { name: "М.И", start: "08:00", end: "12:00" },
        { name: "М.И", start: "18:00", end: "22:00" }
    ],
    "Воскресенье": [
        { name: "Т.Б", start: "08:00", end: "15:00" },
        { name: "М.И", start: "15:00", end: "22:00" }
    ]
};

// Получение текущего дня недели на русском
function getDayName() {
    const days = [
        "Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота"
    ];
    // Текущее московское время
    const now = new Date();
    const mskTime = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        weekday: "long"
    }).format(now);
    return mskTime;
}

function isNowInTimeRange(startTime, endTime) {
    // Получаем текущее московское время
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit"
    });
    const [hours, minutes] = formatter.format(now).split(":").map(Number);

    // Переводим текущее время в минуты
    const current = hours * 60 + minutes;

    // Переводим начало и конец интервала в минуты
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const start = startHours * 60 + startMinutes;

    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const end = endHours * 60 + endMinutes;

    // Проверяем, находится ли текущее время в интервале (включительно начало и исключая конец)
    return current >= start && current < end;
}


// Определение текущего руководителя
function getCurrentLeader() {
    const today = getDayName();
    const shifts = schedule[today] || [];

    for (const shift of shifts) {
        if (isNowInTimeRange(shift.start, shift.end)) {
            return shift.name;
        }
    }
    return "Нет руководителя на смене";
}

// Обновление страницы
function updateLeader() {
    const leaderDiv = document.querySelector(".current-leader");
    const currentLeader = getCurrentLeader();
    leaderDiv.textContent = `Сейчас на смене: ${currentLeader}`;
}

// Инициализация
updateLeader();

