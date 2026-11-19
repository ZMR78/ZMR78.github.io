// مولّد صور بديلة تلقائية في حال عدم توفر الإنترنت
function getFallbackImage(title, bg = "#DCE8F2") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">
      <rect width="600" height="700" fill="${bg}"/>
      <circle cx="300" cy="270" r="130" fill="#ffffff" fill-opacity="0.55"/>
      <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#181A1F">
        Ghima_store
      </text>
      <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="22" fill="#4A5568">
        ${title}
      </text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// بيانات منتجات Ghima_store (12 قطعة متنوعة)
const products = [
  {
    id: 1,
    name: "هودي قطن سحابي - أزرق هادئ",
    category: "hoodies",
    fabric: "قطن ميلتون ثقيل معالج ضد الوبر",
    price: 650,
    oldPrice: 780,
    tag: "الأكثر مبيعاً",
    tagType: "",
    colors: ["#7FAAC9", "#1E1E1E", "#E8E4DC"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#DCE8F2"
  },
  {
    id: 2,
    name: "تيشيرت Ghima_store الأساسي - أبيض ناصع",
    category: "tshirts",
    fabric: "قطن مصري 100% ناعم (240 جرام)",
    price: 380,
    oldPrice: null,
    tag: "جديد",
    tagType: "",
    colors: ["#FFFFFF", "#1E1E1E", "#C8BFA8"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#F2EDE4"
  },
  {
    id: 3,
    name: "بنطلون وايد ليج مريح - بيج رملي",
    category: "pants",
    fabric: "خامة جابردين مرنة للحركة اليومية",
    price: 520,
    oldPrice: 620,
    tag: "خصم 15%",
    tagType: "sale",
    colors: ["#D6C7B2", "#3A3D42"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#EBE4D8"
  },
  {
    id: 4,
    name: "جاكيت بامبر سحابي مبطن - كحلي ليلي",
    category: "jackets",
    fabric: "خامة مقاومة للهواء ببطانة قطنية ناعمة",
    price: 890,
    oldPrice: 1050,
    tag: "جديد 2026",
    tagType: "gold",
    colors: ["#1D2D44", "#1E1E1E", "#6B705C"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#D8E2EC"
  },
  {
    id: 5,
    name: "سويت شيرت كلاسيك - أسود فحمي",
    category: "hoodies",
    fabric: "مبطن من الداخل بنعومة فائقة",
    price: 590,
    oldPrice: null,
    tag: "الأكثر طلباً",
    tagType: "",
    colors: ["#1E1E1E", "#5C92C1"],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#D4D6D9"
  },
  {
    id: 6,
    name: "تيشيرت أوفر سايز - رمادي فاتح",
    category: "tshirts",
    fabric: "قطن يسمح بالتهوية بقصة مريحة",
    price: 410,
    oldPrice: 470,
    tag: "عرض خاص",
    tagType: "sale",
    colors: ["#CBD2D9", "#FFFFFF", "#2C3E50"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#E4E8EC"
  },
  {
    id: 7,
    name: "بنطلون كارجو قطن عملي - زيتي غامق",
    category: "pants",
    fabric: "قطن تويل متين بجيوب جانبية عصرية",
    price: 640,
    oldPrice: 750,
    tag: "جديد",
    tagType: "",
    colors: ["#4A5D4E", "#1E1E1E", "#C2B280"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#DCE3DC"
  },
  {
    id: 8,
    name: "كارديجان صوف ناعم - جملي دافئ",
    category: "jackets",
    fabric: "نسيج قطني محبوك خفيف ومريح",
    price: 760,
    oldPrice: null,
    tag: "إصدار محدود",
    tagType: "gold",
    colors: ["#C19A6B", "#EAE0D5", "#2B2D42"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#EFE6DA"
  },
  {
    id: 9,
    name: "هودي سحاب (Zip-Up) - أوف وايت كريمي",
    category: "hoodies",
    fabric: "قطن ميلتون فاخر بسحاب معدني متين",
    price: 710,
    oldPrice: 820,
    tag: "خصم 15%",
    tagType: "sale",
    colors: ["#F4EFE6", "#7FAAC9", "#222222"],
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#F2EDE4"
  },
  {
    id: 10,
    name: "تيشيرت بولو قطن بيكيه - أزرق سماوي",
    category: "tshirts",
    fabric: "قطن بيكيه مصري بارد وأنيق للخروجات",
    price: 450,
    oldPrice: null,
    tag: "جديد",
    tagType: "",
    colors: ["#89CFF0", "#FFFFFF", "#1B263B"],
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#DCEEF8"
  },
  {
    id: 11,
    name: "بنطلون سويت بانتس - رمادي دخاني",
    category: "pants",
    fabric: "قطن ميلتون دافئ للخريف والشتاء",
    price: 490,
    oldPrice: null,
    tag: "",
    tagType: "",
    colors: ["#6E737B", "#1E1E1E"],
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#DFE3E8"
  },
  {
    id: 12,
    name: "جاكيت دنيم أوفر سايز - أزرق ثلجي",
    category: "jackets",
    fabric: "جينز قطني 100% مغسول بنعومة فائقة",
    price: 950,
    oldPrice: 1120,
    tag: "قطعة مميزة",
    tagType: "gold",
    colors: ["#7393B3", "#2F3E46"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#DCE6F0"
  }
];

let cart = JSON.parse(localStorage.getItem("ghima_store_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("ghima_store_wishlist")) || [];
let currentFilter = "all";
let currentSort = "default";
let searchQuery = "";
let onlyWishlist = false;
let qvSelectedSize = "M";

// رقم الواتساب الخاص بـ Ghima_store
const STORE_WHATSAPP = "201024811183";
const FREE_SHIPPING_THRESHOLD = 1200;

const productsGrid = document.getElementById("products-grid");
const visibleCountEl = document.getElementById("visible-count");
const filterTabs = document.getElementById("filter-tabs");
const sortSelect = document.getElementById("sort-select");
const searchInput = document.getElementById("search-input");
const mobileSearchInput = document.getElementById("mobile-search-input");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const wishlistFilterBtn = document.getElementById("wishlist-filter-btn");
const wishlistCountEl = document.getElementById("wishlist-count");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const subtotalEl = document.getElementById("cart-subtotal");
const shippingEl = document.getElementById("cart-shipping");
const totalEl = document.getElementById("cart-total");
const shippingMsgEl = document.getElementById("shipping-msg");
const shippingBarEl = document.getElementById("shipping-bar");
const checkoutForm = document.getElementById("checkout-form");
const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal");
const toastEl = document.getElementById("toast");
const scrollProgressEl = document.getElementById("scroll-progress");
const backToTopBtn = document.getElementById("back-to-top");

// 0. إدارة الوضع الليلي (Dark Mode)
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ghima_store_theme", theme);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    themeToggleBtn.title = theme === "dark" ? "الوضع النهاري" : "الوضع الليلي";
  }
}

const savedTheme = localStorage.getItem("ghima_store_theme") ||
  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

// 1. عرض المنتجات حسب الفلترة والترتيب والبحث مع حركة ظهور متتابعة
function renderProducts() {
  let list = [...products];

  if (onlyWishlist) {
    list = list.filter(p => wishlist.includes(p.id));
  } else if (currentFilter !== "all") {
    list = list.filter(p => p.category === currentFilter);
  }

  if (searchQuery.trim() !== "") {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q)
    );
  }

  if (currentSort === "low") list.sort((a, b) => a.price - b.price);
  if (currentSort === "high") list.sort((a, b) => b.price - a.price);

  if (visibleCountEl) {
    visibleCountEl.textContent = list.length;
  }

  if (list.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">لا توجد قطع مطابقة لبحثك حالياً.</p>`;
    return;
  }

  productsGrid.innerHTML = list.map((product, index) => {
    const isLiked = wishlist.includes(product.id);
    const fallbackUrl = getFallbackImage(product.name, product.fallbackBg);
    const staggerDelay = `${Math.min(index * 0.05, 0.4)}s`;

    return `
      <article class="product-card" data-id="${product.id}" style="--stagger: ${staggerDelay}">
        <div class="product-img-wrap">
          ${product.tag ? `<span class="tag ${product.tagType}">${product.tag}</span>` : ""}
          <button type="button" class="wish-btn ${isLiked ? "liked" : ""}" onclick="toggleWishlist(${product.id})" title="أضف للمفضلة">
            ${isLiked ? "♥" : "♡"}
          </button>
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.onerror=null; this.src='${fallbackUrl}';"
          />
          <button type="button" class="quick-view-btn" onclick="openQuickView(${product.id})">
            معاينة سريعة 👁
          </button>
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="fabric">${product.fabric}</p>

          <div class="options-row">
            <div class="size-selector">
              <button type="button" class="size-btn selected" data-size="S">S</button>
              <button type="button" class="size-btn" data-size="M">M</button>
              <button type="button" class="size-btn" data-size="L">L</button>
              <button type="button" class="size-btn" data-size="XL">XL</button>
            </div>

            <div class="color-dots">
              ${product.colors.map((c, idx) => `
                <span class="color-dot ${idx === 0 ? "active" : ""}" style="background:${c};" onclick="selectColor(this)"></span>
              `).join("")}
            </div>
          </div>

          <div class="product-footer">
            <div class="price-wrap">
              <span class="price">${product.price} ج.م</span>
              ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ج.م</span>` : ""}
            </div>
            <button type="button" class="add-btn" onclick="addToCart(${product.id}, this)">
              أضف للسلة
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// 2. اختيار المقاس واللون والمفضلة
productsGrid.addEventListener("click", (e) => {
  if (!e.target.classList.contains("size-btn")) return;
  const card = e.target.closest(".product-card");
  card.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
  e.target.classList.add("selected");
});

function selectColor(dotEl) {
  const parent = dotEl.closest(".color-dots");
  parent.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
  dotEl.classList.add("active");
}

function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    showToast("تمت الإزالة من المفضلة");
  } else {
    wishlist.push(productId);
    showToast("تمت الإضافة إلى المفضلة ♥");
  }
  localStorage.setItem("ghima_store_wishlist", JSON.stringify(wishlist));
  wishlistCountEl.textContent = wishlist.length;
  renderProducts();
}

// 3. أزرار الفلترة والبحث (للكمبيوتر والهاتف) والترتيب
filterTabs.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;
  onlyWishlist = false;
  wishlistFilterBtn.classList.remove("active");
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");
  currentFilter = e.target.dataset.filter;
  renderProducts();
});

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.cat;
    currentFilter = cat;
    onlyWishlist = false;
    wishlistFilterBtn.classList.remove("active");
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === cat);
    });
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    renderProducts();
  });
});

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderProducts();
});

