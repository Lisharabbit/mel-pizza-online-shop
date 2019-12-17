function renderTotal(state) {
    const { selectedToppings, selectedSize } = state;

    const parentNode = document.querySelector('.total');
    clearNode(parentNode);
    
    let total = selectedSize ? selectedSize.price : 0;

    selectedToppings.forEach(({ price, amount}) =>{
        selectedToppingTotal = price * amount;
        total = parseFloat(total)  + parseFloat(selectedToppingTotal);
    });

    const totalSpan = document.createElement('span');
    totalSpan.innerText = `Total: $ ${total}`;

    parentNode.append(totalSpan);
}