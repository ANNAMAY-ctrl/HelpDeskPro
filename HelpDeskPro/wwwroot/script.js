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

        // Create a container for status controls.
        const statusContainer = document.createElement("div");
        statusContainer.className = "status-control";

        //Create an accesible label
        const statusLabel = document.createElement("label");
        statusLabel.textContent = "Status: ";

        //Create a dropdown for updating ticket status
        const statusSelect = document.createElement("select");
        statusSelect.className = "ticket-status";

        //Give the dropdown a unique ID
        statusSelect.id = "status-" + ticket.id;

        //Connect the label to the dropdown 
        statuslabel.htmlFor = statusSelect.id;

        //Define the allowed ticket statuses
        const statuses = [
            "Open",
            "In Progress",
            "Resolved"
        ];

        //Add each status as a dropdown option
        statuses.forEach(function (status) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });

        //Select the tickets current status
        statusSelect.value = ticket.status;

        //Listen for changes to status dropdown
        statusSelect.addEventListener("change", function () {

            //Update the ticket's status in the array
            ticket.status = statusSelect.value;

            //Save the updated tickets to local storage
            saveTickets();

            //Refresh the dashboard statistics
            updateStatistics();
        });

        //Put the label and dropdown together
        statusContainer.appendChild(statusLabel);
        statusContainer.appendChild(statusSelect);

        //Add all ticket information to the card
        card.appendChild(ticketId);
        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(description);
        card.appendChild(priority);
        card.appendChild(statusContainer);
        card.appendChild(title);

        //Add the completed card to our dashboard
        ticketList.appendChild(card);
    });
    updateStatistics();
}


//OPEN CREATE TICKET FORM
createTicketBtn.addEventListener("click", function () {

    ticketFormSection.hidden = false;
    ticketFormSection.scrollIntoView({
        behavior: "smooth"
    });
});


//CANCEL TICKET CREATION
cancelTicketBtn.addEventListener("click", function () {
    ticketFormSection.hidden = true;
    ticketForm.reset();
});

//SUBMIT A NEW SUPPORT TICKET
ticketform.addEventListener("submit", function (event) {

    //Prevent the browser from refreshing
    event.preventDefault();

    //Get information entered by user
    const fullName =
        document.getElementById("fullName").value.trim();

    const issueTitle =
        document.getElementById("issueTitle").value.trim();

    const category =
        document.getElementById("category").value;

    const priority =
        document.getElementById("priority").value;

    const description =
        document.getElementById("description").value.trim();

    //Check that all required information is present
    if (!fullName || !issueTitle || !category || !priority || !description) {
        alert("Please complete all required fields.");
        return;
    }

    //Create a unique ticket ID
    const ticketId = crypto.randomUUID();


    //Create a JavaScript object containing the ticket
    const netTicket = {
        id: ticketId,
        name: fullName,
        title: issueTitle,
        category: category,
        priority: priority,
        description: description,
        status: "Open",
        createdAt: new Date().toISOString()
    };

    //Add the new ticket to the beginning of the array
    tickets.unshift(newTicket);

    //Save all tickets to browser storage
    saveTickets();

    //Display the new ticket on the dashboard
    displayTickets();

    alert("Support ticket created successfully!");
    ticketForm.reset();
    ticketFormSection.hidden = true;
});


//APPLICATION STARTUP
displayTickets();
console.log("Help Desk Pro is running!");