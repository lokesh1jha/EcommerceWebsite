
const orderCont = document.getElementById('orderCont')


window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/orders')
        .then(response => {
            console.log('clicked2');
            return response;
        })
        .then(response => {
            console.log(response.data.orders[1].products[0].title);
            const ordersData = response.data.orders;

            for (let i = ordersData.length -1; i >= 0 ; i--) {
                let products;
                if (ordersData[i].products.length == 0) {
                    continue;
                } else {
                    products = ordersData[i].products;
                }

                let productList = '';
                for (let j = 0; j < products.length; j++) {
                    productList += `<div>
                        <ul class="order">
                        <div class="box"><img class="small-product"
                                src="${products[j].imageUrl}"
                                alt=""></div>
                        <li class="item-name">${products[j].title}</li>
                        <li class="quantity-box">${products[j].orderItem.quantity}</li>
                        <li class="item-price">USD ${products[j].price}</li>
                    </ul>
                </div>`
                }

                orderCont.innerHTML += `<div class="box">
                <li>Order ID ${ordersData[i].id}
                    ${productList}
                </li>
                </div>`;
            }
        })
        .catch(err => {
            console.log(err)
        });
});
