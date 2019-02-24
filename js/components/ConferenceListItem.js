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
              <span itemProp="name">${name}</span>
            </h2>
          </li>
        </ul>
      </nav>
    `
  }

  return html`
    <h2 class="${CLASS_LINE_MV} f4 fw6">
      <a href="/${id}" class="link underline-hover">
        <span itemprop="name">${name}</span>
      </a>
    </h2>
  `
};

const getDate = (from, to) => {
  let fromDate = from && from.toISOString().split('T')[0];
  let toDate = to && to.toISOString().split('T')[0];

  return html`
    <div class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_MV} ${CLASS_LINE_INFO_MR}">
      📅
      <span itemprop="startDate" content="${fromDate}">${fromDate}</span>
      <span itemprop="endDate" content="${toDate}"></span>
    </div>
  `;
};

const getLocation = location => {
  return html`
    <div class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_MV} ${CLASS_LINE_INFO_MR}">
      🌎
      <span itemprop="location" itemscope itemtype="http://schema.org/Place">
        <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
          <span itemprop="addressLocality">${location.city}</span>,
          <span itemprop="addressCountry">${location.country}</span>
        </span>
      </span>
    </div>
  `
};

const getLink = url => html`
  <div class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_MV} ${CLASS_LINE_INFO_MR}">
    🔗
    <a href="${url}" target="_blank" rel="noopener" itemprop="url">
      ${url}
    </a>
  </div>
`;

const getDescription = description => html`
  <div class="mv1 ${CLASS_LINE_MV} gray" itemprop="description">
    ${description}
  </div>
`;

const ConferenceListItem = props => {
  let elTag = props.isDetail ? 'div' : 'li';

  return html`
    <${elTag} class="${props.isDetail ? 'mt4 mb3' : 'mv4'}" itemscope itemtype="http://schema.org/Event">
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
