document.getElementById('search').addEventListener('input', filterProducts);const allProducts = {
    category1: [
        { name: "Product 1A", price: "$10.00", image: "./images/product-img-01.jpeg" },
        { name: "Product 1B", price: "$15.00", image: "./images/product-img-02.jpeg" },
        { name: "Product 1C", price: "$20.00", image: "./images/product-img-03.jpeg" }
    ],
    category2: [
        { name: "Product 2A", price: "$25.00", image: "./images/product-img-04.jpeg" },
        { name: "Product 2B", price: "$30.00", image: "./images/product-img-05.jpeg" },
        { name: "Product 2C", price: "$35.00", image: "./images/product-img-06.jpeg" }
    ],
    category3: [
        { name: "Product 3A", price: "$40.00", image: "./images/product-img-07.jpeg" },
        { name: "Product 3B", price: "$45.00", image: "./images/product-img-08.jpeg" },
        { name: "Product 3C", price: "$50.00", image: "./images/product-img-09.jpeg" }
    ]
};

// Utility function to convert camelCase to spaced format
function camelCaseToSpaces(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
        .replace(/([0-9])([a-zA-Z])/g, '$1 $2') // Add space between numbers and letters
        .replace(/([a-zA-Z])([0-9])/g, '$1 $2') // Add space between numbers and letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/^./, function(s) { return s.toUpperCase(); }); // Capitalize the first letter
}

function renderCategories(products) {
    const categoriesContainer = document.getElementById('categories');
    const navbarCategories = document.getElementById('navbarCategories');
    categoriesContainer.innerHTML = '';
    navbarCategories.innerHTML = '';

    for (const category in products) {
        // Create navbar link
        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        const navLink = document.createElement('a');
        navLink.className = 'nav-link';
        navLink.href = `#${category}`;
        navLink.innerText = camelCaseToSpaces(category); // Convert camelCase to spaced format
        navItem.appendChild(navLink);
        navbarCategories.appendChild(navItem);

        // Create category section
        const categoryDiv = document.createElement('div');
        categoryDiv.id = category;
        categoryDiv.className = 'py-4 mt-4';
        const categoryHeader = document.createElement('h2');
        categoryHeader.innerHTML = `<i class="fas fa-chevron-down me-2 mr-3"></i> ${camelCaseToSpaces(category)}`; //Convert camelCase to spaced format
        categoryHeader.className = 'collapse-toggle'; // Add a class for styling
        categoryHeader.setAttribute('data-toggle', 'collapse');
        categoryHeader.setAttribute('data-target', `#${category}Products`);
        categoryHeader.setAttribute('aria-expanded', 'true'); // Accessibility attribute
        categoryHeader.setAttribute('aria-controls', `${category}Products`); // Accessibility attribute
        categoryHeader.addEventListener('click', (e) => {
          const i = e.target.querySelector('i');
          i.className = (i.classList.contains('fa-chevron-down') ? ('fas fa-chevron-right me-2 mr-3') : ('fas fa-chevron-down me-2 mr-3'))
        })

        const productsDiv = document.createElement('div');
        productsDiv.id = `${category}Products`;
        productsDiv.className = 'collapse show'; // Show by default
        const productList = document.createElement('div');
        productList.className = 'row'; // Use Bootstrap grid

        // Render products as Bootstrap cards
        products[category].forEach(product => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-12 col-md-4 col-lg-3'; // Responsive column sizes

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card product-card shadow'; // Add card class

            const img = document.createElement('img');
            img.src = product.image;
            img.className = 'card-img-top product-image'; // Add image class
            img.alt = product.name;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const productName = document.createElement('h5');
            productName.className = 'card-title';
            productName.innerText = product.name;

            const productPrice = document.createElement('p');
            productPrice.className = 'card-text';
            productPrice.innerText = product.price;
            
            // Append elements to the card body
            cardBody.appendChild(productName);
            cardBody.appendChild(productPrice);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            productList.appendChild(colDiv);
        });

        productsDiv.appendChild(productList);
        categoryDiv.appendChild(categoryHeader);
        categoryDiv.appendChild(productsDiv);
        categoriesContainer.appendChild(categoryDiv);
    }
}

function filterProducts() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredProducts = {};

    // Iterate over each category in the products object
    for (const [category, items] of Object.entries(allProducts)) {
        // Filter the items in the current category based on the search text
        const matchingItems = items.filter(item => 
            item.name.toLowerCase().includes(searchText)
        );

        // If there are matching items, add the category and its items to the filtered object
        if (matchingItems.length > 0) {
            filteredProducts[category] = matchingItems;
        }
    }
    console.log(filteredProducts);
    renderCategories(filteredProducts);
}

// Initial rendering of categories and products
renderCategories(allProducts);

// Event listener for search input
document.getElementById('search').addEventListener('input', filterProducts)
