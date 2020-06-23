var cartBtn=document.querySelector('.cart-btn');
var closeCartBtn=document.querySelector('.close-cart');
var clearCartBtn=document.querySelector('.clear-cart');
var cartDom=document.querySelector('.cart');
var cartOverlay=document.querySelector('.cart-overlay');
var cartItems=document.querySelector('.cart-items');
var cartTotal=document.querySelector('.cart-total');
var cartContent=document.querySelector('.cart-content');

var productDOM=document.querySelector('.product-center');
let cart=[];

//getting the products
class Products{
    // async getProducts()
    // {
    //     let result = await fetch('products.html');
    //     let data = await result.json();
    //     return data;
    // }
  
}

//displayingproducts
class UI{
    opencart()
    {
        cartBtn.addEventListener('click',()=>{
            cartOverlay.style.visibility='visible';
            cartDom.style.transform='translateX(0)';
            //cartDom.classList.add('.showcart');
        });
    }
    closecart()
    {
        closeCartBtn.addEventListener('click',()=>{
            cartOverlay.style.visibility='hidden';
            cartDom.style.transform='translateX(100%)';
        });
    }

}

document.addEventListener('DOMContentLoaded',()=>{
    const ui=new UI();
    const products=new Products();

    //products.getProducts().then(data => console.log(data));
    ui.opencart();
    ui.closecart();
});