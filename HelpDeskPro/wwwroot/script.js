const createTicketBtn =
    document.getElementById("createTicketBtn");
const ticketForm =
    document.getElementById("ticketForm");
const ticketFormSection =
    document.getElementById("ticketFormSection");
const cancelTicketBtn = 
    document.getElementById("cancelTicketBtn");
const ticketList =
    document.getElementById("ticketList");
const emptyMessage =
    document.getElementById("emptyMessage");

    //LOAD SAVED TICKETS
const savedTickets =
    localStorage.getItem("helpdeskTickets");

// If nothing has been saved, start with an empty array.
let tickets = savedTickets
    ? JSON.parse(savedTickets)
    : [];

//SAVE TICKETS
function saveTickets() {

    const ticketData = JSON.stringify(tickets);
    localStorage.getItem("helpdeskTickets", ticketData);
}

//UPDATE DASHBOARD STATS
function updateStatistics() {

    //Count all the tickets in our array
    const total = tickets.length;
    //Count tickets with the status "Open".
    const open = tickets.filter(function (ticket){
        return ticket.status === "Open";
    }).length;

    //Count tickets currently in progress
    const inProgress = tickets.filter(function (ticket) {
        return ticket.status === "In Progress"
    }).length

    // Count tickets marked as resolved.
    const resolved = tickets.filter(function (ticket) {
        return ticket.status === "Resolved";
    }).length;

    //Update the number displayed in HTML
    document.getElementById("totalTickets").textContent =
        total;
    document.getElementById("openTickets").textContent =
        open;
    document.getElementById("progressTickets").textContent =
        inProgress;
    document.getElementById("resolvedTickets").textContent =
        resolved;
}

//DISPLAY SUPPORT TICKETS
function displayTickets() {

    //remove previously displayed ticket cards
    ticketList.innerHTML = "";

    //check whether the tcket array is empty
    if (ticket.length === 0) {
        emptyMessage.hidden = false;
        updateStatistics();
        return;
    }
    //hide emty message when tickets exist
    emptyMessage.hidden = true;

    //loop through every ticket in the array
    tickets.forEach(function (ticket) {
        const card = document.createElement("div")

        //apply CSS ticket-card styling
        card.className = "ticket-card";

        const title = document.createElement("h3");
        title.textContent = ticket.title;

        //create a paragraph for the ticket ID
        const ticketId = document.createElement("p");
        ticketId.className = "ticket-id";
        ticketId.textContent = "Ticket ID: " + ticket.id;

        // create a paragraph for the requester's name
        const name = document.createElement("p");
        name.textContent = "Submitted by: " + ticket.name;


        //create a paragraph for category
        const category = document.createElement("p");
        name.textContent = "Category: " + ticket.category;

        //create a paragraph for description
        const description = document.createElement("p");
        description.textContent = 
            "Description: " + ticket.description

        //Create a label showing ticket priority
        const priority = document.createElement("span");

        priority.className =
            "priority-badge priority-" +
            ticket.priority.toLowerCase();

        priority.textContent = ticket.priority + "Priority";
}