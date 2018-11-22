const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const getTitle = (id, name, isDetail) => {
  if (isDetail) {
    return html`
      <h2>
        <span>
          <a href="/">ConfPad</a>
          <span class="conference-list-item__separator">&gt;</span>
          <span>${name}</span>
        </span>
      </h2>
    `
  }

  return html`
    <h2>
      <a href="/${id}">${name}</a>
    </h2>
  `
};

const getLink = url => html`
  <span class="conference-list-item__wrapper">
    🔗
    <a href="${url}" target="_blank" class="conference-list-item__wrapper">
      ${url}
    </a>
  </span>
`;

const getDate = (from, to) => html`
  <span class="conference-list-item__wrapper">
    📅
    ${from && from.toISOString().split('T')[0]}
    -
    ${to && to.toISOString().split('T')[0]}
  </span>
`;

const getLocation = location => html`
  <span class="conference-list-item__wrapper">
    🌎
    ${Object.values(location).join(', ')}
  </span>
`;

const getDescription = description => html`
  <div class="conference-list-item__description">
    ${description}
  </div>
`;

const ConferenceListItem = props => html`
  <div class="conference-list-item">
    ${getTitle(props.id, props.name, props.isDetail)}
    <p>
      <div class="conference-list-item__infoline">
        ${props.date && getDate(props.date.from, props.date.to)}
        ${props.location && getLocation(props.location)}
        ${props.url && getLink(props.url)}
      </div>
      <div>
        ${getDescription(props.description)}
      </div>
    </p>
  </div>
`;

export default ConferenceListItem;
