const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

import { getConferenceDetailLink } from '../utils/links.js';

const DESCRIPTION_LIMIT = 240;

const CLASS_LINE_MV = 'mv1';
const CLASS_LINE_INFO_MR = 'mr2';
const CLASS_LINE_INFO_DISPLAY = 'db dib-l';

const getTitle = (conferenceName, link, showTitle) => {
  return html`
    <h2 class="mv1 f4 fw6 ${!showTitle && 'dn'}">
      <a href="${link}" class="link underline-hover" itemprop="url">
        <span itemprop="name">${conferenceName}</span>
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

const getDescription = (description, isDetail) => {
  let descriptionShort = description.substr(0, DESCRIPTION_LIMIT);
  let useShort = !isDetail && descriptionShort.length < description.length;

  return html`
    <div class="mv1 ${CLASS_LINE_MV} gray" itemprop="description">
      ${useShort ? `${descriptionShort}…` : description}
    </div>
  `;
};

const ConferenceInfo = props => {
  let link = getConferenceDetailLink(props.id);

  return html`
    <div itemscope itemtype="http://schema.org/Event">
      ${getTitle(props.name, link, props.showTitle)}
      <div class="truncate">
        ${props.date && getDate(props.date.from, props.date.to)}
        ${props.location && getLocation(props.location)}
        ${props.link.website && getLink(props.link.website)}
      </div>
      ${getDescription(props.description, props.isDetail)}
    </div>`
};

export default ConferenceInfo;
