import React, { Component } from 'react';
import {connect} from 'react-redux'

class ChipForm extends Component {

  state={
    name: "",
    brand: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 handleSubmit = (e) => {
   e.preventDefault()

   fetch("http://localhost:4000/chips", {
     method: "POST",
     headers: {
       "content-type": "application/json"
     },
     body: JSON.stringify(this.state)
   })
   .then(r => r.json())
   .then((newlyCreatedChip) => {
     this.props.addOneChip(newlyCreatedChip)
   })


 }

 render() {
   let {name, brand} = this.state
   return (
     <form onSubmit={this.handleSubmit}>
       <label htmlFor="name">
         Name
       </label>
         <input type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={name}
            onChange={this.handleChange}
        />
       <label htmlFor="brand">
         Brand
       </label>
         <input type="text"
            id="brand"
            name="brand"
            value={brand}
            autoComplete="off"
            onChange={this.handleChange}
          />
       <input type="submit"/>
     </form>
   );
 }

}


let addOneChip = (newChipObject) => {
  let theAction = { type: "ADD_ONE_CHIP", payload: newChipObject }
  return theAction
}


let mapDispatchToProps = {
  addOneChip: addOneChip
}

export default connect(null, mapDispatchToProps)(ChipForm);
