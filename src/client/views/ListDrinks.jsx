import React from 'react';
import io from 'socket.io-client';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeftArrow from '../img/arrow-left.svg';
import RightArrow from '../img/arrow-right.svg';
import './ListDrinks.css';
import DrinkPicker from '../components/DrinkPicker';
class ListDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:7000',
      drinks: [],
      drink: { name: 'Loading', ingredients: [{ name: 'loading', numShots: -1 }] },
      currIdx: 0,
    };
    this.socket = io(this.state.endpoint);
    this.previousDrink = this.previousDrink.bind(this);
    this.nextDrink = this.nextDrink.bind(this);
  }

  async componentWillMount() {
    let fluids = await api.getActiveFluids();
    fluids = fluids.data;
    let payload = {
      array: fluids
    };
    api.getDrinksByIngredients(payload).then(possibleDrinks => {
      possibleDrinks = possibleDrinks.data;
      console.log(possibleDrinks);
      this.setState({ drinks: possibleDrinks, drink: possibleDrinks[0], currIdx: 0 });
    }).catch((err) => {
      console.error(err);
    })

  }

  previousDrink() {
    if (this.state.currIdx > 0) {
      this.setState({
        currIdx: this.state.currIdx - 1,
        drink: this.state.drinks[this.state.currIdx - 1]
      });
    } else {
      this.setState({
        currIdx: this.state.drinks.length - 1,
        drink: this.state.drinks[this.state.drinks.length - 1]
      });
    }
  }

  nextDrink() {
    if (this.state.currIdx < this.state.drinks.length -1) {
      this.setState({
        currIdx: this.state.currIdx + 1,
        drink: this.state.drinks[this.state.currIdx + 1]
      });
    } else {
      this.setState({
        currIdx: 0,
        drink: this.state.drinks[0]
      });
    }
  }

  createDrink(event) {
    event.preventDefault();
    window.location.href = `/drinks/create`;
  }

  makeDrink = (event) => {
    event.stopPropagation();
    this.socket.emit('makeDrink', {drink: this.state.drink, pos: 0});
  }
  render() {
    return (
      <>
        <div className="menu">
          <p>
            <img height="50" width="50" src={LeftArrow} onClick={this.previousDrink} />
          </p>
          <div>
            <DrinkPicker drink={this.state.drink} />
          </div>
          <p>
            <img height="50" width="50" src={RightArrow} onClick={this.nextDrink} />
          </p>
        </div>
        <div>
          <button onClick={this.createDrink}>+</button> 
          <button onClick={this.makeDrink}>Make</button>
        </div>
      </>
    )
  }
}

export default ListDrinks;
