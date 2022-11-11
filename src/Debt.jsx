// Module 9 Debt Free Calculator
import React from "react";

class Debt extends React.Component {
  constructor() {
    super();
    this.state = {
      loan: "",
      interestRate: "",
      term: "12",
      interest: "0",
      principal: "",
      minPayment: "",
      payment: "",
		newBalance: ""
    }; // Do I need that many properties ?
  }


  handleChange = ({target: {value,name}}) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault();
	 
    const interestValue = (
      (this.state.interestRate / 100 / this.state.term) *
      this.state.loan
    ).toFixed(2);

	 const principal = (this.state.loan / 100).toFixed(2)

    this.setState({
		principal: principal,
      interest: interestValue,
      minPayment: (
        Number(principal) + Number(interestValue)
      ).toFixed(2),
		newBalance: this.state.loan
    });
    // It has to be shorthand this.state !>!>!>!>!
  };

  handleSubPay = (e) => {
    e.preventDefault();

    if (this.state.payment >= this.state.minPayment) {
      this.setState({
        newBalance: this.state.newBalance - (this.state.payment - this.state.interest),
      });
    } else {
      alert(`Payment can't be less than $${this.state.minPayment} `);
    }
  };

  render() {
	const { interest, principal, minPayment, payment, newBalance } = this.state;

    const divStyle = {
      display: "flex",
      flexDirection: "column",
    };
    return (
      <div>
        <h2>Debt Free Calculator</h2>
        <form style={{ display: "flex", gap: "15vmin" }}>
          <div style={divStyle}>
            <label htmlFor="DebtAmount">Total Debt Amount</label>
            <input
              type="number"
				  name="loan"
              onChange={this.handleChange}
              // value
            />
            <br />
            <label htmlFor="InterestRate">Interest Rate</label>
            <input
              type="number"
				  name="interestRate"
              min="0"
              max="100"
              step="0.1"
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="term">Loan Term in Months</label>
            <select
              name="term"
              onChange={this.handleChange}
// HOW TO DO PLACEFOLDER IN HERE ? I GOOGLE IT BUT i COULDN'T FIGURE OUT !!!!!!!!!!!!!
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
              <option value="60">60</option>
              <option value="72">72</option>
            </select>
            <br />
            <button onClick={this.handleSubmit}>Calculate</button>
          </div>

          <div style={divStyle}>
            <p>Interest is ${interest}</p>
            <p>Principal is ${principal}</p>
            <p>Total minPayment ${minPayment}</p>
            <label htmlFor="Pay">How much would you like to pay ?</label>
            <input
              type="number"
				  name="payment"
              min={Number(minPayment)}
              value={payment}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="submit"
              value="MAKE PAYMENT"
              onClick={this.handleSubPay}
            />
          </div>
        </form>
        <h4>Your balance is ${newBalance}</h4>
      </div>
    );
  }
}

export default Debt;
