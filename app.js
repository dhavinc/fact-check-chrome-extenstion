import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// Component to inject on select
// const TestComponent = () => <h1>I am dynamically added!</h1>;
class App extends Component {
	sendSelection() {
		$.post("http://localhost:4200",
		{
			term: this.props.selection
		},
		(data, status) => {
			alert("Data: " + data + "\nStatus: " + status);
		});
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
		return <button onClick={this.testapi}>3asba</button>
	}
}



window.addEventListener('load', function () {
  console.log('loaded');
  // Specifies the element we want to watch
  // const watch = document.getElementById('target-test');
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
      // selection.toString() !== '' &&
        // alert(
        //   '"' +
        //     selection.toString() +
        //     '" was selected at ' +
        //     e.pageX +
        //     '/' +
        //     e.pageY
        // );
    });
  });
  // // Creates a new Mutation Observer
  // const observer = new MutationObserver((mutationList, observer) => {
  //   for (const mutation of mutationList) {
  //     if (mutation.type === 'childList') {
  //       const target = watch.querySelector('p');
  //       if (target) {
  //         app(observer, target);
  //       }
  //     }
  //   }
  // });

  // // Starts observing the child list of the element
  // observer.observe(watch, {
  //   childList: true,
  // });
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
      <App selection={selection}/>,
      document.getElementById('react-root-test')
    );
  }
};