function handleSearch(value) {
  searchQuery = value;
  if (searchInput && searchInput.value !== value) searchInput.value = value;
  if (mobileSearchInput && mobileSearchInput.value !== value) mobileSearchInput.value = value;
  renderProducts();
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
}

if (mobileSearchInput) {
  mobileSearchInput.addEventListener("input", (e) => handleSearch(e.target.value));
}

wishlistFilterBtn.addEventListener("click", () => {
  onlyWishlist = !onlyWishlist;
  wishlistFilterBtn.classList.toggle("active", onlyWishlist);
  renderProducts();
});

// 4. نافذة المعاينة السريعة ودليل المقاسات
function selectQuickViewSize(size, btnEl) {
  qvSelectedSize = size;
  btnEl.parentElement.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
  btnEl.classList.add("selected");
}

function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  const fallbackUrl = getFallbackImage(product.name, product.fallbackBg);
  qvSelectedSize = "M";

  modalBody.innerHTML = `
    <div class="qv-grid">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='${fallbackUrl}'" />
      <div>
        <span class="badge">تشكيلة Ghima_store 2026</span>
        <h2 style="margin-bottom:8px;">${product.name}</h2>
        <p style="color:var(--text-muted);margin-bottom:14px;">${product.fabric}</p>
        <div style="font-size:1.4rem;font-weight:800;margin-bottom:14px;">
          ${product.price} ج.م
          ${product.oldPrice ? `<span class="old-price" style="font-size:1rem;margin-right:8px;">${product.oldPrice} ج.م</span>` : ""}
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:0.85rem;font-weight:700;margin-bottom:8px;">اختر المقاس:</div>
          <div class="size-selector">
            <button type="button" class="size-btn" onclick="selectQuickViewSize('S', this)">S</button>
            <button type="button" class="size-btn selected" onclick="selectQuickViewSize('M', this)">M</button>
            <button type="button" class="size-btn" onclick="selectQuickViewSize('L', this)">L</button>
            <button type="button" class="size-btn" onclick="selectQuickViewSize('XL', this)">XL</button>
          </div>
        </div>

        <p style="font-size:0.88rem;margin-bottom:18px;color:var(--text-muted);">
          ✓ معاينة كاملة للمنتج قبل الدفع<br>
          ✓ قطن مصري ناعم لا ينكمش مع الغسيل
        </p>
        <button type="button" class="btn btn-primary full-width" onclick="quickAdd(${product.id})">
          أضف للسلة الآن
        </button>
      </div>
    </div>
  `;
  modalOverlay.classList.add("open");
}

