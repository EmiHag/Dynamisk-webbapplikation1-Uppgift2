// Vi skapar en lista (array) med våra objekt (plagg och information om dessa)
const listItems = [
    {
        name: "Shirt",
        id: "shirt",
        description: "Knitted beige", 
        price: 200,
        unit: "kr",
        image: "https://pixabay.com/sv/illustrations/tr%C3%B6ja-mockup-t-shirt-mockup-kl%C3%A4der-7979853/"
    },
    {
        name: "Trousers",
        id: "trousers",
        description: "Trousers in denim",
        price: 300,
        unit: "kr",
        image: "https://pixabay.com/sv/photos/kvinna-tillf%C3%A4llig-jeans-solglas%C3%B6gon-9035476/"
    },
    {
        name: "Linne",
        id: "top",
        description: "White top",
        price: 150,
        unit: "kr",
        image: "https://pixabay.com/sv/photos/kvinna-ung-tillf%C3%A4llig-jeans-8879486/"
    },
    {
        name: "Sweatshirt",
        id: "sweatshirt",
        description: "Grey sweatshirt made with cotton",
        price: 150,
        unit: "kr",
        image: "https://pixabay.com/sv/photos/lady-m%C3%B6ssa-tr%C3%B6ja-mode-kl%C3%A4der-9627841/"
    },
    {
        name: "Maxidress",
        id: "maxidress",
        description: "Long dress in soft cotton",
        price: 150,
        unit: "kr",
        image: "https://pixabay.com/sv/photos/frihet-flicka-kl%C3%A4nning-1712590/"
    }
];

// Vi skapar en objekt-array som håller antalet av varje plagg
let shoppingList = {};

// Initiera listan med 0 antal för varje plagg
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

// Ökar antalet plagg
function increment(name) {
    shoppingList[name]++;
    renderShoppingList();
    count();
}

// Minskar antalet plagg (inte under 0)
function decrement(name) {
    if (shoppingList[name] > 0) {
        shoppingList[name]--;
        renderShoppingList();
        count();
    }
}

// Räknar antal produkter och total kostnad
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

// Återställer inköpslistan till 0
function resetShoppingList() {
    for (let key in shoppingList) {
        shoppingList[key] = 0;
    }
    renderShoppingList();
    count();
}

function renderItems() {
    const container = document.querySelector("#shoppinglist");
    const template = `
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

        // Lägg till klickfunktioner på plus/minus-knappar
        element.querySelector(".plus").addEventListener("click", () => increment(item.name));
        element.querySelector(".minus").addEventListener("click", () => decrement(item.name));

        container.appendChild(element);
    });
}
