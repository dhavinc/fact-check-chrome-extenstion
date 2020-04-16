  
import React from 'react'
import ReactDOM from 'react-dom'
// test component
const TestComponent = () => (
  <h1>I am dynamically added!</h1>
)
window.addEventListener('load', function () {
	console.log('loaded')
  // Specifies the element we want to watch
  const watch = document.getElementById('target-test');

  // Creates a new Mutation Observer
  const observer = new MutationObserver((mutationList, observer) => {
		for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        const target = watch.querySelector('p')
        if (target) {
          app(observer, target)
        }
      }
    }
	});

  // Starts observing the child list of the element
  observer.observe(watch, {
    childList: true,
  });
});

const app = (observer, target) => {
	observer.disconnect()

  if (!document.getElementById('react-root-test')) {
    const parent = target.parentNode
    const root = document.createElement('div')
    root.setAttribute('id', 'react-root-test')

    parent.insertBefore(root, target)

    ReactDOM.render(<TestComponent />, document.getElementById('react-root-test'))
  }
};
