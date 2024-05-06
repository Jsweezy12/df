import { Subject, tap, BehaviorSubject } from 'rxjs';
const initialState = {
  status: '',
  region:'Home',
  data: [
    {
      name:'The Seed',
      price: 36,
      totalCost:0,
      description:'',
      icon:'',
      count: 0
    },
    {
      name:'The Every Day Oil',
      price: 16,
      totalCost:0,
      description:'',
      icon:'',
      count: 0
    },
    {
      name:'Conditioner Oil',
      price: 18,
      totalCost:0,
      description:'',
      icon:'',
      count: 0
    }

  ],
  address:{
    line1:null,
    city:null,
    state:null,
    zip:null,
    email:null
  },
  productTotalCost:0,
  shippingTotalCost:5.00,
  salesTaxCost:0,
  saleTaxPercent: .0445, // State Sales tax in LA
  newDataCount: 0,
  error: ''
};
const subject = new BehaviorSubject(initialState);

let state = initialState;

const chatStore = {
  init: () => {
    state = {...state, newDataCount: 0}
    subject.next(state)
  },
  subscribe: setState => subject.subscribe(setState),
  getSubject: () => subject,
  getProductsInState: () => subject.value.data,
  getContactInfoInState: () => subject.value.address,
  updateRegion: region => {
    state = {
      ... state, region: region
    }
    subject.next(state)
  },
  sendMessage: message => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1
    };
    subject.next(state);
  },
  updateData: (data) => {
    const productTotalCost = Math.round(data.map(item => parseFloat(item.totalCost)).reduce((a,b)=> a + b , 0));
    const salesTaxCost = Math.round(productTotalCost * state.saleTaxPercent)
    state = {...state, 
      data: data, 
      productTotalCost:productTotalCost,
      salesTaxCost

    };
    subject.next(state);
  },

  updateAddress:(address) => {
    state = {...state, address}
    subject.next(state);
  },
  initialState
};

export default chatStore;