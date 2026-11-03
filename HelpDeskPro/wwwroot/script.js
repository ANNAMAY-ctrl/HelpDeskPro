const createTicketBtn =
    document.getElementById("createTicketBtn");
const ticketForm =
    document.getElementById("ticketForm");
const ticketFormSection =
    document.getElementById("ticketFormSection");
const cancelTicketBtn = 
    document.getElementById("cancelTicketBtn");

createTicketBtn.addEventListener("click", function () {

    ticketFormSection.hidden = false;
    ticketFormSection.scrollIntoView({
        behavior: "smooth"
    });

});

cancelTicketBtn.addEventListener("click", function () {
    ticketFormSection.hidden = true;
    ticketForm.reset();
});


ticketForm.addEventListener("submit", function (event) {
    event.preventDefault();
    

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

    if (!fullName || !issueTitle ||
        !category || !priority || !description) {
        alert("Please complete all required fields.");
        return;
    }

    const newTicket = {
        name: fullName,
        title: issueTitle,
        category: category,
        priority: priority,
        description: description,
        status: "Open",

        createdAt: new Date().toISOString() 
    };

    console.log("New Ticket:", newTicket);
    alert("Ticket submitted successfully!");
    ticketForm.reset();
    ticketFormSection.hidden = true;
});
console.log("HelpDesk Pro loaded successfully!");