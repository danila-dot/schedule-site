document.addEventListener("DOMContentLoaded", () => {
    const schedule = {
        Понедельник: [
            { name: "М.И", start: "08:00", end: "15:00" },
            { name: "Т.Б", start: "15:00", end: "22:00" }
        ],
        Вторник: [
            { name: "М.И", start: "08:00", end: "12:00" },
            { name: "М.И", start: "18:00", end: "22:00" }
        ],
        Среда: [
            { name: "М.И", start: "08:00", end: "15:00" },
            { name: "Т.Б", start: "15:00", end: "22:00" }
        ],
        Четверг: [
            { name: "Т.Б", start: "08:00", end: "12:00" },
            { name: "Т.Б", start: "18:00", end: "22:00" }
        ],
        Пятница: [
            { name: "Т.Б", start: "08:00", end: "12:00" },
            { name: "Т.Б", start: "18:00", end: "22:00" }
        ],
        Суббота: [
            { name: "М.И", start: "08:00", end: "12:00" },
            { name: "М.И", start: "18:00", end: "22:00" }
        ],
        Воскресенье: [
            { name: "Т.Б", start: "08:00", end: "15:00" },
            { name: "М.И", start: "15:00", end: "22:00" }
        ]
    };

    // Получение текущей даты и времени в московском часовом поясе
    const now = new Date();
    const moscowTime = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "numeric",
        minute: "numeric",
        weekday: "long"
    }).formatToParts(now);

    const currentDay = moscowTime.find((part) => part.type === "weekday").value;
    const normalizedDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);
    const todaySchedule = schedule[normalizedDay] || [];

    const currentHours = parseInt(moscowTime.find((part) => part.type === "hour").value, 10);
    const currentMinutes = parseInt(moscowTime.find((part) => part.type === "minute").value, 10);
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const leaderElement = document.getElementById("leader");
    const notesElement = document.getElementById("notes");

    let currentLeader = "Нет руководителя на смене";
    let notesText = "";
    let nextShiftStart = null;

    for (let i = 0; i < todaySchedule.length; i++) {
        const { name, start, end } = todaySchedule[i];
        const [startHours, startMinutes] = start.split(":").map(Number);
        const [endHours, endMinutes] = end.split(":").map(Number);

        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;

        if (currentTotalMinutes >= startTimeInMinutes && currentTotalMinutes < endTimeInMinutes) {
            currentLeader = name;

            const remainingMinutes = endTimeInMinutes - currentTotalMinutes;
            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMins = remainingMinutes % 60;

            notesText = `До конца смены: ${remainingHours}ч ${remainingMins}м.`;
        }

        if (currentTotalMinutes < startTimeInMinutes && !nextShiftStart) {
            nextShiftStart = { name, start };
        }
    }

    if (nextShiftStart) {
        notesText += ` Следующая смена: ${nextShiftStart.name} в ${nextShiftStart.start}.`;
    }

    leaderElement.textContent = currentLeader;
    notesElement.textContent = notesText;
});
