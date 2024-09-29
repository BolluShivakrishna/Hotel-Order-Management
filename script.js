

const menu = {
    idli: [
        { name: "Plain Idli", fullPlatePrice: 40.00, halfPlatePrice: 20.00 },
        { name: "Rava Idli", fullPlatePrice: 45.00, halfPlatePrice: 25.00 }
    ],
    dosa: [
        { name: "Plain Dosa", fullPlatePrice: 50.00, halfPlatePrice: 25.00 },
        { name: "Masala Dosa", fullPlatePrice: 70.00, halfPlatePrice: 55.00 },
        { name: "Egg Dosa", fullPlatePrice: 60.00, halfPlatePrice: 30.00 }
    ],
    puri: [
        { name: "Masala Puri", fullPlatePrice: 40.00, halfPlatePrice: 30.00 },
        { name: "Plain Puri", fullPlatePrice: 30.00, halfPlatePrice: 20.00 }
    ],
    upma: [
        { name: "Plain Upma", price: 40.00 },
        { name: "Kaju Upma", price: 40.00 }
    ]
};

let totalCost = 0;
let orderItems = [];

function updateFoodOptions() {
    const food = document.getElementById("food").value;
    const foodOptionsDiv = document.getElementById("food-options");
    const plateSizeSelect = document.getElementById("plate-size");
    
    foodOptionsDiv.innerHTML = '';
    
    menu[food].forEach((item, index) => {
        const option = document.createElement("div");
        option.innerHTML = `
            <input type="radio" id="food-option-${index}" name="food-option" value="${index}">
            <label for="food-option-${index}">${item.name}</label>
        `;
        foodOptionsDiv.appendChild(option);
    });

    if (food === "upma") {
        plateSizeSelect.disabled = true;
    } else {
        plateSizeSelect.disabled = false;
    }
}

function addToOrder() {
    const selectedFood = document.getElementById("food").value;
    const selectedOption = document.querySelector('input[name="food-option"]:checked');
    
    if (!selectedOption) {
        alert("Please select a food type.");
        return;
    }

    const selectedPlateSize = document.getElementById("plate-size").value;
    const foodItem = menu[selectedFood][selectedOption.value];
    
    let price = 0;
    if (selectedFood === "upma") {
        price = foodItem.price;
    } else {
        price = selectedPlateSize === "full" ? foodItem.fullPlatePrice : foodItem.halfPlatePrice;
    }
    
    totalCost += price;
    
    // Add item to orderItems array
    const orderItem = {
        name: foodItem.name,
        plate: selectedPlateSize === "full" ? "Full Plate" : "Half Plate",
        price: price
    };
    orderItems.push(orderItem);
    
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = ''; // Clear the current order list

    orderItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.plate} of ${item.name} - ₹${item.price.toFixed(2)}
            <button onclick="removeFromOrder(${index})">Remove</button>
        `;
        orderList.appendChild(listItem);
    });

    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
}

function removeFromOrder(index) {
    const item = orderItems[index];
    
    // Subtract the price of the removed item from the total cost
    totalCost -= item.price;
    
    // Remove the item from the orderItems array
    orderItems.splice(index, 1);
    
    // Update the order list and total cost
    updateOrderList();
}

// const menu = {
//     idli: [
//         { name: "Plain Idli", fullPlatePrice: 40.00, halfPlatePrice: 20.00 },
//         { name: "Rava Idli", fullPlatePrice: 45.00, halfPlatePrice: 25.00 }
//     ],
//     dosa: [
//         { name: "Plain Dosa", fullPlatePrice: 50.00, halfPlatePrice: 25.00 },
//         { name: "Masala Dosa", fullPlatePrice: 70.00, halfPlatePrice: 55.00 },
//         { name: "Egg Dosa", fullPlatePrice: 60.00, halfPlatePrice: 30.00 }
//     ],
//     puri: [
//         { name: "Masala Puri", fullPlatePrice: 40.00, halfPlatePrice: 30.00 },
//         { name: "Plain Puri", fullPlatePrice: 30.00, halfPlatePrice: 20.00 }
//     ],
//     upma: [
//         { name: "Plain Upma", price: 40.00 },
//         { name: "Kaju Upma", price: 40.00 }
//     ]
// };

// let totalCost = 0;

// function updateFoodOptions() {
//     const food = document.getElementById("food").value;
//     const foodOptionsDiv = document.getElementById("food-options");
//     const plateSizeSelect = document.getElementById("plate-size");

//     foodOptionsDiv.innerHTML = '';
    
//     menu[food].forEach((item, index) => {
//         const option = document.createElement("div");
//         option.innerHTML = `
//             <input type="radio" id="food-option-${index}" name="food-option" value="${index}">
//             <label for="food-option-${index}">${item.name}</label>
//         `;
//         foodOptionsDiv.appendChild(option);
//     });

//     if (food === "upma") {
//         plateSizeSelect.disabled = true;
//     } else {
//         plateSizeSelect.disabled = false;
//     }
// }

// function addToOrder() {
//     const selectedFood = document.getElementById("food").value;
//     const selectedOption = document.querySelector('input[name="food-option"]:checked');

//     if (!selectedOption) {
//         alert("Please select a food type.");
//         return;
//     }

//     const selectedPlateSize = document.getElementById("plate-size").value;
//     const foodItem = menu[selectedFood][selectedOption.value];

//     let price = 0;
//     if (selectedFood === "upma") {
//         price = foodItem.price;
//     } else {
//         price = selectedPlateSize === "full" ? foodItem.fullPlatePrice : foodItem.halfPlatePrice;
//     }

//     totalCost += price;

//     const orderList = document.getElementById("order-list");
//     const newOrderItem = document.createElement("li");
//     newOrderItem.textContent = `${selectedPlateSize === "full" ? "Full" : "Half"} plate of ${foodItem.name} - ₹${price.toFixed(2)}`;
//     orderList.appendChild(newOrderItem);

//     document.getElementById("total-cost").textContent = totalCost.toFixed(2);
// }