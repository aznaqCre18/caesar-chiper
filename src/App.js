import React, { Component } from 'react';

import { abjad } from './constant';
import './app.scss';
import Button from './component/Button';
import Input from './component/Input';


export default class App extends Component {
  state = {
    text: '',
    key: '',
    textResult: '-',
    keyResult: '-',
    result: '-',
  }

  _handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _logicEncDec = (type) => {
    const { text } = this.state;
    let arrResult = [];
    const types = type;

    const textArr = text.toLowerCase().split('');
    console.log(textArr)
    textArr.map((item, key) => {
      abjad.map((char) => {
        if(textArr[key] === ' ') {
          arrResult.push(' ');
        } else if(textArr[key] === char.value) {
          let res;
          if(types === 'enc') {
            console.log(`${char.key} - ${Number(this.state.key)} % 26`)
            res = (char.key + Number(this.state.key)) % 26;
          } else if(types === 'dec') {
            if((char.key - Number(this.state.key)) % 26 < 0) {
              let idx = (25 + ((char.key - Number(this.state.key)) % 26)) + 1;
              res = idx;
            } else {
              res = (char.key - Number(this.state.key)) % 26;
            }
          }
          console.log(abjad[res], "ABJAD RES")
          let encFinal = abjad[res].value;
          arrResult.push(encFinal);
        }
      })
    });
    
    this.setState({
      result: arrResult,
    })
  }

  _handleClickEnc = (e) => {
    e.preventDefault();

    this._logicEncDec('enc');
    this.setState({
      keyResult: this.state.key,
      textResult: this.state.text,
    })
  }

  _handleClickDec = (e) => {
    e.preventDefault();

    this._logicEncDec('dec');
    this.setState({
      keyResult: this.state.key,
      textResult: this.state.text,
    })
  }

  render() {
    const { textResult, keyResult, result, text, key } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <h1 className="title">Caesar Chiper</h1>
          <form className="form-wrapper">
            <Input
              name="text"
              label="Plainteks or Chiperteks"
              placeholder="e.g Aziz or IHQH"
              onChange={this._handleChange}
              type="text"
            />
            <Input 
              name="key"
              label="Key"
              placeholder="Input number key here"
              onChange={this._handleChange}
              type="number"
            />
            <div className="button-wrapper">
              <Button 
                label="Encrypt"
                onClick={this._handleClickEnc}
                disable={text === '' || key === '' ? true : false }
              />
              <Button 
                label="Decrypt"
                onClick={this._handleClickDec}
                disable={text === '' || key === '' ? true : false }
              />
            </div>
          </form>
          <div className="result-container">
            <div className="wrappers-res">
              <div className="wrapper key">
                <h5>Key</h5>
                <p>{keyResult}</p>
              </div>
              <div className="wrapper real">
                <h5>Real Text</h5>
                <p>{textResult}</p>
              </div>
              <div className="wrapper result">
                <h5>Result</h5>
                <p>{result === '-'  ? '-' : result.join('').toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

