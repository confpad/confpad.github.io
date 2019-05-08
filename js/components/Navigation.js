const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const CLASS_LINE_MV = 'mv1';

const Navigation = ({conferenceId, conferenceData, talkData}) => {
  let items = [];

  // Root
  items[items.length] = html`
    <a href="/" class="link underline-hover f4 fw6">ConfPad</a>
  `;

  // Conference
  if (conferenceData && !talkData) {
    items[items.length] = html`
      <h2 class="ma0 f4 fw6">
        ${conferenceData.name}
      </h2>
    `;
  } else if (conferenceData) {
    items[items.length] = html`
      <h2 class="ma0 f4 fw6">
        <a href="/${conferenceId}" class="link underline-hover">
          ${conferenceData.name}
        </a>
      </h2>
    `;
  }

  // Talk
  if (talkData) {
    items[items.length] = html`
      <h2 class="ma0 f4 fw6">
        ${talkData.title}
      </h2>
    `;
  }

  return html`
    <nav class="${CLASS_LINE_MV}">
      <ul class="list ma0 pa0 navlist">
        ${items.map(item => html`
          <li class="dib navlist__item">
            ${item}
          </li>
        `)}
      </ul>
    </nav>
  `;
};

export default Navigation;
