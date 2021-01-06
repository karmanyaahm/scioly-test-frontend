import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import Picker from './Config';
import Table from './Table';


interface RealData {
  types: Map<[a: string], Map<[b: string], number | string>>;
  values: [{ [n: string]: string | number }];
}
async function getData(): Promise<RealData> {
  const res = await fetch('./t.json');
  const data = await res.json();
  return parseData({
    types: {
      location: {
        location_a: "Location A",
        location_b: "Location B",
        location_c: "Location C",
      },
      event: {
        anatomy_and_physiology: "Anatomy and Physiology",
        detector_building: "Detector Building",
        expd: "Experimental Design",
      },
    }, values: data
  }); 
  return parseData({
        values: [
      { location: "location_a", div: "c", event: "anatomy_and_physiology", year: 2020, url: "https://drive.google.com" },
      { location: "location_a", div: "b",  event: "expd", year: 2021, url: "https://drive.google.com" }

    ]
  });
}
async function parseData(p: any): Promise<RealData> {
 // p.types = new Map(Object.keys(p.types).map(key => [key, new Map(Object.keys(p.types[key]).map(ke => [ke, p.types[key][ke]]))]));
  // more parsing todo
  return p;
}
class App extends React.Component {
  state: any = {
    types: new Map<string, Map<string, number | string>>(),
    values: [],
  };


  componentDidMount() {
    getData().then(data => {

      this.setState({
        types: data.types,
        values: data.values,
      });

    });
  }
  reRenderTable(st: { [s: string]: number[] | string[] }) {
    console.log("now");
  }
  render() {
    console.log(this.state.values)
    return (
      <div className="App">
        {/* <pre>{JSON.stringify(fruits)}</pre> */}
        {/* <Picker typeconfig={this.state.types} reRender={this.reRenderTable} /> */}
        <Table data={this.state.values} />
      </div>
    );
  }
}

export default App;
