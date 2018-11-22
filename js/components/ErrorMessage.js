const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const ErrorMessage = () => {
  return html`
    <div>
      <mark class="secondary">Error:</mark>
      <span>something nasty happened, please report it as a</span>
      <a href="https://github.com/confpad/confpad.github.io/issues" target="_blank">GitHub issue</a>
    </div>
  `;
};

export default ErrorMessage;
