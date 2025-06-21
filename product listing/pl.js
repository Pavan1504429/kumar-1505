let products = [
    { name: "Laptop Pro X", price: 99999.99, rating: 4, category: "electronics", image: "https://tse1.mm.bing.net/th?id=OIP.nVd0Cn5dJsc_BoZhrW66vgHaHa&pid=Api&P=0&h=180" },
    { name: "Vintage T-Shirt", price: 1999.00, rating: 3.5, category: "clothing", image: "https://tse3.mm.bing.net/th?id=OIP.um3Q0NVLmLe3HCedYPrrQgHaHa&pid=Api&P=0&h=180" },
    { name: "Vintage jean", price: 2999.00, rating: 4, category: "clothing", image: "https://tse1.mm.bing.net/th?id=OIP.jYdyCBX0sys7qZzgsoOV1AHaHa&pid=Api&P=0&h=180" },
    { name: "The Great Adventure", price: 499.50, rating: 4.5, category: "books", image: "https://tse4.mm.bing.net/th?id=OIP.mjFtuYkjG7cC3dsk9I9SUAHaJm&pid=Api&P=0&h=180" },
    { name: "The Lord Of the Rings", price: 459.50, rating: 4.2, category: "books", image: "https://tse4.mm.bing.net/th?id=OIP.3knv5SF1UQqw4SgYRB1EdAAAAA&pid=Api&P=0&h=180" },
    { name: "Coffee Maker", price: 4999.99, rating: 4.2, category: "electronics", image: "https://tse1.mm.bing.net/th?id=OIP.sueUzftoySRPm_b3MK6OBwHaJQ&pid=Api&P=0&h=180" },
    { name: "Camera", price: 14999.99, rating: 4.4, category: "electronics", image: "https://tse3.mm.bing.net/th?id=OIP.9Sxb3w5iK6Sl72cqWAEWLQHaHa&pid=Api&P=0&h=180" },
    { name: "Wireless Headphones", price: 3499.00, rating: 4.8, category: "electronics", image: "https://tse4.mm.bing.net/th?id=OIP.OctJq06i6wIxTXsGBFIx9AHaHa&pid=Api&P=0&h=180" },
    { name: "Blue shirt", price: 1299.00, rating: 4.1, category: "clothing", image: "https://tse3.mm.bing.net/th?id=OIP.ooGXAdhpQEcNE4pgnpy3PAHaHa&pid=Api&P=0&h=180" },
    { name: "LED TV", price: 54999.99, rating: 4.3, category: "electronics", image: "https://tse1.mm.bing.net/th?id=OIP.eMJtVXp168T1qUiegVbpdgHaFI&pid=Api&P=0&h=180" }];

function renderProducts(productList) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">₹${product.price.toFixed(2)}</p>
            <p class="rating">★★★★★☆☆☆☆☆ (${product.rating})</p>
            <p class="category">${product.category}</p>
        `;
        productGrid.appendChild(card);
    });
}

function applyFilters() {
    let filteredProducts = [...products];


    const category = document.getElementById('categoryFilter').value;
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }


    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

    
    const sortBy = document.getElementById('ratingSort').value;
    if (sortBy === 'highToLow') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowToHigh') {
        filteredProducts.sort((a, b) => a.rating - b.rating);
    }

    renderProducts(filteredProducts);
}

document.getElementById('categoryFilter').addEventListener('change', applyFilters);
document.getElementById('applyPriceFilter').addEventListener('click', applyFilters);
document.getElementById('ratingSort').addEventListener('change', applyFilters);


renderProducts(products);