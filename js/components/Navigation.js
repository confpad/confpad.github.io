const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const CLASS_LINE_MV = 'mv1';

const Navigation = ({ conference, talk }) => {
  let items = [];

  // Root
  items[items.length] = html`
    <a href="/" class="link underline-hover f4 fw6">ConfPad</a>
  `;

  // Conference
  if (conference && !talk) {
    items[items.length] = html`
      <h2 class="ma0 f4 fw6">
        ${conference.name}
      </h2>
    `;
  } else if (conference) {
    items[items.length] = html`
      <h2 class="ma0 f4 fw6">
        <a href="/${conference.id}" class="link underline-hover">
          ${conference.name}
        </a>
      </h2>
    `;
  }

  // Talk
  if (talk) {
    items[items.length] = html`
      <h2 class="ma0 f4 fw6">
        ${talk.title}
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
