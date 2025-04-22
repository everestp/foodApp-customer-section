export  const calculateCartTotal =(cartItems,quantites)=>{

 const subtotal = cartItems.reduce((acc,item)=>acc + item.price * quantites[item.id],0);
  const shipping = subtotal ===0 ?0.0:10
  const vat = subtotal *0.13
  const total = subtotal + shipping +vat;
 return {subtotal,shipping,vat,total};
}