// График смен
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

// Функция для получения нормализованного дня недели на русском языке
function getDayName() {
    const days = [
        "Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота"
    ];

    const now = new Date();
    // Получаем текущий день недели с учётом МСК
    const mskTime = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        weekday: "long"
    }).format(now);

    console.log("Сегодня (оригинальный формат):", mskTime); // Отладка: исходное значение

    // Приводим первый символ к верхнему регистру, остальные — к нижнему
    const normalizedDay = mskTime.charAt(0).toUpperCase() + mskTime.slice(1).toLowerCase();
    console.log("Сегодня (нормализованный формат):", normalizedDay);

    return normalizedDay;
}

// Функция для проверки, попадает ли текущее время в заданный интервал
function isNowInTimeRange(startTime, endTime) {
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

    console.log(`Текущее время: ${hours}:${minutes}`);
    console.log(`Начало смены: ${startHours}:${startMinutes}`);
    console.log(`Конец смены: ${endHours}:${endMinutes}`);
    console.log(`Сравнение: ${current} >= ${start} && ${current} < ${end}`);

    const inTimeRange = current >= start && current < end;
    console.log("Текущее время входит в интервал:", inTimeRange);

    return inTimeRange;
}

// Функция для получения текущего руководителя на смене
function getCurrentLeader() {
    const today = getDayName(); // Определяем текущий день
    const shifts = schedule[today] || []; // Получаем смены на сегодня

    console.log("Расписание на сегодня:", shifts); // Отладка: проверяем расписание

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

// Выводим результат на страницу
const currentLeader = getCurrentLeader();
console.log("Текущий руководитель на смене:", currentLeader);

// Выводим на страницу
document.getElementById("leader").textContent = currentLeader;
