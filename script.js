/* ================= SELECT ELEMENTS ================= */
const itemInput = document.getElementById("item-input");
const priceInput = document.getElementById("price-input");
const quantityInput = document.getElementById("quantity-input");
const categoryInput = document.getElementById("category-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const totalPriceEl = document.getElementById("total-price");

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

const sortSelect = document.getElementById("sortSelect");
const searchBar = document.getElementById("search-bar");          
const filterCategory = document.getElementById("filterCategory"); 
const breakdownEl = document.getElementById("category-breakdown");
const saveBtn = document.getElementById("save-btn");
let total = 0;
let items = [];

/* ================= SIDEBAR MENU ================= */
hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

/* ================= HEALTHY ALTERNATIVES ================= */
const unhealthyMap = {
  cola: "sparkling water with lemon",
  pepsi: "sparkling water with orange",
  fanta: "fresh orange juice",
  sprite: "lime water",
  energy: "green tea",
  alcohol: "herbal tea",
  beer: "kombucha",
  wine: "pomegranate juice",
  cioccolato: "dark chocolate (70%+ cacao)",
  cioccolatini: "dates with cocoa",
  biscotti: "wholegrain crackers",
  merendina: "homemade oatmeal bar",
  caramelle: "dried fruit (apricots, figs)",
  gelato: "frozen yogurt with fruit",
  panna: "greek yogurt",
  zucchero: "honey or stevia",
  nutella: "almond or hazelnut butter",
  patatine: "baked sweet potato chips",
  popcorn_burro: "air-popped popcorn",
  salatini: "unsalted rice cakes",
  arachidi_salata: "raw almonds",
  cracker: "wholegrain crackers",
  pizza_surgelata: "homemade wholegrain pizza with vegetables",
  hamburger: "chicken or veggie burger",
  hotdog: "chicken/lentil sausage",
  kebab: "grilled chicken wrap with salad",
  lasagne_surgelate: "homemade vegetable lasagna",
  cibo_istantaneo: "fresh vegetable soup",
  cornflakes_zuccherati: "unsweetened muesli",
  cereali_cioccolato: "rolled oats with fruit",
  pancake_pronti: "homemade oat pancakes",
  brioche: "wholegrain bread with jam",
  pane_bianco: "wholegrain bread",
  riso_bianco: "brown rice",
  pasta_bianca: "wholegrain pasta",
  pizza_bianca: "wholegrain focaccia with olive oil",
  salsiccia: "turkey sausage",
  wurstel: "grilled chicken sausage",
  bacon: "turkey bacon",
  carne_rossa_grassa: "lean beef or chicken breast",
  frittura: "oven-baked chicken with spices",
  maionese: "greek yogurt sauce",
  ketchup: "homemade tomato sauce",
  salsa_formaggio: "hummus",
  olio_fritto: "extra virgin olive oil (a crudo)",
  torta_industriale: "homemade carrot cake",
  croissant: "wholegrain croissant",
  muffin: "banana muffin without sugar",
  waffle: "oat waffles with fruit",
  patatine_fritte: "oven-baked potatoes",
  nuggets: "oven-baked chicken strips",
  formaggio_processato: "fresh mozzarella or ricotta",
  burro: "extra virgin olive oil",
  margarina: "avocado spread"
};

/* ================= ADD ITEM ================= */
addBtn.addEventListener("click", () => {
  const item = itemInput.value.trim();
  const price = parseFloat(priceInput.value.trim());
  let quantity = parseInt(quantityInput.value.trim());
  const category = categoryInput.value;

  if (item && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
    let displayName = item;
    if (unhealthyMap[item.toLowerCase()]) {
      displayName += ` (Try: ${unhealthyMap[item.toLowerCase()]})`;
    }

    items.push({ name: displayName, price, quantity, category });

    itemInput.value = "";
    priceInput.value = "";
    quantityInput.value = "1";
    categoryInput.value = "Altro";

    renderList();
  }
});

/* ================= RENDER LIST ================= */
function renderList() {
  list.innerHTML = "";
  total = 0;

  // Filtro + ricerca
  const searchTerm = searchBar.value.toLowerCase();
  const selectedCategory = filterCategory.value;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  filteredItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - ${item.category} - €${item.price.toFixed(2)} x ${item.quantity}</span>
      <div class="controls">
        <button class="minus">-</button>
        <button class="plus">+</button>
        <button class="delete">❌</button>
      </div>
    `;

    li.querySelector(".plus").addEventListener("click", () => {
      item.quantity++;
      renderList();
    });

    li.querySelector(".minus").addEventListener("click", () => {
      if (item.quantity > 1) item.quantity--;
      renderList();
    });

    li.querySelector(".delete").addEventListener("click", () => {
      const realIndex = items.indexOf(item);
      items.splice(realIndex, 1);
      renderList();
    });

    list.appendChild(li);
    total += item.price * item.quantity;
  });

  updateTotal();
  updateBreakdown();
}

/* ================= UPDATE TOTAL ================= */
function updateTotal() {
  totalPriceEl.textContent = total.toFixed(2);
}

/* ================= CATEGORY BREAKDOWN ================= */
function updateBreakdown() {
  const breakdown = {};
  items.forEach(item => {
    if (!breakdown[item.category]) breakdown[item.category] = 0;
    breakdown[item.category] += item.price * item.quantity;
  });

  breakdownEl.innerHTML = "<h3>Category Breakdown</h3>";
  for (const cat in breakdown) {
    breakdownEl.innerHTML += `<p><strong>${cat}:</strong> €${breakdown[cat].toFixed(2)}</p>`;
  }
}

/* ================= SORTING ================= */
sortSelect.addEventListener("change", () => {
  const val = sortSelect.value;

  if (val === "priceAsc") {
    items.sort((a, b) => a.price - b.price);
  } else if (val === "priceDesc") {
    items.sort((a, b) => b.price - a.price);
  } else if (val === "alphaAsc") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (val === "alphaDesc") {
    items.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderList();
});

/* ================= SEARCH + FILTER EVENTS ================= */
searchBar.addEventListener("input", renderList);
filterCategory.addEventListener("change", renderList);

/* ================= SAVE LIST ================= */
saveBtn.addEventListener("click", () => {
  let content = "Grocery List:\n\n";
  items.forEach(item => {
    content += `${item.name} (${item.category}) - €${item.price.toFixed(2)} x ${item.quantity}\n`;
  });
  content += `\nTOTAL: €${total.toFixed(2)}`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "grocery-list.txt";
  a.click();

  URL.revokeObjectURL(url);
});

/* ================= SCROLL ANIMATION ================= */
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.hidden-from-left, .hidden-from-right');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => {
    observer.observe(el);

    // fallback: se è già visibile all'apertura, aggiungi subito la classe show
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('show');
    }
  });
});