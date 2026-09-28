// Lista de produtos da loja deselegant's
const products = [
    {
        id: 1,
        name: "Bolsa Tote Eco-Lata",
        tag: "Feito com Lacres de Alumínio",
        price: 189.90,
        description: "Estrutura trançada à mão com mais de 800 lacres de latas reciclados e alças em couro ecológico.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        name: "Clutch Minimalista Lona",
        tag: "Lona de Caminhão Reciclada",
        price: 130.00,
        description: "Bolsa de mão compacta com acabamento envelhecido, feita a partir de lonas descartadas do transporte rodoviário.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        name: "Mochila Urbana Sustentável",
        tag: "Plástico Pet & Algodão Orgânico",
        price: 250.00,
        description: "Mochila espaçosa confeccionada com tecido estruturado gerado a partir da reciclagem de garrafas PET.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    }
];

let cart = [];

// Elementos do DOM
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Renderizar Produtos na Tela
function renderProducts() {
    productGrid.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="product-image">
                <span class="eco-tag">${product.tag}</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})">Adicionar</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Adicionar ao Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    openCart();
}

// Atualizar Carrinho
function updateCart() {
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Sua sacola está vazia.</p>`;
        cartCount.textContent = "0";
        cartTotalPrice.textContent = "R$ 0,00";
        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span>R$ ${item.price.toFixed(2).replace('.', ',')} (x${item.quantity})</span>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartCount.textContent = count;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remover Item do Carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Abrir e Fechar Carrinho
function openCart() {
    cartModal.classList.add('active');
}

function closeCart() {
    cartModal.classList.remove('active');
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);

// Finalizar Pedido
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }
    alert("Parabéns! Pedido simulado com sucesso na deselegant's. Obrigado por apoiar a moda sustentável!");
    cart = [];
    updateCart();
    closeCart();
});

// Inicializar a página carregando os produtos
window.addEventListener('DOMContentLoaded', renderProducts);