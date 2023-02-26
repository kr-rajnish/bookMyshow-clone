import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useLocation , useNavigate} from 'react-router-dom';
import '../styles/Payment.css';
import Container from 'react-bootstrap/Container';

export default function Payment() {
    const location = useLocation();
    const name = location.state.name;
    const price = location.state.price;
    const seat = location.state.seat ;
    const handleClick=()=>{
    
        alert("dummy payment")
    }
  return (

    <div>
       {/* <Button>Back</Button> */}
       <Container className="LoginRegisterBox">
       <Container>
        <h1>Summary</h1>
       <Table bordered hover>
      <thead>
        <tr>
          <th colSpan={3}>{name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>Price</td>
          <td>Rs.{price}</td>
        </tr>
        <tr>
       
          <td>Seats</td>
          <td>{seat}</td>
        </tr>
        <tr> 
          <td>Convience Charge(1.75%)</td>
          <td>{price*seat*1.75/100}</td>
        </tr>
        <hr/>
        <tr> 
          <td>Total</td>
          <td>{(price*seat)+(price*seat*1.75/100)}</td>
        </tr>
      </tbody>
    </Table>
       </Container>
      
       <Container>
       <div class="payment-container">
  <div id="Checkout" class="inline">
      <h1>Pay Invoice</h1>
      <div class="card-row">
          <span class="visa"></span>
          <span class="mastercard"></span>
          <span class="amex"></span>
          <span class="discover"></span>
      </div>
      <form>
          <div class="form-group">
              <label for="PaymentAmount">Payment amount</label>
              <div class="amount-placeholder">
                  <span>Rs.</span>
                  <span>{(price*seat)+(price*seat*1.75/100)}</span>
              </div>
          </div>
          <div class="form-group">
              <label or="NameOnCard">Name on card</label>
              <input id="NameOnCard" class="form-control" type="text" maxlength="255"></input>
          </div>
          <div class="form-group">
              <label for="CreditCardNumber">Card number</label>
              <input id="CreditCardNumber" class="null card-image form-control" type="text"></input>
          </div>
          <div class="expiry-date-group form-group">
              <label for="ExpiryDate">Expiry date</label>
              <input id="ExpiryDate" class="form-control" type="text" placeholder="MM / YY" maxlength="7"></input>
          </div>
          <div class="security-code-group form-group">
              <label for="SecurityCode">Security code</label>
              <div class="payment-input-container" >
                  <input id="SecurityCode" class="form-control" type="text" ></input>
                  <i id="cvc" class="fa fa-question-circle"></i>
              </div>
              <div class="cvc-preview-container two-card hide">
                  <div class="amex-cvc-preview"></div>
                  <div class="visa-mc-dis-cvc-preview"></div>
              </div>
          </div>
          <div class="zip-code-group form-group">
              <label for="ZIPCode">ZIP/Postal code</label>
              <div class="payment-input-container">
                  <input id="ZIPCode" class="form-control" type="text" maxlength="10"></input>
                  <a className="payment-link" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" data-placement="left" data-content="Enter the ZIP/Postal code for your credit card billing address."><i class="fa fa-question-circle"></i></a>
              </div>
          </div>
          <button id="PayButton" class="btn btn-block btn-success submit-button" type="button" onClick={handleClick}>
              <span class="submit-button-lock"></span>
              <span class="align-middle">Pay {(price*seat)+(price*seat*1.75/100)}</span>
          </button>
      </form>
  </div>
</div>
      </Container>
        </Container>
    </div>
  )
}
