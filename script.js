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

// Функция для получения нормализованного дня недели
function getDayName() {
    const now = new Date();
    const mskTime = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        weekday: "long"
    }).format(now);
    return mskTime.charAt(0).toUpperCase() + mskTime.slice(1).toLowerCase();
}

// Функция для проверки, входит ли текущее время в интервал
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

    return current >= start && current < end;
}

// Функция для определения текущего руководителя
function getCurrentLeader() {
    const today = getDayName(); // Определяем текущий день недели
    const shifts = schedule[today] || []; // Получаем расписание на сегодня

    console.log(`Сегодня: ${today}`);
    console.log(`Расписание на сегодня:`, shifts);

    for (const shift of shifts) {
        console.log(`Проверяем смену: ${shift.name}, с ${shift.start} до ${shift.end}`);
        if (isNowInTimeRange(shift.start, shift.end)) {
            console.log(`Руководитель найден: ${shift.name}`);
            return shift.name;
        }
    }

    console.log("Нет подходящих смен для текущего времени");
    return "Нет руководителя на смене";
}

// Функция для обновления информации о руководителе на странице
function updateLeaderDisplay() {
    const currentLeader = getCurrentLeader();
    console.log("Текущий руководитель на смене:", currentLeader); // Лог для проверки
    document.getElementById("leader").textContent = currentLeader;
}

// Запускаем обновление только после полной загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    updateLeaderDisplay();
});
