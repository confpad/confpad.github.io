const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

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
  }
};

const getTitle = (title, type) => html`
  <h3 class="u-epsilon u-bold">
    ${getTypeEmoji(type)}
    ${title}
  </h3>
`;

const getAuthorName = name => html`
  <div>
    👤
    ${name}
  </div>
`;

const getAuthorLink = (title, link, text) => html`
  <div>
    ${title}:
    <a href="${link}" target="_blank" class="e-link">${text}</a>
  </div>
`;

const getAuthorTwitter = username => {
  let title = 'Twitter';
  let link = `https://twitter.com/${username}`;
  let text = `@${username}`;

  return getAuthorLink(title, link, text);
};

const getAuthorGithub = username => {
  let title = 'Github';
  let link = `https://github.com/${username}`;
  let text = username;

  return getAuthorLink(title, link, text);
};

const getAuthorGooglePlus = username => {
  let title = 'Google+';
  let link = `https://plus.google.com/+${username}`;
  let text = username;

  return getAuthorLink(title, link, text);
};

const getVideo = video => html`
  <div class="u-clip">
    📹
    Video:
    <a href="${video}" target="_blank" class="e-link">${video}</a>
  </div>
`;

const getSlides = slides => html`
  <div class="u-clip">
    📝
    Slides:
    <a href="${slides}" target="_blank" class="e-link">${slides}</a>
  </div>
`;

const getDescription = descriptioin => html`
  <div class="conference-detail-item__description">
    ${descriptioin}
  </div>
`;

const ConferenceDetailItem = props => html`
  <li class="conference-detail-item o-block-list o-block-list--tight">
    ${getTitle(props.title, props.type)}
    <div class="conference-detail-item__data conference-list-item o-block-list o-block-list--tight">
      ${props.authors && props.authors.map(author => html`
        <div class="o-inline-list">
          ${author.name && getAuthorName(author.name)}
          ${author.twitter && getAuthorTwitter(author.twitter)}
          ${author.github && getAuthorGithub(author.github)}
          ${author.googleplus && getAuthorGooglePlus(author.googleplus)}
        </div>
      `)}
      ${props.videos && props.videos.map(video => getVideo(video))}
      ${props.slides && props.slides.map(slides => getSlides(slides))}
      ${props.description && getDescription(props.description)}
    </div>
  </li>
`;

export default ConferenceDetailItem;