function quickAdd(productId) {
  const product = products.find(p => p.id === productId);
  addItemToCartData(product, qvSelectedSize);
  modalOverlay.classList.remove("open");
}

document.getElementById("open-size-guide").addEventListener("click", () => {
  modalBody.innerHTML = `
    <h2 style="margin-bottom:8px;">دليل المقاسات - Ghima_store</h2>
    <p style="color:var(--text-muted);font-size:0.92rem;">جميع المقاسات بالسنتيمتر (قصة مريحة عصرية):</p>
    <table class="size-table">
      <thead>
        <tr>
          <th>المقاس</th>
          <th>العرض (سم)</th>
          <th>الطول (سم)</th>
          <th>الوزن المقترح</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>S</strong></td><td>54</td><td>68</td><td>55 - 65 كجم</td></tr>
        <tr><td><strong>M</strong></td><td>57</td><td>71</td><td>65 - 78 كجم</td></tr>
        <tr><td><strong>L</strong></td><td>60</td><td>74</td><td>78 - 90 كجم</td></tr>
        <tr><td><strong>XL</strong></td><td>63</td><td>77</td><td>90 - 105 كجم</td></tr>
      </tbody>
    </table>
  `;
  modalOverlay.classList.add("open");
});

closeModalBtn.addEventListener("click", () => modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("open");
});

