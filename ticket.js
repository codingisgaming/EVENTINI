document.addEventListener('DOMContentLoaded', function() {
    // Ticket quantity controls
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.ticket-quantity');
            input.value = parseInt(input.value) + 1;
            updateTotal();
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.ticket-quantity');
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
                updateTotal();
            }
        });
    });

    // Manual input handling
    document.querySelectorAll('.ticket-quantity').forEach(input => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 0) this.value = 0;
            updateTotal();
        });
    });

    // Pay button click handler
    document.getElementById('payButton').addEventListener('click', function() {
        const total = calculateTotal();
        if (total > 0) {
            // Close reservation modal
            const reservationModal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
            reservationModal.hide();
            
            // Show success modal after a short delay
            setTimeout(() => {
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                
                // Reset form after payment
                document.querySelectorAll('.ticket-quantity').forEach(input => {
                    input.value = 0;
                });
                updateTotal();
            }, 500);
        } else {
            alert('Please select at least one ticket');
        }
    });

    // Calculate total amount
    function calculateTotal() {
        let total = 0;
        document.querySelectorAll('.ticket-quantity').forEach(input => {
            total += parseInt(input.value) * parseFloat(input.dataset.price);
        });
        return total;
    }

    // Update total display
    function updateTotal() {
        const total = calculateTotal();
        document.getElementById('totalAmount').textContent = `$${total}`;
    }
});