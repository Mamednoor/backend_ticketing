const { TicketSchema } = require("./Ticket.schema");

const insertTicket = (ticketObjt) => {
  return new Promise((resole, reject) => {
    TicketSchema(ticketObjt)
      .save()
      .then((data) => resole(data))
      .catch((error) => reject(error));
  });
};

module.exports = { insertTicket };
