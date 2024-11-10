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
// Определение текущего дня недели на русском
function getDayName() {
    const days = [
        "Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота"
    ];
    const now = new Date();
    return days[now.getDay()];
}

// Проверка, находится ли текущее время в интервале
function isNowInTimeRange(startTime, endTime) {
    const now = new Date();
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const start = new Date(now);
    start.setHours(startHours, startMinutes, 0);

    const end = new Date(now);
    end.setHours(endHours, endMinutes, 0);

    return now >= start && now <= end;
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
function updateLeader() {
    const leaderDiv = document.querySelector(".current-leader");
    const currentLeader = getCurrentLeader();
    leaderDiv.textContent = `Сейчас на смене: ${currentLeader}`;
}

// Инициализация
updateLeader();
