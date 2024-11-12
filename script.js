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

    const now = new Date();
    const currentDay = now.toLocaleDateString("ru-RU", { weekday: "long" });
    const normalizedDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);
    const todaySchedule = schedule[normalizedDay] || [];

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
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

        if (currentMinutes >= startTimeInMinutes && currentMinutes < endTimeInMinutes) {
            currentLeader = name;

            const remainingMinutes = endTimeInMinutes - currentMinutes;
            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMins = remainingMinutes % 60;

            notesText = `До конца смены: ${remainingHours}ч ${remainingMins}м.`;
        }

        if (currentMinutes < startTimeInMinutes && !nextShiftStart) {
            nextShiftStart = { name, start };
        }
    }

    if (nextShiftStart) {
        notesText += ` Следующая смена: ${nextShiftStart.name} в ${nextShiftStart.start}.`;
    }

    leaderElement.textContent = currentLeader;
    notesElement.textContent = notesText;
});
