const listItems = [
   {
      name: "Shirt", 
      description: "Knitted beige off‑shoulder top",
      price: 200,
      unit: "kr",
      image: "https://images.unsplash.com/photo-1656166192672-1fa01c14885f?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Trousers",
      id: "trousers",
      description: "Trousers in denim",
      price: 300,
      unit: "kr",
      image: "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Linne",
      id: "top",
      description: "White top",
      price: 150,
      unit: "kr",
      image: "https://plus.unsplash.com/premium_photo-1687188208380-3280626ec43e?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Sweatshirt",
      id: "sweatshirt",
      description: "Grey sweatshirt made with cotton",
      price: 150,
      unit: "kr",
      image: "https://images.unsplash.com/photo-1692221271229-27dc0d3f9ca3?w=500&auto=format&fit=crop&q=60"
   },
   {
      name: "Maxidress",
      id: "maxidress",
      description: "Long dress in soft cotton",
      price: 150,
      unit: "kr",
      image: "https://images.unsplash.com/photo-1686562376391-966faa514647?w=500&auto=format&fit=crop&q=60"
   }
];

let shoppingList = {};

function initShoppingList() {
    for (let item of listItems) {
        shoppingList[item.name] = 0;
    }
}

function renderShoppingList() {
    const tbody = document.querySelector("#protocol > tbody");
    tbody.innerHTML = "";

    listItems
        .filter(item => shoppingList[item.name] >= 1)
        .forEach(item => {
            const row = tbody.insertRow();
            row.insertCell().textContent = item.name;
            row.insertCell().textContent = shoppingList[item.name];
            row.insertCell().textContent = (item.price * shoppingList[item.name]).toFixed(2) + " " + item.unit;
        });
}

function increment(name) {
    shoppingList[name]++;
    renderShoppingList();
    // Här räknar vi inte ut total direkt
}

function decrement(name) {
    if (shoppingList[name] > 0) {
        shoppingList[name]--;
        renderShoppingList();
        // Här räknar vi inte ut total direkt
    }
}

function count() {
    const count = Object.values(shoppingList).reduce((sum, value) => sum + value, 0);
    const total = Object.entries(shoppingList).reduce((sum, [name, amount]) => {
        const item = listItems.find(p => p.name === name);
        return sum + (item.price * amount);
    }, 0);

    const plural = count === 1 ? "produkt" : "produkter";
    document.getElementById("sum").innerHTML =
        `Du har lagt till ${count} ${plural} i listan och det totala priset är ${total.toFixed(2)} kr.`;
}

function resetShoppingList() {
    for (let key in shoppingList) {
        shoppingList[key] = 0;
    }
    renderShoppingList();
    // Nollställ summa-texten
    document.getElementById("sum").innerHTML = "Total kostnad:";
}

function renderItems() {
    const container = document.querySelector("#shoppinglist");
    const template = `
        <div class="product-card">
            <img>
            <div class="p-2">
                <div>
                    <span class="name"></span>
                    <span class="plus float-end" title="Lägg till plagg">
                        <i class="bi bi-plus-square"></i>                  
                    </span>
                    <span class="minus float-end me-2" title="Ta bort plagg">
                        <i class="bi bi-dash-square-fill" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="price"></div>
                <div class="unit"></div>
                <div class="description"></div>
            </div>
        </div>
    `;

    listItems.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("item", "ms-2");
        element.innerHTML = template;

        element.querySelector("img").src = item.image;
        element.querySelector("img").alt = item.name;
        element.querySelector(".name").textContent = item.name;
        element.querySelector(".description").textContent = item.description;
        element.querySelector(".price").textContent = item.price + " " + item.unit;
        element.querySelector(".unit").textContent = item.unit;

        element.querySelector(".plus").addEventListener("click", () => increment(item.name));
        element.querySelector(".minus").addEventListener("click", () => decrement(item.name));

        container.appendChild(element);
    });
}

window.onload = () => {
    initShoppingList();
    renderItems();
};
