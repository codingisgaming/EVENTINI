document.addEventListener("DOMContentLoaded", function () {
    const reserveBtn = document.getElementById("reserveBtn");
    const ticketModal = new bootstrap.Modal(document.getElementById("ticketModal"));
  
    reserveBtn.addEventListener("click", () => {
      ticketModal.show();
    });
  });
  