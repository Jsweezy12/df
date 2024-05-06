"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import "../topBar/topBar.scss";
import CustomButton, { IButtonModel } from "../customButton/customButton";
import shopping from "../../assets/icons/svg/cart.svg";
import chatStore from "@/app/store/app-store";
import { filter, tap } from "rxjs";
import { faHouse, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function TopNav() {
  const buttons: IButtonModel[] = [
    {
      icon: null,
      text: "Home",
      color: "transparent",
      class:
        "no-border white-text flex align-center fs-14 flex-justify-content-center height-fit",
      click: () => {
        chatStore.updateRegion('Home')
        console.log(chatState);
      },
    },
    {
      icon: null,
      text: "About Us",
      color: "transparent",
      class:
        "no-border white-text flex align-center fs-14 flex-justify-content-center height-fit",
      click: () => {
        chatStore.updateRegion('About Us')
      },
    },
    {
      icon: null,
      text: "Products",
      color: "transparent",
      class:
        "no-border m-l-10 white-text flex align-center fs-14 flex-justify-content-center height-fit",
      click: () => {
        chatStore.updateRegion('Products')
      },
    },
    {
      icon: null,
      text: "Contact",
      color: "transparent",
      class:
        " no-border m-l-10 white-text flex align-center fs-14 flex-justify-content-center height-fit",
      click: () => {
        chatStore.updateRegion('Contact')
      },
    }
  ];
  const [chatState, setChatState] = useState(chatStore.initialState);
  const [buttonOptions, setButtonOptions] = useState(buttons);
  const [itemsCount, setItemsCount] = useState(0)
  useLayoutEffect(() => {
    const chatSub = chatStore.getSubject().pipe(
      tap( (state:any) => {
        if(state.data === null || state.data.length === 0 ) {
          setButtonOptions(buttons)
        }
        setChatState(state)
      }),
      filter( (state:any) => state.data && state.data.length > 0),
      tap((state:any) => {
        const count = state.data.map((prod: { count: any; }) => prod.count).reduce((a: any,b: any)=> a+b, 0);
        setItemsCount(count);
      })
    ).subscribe();
    chatStore.init();
    return () => {
      chatSub.unsubscribe()
    }
  }, []);

  return (
    <div className={`top-bar flex flex-row flex-align-center w100`}>
      {buttonOptions.map((button) => (
        <CustomButton
          icon={button.icon}
          text={button.text}
          color={`${chatState.region === button.text ? 'primary':button.color}`}
          class={button.class}
          key={button.text}
          submitted={() => button.click()}
        />
      ))}
       
       <div className="flex flex-row m-l-a gap-5" onClick={() => chatStore.updateRegion('Cart')}>
        <FontAwesomeIcon icon={faCartShopping} className="white-text fs-20"/>
        <div className="count-display-wrapper primary-text">{itemsCount}</div>
       </div>
    </div>
  );
}

export default TopNav;
