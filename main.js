const addBasketBtn = document.querySelectorAll(".addToCardBtn");
const removeBasket = document.querySelector(".removeProductBtn")
const addBasket = document.querySelector(".addProductBtn")
const orderContentBody = document.querySelector(".orderContentBody");
const basketPageProduct = document.getElementById("mainBasketCont");


addBasketBtn.forEach(button => {
    button.addEventListener("click",handleClick)
})

function handleClick (e){
    const id = e.target.getAttribute('data-id')
    const name = e.target.getAttribute('data-name')
    const price = e.target.getAttribute('data-price');
    const cashSale = e.target.getAttribute('data-cashSale');
    const img = e.target.getAttribute('data-img');

    const productObj =  {
        id,
        name,
        price,
        cashSale,
        img,
        count: 1
    }

    const currentProduct = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

    const existProduct = currentProduct.some(product => {
        return product.id === id
    });
    if(!existProduct){

        currentProduct.push(productObj)

        const jsProductObj = JSON.stringify(currentProduct);
    
        localStorage.setItem("basket",jsProductObj);

    }
    const newproduct = currentProduct.forEach(product => {
        if(product.id === id){
            return {...product, count: product.count +1};
        }
        return currentProduct
    });
    console.log(newproduct);
    document.querySelector(".productCount").innerHTML = newproduct;

};





const myData = JSON.parse(localStorage.getItem("basket",));
let totalPrice=0;
let cashPrice=0;
let lastAllPrice=0;
let productCount =0;
myData.forEach( element =>{
    const {count, price,cashSale} = element

    let productCount= parseInt(count)
    document.querySelector(".productCount").innerHTML = productCount;
    
    let newPrice = price.slice(0, -1)
    totalPrice +=  parseInt(newPrice);
    document.querySelector(".allprice").innerHTML = totalPrice;
    cashSale

    let newCashPrice =  cashSale.slice(0,-1);
    cashPrice = parseInt(newCashPrice)
    document.querySelector(".cashSale").innerHTML = cashPrice;

    let lastAllPrice = totalPrice - cashPrice;
    document.querySelector(".lastAllPrice").innerHTML = lastAllPrice;
    

})

document.getElementById("mainBasketCont").innerHTML = myData.map((item) => {
    const {name,price,img,cashSale} = item;
    
    return(
        `<div class="basket-main-container flex">
        <div class="basket-main-Products flex flex-col">
            <div class="products-container flex mt-10 items-center gap-6">
            <img class="productXiaomi flex"
                src=${img}
                alt="">
                <div class="productInfo mb-6 flex flex-col gap-1">
                    <span class="menuProd">TELEFON / PLANŞETLƏR / SAAT</span>
                <span class="nameProduct">${name}</span>
                <div class="saleDiv mt-2">
                    <p>
                        Nəğd Alışda
                        <span>${cashSale}</span>
                        Endirim
                    </p>
                </div>
            </div>
            <div class="basket-Price-Detail flex ml-8">
                <div class="addBtn flex items-center justify-around">
                    <button data-id="1" class="addProductBtn">+</button>
                    <span>1</span>
                    <button data-id="1" class="removeProductBtn">-</button>
                </div>   
            </div>
            <div class="priceShow flex flex-col gap-4 ml-20">
                <span class="namePrice">Qiymət</span>
                <span class="xiaomiPrice">${price}</span>
            </div>
            <div class="trash ml-32">
                <button><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>` )
    } 
)
  
