import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  Clearfix,
} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const data = [
  {
    id: 775245,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775246,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775247,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775248,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775249,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775250,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775251,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775252,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 775253,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
  {
    id: 7752464,
    name: 'Butter Chicken',
    imageUrl: 'https://myeatclub.a.ssl.fastly.net/im/11431/1487359594000/',
  },
];

const fontFamily = 'Montserrat';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id} className={props.className}>
      <FormControl {...props} style={{ fontFamily }} />
    </FormGroup>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedMeals: [],
    };
  }

  onMealPick(id) {
    const index = this.state.selectedMeals.indexOf(id);
    if (index >= 0) {
      const selectedMeals = [...this.state.selectedMeals];
      selectedMeals.splice(index, 1);
      this.setState({ selectedMeals });
      return;
    }
    this.setState({ selectedMeals: this.state.selectedMeals.concat(id) });
  }

  getMealStyle(index) {
    if (index < 0) return null;
    const ratio = 360 / this.state.selectedMeals.length;
    return `hsl(${ratio * index}, 50%, 50%)`;
  }

  render() {
    return (
      <div className="App" style={{ maxWidth: 800, marginRight: 'auto', marginLeft: 'auto' }}>
        <form>
          <div style={{ overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              className="col-6 col-md-6 col-sm-12 col-lg-6 col-xs-12"
            >
              <img
                src={logo}
                style={{ maxWidth: 200 }}
                className="col-3 col-md-3 col-sm-3 col-lg-3 col-xs-6"
              />
              <h1
                className="col-3 col-md-3 col-sm-3 col-lg-3 col-xs-6"
                style={{ fontFamily, margin: 0 }}
              >Orderer</h1>
            </div>
            <div
              className="col-6 col-md-6 col-sm-12 col-lg-6 col-xs-12"
              style={{
                backgroundColor: '#555',
                borderRadius: 4,
                padding: 20,
                margin: 20,
              }}
            >
              <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="email"

              />
              <FieldGroup
                id="formControlsPassword"
                label="Password"
                type="password"
                placeholder="password"
              />
              <Button
                bsStyle="success"
                disabled={this.state.selectedMeals.length < 1}
                style={{ marginRight: 10, fontFamily }}
              >Submit</Button>
              <Button bsStyle="danger" style={{ fontFamily }}>Cancel Orders</Button>
              <Clearfix visibleSmBlock />
            </div>
          </div>
          {data.map((meal) => {
            const index = this.state.selectedMeals.indexOf(meal.id);
            return (
              <div
                key={meal.id}
                className="col-6 col-md-3 col-sm-4 col-lg-3 col-xs-6"
                onClick={() => this.onMealPick(meal.id)}
                role="button"
              >
                <div style={{ opacity: index >= 0 ? 0.5 : 1 }}>
                  <img
                    src={meal.imageUrl}
                    className="img-responsive"
                    style={{ }}
                  />
                </div>
                {/* <h4 style={[{ fontFamily: 'Garamond' }, this.getMealStyle(index)]} > */}
                <h4 style={{ fontFamily, backgroundColor: this.getMealStyle(index), marginTop: 0, paddingTop: 5, paddingBottom: 5 }}>
                  {index >= 0 ? index + 1 : ''} {meal.name}
                </h4>
              </div>
            );
          },
          )}

        </form>
      </div>
    );
  }
}

export default App;
