// scripts.js

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

// Product Card Hover Effect
document.querySelectorAll('.product').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Dynamic Product Details Page Functionality
const urlParams = new URLSearchParams(window.location.search);
const productParam = urlParams.get('product');
if (productParam) {
    const productDetails = document.getElementById('product-details');
    const productInfo = {
        'shopping-bag': {
            name: 'Biodegradable Shopping Bag',
            description: 'Durable and eco-friendly shopping bags that decompose naturally.',
            price: '$5.99',
            image: 'images/shopping-bag.jpg',
        },
        // Add details for other products
    };

    if (productDetails && productInfo[productParam]) {
        productDetails.style.display = 'block';
        productDetails.querySelector('h2').textContent = productInfo[productParam].name;
        productDetails.querySelector('img').src = productInfo[productParam].image;
        productDetails.querySelector('img').alt = productInfo[productParam].name;
        productDetails.querySelector('p').textContent = productInfo[productParam].description;
        productDetails.querySelector('#quantity').value = 1;
        productDetails.querySelector('button').textContent = `Add to Cart - ${productInfo[productParam].price}`;
    }
}

// Order Flow Enhancements
document.querySelector('#buy-now')?.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.color = 'white';
    overlay.style.fontSize = '2rem';
    overlay.style.fontFamily = 'Arial, sans-serif';

    const status = ['Buying', 'Shipping', 'Ordered', 'Placed'];
    let index = 0;

    const statusElement = document.createElement('div');
    statusElement.textContent = status[index];
    overlay.appendChild(statusElement);

    document.body.appendChild(overlay);

    const interval = setInterval(() => {
        index++;
        if (index < status.length) {
            statusElement.textContent = status[index];
        } else {
            clearInterval(interval);
            document.body.removeChild(overlay);
            alert('Thank you for your order! Your eco-friendly products are on their way!');
        }
    }, 1000);
});
