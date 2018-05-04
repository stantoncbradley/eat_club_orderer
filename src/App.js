import React, { Component } from 'react';
import { Clearfix } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const urlhost = 'http://192.168.132.172:8080/';

const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

const fontFamily = 'Montserrat';

const getMealStyle = (index) => {
  if (index < 0) return null;
  const initial = 60 + 360 + 360; // start at yellow with mod 360 * 2
  const ratio = 20;
  const hue = (initial - (ratio * index)) % 360;
  return `hsl(${hue}, 75%, 75%)`;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      preferences: [],
      meals: [],
    };
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateDimensions());
    fetch(urlhost, { method: 'GET', headers })
      .then((response) => {
        if (!response.ok) throw Error();
        return response.text();
      })
      .then(responseText => JSON.parse(responseText))
      .then((json) => {
        this.setState({ meals: json.mealRepresentations });
      })
      .catch(e => window.alert('There was an error loading data'));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
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
    const body = JSON.stringify({ userRepresentation: { email, password }, preferences });
    fetch(urlhost, { method: 'POST', headers, body })
      .then((response) => {
        if (!response.ok) return window.alert('There was a problem');
        return window.alert("You're all set!");
      })
      .catch(() => window.alert('There was a weird problem'));
  }

  onCancel(e) {
    e.preventDefault();
    const { email, password } = this.state;
    // fetch(urlhost, { method: 'DELETE', headers, body: JSON.stringify({ userRepresentation: { email, password } }) })
    fetch(urlhost, { method: 'DELETE', headers })
      .then((response) => {
        if (response.ok) return window.alert('Ordering canceled');
        return window.alert('There was an error');
      })
      .catch(() => window.alert('There was a weird problem'));
  }

  getHeaderStyle() {
    return this.state.width > 640
      ? { overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }
      : null;
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    return (
      <div
        className="App" style={{ maxWidth: 800, marginRight: 'auto', marginLeft: 'auto' }}
      >
        <form>
          <div style={this.getHeaderStyle()}>
            <div
              className="col-6 col-md-6 col-sm-12 col-lg-6 col-xs-12"
              style={{ overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
              className="col-6 col-md-6 col-sm-12 col-lg-6 col-xs-11"
              style={{
                backgroundColor: '#555',
                borderRadius: 4,
                padding: 20,
                margin: 20,
                paddingBottom: 10,
              }}
            >
              <div className="input-group col-12 col-md-12 col-sm-12 col-lg-12 col-xs-12">
                <input
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  className="form-control"
                  style={{ borderRadius: 4, marginBottom: 10, fontFamily }}
                />
              </div>
              <div className="input-group col-12 col-md-12 col-sm-12 col-lg-12 col-xs-12">
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
                disabled={this.state.preferences.length <= 0}
                style={{ marginRight: 10, marginBottom: 10, fontFamily }}
                onClick={e => this.onSubmit(e)}
              >Submit</button>
              <button
                className="btn btn-danger"
                style={{ fontFamily, marginBottom: 10 }}
                onClick={e => this.onCancel(e)}
              >Cancel Ordering</button>
              <Clearfix visibleSmBlock />
            </div>
          </div>
          {this.state.meals.length < 1 && <h4 style={{ fontFamily }}>Loading..</h4>}
          {this.state.meals.map((meal) => {
            const index = this.state.preferences.indexOf(meal.id);
            return (
              <div
                key={meal.id}
                className="col-6 col-md-3 col-sm-4 col-lg-3 col-xs-6"
                onClick={() => this.onMealPick(meal.id)}
                role="button"
              >
                <div style={{ opacity: index >= 0 ? 0.60 : 1 }}>
                  <img
                    src={meal.imageUrl}
                    className="img-responsive"
                    style={{ }}
                  />
                </div>
                <p style={{ fontFamily, backgroundColor: getMealStyle(index), marginTop: 0, padding: 5 }}>
                  {index >= 0 ? index + 1 : ''} {meal.name}
                </p>
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
