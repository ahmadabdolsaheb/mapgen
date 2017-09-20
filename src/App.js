import React, {Component} from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimentions: 5,
      maxTurn: 2,
      maxLeng: 3,
      grid: []
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  fullArray(num, dimentions) {
    var array = [];
    for (var i = 0; i < dimentions; i++) {
      array.push([]);
      for (var j = 0; j < dimentions; j++) {
        array[i].push(num);
      }
    }
    return array;
  }

  onChange(e) {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  nextMove() {
    let dimentions = this.state.dimentions,
      maxTurn = this.state.maxTurn, // the number of turns the tunnel has
      maxLeng = this.state.maxLeng, // maximum number of each turn can have
      fulArr = this.fullArray(1, dimentions), // save a full array;
      curRow = Math.floor(Math.random() * dimentions), // pick a random row
      curCol = Math.floor(Math.random() * dimentions), // pick a random column
      allowedTurns = [[-1, 0], [1, 0], [0, -1], [0, 1]], // turns allowed are horizontal right/left and vertical right/left //left,right,up,down
      lastTurn = [3, 3], // a variable to save the last turn it could have any non -1,0,1 value
      randTurn, // initiate variable for the turn
      randLeng,
      tunneleng;
      //debugger;
    while (maxTurn) { // while number of allowed turns are not 0 do the following

      do { // do the following and check to see if passes the condition
        randTurn = allowedTurns[Math.floor(Math.random() * allowedTurns.length)]; //randomly choose a turn
        //if the player is at the edge of the map and the random turn wants to push it off map select another turn
        //if the turn is similar to the previously selected turn or is reverse of the previous turn select another turn
      } while (((randTurn[0] === -1 * lastTurn[0]) && (randTurn[1] === -1 * lastTurn[1])) || ((randTurn[0] === lastTurn[0]) && (randTurn[1] === lastTurn[1])));

      randLeng = Math.ceil(Math.random() * maxLeng); //randomly choose a length form the maximum allowed length
      tunneleng = 0;

      while (tunneleng < randLeng) { //loop over the length

        //break the loop if it is going out of the map
        if (((curRow === 0) && (randTurn[0] === -1)) ||
            ((curCol === 0) && (randTurn[1] === -1)) ||
            ((curRow === dimentions - 1) && (randTurn[0] === 1)) ||
            ((curCol === dimentions - 1) && (randTurn[1] === 1))) {
          break;
        } else {
          fulArr[curRow][curCol] = 0; //set the value of the item to 0
          curRow = curRow + randTurn[0]; //otherwise incriment the row and col according to the turn
          curCol = curCol + randTurn[1];
          tunneleng++;
        }
      }

      if (tunneleng) {
        lastTurn = randTurn; //set last turn to the value of the current turn
        maxTurn--; // decrement the number of turns allowed
      }
    }
    return fulArr; // finally return the array to be drawn
  };

  onClick(e) {
    console.log("clicked");
    this.forceUpdate()
  }

  render() {
    let grid = this.nextMove();
    return (
      <div className="container">
        <div className="form-group row">
          <div className="col-xs-push-3 col-sm-push-4 col-md-push-5 col-lg-push-5 col-xs-3 col-sm-2 col-md-1 col-lg-1">
            <label>dimensions</label>
            <input className="form-control" name="dimentions" type="text" maxLength="2" value={this.state.dimentions} onChange={this.onChange}/>
          </div>
          <div className="col-xs-push-3 col-sm-push-4 col-md-push-5 col-lg-push-5 col-xs-3 col-sm-2 col-md-1 col-lg-1">
            <label>maxTurn</label>
            <input className="form-control" name="maxTurn" type="text" maxLength="3" value={this.state.maxTurn} onChange={this.onChange}/>
          </div>
          <div className="col-xs-push-3 col-sm-push-4 col-md-push-5 col-lg-push-5 col-xs-3 col-sm-2 col-md-1 col-lg-1">
            <label>maxLeng</label>
            <input className="form-control" name="maxLeng" type="text" maxLength="3" value={this.state.maxLeng} onChange={this.onChange}/>
          </div>
        </div>
        <table className="grid" onClick={this.onClick}>
          <thead>
            {grid.map((obj, row) => <tr key={row}>{obj.map((obj2, col) =>< td className = {
                obj2 === 1
                  ? 'wall'
                  : 'tunnel'
              }
              key = {
                col
              } > </td>)}</tr>)}
          </thead>
        </table>
      </div>
    );
  }
}
export default App;
