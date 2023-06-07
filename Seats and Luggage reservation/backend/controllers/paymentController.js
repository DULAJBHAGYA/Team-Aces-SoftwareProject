// Dummy payment validation function
function validatePayment(cardNumber, expirationDate, cvv) {
  // Predefined card data for validation
  const validCard = {
    cardNumber: "1234567890123456",
    expirationDate: "12/23",
    cvv: "123",
  };

  // Compare the entered card data with the predefined card
  if (
    cardNumber === validCard.cardNumber &&
    expirationDate === validCard.expirationDate &&
    cvv === validCard.cvv
  ) {
    return true; // Payment successful
  }

  return false; // Payment failed
}

module.exports = {
  processPayment: (req, res) => {
    const { cardNumber, expirationDate, cvv } = req.body;

    // Simulate payment processing logic
    const isPaymentSuccessful = validatePayment(
      cardNumber,
      expirationDate,
      cvv
    );

    if (isPaymentSuccessful) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  },
};
