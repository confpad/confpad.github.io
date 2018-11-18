const { h } = window.preact;

const LoadingSpinner = () => {
  return (
    h('div', { class: 'loading-spinner'}, [
      h('div', {}, 'Loading data'),
      h('div', { class: 'spinner' })
    ])
  );
};

export default LoadingSpinner;
