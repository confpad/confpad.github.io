const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const ErrorMessage = () => {
  return html`
    <div class="c-notice c-notice--error" role="alert">
    <div class="c-notice__content">
        <h5 class="e-heading u-epsilon">Error!</h5>
        <div>
          Something nasty happened, please report it as a
          <a href="https://github.com/confpad/confpad.github.io/issues" target="_blank" class="e-link">GitHub issue</a>.
        </div>
    </div>
  `;
};

export default ErrorMessage;
