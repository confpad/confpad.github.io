const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const ErrorMessage = props => {
  let { message } = props;

  let title = encodeURIComponent(message || '');
  let body = encodeURIComponent(`Location: ${window.location.href}`);
  let url = `https://github.com/confpad/confpad.github.io/issues/new?title=${title}&body=${body}`;

  return html`
    <div class="br2 mv3 pa3 dark-red bg-washed-red" role="alert">
      <h3 class="ma0 f4 fw6">Error!</h3>
      
      <div class="mv3">
        Something nasty happened, please report it as a
        <a href="${url}" target="_blank" rel="noopener" class="link underline dark-red">GitHub issue</a>.
      </div>
      
      ${message && html`
        <div class="mv3">
          <strong>Details:</strong>
          ${message}
        </div>
      `}
    </div>
  `;
};

export default ErrorMessage;
