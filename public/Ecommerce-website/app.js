const open = document.getElementById('open');

const container = document.getElementById('cartWindow')
const orderNow = document.getElementById('orderNow')

//Pagination START
const prev = document.getElementById('prevPage')
const curr = document.getElementById('currPage')
const next = document.getElementById('nextPage')

let totalProduct;
let ITEM_PER_PAGE;
let prevPageNumber;
let currPageNumber;
let nextPageNumber;

function calculatePage (moveto) {
    currPageNumber = parseInt(curr.innerHTML);
    const totalpages = Math.ceil(totalProduct / ITEM_PER_PAGE);

    if(moveto === 'back'){
        if(currPageNumber !== 1){
            currPageNumber--;
            curr.innerHTML = currPageNumber;
            getProducts(currPageNumber);
        }
    }else {
        if(currPageNumber < totalpages){
            currPageNumber++;
            curr.innerHTML = currPageNumber;
            getProducts(currPageNumber);
        }
    }
    
}

//prev
prev.addEventListener('click', prevPage);

function prevPage () {
    calculatePage("back");
}

//next
next.addEventListener('click', nextPage);

function nextPage () {
    calculatePage("next");
}


//Pagination END

open.addEventListener("click", () => {
    getCartDetails();
})



window.addEventListener('DOMContentLoaded', () => {
    const pageNumber = 1;
    axios.get(`http://54.200.64.7:3000?page=${pageNumber}`)
        .then(data => {
            if (data.request.status === 200) {
                const products = data.data.products;
                const parentSection = document.getElementById('product');
                products.forEach(product => {
                    const productHtml = `
                    <div  class="box" style="padding: 60px;">
                        <h3>${product.title}</h3>
                        <div class="image-container">
                            <img src="${product.imageUrl}" alt="">
                        </div>
                        <div class="product-details">
                            <span> $ ${product.price}</span>
                            <button onClick="addToCart(${product.id})" class="button-61" role="button">Add to cart</button>
                        </div>
                    </div>`
                    parentSection.innerHTML = parentSection.innerHTML + productHtml;
                });
            }
        });
        
        axios.get(`http://54.200.64.7:3000/products`)
        .then(products => {
            totalProduct = products.data.products.length;
        })
            axios.get(`http://54.200.64.7:3000?page=1`)
        .then(products => {
            ITEM_PER_PAGE = products.data.products.length;
        })  
        
})


function getProducts(pageNumber) {
    axios.get(`http://54.200.64.7:3000?page=${pageNumber}`)
        .then(data => {
            console.log(data);
            if (data.request.status === 200) {
                const products = data.data.products;
                const parentSection = document.getElementById('product');
                parentSection.innerHTML = '';
                products.forEach(product => {
                    const productHtml = `
                    <div id="album1" class="box" style="padding: 60px;">
                        <h3>${product.title}</h3>
                        <div class="image-container">
                            <img src="${product.imageUrl}" alt="">
                        </div>
                        <div class="product-details">
                            <span> $ ${product.price}</span>
                            <button onClick="addToCart(${product.id})" class="button-61" role="button">Add to cart</button>
                        </div>
                    </div>`
                    parentSection.innerHTML = parentSection.innerHTML + productHtml;
                });
            }
        });
}

function addToCart(productId) {

    axios.post('http://54.200.64.7:3000/cart', { productId: productId })
        .then(response => {
            if (response.status === 200) {
                notifyUsers(response.data.message);
            } else {
                console.log("else executed");
                throw new Error(response.data.message);
            }
        })
        .catch(err => {
            notifyUsers(err.message);
            console.log("error" + err.message);
        });
}

function getCartDetails() {
    axios.get('http://54.200.64.7:3000/cart')
        .then(response => {
            const products = response.data.products;
            return products;
        })
        .then(products => {

            const modal = document.getElementById('modal');
            modal.innerHTML = '';

            let subToatal = 0;
            let totalQuant = 0;

            for (let i = 0; i < products.length; i++) {

                modal.innerHTML += `
                <div class="cart-items">
                    <img class="small-product" src="${products[i].imageUrl}" alt="">
                    <span class="item-name">${products[i].title}</span>
                    <span class="quantity-box">${products[i].cartItem.quantity}</span>
                    <span class="item-price">USD ${products[i].price}</span>
                    <span class="remove-item" id="remove">&times;</span>
                </div>`;
                subToatal += products[i].price;
                totalQuant += products[i].cartItem.quantity;
            }
            modal.innerHTML += `<div class="sub-total"><h4>Sub Total = ${subToatal}</h4></div>`
            document.getElementById('cart-number').innerHTML = totalQuant;
            container.classList.add("active");
            document.getElementById('modal').innerHTML += `<span class="close-window" id="close">&times;</span>`;
        })
        .then(res => {
            const close = document.getElementById('close');
            close.addEventListener("click", () => {
                container.classList.remove("active");
            })
        })
        .catch(err => {
            console.log(err);
        })
}

function notifyUsers(message) {
    console.log("called");
    const container = document.getElementById('body-container');
    let notification = document.getElementById('div');
    // notification.classList.add('notification');
    notification.innerHTML = `
        <div id="side-bar">
            <h4>${message}</h4>
        </div>`;
    // container.appendChild(notification);
    setTimeout(() => {
        notification.innerHTML = '';
        console.log("removed");
    }, 2000)
}

orderNow.addEventListener('click', placeOrder);

function placeOrder() {
    console.log("Order Placed");
    axios.post('http://54.200.64.7:3000/create-order')
        .then(response => {
            if (response.status === 200) {
                notifyUsers(response.data.message);
            } else {
                console.log("else executed");
                throw new Error(response.data.message);
            }
        })
        .catch(err => {
            notifyUsers(err.message);
            console.log("error" + err.message);
        });
}



