let processes = [];

function addProcess() {
    const processId = document.getElementById("process-id").value;
    const arrivalTime = parseInt(document.getElementById("arrival-time").value);
    const burstTime = parseInt(document.getElementById("burst-time").value);

    if (isNaN(arrivalTime) || isNaN(burstTime) || arrivalTime < 0 || burstTime <= 0) {
        alert("Invalid input for arrival time or burst time.");
        return;
    }

    processes.push({ id: processId, arrival: arrivalTime, burst: burstTime });
    updateTable();
}

function deleteProcess() {
    processes.pop();
    updateTable();
}

function updateTable() {
    const tableBody = document.querySelector("#process-table tbody");
    tableBody.innerHTML = "";
    processes.forEach(process => {
        const row = tableBody.insertRow();
        row.innerHTML = `<td>${process.id}</td><td>${process.arrival}</td><td>${process.burst}</td>`;
    });
}

function calculate() {
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    processes.forEach((process, index) => {
        process.waiting = index === 0 ? 0 : processes[index - 1].waiting + processes[index - 1].burst;
        process.turnaround = process.waiting + process.burst;

        totalWaitingTime += process.waiting;
        totalTurnaroundTime += process.turnaround;
    });

    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;

    const averageTimesDiv = document.getElementById("average-times");
    averageTimesDiv.innerText = `Average Waiting Time: ${averageWaitingTime.toFixed(2)} | Average Turnaround Time: ${averageTurnaroundTime.toFixed(2)}`;
}

function visualize() {
    const ganttChartDiv = document.getElementById("gantt-chart");
    ganttChartDiv.innerHTML = "";

    processes.forEach(process => {
        const processDiv = document.createElement("div");
        processDiv.classList.add("process-bar");
        processDiv.style.width = `${process.burst * 30}px`;
        processDiv.style.backgroundColor = getRandomColor();
        processDiv.innerText = `P${process.id}`;
        ganttChartDiv.appendChild(processDiv);
    });
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
