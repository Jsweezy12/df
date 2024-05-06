'use client';
import React, { useEffect, useState } from 'react';
import '../counter/counter.scss'
import CustomButton from '../customButton/customButton';
import addIcon from '../../assets/icons/svg/add.svg';
import minusIcon from '../../assets/icons/svg/minus.svg'

function Counter({count,increaseCount,decreaseCount}:any) {

  return ( <div className='flex flex-row flex-align-center counter m-t-10'>
     <CustomButton icon={addIcon} text={''} color={''} class={'primary white-text'} submitted={() => { increaseCount()  } }></CustomButton>
      <div key={count} className='white-text'>{count}</div>
      <CustomButton icon={minusIcon} text={''} color={''} class={'primary white-text'} submitted={() => { count !== 0 ? decreaseCount() : ''} }></CustomButton>
   </div>
  );
}

export default Counter;