// 5. تأثير طيران صورة المنتج نحو السلة
function animateFlyToCart(sourceImgEl) {
  if (!sourceImgEl || !cartBtn) return;
  const imgRect = sourceImgEl.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  const flyImg = document.createElement("img");
  flyImg.src = sourceImgEl.src;
  flyImg.className = "fly-to-cart-img";
  flyImg.style.top = `${imgRect.top + imgRect.height / 2 - 28}px`;
  flyImg.style.left = `${imgRect.left + imgRect.width / 2 - 28}px`;
  document.body.appendChild(flyImg);

  requestAnimationFrame(() => {
    flyImg.style.top = `${cartRect.top + cartRect.height / 2 - 14}px`;
    flyImg.style.left = `${cartRect.left + cartRect.width / 2 - 14}px`;
    flyImg.style.width = "24px";
    flyImg.style.height = "24px";
    flyImg.style.opacity = "0.25";
    flyImg.style.transform = "scale(0.4) rotate(25deg)";
  });

  setTimeout(() => {
    flyImg.remove();
  }, 750);
}

// 6. إدارة سلة المشتريات
function addToCart(productId, btnElement) {
  const card = btnElement.closest(".product-card");
  const selectedSize = card.querySelector(".size-btn.selected").dataset.size;
  const productImg = card.querySelector(".product-img-wrap img");
  const product = products.find(p => p.id === productId);

  animateFlyToCart(productImg);
  addItemToCartData(product, selectedSize);

  const originalText = btnElement.textContent;
  btnElement.textContent = "تمت الإضافة ✓";
  setTimeout(() => { btnElement.textContent = originalText; }, 1100);
}

