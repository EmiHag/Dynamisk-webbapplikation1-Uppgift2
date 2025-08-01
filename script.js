const listItems = [
   {
      name: "Shirt",
      price: 200,
      unit: "kr",
      description: "Knitted beige off‑shoulder top",
      image: "https://images.unsplash.com/photo-1656166192672-1fa01c14885f?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Trousers",
      price: 300,
      unit: "kr",
      description: "Trousers in denim",
      image: "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Linne",
      price: 150,
      unit: "kr",
      description: "White top",
      image: "https://plus.unsplash.com/premium_photo-1687188208380-3280626ec43e?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Sweatshirt",
      price: 150,
      unit: "kr",
      description: "Grey sweatshirt made with cotton",
      image: "https://images.unsplash.com/photo-1692221271229-27dc0d3f9ca3?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Maxidress",
      price: 150,
      unit: "kr",
      description: "Long dress in soft cotton",
      image: "https://images.unsplash.com/photo-1686562376391-966faa514647?w=500&auto=format&fit=crop&q=60"
   }
];

let shoppingList = {};
let showVAT = false;

function initShoppingList() {
    for (let item of listItems) {
        shoppingList[item.name] = 0;
    }
}

function renderShoppingList() {
    const tbody = document.querySelector("#protocol > tbody");
    tbody.innerHTML = "";

    listItems.forEach(item => {
        const count = shoppingList[item.name];
        if (count > 0) {
            const row = tbody.insertRow();
            row.insertCell().textContent = item.name;
            row.insertCell().textContent = count;

            const price = item.price * count;
            const finalPrice = showVAT ? price * 1.25 : price;
            row.insertCell().textContent = finalPrice.toFixed(2) + " " + item.unit;

            const deleteCell = row.insertCell();
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "🗑️";
            deleteBtn.classList.add("btn", "btn-sm", "btn-danger");
            deleteBtn.onclick = () => {
                shoppingList[item.name] = 0;
                renderShoppingList();
                updateTotal();
            };
            deleteCell.appendChild(deleteBtn);
        }
    });
}

function increment(name, qty = 1) {
    shoppingList[name] += qty;
    renderShoppingList();
}

function decrement(name) {
    if (shoppingList[name] > 0) {
        shoppingList[name]--;
        renderShoppingList();
    }
}

function count() {
    updateTotal();
}

function updateTotal() {
    const totalCount = Object.values(shoppingList).reduce((sum, val) => sum + val, 0);
    const totalPrice = Object.entries(shoppingList).reduce((sum, [name, amount]) => {
        const item = listItems.find(p => p.name === name);
        return sum + (item.price * amount);
    }, 0);
    const final = showVAT ? totalPrice * 1.25 : totalPrice;

    const plural = totalCount === 1 ? "produkt" : "produkter";
    document.getElementById("sum").textContent =
        `Du har lagt till ${totalCount} ${plural} i listan och det totala priset är ${final.toFixed(2)} kr.`;
}

function resetShoppingList() {
    for (let key in shoppingList) {
        shoppingList[key] = 0;
    }
    renderShoppingList();
    document.getElementById("sum").textContent = "Total kostnad:";
}

function renderItems() {
    const container = document.querySelector("#shoppinglist");
    container.innerHTML = "";

    listItems.forEach(item => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("card", "m-2");
        wrapper.style.width = "180px";

        const image = document.createElement("img");
        image.src = item.image;
        image.classList.add("card-img-top");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h6");
        title.classList.add("card-title");
        title.textContent = item.name;

        const desc = document.createElement("p");
        desc.classList.add("card-text", "small", "text-muted");
        desc.textContent = item.description;

        const price = document.createElement("p");
        price.innerHTML = `Pris: ${item.price} ${item.unit}`;

        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.value = 1;
        input.classList.add("form-control", "mb-2");

        const addBtn = document.createElement("button");
        addBtn.textContent = "Lägg till";
        addBtn.classList.add("btn", "btn-primary", "btn-sm", "w-100");
        addBtn.onclick = () => {
            const qty = parseInt(input.value);
            if (!isNaN(qty) && qty > 0) {
                increment(item.name, qty);
            }
        };

        cardBody.append(title, desc, price, input, addBtn);
        wrapper.append(image, cardBody);
        container.appendChild(wrapper);
    });
}

function setupVATToggle() {
    const vatToggle = document.getElementById("vatToggle");
    if (vatToggle) {
        vatToggle.addEventListener("change", function () {
            showVAT = this.checked;
            renderShoppingList();
            updateTotal();
        });
    }
}

window.onload = () => {
    initShoppingList();
    renderItems();
    renderShoppingList();
    setupVATToggle();
};
