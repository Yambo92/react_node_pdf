import React from 'react';
import axios from 'axios'
import {saveAs} from 'file-saver'
import './App.css';

class App extends React.Component {
  state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0
  }
  handleChange = ({target: {value, name}}) => this.setState({ [name]: value })

  createAnDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', {responseType: 'blob'}))
      .then((res) => {
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }
  render() {
    const {name, receiptId, price1, price2} = this.state;
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" value={name} onChange={this.handleChange} />
        <input type="number" placeholder="Receipt ID" name="receiptId" value={receiptId} onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" value={price1} onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" value={price2} onChange={this.handleChange} />
        <button onClick={this.createAnDownloadPdf}>Download PDF</button>
      </div>
    );
  }

}

export default App;
