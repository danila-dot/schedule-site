document.addEventListener("DOMContentLoaded", function () {
    // Расписание руководителей
    const schedule = {
        Понедельник: [
            { name: "М.И", start: "08:00", end: "15:00" },
            { name: "Т.Б", start: "15:00", end: "22:00" },
        ],
        Вторник: [
            { name: "М.И", start: "08:00", end: "12:00" },
            { name: "М.И", start: "18:00", end: "22:00" },
        ],
        Среда: [
            { name: "М.И", start: "08:00", end: "15:00" },
            { name: "Т.Б", start: "15:00", end: "22:00" },
        ],
        Четверг: [
            { name: "Т.Б", start: "08:00", end: "12:00" },
            { name: "Т.Б", start: "18:00", end: "22:00" },
        ],
        Пятница: [
            { name: "Т.Б", start: "08:00", end: "12:00" },
            { name: "Т.Б", start: "18:00", end: "22:00" },
        ],
        Суббота: [
            { name: "М.И", start: "08:00", end: "12:00" },
            { name: "М.И", start: "18:00", end: "22:00" },
        ],
        Воскресенье: [
            { name: "Т.Б", start: "08:00", end: "15:00" },
            { name: "М.И", start: "15:00", end: "22:00" },
        ],
    };

    // Получаем текущее время в Москве
    const now = new Date();
    const moscowTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Europe/Moscow" })
    );

    // Извлекаем день недели и время
    const daysOfWeek = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    const currentDay = daysOfWeek[moscowTime.getDay()];
    const currentHours = moscowTime.getHours();
    const currentMinutes = moscowTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    console.log("Сегодня (московское время):", currentDay);
    console.log(
        `Текущее время (московское): ${currentHours}:${currentMinutes}`
    );

    // Получаем расписание на текущий день
    const todaySchedule = schedule[currentDay] || [];
    console.log("Расписание на сегодня:", todaySchedule);

    // Ищем руководителя, который сейчас на смене
    let currentLeader = "Нет руководителя на смене";

    for (const shift of todaySchedule) {
        const [startHours, startMinutes] = shift.start.split(":").map(Number);
        const [endHours, endMinutes] = shift.end.split(":").map(Number);

        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        console.log(`Проверяем смену: ${shift.name}, с ${shift.start} до ${shift.end}`);
        console.log(
            `Сравнение: ${currentTotalMinutes} >= ${startTotalMinutes} && ${currentTotalMinutes} < ${endTotalMinutes}`
        );

        if (
            currentTotalMinutes >= startTotalMinutes &&
            currentTotalMinutes < endTotalMinutes
        ) {
            currentLeader = shift.name;
            console.log("Руководитель найден:", currentLeader);
            break;
        }
    }

    console.log("Текущий руководитель на смене:", currentLeader);

    // Отображаем результат на сайте
    const leaderElement = document.getElementById("leader");
    if (leaderElement) {
        leaderElement.textContent = `Сейчас на смене: ${currentLeader}`;
    }
});
