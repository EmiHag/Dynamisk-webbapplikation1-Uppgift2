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

// Initiera antal till 0 för alla produkter
function initShoppingList() {
    for (let item of listItems) {
        shoppingList[item.name] = 0;
    }
}

// Renderar inköpslistan i tabellen
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

// Öka antal, men räkna inte ut summan här
function increment(name) {
    shoppingList[name]++;
    renderShoppingList();
}

// Minska antal (minst 0), men räkna inte ut summan här
function decrement(name) {
    if (shoppingList[name] > 0) {
        shoppingList[name]--;
        renderShoppingList();
    }
}

// Räkna ut total och visa när du klickar på knappen "Räkna ut"
function count() {
    const totalCount = Object.values(shoppingList).reduce((sum, val) => sum + val, 0);
    const totalPrice = Object.entries(shoppingList).reduce((sum, [name, amount]) => {
        const item = listItems.find(p => p.name === name);
        return sum + (item.price * amount);
    }, 0);

    const plural = totalCount === 1 ? "produkt" : "produkter";
    document.getElementById("sum").textContent =
        `Du har lagt till ${totalCount} ${plural} i listan och det totala priset är ${totalPrice.toFixed(2)} kr.`;
}

// Återställ alla antal till 0 och töm tabellen + summa-texten
function resetShoppingList() {
    for (let key in shoppingList) {
        shoppingList[key] = 0;
    }
    renderShoppingList();
    document.getElementById("sum").textContent = "Total kostnad:";
}

// Renderar produkterna och lägger till klick-hanterare på plus och minus
function renderItems() {
    const container = document.querySelector("#shoppinglist");
    const template = `
        <div class="product-card p-2 border m-2" style="width: 180px;">
            <img style="width: 100%; height: auto;" />
            <div>
                <div>
                    <span class="name fw-bold"></span>
                    <span class="plus float-end" title="Lägg till plagg" style="cursor:pointer;">
                        <i class="bi bi-plus-square"></i>                  
                    </span>
                    <span class="minus float-end me-2" title="Ta bort plagg" style="cursor:pointer;">
                        <i class="bi bi-dash-square-fill" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="price text-muted"></div>
                <div class="description small text-secondary"></div>
            </div>
        </div>
    `;

    listItems.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("item");
        element.innerHTML = template;

        element.querySelector("img").src = item.image;
        element.querySelector("img").alt = item.name;
        element.querySelector(".name").textContent = item.name;
        element.querySelector(".description").textContent = item.description;
        element.querySelector(".price").textContent = item.price + " " + item.unit;

        element.querySelector(".plus").addEventListener("click", () => increment(item.name));
        element.querySelector(".minus").addEventListener("click", () => decrement(item.name));

        container.appendChild(element);
    });
}

// När sidan laddas initiera allt
window.onload = () => {
    initShoppingList();
    renderItems();
    renderShoppingList(); // visa initial tom tabell
};
