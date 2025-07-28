//vi skapar en lista (array) med våra objekt vilket är våra plagg och informationen kring dessa så som pris osv.

const listItems = [
    {
        "name": "Shirt",
        "id": "shirt",
        "description": "Knitted beige", 
        "price": 200,
        "unit": "kr",
        "image": "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[950]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[1],origin[dam],source[%2F65%2F7b%2F657b325ff11c789a1b5f16c4ca815bdb0c9829ca.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]",
        
    },
    {
        "name": "Trousers",
        "id": "trousers",
        "description": "Troursers in denim",
        "price": 300,
        "unit": "kr",
        "image": "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[950]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[1],origin[dam],source[%2Fc9%2Ff4%2Fc9f43ebe6a6ec273ae463c76beb5a2566b4ae47a.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]",
    },
    {
        "name": "Linne",
        "id": "top",
        "description": "White top",
        "price": 150,
        "unit": "kr",
        "image": "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[950]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[4],origin[dam],source[%2F65%2F58%2F65589f6107b76b6b0abf7babfd828b4692eebb09.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]",
    },
    {
        "name": "Sweatshirt",
        "id": "sweatshirt",
        "description": "Grey sweatshirt made with cotton",
        "price": 150,
        "unit": "kr",
        "image": "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[950]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[1],origin[dam],source[%2F68%2F6c%2F686c83db32fe3555b3a7617cfd30d0c244aae207.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]",
    },
    {
        "name": "Maxidress",
        "id": "maxidress",
        "description": "Long dress in soft cotton",
        "price": 150,
        "unit": "kr",
        "image": "https://lp.arket.com/app006prod?set=key[resolve.pixelRatio],value[2]&set=key[resolve.width],value[950]&set=key[resolve.height],value[10000]&set=key[resolve.imageFit],value[containerwidth]&set=key[resolve.allowImageUpscaling],value[0]&set=key[resolve.format],value[webp]&set=key[resolve.quality],value[80]&set=ImageVersion[2],origin[dam],source[%2F72%2F19%2F72194af27104192a2f82fdf059e81fe0ad121fae.jpg],type[DESCRIPTIVESTILLLIFE]&call=url[file%3A%2Fproduct%2Fdynamic.chain]",
    }
];

//vi skapar en array vars nycklar är plaggens namn
let shoppingList = {};

//vi sätter värdet så att vi börjar på 0
function initShoppingList() {
    for (let listItem of listItems) {
        shoppingList[listItem.name] = 0;
    }
}

/*Vi ritar upp en tabell som innehåller vår inköpslista som vi lägger till i html body med referens till id:t #protocol 
  så listan skapas i anslutning till typ av vara, antal pch pris. Vi kapslar sedan in alla delar av listan i ett if statement
  som gör så att listan endast syns om värde är ett eller över. */
function renderShoppingList() {
    let tbody = document.querySelector("#protocol > tbody");
    tbody.innerHTML = "";
    for (let listItem of listItems){
        if (shoppingList[listItem.name]>= 1){
        let row = tbody.insertRow(-1);
        let cellName = row.insertCell(-1);
        let cellAmount = row.insertCell(-1);
        let cellPrice = row.insertCell(-1);
        let amount = shoppingList[listItem.name];
        cellName.textContent = listItem.name;
        cellAmount.textContent = amount;
        cellPrice.textContent = amount * listItem.price + " " + listItem.unit;
        }}
    
}

// Ökar antalet plagg med 1 och räknar om protokollet och detta anropar vi senare i for loopen som ligger i container som är vår behållare för produkterna
function increment(name) {
    shoppingList[name]++;
    renderShoppingList();
}
// Minskar antalet plagg med 1 och räknar om protokollet och detta anropar vi senare i for loopen som ligger i container som är vår behållare för produkterna
function decrement(name) {
    shoppingList[name]--;
    renderShoppingList();
} 

//Skapar funktionen count som ska räkna ut den totala kostnaden för varje produkt i vår inköpslista. 
//Total variabeln i funktionen innehåller den totala kostnaden för alla produkter och variabeln items innehåler informationen om produkten, exempelvis pris.
//Med object.entries returnerar vi en array för att sedan lägga till ".reduce" för att reducera arrayen till ett värde istället för en hel array. 
//i detta scenario så tar vi priset som finns i listan och multiplicerar antalet produkter med priset för att sedan lägga in den i den totala kostnaden.
function count() {
    let count = Object.values(shoppingList).reduce((sum, cur) => sum += cur, 0);
    let total = Object.entries(shoppingList).reduce((sum, cur) => {
        const [name, amount] = cur;
        const items = listItems.find((p) => p.name === name);
        return sum + (items.price * amount);
    }, 0);
    document.getElementById("sum").innerHTML = "Du har lagt till " + count + " " + "stycken produkter i listan och det totala priset är" + " " + total + "kr" ;
}


// Funktionen renderItems skapar en html-mall, i konstanten template innehåller html mallen. I mallen lägger vi våra objekt i vår lista samt plus- och minusknappen.
function renderItems() {
    const template = `
        <img>
        <div class="p-2">
            <div>
                <span class="name"></span>
                <span class="plus float-end" title="LÃ¤gg till plagg">
                    <i class="bi bi-plus-square"></i>                  
                </span>
                <span class="minus float-end" title="Ta bort plagg">
                <i class="bi-dash-square-fill" aria-hidden="true"></i>
                </span>
            </div>
            <div class="price"></div>
            <div class="unit"></div>
            <div class="description"></div>
        </div>
    `;
// konstanten container skapas och kallar på element med id shoppinglist med document.querySelector. Denna kommer vara behållaren för produkterna som skapas. 
//For loop skapas och kör objekten i listItems, för varje objekt som körs så kommer en div att skapas(document.createElement("div")), klassnamn för denna är "item", "ms-2"
//med innerhtml så kommer mallen "template" att appliceras i varje div
    const container = document.querySelector("#shoppinglist");
    for (let listItem of listItems) {
        let item = document.createElement("div");
        item.classList.add("item", "ms-2");
        item.innerHTML = template;
        item.querySelector("img").src = listItem.image;
        item.querySelector(".name").textContent = listItem.name;
        item.querySelector(".description").textContent = listItem.description;
        item.querySelector(".price").textContent = listItem.price;
        item.querySelector(".unit").textContent = listItem.unit;
        item.querySelector(".plus").addEventListener("click", () => increment(listItem.name));
        item.querySelector(".minus").addEventListener("click", () => decrement(listItem.name));
        container.appendChild(item);
    }
    }



// window.onload körs varje gång sidan laddas. Denna körs i den ordningen som man skrivit den i. Denna har vi också för att kunna ha våran javascript "script" i våran <head> 
window.onload = function() {    
    renderItems();      
    initShoppingList();
    renderShoppingList();
}
