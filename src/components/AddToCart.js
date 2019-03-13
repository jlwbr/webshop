import React from 'react'

export default class addToCart extends React.Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }
  addToCart(e) {
    if (window.Snipcart) {
      window.Snipcart.api.items
        .add(
          Object.assign(
            {
              autopop: false,
            },
            this.props.data
          )
        )
        .then(item => {
          if (this.props.data.openCart) {
            window.Snipcart.api.modal.show()
          }
        })
    }
  }
  render() {
    let dataAttrs = {}
    for (let i in this.props.data) {
      dataAttrs[`data-${i}`] = this.props.data[i]
    }
    return (
      <div onClick={this.addToCart}>
        {this.props.children}
        <div
          className="snipcart-add-item"
          {...dataAttrs}
          style={{ display: 'none' }}
        />
      </div>
    )
  }
}
