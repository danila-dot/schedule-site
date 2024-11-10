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

    console.log("Сегодня:", mskTime); // Отладка: выводим текущий день недели

    return mskTime;
}

// Проверка, находится ли текущее московское время в интервале
function isNowInTimeRange(startTime, endTime) {
    // Текущее московское время
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit"
    });
    const [hours, minutes] = formatter.format(now).split(":").map(Number);

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const current = hours * 60 + minutes;
    const start = startHours * 60 + startMinutes;
    const end = endHours * 60 + endMinutes;

    console.log("Текущее время:", hours, "ч:", minutes, "мин");
    console.log("Начало интервала:", startHours, "ч:", startMinutes, "мин");
    console.log("Конец интервала:", endHours, "ч:", endMinutes, "мин");

    // Проверка, находится ли текущее время в интервале (включительно начало и исключая конец)
    const inTimeRange = current >= start && current < end;
    console.log("Текущее время в интервале:", inTimeRange);

    return inTimeRange;
}

// Определение текущего руководителя
function getCurrentLeader() {
    const today = getDayName(); // Определяем текущий день
    const shifts = schedule[today] || []; // Получаем смены на сегодня

    console.log("Расписание на сегодня:", shifts); // Проверяем, что расписание загружено

    for (const shift of shifts) {
        console.log(`Проверяем смену: ${shift.name}, с ${shift.start} до ${shift.end}`); // Проверяем каждую смену

        if (isNowInTimeRange(shift.start, shift.end)) {
            console.log("Руководитель найден:", shift.name); // Если нашли руководителя
            return shift.name;
        }
    }

    console.log("Нет подходящих смен для текущего времени"); // Если никто не найден
    return "Нет руководителя на смене";
}



// Обновление страницы
function updateLeader() {
    const leaderDiv = document.querySelector(".current-leader");
    if (!leaderDiv) {
        console.error("Элемент с классом .current-leader не найден!"); // Отладка: если элемент не найден
        return;
    }

    const currentLeader = getCurrentLeader();
    console.log("Текущий руководитель на смене:", currentLeader); // Отладка: выводим информацию на консоль
    leaderDiv.textContent = `Сейчас на смене: ${currentLeader}`;
}

// Инициализация
updateLeader();
