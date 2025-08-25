document.addEventListener("DOMContentLoaded", () => {
    const openListBtn = document.getElementById("openListBtn");
    const grocerySection = document.getElementById("grocery");
    const addItemBtn = document.getElementById("addItemBtn");
    const itemInput = document.getElementById("itemInput");
    const groceryList = document.getElementById("groceryList");

    // Mostra/Nasconde la lista quando clicchi "Grocery List"
    openListBtn.addEventListener("click", (e) => {
        e.preventDefault();
        grocerySection.classList.toggle("hidden");
    });

    // Aggiunge un elemento alla lista
    addItemBtn.addEventListener("click", () => {
        const itemText = itemInput.value.trim();
        if (itemText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `${itemText} <button>✕</button>`;

        // Rimuove un elemento quando clicchi la X
        li.querySelector("button").addEventListener("click", () => {
            li.remove();
        });

        groceryList.appendChild(li);
        itemInput.value = "";
    });

    // Aggiunge anche con ENTER
    itemInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addItemBtn.click();
        }
    });
});
