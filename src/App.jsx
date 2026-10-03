import { useState } from 'react';

import './App.css';

export default function App() {

       const [bill, setBill] = useState(''); //valoarea curenta a facturii; setBill=>functia prin care modifici bill-ul
       const [tipPercentage, setTipPercentage] = useState(15); //procentul bacsisului ; valoarea initiala 15; modifica procentul
       const [customTip, setCustomTip] = useState(''); //se pastreaza un bacsis introdus manual de user
       const [people, setPeople] = useState( 1 );//numarul de oameni, setPeople . functie care modifica numarul de oameni
       //nu modificam direct variabila de stare


       ///determinam procentul active 
       const activeTip = customTip != '' ? Number(customTip) : Number(tipPercentage);

       const numBill = Number( bill ) || 0;

       const numPeople = Number( people ) > 0 ? Number(people) : 1;

       //calcule derivate
       const tipAmountTotal = (numBill * activeTip) / 100;

       const tipPerPerson = tipAmountTotal / numPeople;

       const totalPerPerson = (numBill + tipAmountTotal) / numPeople;

       const handlePresetTip = ( value ) => {

       	setTipPercentage( value );

       	setCustomTip('');
       }


       const handleCustomTipChange = (e) => {

       	     setCustomTip( e.target.value );
       }

       const handleReset = () => {
       	     setBill('')
       	     setTipPercentage(15);
       	     setCustomTip('');
       	     setPeople(1);
       }


       return(

       	        <div className="container">
       	             <header class="header">
       	                  <h1>SPLI<span>TTER</span></h1>
       	             </header>

                     <div className="card">

                         <div className="form-section">

                             {/*comentarii.....nota de plata.....*/ }
                            <div class="input-group">
                                      <label htmlFor="bill">Nota de plata</label>
                                      <div className="input-wrapper">
                                              <span className="icon">$</span>
                                              <input
                                                    id="bill"
                                                    type="number"
                                                    value={bill}
                                                    onChange = {(e) => setBill(e.target.value)}
                                              />
                                      </div>         
                             </div>                                     
                           
                             {/*comentarii.....pentru tip.....*/ }
                             <div className="input-group">   

                                   <label>Selecteaza bacsisul %</label> 
                                   <div className="tip-grid">
                                   {[5,10,15,25,50].map((rate) => (                                    
                                     <button
                                     key={rate}
                                     type="button"
                                     className = {`tip-btn ${activeTip === rate && customTip == '' ? 'active': ''}`}
                                     onClick= { () => handlePresetTip(rate) }
                                     >      
                                     {rate}%
                                     </button>
                                   ))}

                                   <input 
                                   type="number"
                                   placeholder = "altul"
                                   className = "custom-tip-input"
                                   onChange= {handleCustomTipChange}
                                   min="0"
                                   />                                   
                              </div>

                              </div>

                             {/*Input pentru numar de persoane*/}

                              <div className="input-group">

                                                  <div className="label-wrapper">
                                                           <label htmlFor="people">Numarul de persoane</label>

                                                            {Number(people) <= 0 && <span className="error-msg">Nu poate fi zero</span>} 

                                                  </div>

                                                  <div className={`input-wrapper ${Number(people) <= 0 ? 'input-error': ''}`}>
                                                           <span className="icon">👤</span>

                                                           <input
                                                             id="people"
                                                             type="number"
                                                             placeholder="1"
                                                             value={people}
                                                             onChange = {(e) => setPeople(e.target.value)}
                                                           />

                                                  </div>
                                  </div>
                                                         
                        </div>    


                        {/*Sectiunea rezultate ......afisare in dreapta*/}  
                        <div className="result-section">

                                   <div className="result-rows">

                                        <div className="result-row">

                                            <div className="result-label">
                                                     <p className="title">Tip</p>
                                                     <p className="subtitle"> / persoana </p>
                                            </div>           
                                            <div className="amount">${tipPerPerson.toFixed(2)}</div>
                                        </div>                         


                                        <div className="result-row">

                                           <div className="result-label">
                                                     <p className="title">Total</p>
                                                     <p className="subtitle"> / persoana </p>
                                            </div>           

                                         <div className="amount">${totalPerPerson.toFixed(2)}</div>
                                        </div>
                                   </div>  

                                   <button
                                     className = "reset-btn"
                                     onClick = {handleReset}
                                     disabled = {!bill && people == 1 && customTip === '' && tipPercentage === 15}
                                   >
                                   RESET
                                   </button>
                               

                        </div>


                     </div> 

       	        </div>     

    	);
}

