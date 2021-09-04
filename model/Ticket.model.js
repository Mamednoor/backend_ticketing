const { TicketSchema } = require("./Ticket.schema");

const insertTicket = (userObjt) => {
  TicketSchema(userObjt)
    .save()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

module.exports = { insertTicket };
