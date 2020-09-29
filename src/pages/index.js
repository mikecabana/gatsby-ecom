import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"

import { loadStripe } from "@stripe/stripe-js"

class Button extends React.Component {
  async componentDidMount() {
    this.stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          this.stripe
            .redirectToCheckout({
              lineItems: [
                { price: "price_1HWWvzC8wmFHFqVBa93ODxxp", quantity: 1 },
              ],
              mode: "payment",
              // Do not rely on the redirect to the successUrl for fulfilling
              // purchases, customers may not always reach the success_url after
              // a successful payment.
              // Instead use one of the strategies described in
              // https://stripe.com/docs/payments/checkout/fulfill-orders
              successUrl: "http://localhost:8000/success",
              cancelUrl: "http://localhost:8000/cancelled",
            })
            .then(function (result) {
              if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                var displayError = document.getElementById("error-message")
                displayError.textContent = result.error.message
              }
            })
        }}
      >
        <button
          type="submit"
          style={{
            backgroundColor: "#6772E5",
            color: "#FFF",
            padding: "8px 12px",
            border: "0",
            borderRadius: "4px",
            fontSize: "1em",
          }}
        >
          Checkout
        </button>
      </form>
    )
  }
}

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Button />
    <div id="error-message"></div>
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </>
)

export default IndexPage
