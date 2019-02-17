const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const getTitle = (id, name, isDetail) => {
  if (isDetail) {
    return html`
      <nav class="c-breadcrumbs u-delta">
        <ul class="c-breadcrumbs__list">
          <li class="c-breadcrumbs__item u-bold">
            <a href="/" class="e-link">ConfPad</a>
          </li>
          <li class="c-breadcrumbs__item">
            <h2 class="u-bold">
              ${name}
            </h2>
          </li>
        </ul>
      </nav>
    `
  }

  return html`
    <h2 class="u-delta u-bold">
      <a href="#/${id}" class="e-link">${name}</a>
    </h2>
  `
};

const getLink = url => html`
  <div class="u-clip">
    🔗
    <a href="${url}" target="_blank" class="e-link e-link--no-area">
      ${url}
    </a>
  </div>
`;

const getDate = (from, to) => html`
  <div class="u-clip">
    📅
    ${from && from.toISOString().split('T')[0]}
    -
    ${to && to.toISOString().split('T')[0]}
  </div>
`;

const getLocation = location => html`
  <div class="u-clip">
    🌎
    ${[location.city, location.country].filter(item => item).join(', ')}
  </div>
`;

const getDescription = description => html`
  <div class="conference-list-item__description">
    ${description}
  </div>
`;

const ConferenceListItem = props => {
  let elTag = props.isDetail ? 'div' : 'li';

  return html`
    <${elTag} class="conference-list-item o-block-list o-block-list--tight">
      ${getTitle(props.id, props.name, props.isDetail)}
      <div class="o-inline-list">
        ${props.date && getDate(props.date.from, props.date.to)}
        ${props.location && getLocation(props.location)}
        ${props.url && getLink(props.url)}
      </div>
      ${getDescription(props.description)}
    </${elTag}>`
};

export default ConferenceListItem;
