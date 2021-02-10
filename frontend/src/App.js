import React, { Component } from 'react'
import 'whatwg-fetch'
import { Button, Card, CardTitle, CardText } from 'reactstrap'
import Select from './helpers/select'
import './App.css'
import ModalComponent from './ModalComponent/ModalComponent'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      filterType: 'decimalOddsMoreThanTwo',
      bettingOptions: [],
      amount: 0,
      betRecord: []
    }
  }

  componentDidMount() {
    this.fetchData(this.state.filterType)
  }

  fetchData = (type) => {
    const url = 'http://localhost:4000' // wise way is to take it from env
    fetch(`${url}/${type}`)
      .then(response => response.json())
      .then(data => this.setState({ bettingOptions: data }))
  }

  setFilterType = (value) => {
    this.setState({ filterType: value })
    this.fetchData(value)
  }

  addBetRecord = (item) => {
    const { betRecord, amount } = this.state
    const hasRecord = betRecord.find(x => x.id === item.betId)
    if (hasRecord) {
      const pos = betRecord.indexOf(hasRecord)
      const recurringItem = betRecord[pos]
      recurringItem.betAmount = amount
      this.state.betRecord[pos] = recurringItem
      this.setState({
        betRecord: betRecord
      })
    } else {
      const data = { id: item.betId, name: item.name, betAmount: this.state.amount }
      this.setState({ betRecord: [...betRecord, data] })
    }
  }

  render() {
    const { modalOpen, filterType, bettingOptions, betRecord } = this.state
    return (
      <div className='backdrop'>
        <div className='app text-center'>
          <div className='app-content pt-3 p-5'>
            <ModalComponent
              modalOpen={modalOpen}
              modalClose={() => this.setState({ modalOpen: !modalOpen })}
              betRecord={betRecord} />
            <h1>Betslip</h1>
            <label>Please select best odds decimal type</label><br />
            <Select value={filterType} change={this.setFilterType} /><br />
            {bettingOptions.map(item => {
              const highestOdds = Math.max.apply(Math, item.odds.map(function (o) { return o.oddsDecimal }))
              return (
                <Card body key={item.betId}>
                  <CardTitle tag='h5'>{item.name}</CardTitle>
                  <CardText>Best odds decimal value is <b><u>{highestOdds}</u></b>.</CardText>
                  <label htmlFor='stake'>Please enter Bet Stake</label>
                  <input
                    type='number'
                    id='stake' name='stake'
                    onChange={(e) => this.setState({ amount: e.target.value })}
                    placeholder='please enter stake amount'
                    className='mb-2 p-2' ></input>
                  <Button
                    onClick={() => this.addBetRecord(item)}
                    color='success'
                  >Stake</Button>
                </Card>
              )
            })
            }
            <Button
              onClick={() => this.setState({ modalOpen: !modalOpen })}
              className='mt-1 w-100 submit-btn'
              color='danger'
              disabled={betRecord.length === 0 ? true : false}>
              Click for Receipt
            </Button>
          </div>
        </div>
      </div >
    )
  }
}

export default App
