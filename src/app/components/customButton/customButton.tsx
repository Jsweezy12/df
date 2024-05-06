'use client';
import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import '../customButton/customButton.scss'
export interface IPropsButtonModel {
    icon:string | null,
    text:string | number ,
    color:string,
    click?: Function,
    class: string,
    submitted:Dispatch<SetStateAction<string>>
}

export interface IButtonModel {
    icon:string | null,
    text:string | number,
    color:string,
    click: Function,
    class: string,

}

const CustomButton = (props: IPropsButtonModel) => {
  return (
   <div className={`button-wrapper flex flex-row  ${props.color} ${props.class}`}
   onClick={ () => props.submitted('clicked')}
   style={{backgroundColor: `var(--${props.color})`}}>
        {props.icon && <Image src={props.icon} alt="Follow us on Twitter"/> }
        {props.text}
   </div>
  );
}

export default CustomButton;