function addItemToCartData(product, size) {
  const existingItem = cart.find(item => item.id === product.id && item.size === size);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      fallbackBg: product.fallbackBg,
      size: size,
      qty: 1
    });
  }

  saveAndUpdateCart();
  cartBtn.classList.remove("bump");
  void cartBtn.offsetWidth;
  cartBtn.classList.add("bump");
  showToast(`تمت إضافة "${product.name}" (مقاس ${size})`);
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveAndUpdateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndUpdateCart();
}

function saveAndUpdateCart() {
  localStorage.setItem("ghima_store_cart", JSON.stringify(cart));

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">سلة المشتريات فارغة حالياً.</p>`;
    subtotalEl.textContent = "0 ج.م";
    shippingEl.textContent = "0 ج.م";
    totalEl.textContent = "0 ج.م";
    shippingBarEl.style.width = "0%";
    shippingMsgEl.innerHTML = `أضف منتجات بقيمة <strong>${FREE_SHIPPING_THRESHOLD} ج.م</strong> للحصول على شحن مجاني`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => {
    const fallbackUrl = getFallbackImage(item.name, item.fallbackBg);
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='${fallbackUrl}'" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-meta">المقاس: <strong>${item.size}</strong> | ${item.price} ج.م</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
          <button class="remove-btn" onclick="removeItem(${index})">حذف</button>
        </div>
      </div>
    `;
  }).join("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  const total = subtotal + shipping;

  subtotalEl.textContent = `${subtotal} ج.م`;
  shippingEl.textContent = shipping === 0 ? "مجاني 🎉" : `${shipping} ج.م`;
  totalEl.textContent = `${total} ج.م`;

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  shippingBarEl.style.width = `${progress}%`;

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    shippingMsgEl.innerHTML = `🎉 مبروك! حصلت على <strong>شحن مجاني بالكامل</strong>`;
  } else {
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    shippingMsgEl.innerHTML = `أضف منتجات بقيمة <strong>${remaining} ج.م</strong> للحصول على شحن مجاني`;
  }
}

// 7. فتح وإغلاق السلة
function toggleCart(open) {
  cartDrawer.classList.toggle("open", open);
  cartOverlay.classList.toggle("open", open);
}

cartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

// 8. إشعار منبثق
let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2500);
}

// 9. إتمام الطلب عبر واتساب
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("يرجى إضافة منتج واحد على الأقل إلى السلة.");
    return;
  }

  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const city = document.getElementById("cust-city").value.trim();

  const orderLines = cart.map(
    (item, i) => `${i + 1}. ${item.name} (مقاس ${item.size}) × ${item.qty} = ${item.price * item.qty} ج.م`
  ).join("\n");

  const message =
    `مرحباً متجر Ghima_store ☁، أرغب في تأكيد الطلب التالي:\n\n` +
    `*المنتجات:*\n${orderLines}\n\n` +
    `*الإجمالي شامل الشحن:* ${totalEl.textContent}\n` +
    `*الاسم:* ${name}\n` +
    `*الموبايل:* ${phone}\n` +
    `*العنوان:* ${city}`;

  window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
});

// 10. ربط زر الواتساب العائم برقم المتجر
const whatsappFloatBtn = document.getElementById("whatsapp-float");
if (whatsappFloatBtn) {
  const quickMsg = "مرحباً متجر Ghima_store ☁، لدي استفسار بخصوص التشكيلة المتاحة.";
  whatsappFloatBtn.href = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(quickMsg)}`;
}

// 11. حركات الظهور الانسيابية + عداد الأرقام + تأثير 3D Tilt + شريط التمرير
function observeRevealElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function animateCounters() {
  document.querySelectorAll(".stat-counter").forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      el.textContent = `${prefix}${current.toLocaleString("en-US")}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target.toLocaleString("en-US")}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  });
}

// تأثير الإمالة ثلاثية الأبعاد على بطاقة الواجهة الرئيسية
const heroTiltCard = document.getElementById("hero-tilt-card");
if (heroTiltCard && window.matchMedia("(hover: hover)").matches) {
  const glare = heroTiltCard.querySelector(".card-glare");
  heroTiltCard.addEventListener("mousemove", (e) => {
    const rect = heroTiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    heroTiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.28), transparent 65%)`;
    }
  });
  heroTiltCard.addEventListener("mouseleave", () => {
    heroTiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

// تأثير تموج الأزرار عند الضغط (Ripple)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".ripple-btn");
  if (!btn) return;
  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const rect = btn.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
  circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
  circle.classList.add("ripple-wave");
  const oldRipple = btn.querySelector(".ripple-wave");
  if (oldRipple) oldRipple.remove();
  btn.appendChild(circle);
});

