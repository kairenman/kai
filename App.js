function addToCart(productIndex) {
    // Get the product details
    const productName = document.getElementById(`product${productIndex}`).textContent;
    const productPrice = parseFloat(document.getElementById(`price${productIndex}`).textContent);
    const productQuantity = parseInt(document.getElementById(`qty${productIndex}`).value);
  
    // Validate quantity input
    if (isNaN(productQuantity) || productQuantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }
  
    // Calculate the total price for this item
    const totalPrice = productPrice * productQuantity;
  
    // Update the order list textarea
    const orderList = document.getElementById('carts');
    orderList.value += `${productName} x ${productQuantity} = ₱${totalPrice.toFixed(2)}\n`;
  
    // Update the total price
    updateTotal();
  
    // Clear the quantity input field
    document.getElementById(`qty${productIndex}`).value = '';
  }
  
  function updateTotal() {
    // Get the order list content
    const orderList = document.getElementById('carts').value;
  
    // Calculate the total price from the order list
    let total = 0;
    const lines = orderList.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const price = parseFloat(line.split('=')[1].trim().slice(1));
        total += price;
      }
    }
  
    // Update the total price display
    document.getElementById('total').value = `₱${total.toFixed(2)}`;
  }
  
  // Calculate change when cash is entered
  document.getElementById('cash').addEventListener('input', function() {
    const total = parseFloat(document.getElementById('total').value.slice(1));
    const cashTendered = parseFloat(this.value);
    const change = isNaN(cashTendered) ? 0 : cashTendered - total;
    document.getElementById('change').value = `₱${change.toFixed(2)}`;
  });

  // Function to generate a receipt
  function generateReceipt() {
    // Get the order list content
    const orderList = document.getElementById('carts').value;

    // Get the total price
    const total = parseFloat(document.getElementById('total').value.slice(1));

    // Get the cash tendered and change
    const cashTendered = parseFloat(document.getElementById('cash').value);
    const change = parseFloat(document.getElementById('change').value.slice(1));

    // Create a new window for the receipt
    const receiptWindow = window.open('', 'Receipt', 'width=400,height=400');

    // Write the receipt content to the new window
    receiptWindow.document.write(`
      <h1>Pepper Lunch Restaurant</h1>
      <p>Date: ${new Date().toLocaleDateString()}</p>
      <hr>
      ${orderList}
      <hr>
      <p>Total: ₱${total.toFixed(2)}</p>
      <p>Cash Tendered: ₱${cashTendered.toFixed(2)}</p>
      <p>Change: ₱${change.toFixed(2)}</p>
      <hr>
      <p>Thank you for ordering!</p>
    `);
  }

  // Add an event listener to the "Generate Receipt" button
  const generateReceiptButton = document.createElement('button');
  generateReceiptButton.textContent = 'Generate Receipt';
  generateReceiptButton.classList.add('btn', 'btn-success', 'mt-2');
  generateReceiptButton.addEventListener('click', generateReceipt);

  // Append the button to the order section
  document.querySelector('.order-section').appendChild(generateReceiptButton);

  // Function to clear the order list, total, cash tendered, and change
  function clearOrder() {
    document.getElementById('carts').value = '';
    document.getElementById('total').value = '';
    document.getElementById('cash').value = '';
    document.getElementById('change').value = '';
  }

  // Add an event listener to the "Clear" button
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear';
  clearButton.classList.add('btn', 'btn-warning', 'mt-2');
  clearButton.addEventListener('click', clearOrder);

  // Append the button to the order section
  document.querySelector('.order-section').appendChild(clearButton);
