import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './app.css';
import 'font-awesome/css/font-awesome.min.css'; // font awesome
// Component to inject on select
class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      data: null,
    };
  }
  sendSelection() {
    $.post(
      'http://localhost:4200',
      {
        term: this.props.selection,
      },
      (data, status) => {
        console.log('data', data);
        this.setState({ loaded: true, data });
        // alert('Data: ' + data + '\nStatus: ' + status);
      }
    );
  }
  testapi() {
    console.log('not yet');
    $.get('http://localhost:4200', (data, status) => {
      console.log(data);
    });
  }
  componentDidMount() {
    console.log('this props', this.props.selection);
    this.sendSelection();
  }
  render() {
    let result;
    if (!this.state.loaded) {
      result = (
        <div className="loading btn btn-sm btn-primary">Vérification</div>
      );
    } else {
      if (this.state.data.fact < 0.3) {
        result = (
          <div className="result-container">
            <div className="btn btn-sm btn-danger mr-1">FAKE</div>
            {/* <button className="btn btn-sm btn-success mr-1">
              <i className="fas fa-thumbs-up"></i>
            </button>
            <button className="btn btn-sm btn-info mr-1">
              <i className="fas fa-thumbs-down"></i>
            </button> */}
          </div>
        );
      } else if (this.state.data.fact >= 0.3 && this.state.data.fact < 0.80) {
        let sourceContainer;
        let sources = [];
        for (const source of this.state.data.sources) {
          sources.push(<p>{source}</p>);
        }
        sourceContainer = <div className="sources">{sources}</div>;
        result = (
          <div className="container">
            <div className="result-container">
              <div className="btn btn-sm btn-info mr-1">
                LOOKS GOOD
              </div>
              {/* <button className="btn btn-sm btn-success mr-1">
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="btn btn-sm btn-info mr-1">
                <i className="fas fa-thumbs-down"></i>
              </button> */}
            </div>
            <p>Sources:</p>
            {sourceContainer}
          </div>
        );
      } else {
        let sourceContainer;
        let sources = [];
        for (const source of this.state.data.sources) {
          sources.push(<p>{source}</p>);
        }
        sourceContainer = <div className="sources">{sources}</div>;
        result = (
          <div className="container">
            <div className="result-container">
              <div className="btn btn-sm btn-success mr-1">
                FACT
              </div>
              {/* <button className="btn btn-sm btn-success mr-1">
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="btn btn-sm btn-info mr-1">
                <i className="fas fa-thumbs-down"></i>
              </button> */}
            </div>
            <p>Sources:</p>
            {sourceContainer}
          </div>
        );
      }
    }
    return (
      <div className="container">
        {/* <div className="result btn btn-primary">Primary</div> */}
        {result}
      </div>
    );
  }
}

window.addEventListener('load', function () {
  $(function () {
    $(document.body).bind('mouseup', function (e) {
      let selection;
      let parentNode;
      if (window.getSelection) {
        selection = window.getSelection();
        if (selection.rangeCount > 0) {
          parentNode = selection.getRangeAt(0).startContainer.parentNode;
        }
      } else if (document.selection) {
        selection = document.selection.createRange();
        parentNode = document.selection.createRange().parentElement();
      }
      if (selection && selection.toString() !== '') {
        app(selection.toString(), parentNode);
      }
    });
  });
});

const app = (selection, target) => {
  // observer.disconnect();
  console.log('app funxtion executed');
  if (!document.getElementById('react-root-test')) {
    const parent = target.parentNode;
    const root = document.createElement('div');
    root.setAttribute('id', 'react-root-test');

    parent.insertBefore(root, target);

    ReactDOM.render(
      <App selection={selection} />,
      document.getElementById('react-root-test')
    );
  }
};
