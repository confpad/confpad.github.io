const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const CLASS_LINE_MV = 'mv1';
const CLASS_LINE_INFO_MR = 'mr2';
const CLASS_LINE_INFO_DISPLAY = 'db dib-l';

const getTitle = (id, name, isDetail) => {
  if (isDetail) {
    return html`
      <nav class="${CLASS_LINE_MV}">
        <ul class="list ma0 pa0">
          <li class="dib mr2">
            <a href="/" class="link underline-hover f4 fw6">ConfPad</a>
          </li>
          <li class="dib mr2">
            <h2 class="ma0 f4 fw6">
              ${name}
            </h2>
          </li>
        </ul>
      </nav>
    `
  }

  return html`
    <h2 class="${CLASS_LINE_MV} f4 fw6">
      <a href="#/${id}" class="link underline-hover">${name}</a>
    </h2>
  `
};

const getDate = (from, to) => html`
  <div class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_MV} ${CLASS_LINE_INFO_MR}">
    📅
    ${from && from.toISOString().split('T')[0]}
  </div>
`;

const getLocation = location => html`
  <div class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_MV} ${CLASS_LINE_INFO_MR}">
    🌎
    ${[location.city, location.country].filter(item => item).join(', ')}
  </div>
`;

const getLink = url => html`
  <div class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_MV} ${CLASS_LINE_INFO_MR}">
    🔗
    <a href="${url}" target="_blank">
      ${url}
    </a>
  </div>
`;

const getDescription = description => html`
  <div class="mv1 ${CLASS_LINE_MV}">
    ${description}
  </div>
`;

const ConferenceListItem = props => {
  let elTag = props.isDetail ? 'div' : 'li';

  return html`
    <${elTag} class="${props.isDetail ? 'mt4 mb3' : 'mv4'}">
      ${getTitle(props.id, props.name, props.isDetail)}
      <div class="truncate">
        ${props.date && getDate(props.date.from, props.date.to)}
        ${props.location && getLocation(props.location)}
        ${props.url && getLink(props.url)}
      </div>
      ${getDescription(props.description)}
    </${elTag}>`
};

export default ConferenceListItem;