// مراقبة التمرير: شريط التقدم + الشريط العلوي + زر العودة للأعلى
let lastScrollY = window.scrollY;
let scrollBoost = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  scrollBoost = (scrollTop - lastScrollY) * 0.15;
  lastScrollY = scrollTop;

  document.getElementById("navbar").classList.toggle("scrolled", scrollTop > 20);

  if (backToTopBtn) {
    backToTopBtn.classList.toggle("visible", scrollTop > 420);
  }

  if (scrollProgressEl) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressEl.style.width = `${percent}%`;
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===================================================
// 12. تأثيرات الخلفية التفاعلية (هالة الماوس + جزيئات السحاب)
// ===================================================
const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

function initCursorGlow() {
  const cursorGlow = document.getElementById("cursor-glow");
  if (!cursorGlow || !window.matchMedia("(hover: hover)").matches) return;

  let currentX = mousePos.x;
  let currentY = mousePos.y;

  window.addEventListener("pointermove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    if (!mousePos.active) {
      mousePos.active = true;
      cursorGlow.classList.add("active");
    }
  });

  document.addEventListener("mouseleave", () => {
    mousePos.active = false;
    cursorGlow.classList.remove("active");
  });

  function updateGlow() {
    currentX += (mousePos.x - currentX) * 0.1;
    currentY += (mousePos.y - currentY) * 0.1;
    cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(updateGlow);
  }
  requestAnimationFrame(updateGlow);
}

function initBackgroundCanvas() {
  const canvas = document.getElementById("bg-particles-canvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = width < 768 ? 20 : 38;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const isGold = i % 4 === 0;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: isGold ? Math.random() * 2.2 + 1.2 : Math.random() * 4.5 + 2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.35 + 0.12),
      phase: Math.random() * Math.PI * 2,
      isGold
    };
  });

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    for (const p of particles) {
      p.phase += 0.018;
      p.x += p.vx + Math.sin(p.phase) * 0.15;
      p.y += p.vy - scrollBoost * 0.35;

      // تفاعل لطيف عند اقتراب الماوس من الجزيء
      if (mousePos.active) {
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.x += (dx / dist) * force * 1.1;
          p.y += (dy / dist) * force * 1.1;
        }
      }

      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      const alpha = 0.25 + Math.sin(p.phase) * 0.15;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      if (p.isGold) {
        ctx.fillStyle = isDark
          ? `rgba(226, 185, 82, ${alpha + 0.15})`
          : `rgba(201, 162, 63, ${alpha + 0.1})`;
      } else {
        ctx.fillStyle = isDark
          ? `rgba(116, 169, 216, ${alpha})`
          : `rgba(92, 146, 193, ${alpha})`;
      }
      ctx.fill();
    }

    scrollBoost *= 0.88;
    requestAnimationFrame(renderParticles);
  }

  requestAnimationFrame(renderParticles);
}

// التشغيل الأولي
wishlistCountEl.textContent = wishlist.length;
renderProducts();
saveAndUpdateCart();
observeRevealElements();
animateCounters();
initCursorGlow();
initBackgroundCanvas();