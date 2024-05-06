'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import '../products/product.scss'
import Counter from '../counter/counter';
import CustomButton, { IButtonModel } from '../customButton/customButton';
import chatStore from '@/app/store/app-store';
import { tap } from 'rxjs';




function Products() {
  const [productIndex, setProductIndex] = useState(0);
  const [productList, setProductList] = useState<null | any[]>(chatStore.getProductsInState())
  const [products, setProducts] = useState<any[]>(chatStore.getProductsInState());
  
  

  useLayoutEffect(() => {
    const chatSub = chatStore.getSubject().pipe(
      tap( (state:any) => {
        console.log('state',state)
        if(state.data) {
          setProducts(state.data);
          setProductList(state.data)
        } 
        
       
      })
    ).subscribe();
    return () => {
      chatSub.unsubscribe()
    }
  }, []);


  
  const navButtons : IButtonModel[] = [
    {
      icon:null,
      text:'next',
      color:'transparent',
      class:'white-text flex align-center fs-14 flex-justify-content-center height-fit up-down-text no-border',
      click: () =>{
        productIndex !== products?.length - 1 || productIndex === 0 ? setProductIndex(productIndex + 1):'';
      } 
    }
    ,
    {
        icon:null,
        text:'previous',
        color:'transparent',
        class:'m-l-10 white-text flex align-center fs-14 flex-justify-content-center height-fit up-down-text no-border',
        click: ()=>{productIndex > 0 ? setProductIndex(productIndex - 1) : ''}
      }
   
  ]
  const initialButton = {
    id:0,
    value:0
  }
  const createUI = () => {
    return   new Array(10).fill(initialButton)
    .map((item,i) => {return {...item, id:Math.random()*10}})
    .map((item) => <><li key={item.id}></li></> );
  }

  useEffect(()=>{
    console.log('update prodcut list ran',products);
    if(products.length > 0)
    chatStore.updateData(productList);
  },[productList])

  const increaseCount = () => {
    const prod = JSON.parse(JSON.stringify(productList));
    if(prod)
    prod[productIndex].count = prod[productIndex].count + 1;
    prod[productIndex].totalCost = (prod[productIndex].count * prod[productIndex].price).toFixed(2)
    setProductList(prod)
  }

  const decreaseCount = () => {
    const prod = JSON.parse(JSON.stringify(productList));
    if(prod)
    prod[productIndex].count = prod[productIndex].count - 1;
    prod[productIndex].totalCost = (prod[productIndex].count * prod[productIndex].price).toFixed(2)
    setProductList(prod)
  }
  
  return (
   <div className={`flex flex-column w100 fill-height z-index-2`}> 
   <div className="area w100" >
            <ul className="circles">
              {createUI()}
            </ul>
    </div >
    <div className={`flex flex-row flex-1  hero-product-display flex-align-center flex-justify-center p-10 `}>
    
      <div className="product-selector flex-column flex flex-align-center flex-justify-space-between p-5">
        <CustomButton 
                icon={navButtons[1].icon} 
                text={navButtons[1].text} 
                color={navButtons[1].color} 
                class={navButtons[1].class}
                submitted={() => navButtons[1].click()}/>
          <div className='product-count light-purple-text'>
            <div>{productIndex + 1}</div>
            <div className='slice'></div>
            <div>{products?.length ?? 0}</div>
          </div>
          <CustomButton 
              icon={navButtons[0].icon} 
              text={navButtons[0].text} 
              color={navButtons[0].color} 
              class={navButtons[0].class}
              submitted={() => navButtons[0].click()}/>
          
      </div>
      <div className='content flex flex-row flex-align-center h100 w100  m-t-20 flex-justify-content-center '>
       
        {productList && <div className='content-wrapper flex flex-row flex-align-center '>
          <div className='h100'>
            <div className='content-title-hero light-purple-text'> <b>{productList[productIndex].name }</b></div>
            <div className='content-description m-t-5 white-text'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
            <Counter 
            count={productList[productIndex].count} 
            increaseCount={ () => increaseCount()}
            decreaseCount={ () => decreaseCount()}
            ></Counter>
          </div>
          <div className='m-l-20'>Fimage</div>
        </div>}
        
        
      </div>
    </div>
   </div>
  );
}

export default Products;