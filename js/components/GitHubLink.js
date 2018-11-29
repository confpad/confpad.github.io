const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const GitHubLink = props => {
  let { conferenceId } = props;

  let link = `https://github.com/confpad/confpad.github.io/blob/master/data/conferences/${conferenceId}.yaml`;

  return html`
    <div class="c-notice c-notice--small c-notice--success">
      <span>This page was generated from <a href="${link}" target="_blank">this YAML</a>. Found a typo, want to add some data? Just edit it on GitHub.</span>
    </div>
  `;
};

export default GitHubLink;
