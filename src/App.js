import React, { Component } from 'react';
import { Clearfix } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const urlhost = 'https://backend.com';

const headers = { Accept: 'application/json' };

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

const getMealStyle = (index) => {
  if (index < 0) return null;
  const ratio = 360 / this.state.preferences.length;
  return `hsl(${ratio * index}, 50%, 50%)`;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      preferences: [],
      meals: data,
    };
  }

  componentDidMount() {
    fetch(urlhost, { method: 'GET', headers })
      .then((response) => {
        if (!response.ok) return window.alert('There was an error loading data');
        return response.text();
      })
      .then(responseText => JSON.parse(responseText))
      .then(json => this.setState({ meals: json.meals }));
  }

  onMealPick(id) {
    const index = this.state.preferences.indexOf(id);
    if (index >= 0) {
      const preferences = [...this.state.preferences];
      preferences.splice(index, 1);
      this.setState({ preferences });
      return;
    }
    this.setState({ preferences: this.state.preferences.concat(id) });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password, preferences } = this.state;
    fetch(urlhost, { method: 'POST', headers, body: { email, password, preferences } })
      .then((response) => {
        if (!response.ok) return window.alert('There was a problem');
        return window.alert('Success!');
      })
      .catch(() => window.alert('There was a weird problem'));
  }

  onCancel() {
    const { email, password } = this.state;
    fetch(urlhost, { method: 'DELETE', body: { email, password } })
      .then((response) => {
        if (response.ok) return window.alert('Ordering canceled');
        return window.alert('There was an error');
      })
      .catch(() => window.alert('There was a weird problem'));
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
              <div className="input-group col-6 col-md-6 col-sm-12 col-lg-6 col-xs-12">
                <input
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  className="form-control"
                  style={{ borderRadius: 4, marginBottom: 10, fontFamily }}
                />
              </div>
              <div className="input-group col-6 col-md-6 col-sm-12 col-lg-6 col-xs-12">
                <input
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                  className="form-control"
                  style={{ borderRadius: 4, marginBottom: 10, fontFamily }}
                />
              </div>
              <button
                className="btn btn-success"
                disabled={this.state.preferences.length > 0}
                style={{ marginRight: 10, fontFamily }}
                onClick={e => this.onSubmit(e)}
              >Submit</button>
              <button
                className="btn btn-danger"
                style={{ fontFamily }}
                onClick={this.onCancel}
              >Cancel Orders</button>
              <Clearfix visibleSmBlock />
            </div>
          </div>
          {this.state.meals.map((meal) => {
            const index = this.state.preferences.indexOf(meal.id);
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
                <h4 style={{ fontFamily, backgroundColor: getMealStyle(index), marginTop: 0, paddingTop: 5, paddingBottom: 5 }}>
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
