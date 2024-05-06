'use client';
import '../experience/experience.scss'
import hair from '../assets/icons/png/hair_1.png'
import treeIcon from '../assets/icons/svg/treeIcon.svg'
import hairIcon from '../assets/icons/svg/hairIcon.svg'
import pillIcon from '../assets/icons/svg/pillIcon.svg'

import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import CustomButton, { IButtonModel } from '../components/customButton/customButton';
import Products from '../components/products/products';
import chatStore from '../store/app-store';
import { tap } from 'rxjs';
import Cart from '../components/cart/cart';
export default function Experience() {
  const [showCard, setSeatData] = useState(false);
  const [chatState, setChatState] = useState(chatStore.initialState);

  const heroButtons: IButtonModel[] = [
    {
      icon: hairIcon,
      text: 'Products',
      color: 'transparent',
      class: 'm-l-10 white-text flex align-center fs-14 flex-justify-content-center height-fit',
      click: () => { setSeatData(true) }
    },
    {
      icon: treeIcon,
      text: 'About Us',
      color: 'primary',
      class: 'white-text flex align-center fs-14 flex-justify-content-center height-fit',
      click: () => { setSeatData(true) }
    }
    ,
    {
      icon: pillIcon,
      text: 'Contact',
      color: 'transparent',
      class: 'm-l-10 white-text flex align-center fs-14 flex-justify-content-center height-fit',
      click: () => { setSeatData(true) }
    }
  ]

 
  useEffect(() => {
    const chatSub = chatStore.getSubject().pipe(
      tap( (state:any) => {
        console.log(state)
        setChatState(state)
      })
    ).subscribe();
    return () => {
      chatSub.unsubscribe()
    }
  }, []);

  

  
  return (
    <main className='h100 w100'>
      <div className="flex flex-column w100 h100">
        <div className="flex hero flex-justify-content-center w100 ">

          <div className=' rotate-outer animated-gradient'></div>
          { chatState.region === 'Home' && (<>
          <div className={`show-hero-content hero-image ${showCard ? 'screen-view' : ''}`}
            style={{ '--anim-opacity': showCard ? 1 : 0.8 } as React.CSSProperties}>
            <Image src={hair} className='' alt={'test'} style={{ 'display': showCard ? 'none' : 'block' } as React.CSSProperties} />

            <div className={`cards-container m-t-a ${showCard ? '' : 'hideMe'}`}>
              <div className='card-wrapper'>
                <div className="card  ">
                  <div className='card-icon p-10 flex flex-align-center flex-justify-content-center m-t-10 m-l-10'>
                    <Image src={treeIcon} className='' alt={'test'} />
                  </div>
                  <div className='card-text-content m-t-5 secondary-text p-5'>
                    <b>Naturally Sourced</b>
                    <div className='fs-14 secondary-text '> Our Products are naturally sourced to work with the body. Not against it.</div>
                  </div>
                </div>
                <div className="card  ">
                  <div className='card-icon  p-10 flex flex-align-center flex-justify-content-center m-t-10 m-l-10'>
                    <Image src={pillIcon} className='' alt={'test'} />
                  </div>
                  <div className='card-text-content m-t-5 secondary-text p-5 '>
                    <b>Grow Hair Naturally</b>
                    <div className='fs-14 secondary-text '> Our Products provides essecentials that work with your body to grow your hair.</div>
                  </div>

                </div>
              </div>

              <div className='actions'>
                <CustomButton icon={null} text={'Go To Products'} color={''} class={'secondary white-text'} submitted={() => { setRoute('products') } }></CustomButton>
              </div>
            </div>


          </div><div className={`show-hero-content circle-button-group ${showCard ? 'bottom' : ''}`}>
              {heroButtons.map((button: IButtonModel, i: number) => {
                return (
                  <div className='hero-icon-button flex flex-align-center'
                    key={button.text}
                    style={{ "--i": i } as React.CSSProperties}
                    onClick={() => { button.click(); } }>
                    <Image src={button.icon as string} className='' alt={'test'} />
                  </div>
                );
              })}
            </div><div className="show-hero-content flex flex-column hero-title-container m-t-20 flex-align-center">
              <h1 className="white-text">MY HAIR CAN GROW</h1>
              <div className="white-text"><b>Natural</b>ly sourced <b>for</b> natural <b>grow</b>th</div>
            </div><div className='white-text intro-text'>
              <span>
                <span className='bold-timer'>The Kingdom </span>
                <span className='remove-text'>of Heaven</span>
                <span className='bold-timer'> is</span>
                <span className='remove-text'> likened unto a man which sowed good seed in his field.</span>
              </span>
              <br></br>
              <span>
                <span className='remove-text'> We therefore promise to only sow good seed</span>
                <span className='bold-timer'> in</span>
                <span className='remove-text'> to </span> <span className='bold-timer'>you</span>.</span>
            </div></>)
          }

          {chatState.region === 'Products' && (<>
            <Products></Products>
          </>)}

          {chatState.region === 'Cart' && (<><Cart></Cart></>)}

        </div>
        <div className={`good-message-container flex flex-column m-l-5 m-t-a white p-l-5 p-r-5 p-t-5 `} >
          <div className="fs-12 p-5 secondary-text"> '<b> The Kingdom of heaven is likened unto a man which sowed good seed in his field </b>' <b>We</b> therefore promise to <b>only sow good seed</b> into you.</div>
        </div>

      </div>

    </main>
  )
}