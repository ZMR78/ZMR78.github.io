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

// بيانات منتجات Ghima_store
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
    name: "سويت شيرت كلاسيك - أسود فحمي",
    category: "hoodies",
    fabric: "مبطن من الداخل بنعومة فائقة",
    price: 590,
    oldPrice: null,
    tag: "",
    tagType: "",
    colors: ["#1E1E1E", "#5C92C1"],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#D4D6D9"
  },
  {
    id: 5,
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
    id: 6,
    name: "بنطلون سويت بانتس - رمادي دخاني",
    category: "pants",
    fabric: "قطن ميلتون دافئ للخريف والشتاء",
    price: 490,
    oldPrice: null,
    tag: "جديد",
    tagType: "",
    colors: ["#6E737B", "#1E1E1E"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
    fallbackBg: "#DFE3E8"
  }
];

let cart = JSON.parse(localStorage.getItem("ghima_store_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("ghima_store_wishlist")) || [];
let currentFilter = "all";
let currentSort = "default";
let searchQuery = "";
let onlyWishlist = false;

// رقم الواتساب الخاص بـ Ghima_store
const STORE_WHATSAPP = "201024811183";
const FREE_SHIPPING_THRESHOLD = 1200;

const productsGrid = document.getElementById("products-grid");
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

// 1. عرض المنتجات حسب الفلترة والترتيب والبحث
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

  if (list.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">لا توجد قطع مطابقة لبحثك حالياً.</p>`;
    return;
  }

  productsGrid.innerHTML = list.map(product => {
    const isLiked = wishlist.includes(product.id);
    const fallbackUrl = getFallbackImage(product.name, product.fallbackBg);

    return `
      <article class="product-card reveal" data-id="${product.id}">
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

  observeRevealElements();
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
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  const fallbackUrl = getFallbackImage(product.name, product.fallbackBg);

  modalBody.innerHTML = `
    <div class="qv-grid">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='${fallbackUrl}'" />
      <div>
        <span class="badge">تشكيلة Ghima_store 2026</span>
        <h2 style="margin-bottom:8px;">${product.name}</h2>
        <p style="color:var(--text-muted);margin-bottom:14px;">${product.fabric}</p>
        <div style="font-size:1.4rem;font-weight:800;margin-bottom:16px;">${product.price} ج.م</div>
        <p style="font-size:0.88rem;margin-bottom:16px;">
          ✓ معاينة كاملة للمنتج قبل الدفع<br>
          ✓ قطن مصري ناعم لا ينكمش مع الغسيل
        </p>
        <button type="button" class="btn btn-primary full-width" onclick="quickAdd(${product.id})">
          أضف للسلة (مقاس M)
        </button>
      </div>
    </div>
  `;
  modalOverlay.classList.add("open");
}

function quickAdd(productId) {
  const product = products.find(p => p.id === productId);
  addItemToCartData(product, "M");
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

// 5. إدارة سلة المشتريات
function addToCart(productId, btnElement) {
  const card = btnElement.closest(".product-card");
  const selectedSize = card.querySelector(".size-btn.selected").dataset.size;
  const product = products.find(p => p.id === productId);

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

// 6. فتح وإغلاق السلة
function toggleCart(open) {
  cartDrawer.classList.toggle("open", open);
  cartOverlay.classList.toggle("open", open);
}

cartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

// 7. إشعار منبثق
let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2500);
}

// 8. إتمام الطلب عبر واتساب
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

// 9. ربط زر الواتساب العائم برقم المتجر
const whatsappFloatBtn = document.getElementById("whatsapp-float");
if (whatsappFloatBtn) {
  const quickMsg = "مرحباً متجر Ghima_store ☁، لدي استفسار بخصوص التشكيلة المتاحة.";
  whatsappFloatBtn.href = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(quickMsg)}`;
}

// 10. حركات الظهور الانسيابية عند التمرير
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

window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 20);
});

// التشغيل الأولي
wishlistCountEl.textContent = wishlist.length;
renderProducts();
saveAndUpdateCart();
observeRevealElements();
