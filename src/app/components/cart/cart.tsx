"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../cart/cart.scss";
import Counter from "../counter/counter";
import CustomButton, { IButtonModel } from "../customButton/customButton";
import chatStore from "@/app/store/app-store";
import { tap } from "rxjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [productIndex, setProductIndex] = useState(0);
  const [productList, setProductList] = useState<null | any[]>(
    chatStore.getProductsInState()
  );
  const [products, setProducts] = useState<any[]>(
    chatStore.getProductsInState()
  );
  const [productsTotalCost, setProductsTotalCost] = useState<number>(0);
  const [salesTaxCost, setSalesTaxCost] = useState<number>(0);
  const [shippingTotalCost, setShippingTotalCost] = useState<number>(0);
  const [formGroup, setFormGroup] = useState(chatStore.getContactInfoInState());
  const [formGroupNulls, setFormGroupNull] = useState(false);

  useLayoutEffect(() => {
    const chatSub = chatStore
      .getSubject()
      .pipe(
        tap((state: any) => {
          console.log("IN Cart", state);
          if (state.data) {
            setProducts(state.data);
            setProductList(state.data);
            setProductsTotalCost(state.productTotalCost);
            setSalesTaxCost(state.salesTaxCost);
            setShippingTotalCost(state.shippingTotalCost);
            setFormGroup(state.address)
          }
        })
      )
      .subscribe();
    return () => {
      chatSub.unsubscribe();
    };
  }, []);

  const navButtons: IButtonModel[] = [
    {
      icon: null,
      text: "products",
      color: "transparent",
      class:
        "light-purple-text flex align-center fs-14 flex-justify-content-center height-fit up-down-text no-border",
      click: () => {

      }
    },
    {
      icon: null,
      text: "payment",
      color: "transparent",
      class:
        "light-purple-text m-l-10 flex align-center fs-14 flex-justify-content-center height-fit up-down-text no-border",
      click: () => {
        setFormGroupNull(hasNullFields())
      },
    },
  ];

  const cartItemOptionButtons: IButtonModel[] = [
    {
      icon: null,
      text: "VIEW",
      color: "transparent",
      class:
        "light-purple-text flex align-center fs-14 flex-justify-content-center height-fit  no-border",
      click: () => {
        productIndex > products?.length + 1 || productIndex === 0
          ? setProductIndex(productIndex + 1)
          : "";
      },
    },
    {
      icon: null,
      text: "REMOVE",
      color: "transparent",
      class:
        "light-purple-text  flex align-center fs-14 flex-justify-content-center height-fit  no-border",
      click: (item:any) => {removeItem(item)},
    },
  ];

  useEffect(() => {
    console.log("update prodcut list ran in Cart", products);
    if (products.length > 0) chatStore.updateData(productList);
  }, [productList]);

  const removeItem = (item:any) => {
    const prod = JSON.parse(JSON.stringify(productList));
    const updatedItem = prod.find((items:any)=> items.name === item.name)
    updatedItem.count = 0
    updatedItem.totalCost = 0
    setProductList(prod);
  }

  const increaseCount = () => {
    const prod = JSON.parse(JSON.stringify(productList));
    if (prod) prod[productIndex].count = prod[productIndex].count + 1;
    setProductList(prod);
  };

  const decreaseCount = () => {
    const prod = JSON.parse(JSON.stringify(productList));
    if (prod) prod[productIndex].count = prod[productIndex].count - 1;
    setProductList(prod);
  };

  const setAddressInState = (e: any) => {
    let formGroupState = formGroup;
    const name = e.target.name as 'line1';
    const value = e.target.value
    formGroupState[name] = value !== '' ? value : null;
    chatStore.updateAddress(formGroupState);
    console.log(formGroupState);
  }

  const hasNullFields = () => {
    const hasNulls = JSON.stringify(formGroup);
    return hasNulls.includes('null')? true : false;
  }

  return (
    <div className={`flex flex-column w100 fill-height z-index-2`}>
      
      <div
        className={`flex flex-row flex-1  hero-product-display flex-align-center flex-justify-center p-10 white`}
      >
        <div className="product-selector flex-column flex flex-align-center flex-justify-space-between p-5">
          <CustomButton
            icon={navButtons[0].icon}
            text={navButtons[0].text}
            color={navButtons[0].color}
            class={navButtons[0].class}
            submitted={() => navButtons[0].click()}
          />
          <div className="product-count light-purple-text">
            <div>{productIndex + 1}</div>
            <div className="slice"></div>
            <div>{2}</div>
          </div>
          <CustomButton
            icon={navButtons[1].icon}
            text={navButtons[1].text}
            color={navButtons[1].color}
            class={navButtons[1].class}
            submitted={() => navButtons[1].click()}
          />
        </div>
        <div className="content flex flex-row h100 w100 m-t-20">
          <div className="cart-list-table flex-1 gap-5 p-10 ">
            <span className="cart-title dark-purple-text">
              <FontAwesomeIcon icon={faTag} /> CART ITEMS{" "}
            </span>
            <div className="cart-product-header w100 p-5 flex flex-row gap-5 w100 dark-purple-text flex-justify-space-between">
              <div className="cart-item product-name-table">Name</div>
              <div className="cart-item product-price-table">Price</div>
              <div className="cart-item product-qty-table">Qty</div>
              <div className="cart-item product-cost-table">Cost</div>
            </div>

            {products &&
              products.map((item) => {
                if (item.count > 0)
                  return (
                    <>
                      <div className="cart-product-item w100 p-5 flex flex-row gap-5 w100 dark-purple-text flex-justify-space-between">
                        <div className="cart-item product-name-table">
                          {item.name}
                        </div>
                        <div className="cart-item product-price-table">
                          <FontAwesomeIcon icon={faDollarSign} /> {item.price}{" "}
                        </div>
                        <div className="cart-item product-qty-table">
                          {" "}
                          <input
                            type="number"
                            min={0}
                            value={item.count}
                          ></input>
                        </div>
                        <div className="cart-item product-cost-table">
                          <FontAwesomeIcon icon={faDollarSign} />{" "}
                          {item.totalCost}{" "}
                        </div>
                      </div>
                      <div className="cart-item-action flex flex-row w100 gap-5">
                      <CustomButton
                        icon={cartItemOptionButtons[0].icon}
                        text={cartItemOptionButtons[0].text}
                        color={cartItemOptionButtons[0].color}
                        class={cartItemOptionButtons[0].class}
                        key={cartItemOptionButtons[0].text}
                        submitted={() => cartItemOptionButtons[0].click(item)}/>
                        <div className="vsplit"></div>
                        <CustomButton
                        icon={cartItemOptionButtons[1].icon}
                        text={cartItemOptionButtons[1].text}
                        color={cartItemOptionButtons[1].color}
                        class={cartItemOptionButtons[1].class}
                        key={cartItemOptionButtons[1].text}
                        submitted={() => cartItemOptionButtons[1].click(item)}/>
                      </div>
                    </>
                  );
              })}
          </div>

          <div className="cart-right-wrapper flex flex-column m-l-a p-10 gap-5">
            <div className="cart-cost gap-5">
              <span className="cart-title dark-purple-text">
                <FontAwesomeIcon icon={faMoneyCheckDollar} /> SHOPPING CART
                DETIALS
              </span>
              <div className="cart-product w100 p-5 flex flex-row gap-5 m-t-10">
                <FontAwesomeIcon icon={faTag} />
                <div className="cart-product-name">Products Cost</div>
                <div className="cart-product-cost m-l-a">
                  $ {productsTotalCost}
                </div>
              </div>

              <div className="cart-product w100 p-5 flex flex-row gap-5">
                <FontAwesomeIcon icon={faMoneyBill} />
                <div className="cart-product-name">Sales Tax </div>
                <div className="cart-product-cost m-l-a">$ {salesTaxCost}</div>
              </div>

              <div className="cart-product w100 p-5 flex flex-row gap-5">
                <FontAwesomeIcon icon={faTruckFast} />
                <div className="cart-product-name">Shipping </div>
                <div className="cart-product-cost m-l-a">
                  $ {shippingTotalCost}
                </div>
              </div>
              <div className="cart-product w100 p-5 flex flex-row gap-5 m-t-10">
                <FontAwesomeIcon icon={faCoins} />
                <div className="cart-product-name">Total</div>
                <div className="cart-product-cost m-l-a">
                  $ {productsTotalCost + salesTaxCost + shippingTotalCost}
                </div>
              </div>
            </div>
            <form onChange={setAddressInState} className="cart-address gap-5 flex flex-column m-t-20">
              <span className="cart-title dark-purple-text">
                <FontAwesomeIcon icon={faHouse} /> Shipping Address
                 {formGroupNulls && <div className="fs-12 red-text">please complete all fields.</div>}
              </span>
              <input
                placeholder="street"
                defaultValue={formGroup.line1 ?? ''}
                id='line1'
                type='text'
                name="line1"
                className="w100 light-purple white-text border-5 no-border p-5"
              ></input>
              <div className="flex flex-row w100 address-sub gap-5">
                <input
                  placeholder="city"
                  defaultValue={formGroup.city ?? ''}
                  id='city'
                  name="city"
                  type='text'
                  className="light-purple p-5 border-5 no-border city white-text"
                ></input>
                <input
                  placeholder="state"
                  defaultValue={formGroup.state ?? ''}
                  id='state'
                  name="state"
                  type='text'
                  className="light-purple p-5 border-5 no-border white-text"
                ></input>
                <input
                  placeholder="zip"
                  defaultValue={formGroup.zip ?? ''}
                  id='zaip'
                  name="zip"
                  type='text'
                  className="light-purple p-5 border-5 no-border white-text"
                ></input>
              </div>
            </form>

            <div className="cart-address gap-5 flex flex-column m-t-20">
              <span className="cart-title dark-purple-text">
                <FontAwesomeIcon icon={faAt} /> Customer Email
              </span>
              <div className="fs-12">
                please provide email for tracking number information.
              </div>
              <input
                type="email"
                name="email"
                onChange={setAddressInState}
                placeholder="Email"
                className="w100 light-purple white-text border-5 no-border p-5"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
