const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

import { getConferenceTalkLink } from '../utils/links.js';

const DESCRIPTION_LIMIT = 360;

const CLASS_LINE_MV = 'mv1';
const CLASS_LINE_INFO_MR = 'mr2';
const CLASS_LINE_INFO_MV = 'mv0 mv1-ns mv0-l';
const CLASS_LINE_INFO_DISPLAY = 'db dib-l';

const getTypeEmoji = type => {
  switch (type) {
    case 'regular':
      return html`
        <span title="regular talk">🎤</span>  
      `;
    case 'lightning':
      return html`
        <span title="lightning talk">️⚡️</span>
      `;
    case 'workshop':
      return html`
        <span title="workshop">🖐🏻</span>
      `;
  }
};

const getTitle = (title, type, link, isTalk) => html`
  <h3 class="${CLASS_LINE_MV} f4 fw6 ${isTalk && 'dn'}">
    ${getTypeEmoji(type)}
    <a href="${link}" class="link underline-hover" itemprop="url">
      <span itemprop="name">${title}</span>
    </a>
  </h3>
`;

const getTime = (time) => {
  let date = time && time.toISOString().split('T')[0];

  return html`
    <span itemprop="datePublished" content="${date}"></span>
  `;
};

const getAuthorName = name => html`
  <li class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_INFO_MV} ${CLASS_LINE_INFO_MR}">
    👤
    <span itemprop="name">${name}</span>
  </li>
`;

const getAuthorLink = (title, link, text) => html`
  <li class="${CLASS_LINE_INFO_DISPLAY} ${CLASS_LINE_INFO_MV} ${CLASS_LINE_INFO_MR}">
    ${title}:
    <a href="${link}" target="_blank" rel="noopener" class="link underline-hover" itemprop="url">${text}</a>
  </li>
`;

const getAuthorTwitter = username => {
  let title = 'Twitter';
  let link = `https://twitter.com/${username}`;
  let text = `@${username}`;

  return getAuthorLink(title, link, text);
};

const getAuthorGithub = username => {
  let title = 'GitHub';
  let link = `https://github.com/${username}`;
  let text = username;

  return getAuthorLink(title, link, text);
};

const getAuthorWebsite = url => {
  let title = 'Web';
  let link = url;
  let text = url;

  return getAuthorLink(title, link, text);
};

const getSlides = slides => html`
  <div class="${CLASS_LINE_MV} truncate">
    📝
    Slides:
    <a href="${slides}" target="_blank" rel="noopener" class="link underline-hover" itemprop="url">${slides}</a>
  </div>
`;

const getVideo = video => html`
  <div class="${CLASS_LINE_MV} truncate">
    📹
    Video:
    <a href="${video}" target="_blank" rel="noopener" class="link underline-hover" itemprop="url">${video}</a>
  </div>
`;

const getDescription = (description, isTalk) => {
  let descriptionShort = description.substr(0, DESCRIPTION_LIMIT);
  let useShort = !isTalk && descriptionShort.length < description.length;

  return html`
    <div class="${CLASS_LINE_MV} gray" itemprop="articleBody">
      ${useShort ? `${descriptionShort}…` : description}
    </div>
  `;
}

const ConferenceTalk = props => {
  let elTag = props.isTalk ? 'div' : 'li';
  let link = getConferenceTalkLink(props.conferenceId, props.id);

  return html`
    <${elTag} class="mv4" itemscope itemtype="http://schema.org/Article">
      ${getTitle(props.title, props.type, link, props.isTalk)}
      <div class="bl ml2 pl2 bw1 b--light-gray">
        ${getTime(props.time)}
        ${props.authors && props.authors.map(author => html`
          <ul class="list ma0 pa0 truncate" itemprop="author" itemscope itemtype="http://schema.org/Person">
            ${author.name && getAuthorName(author.name)}
            ${author.twitter && getAuthorTwitter(author.twitter)}
            ${author.github && getAuthorGithub(author.github)}
            ${author.website && getAuthorWebsite(author.website)}
          </ul>
        `)}
        ${props.slides && props.slides.map(slides => getSlides(slides))}
        ${props.videos && props.videos.map(video => getVideo(video))}
        ${props.description && getDescription(props.description, props.isTalk)}
      </div>
    </${elTag}>`
};

export default ConferenceTalk;
