const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const LoadingSpinner = () => {
  return html`
    <div class="tc mv5">
      <div>Loading data…</div>
      <div class="spinner"></div>
    </div>
  `;
};

export default LoadingSpinner;
