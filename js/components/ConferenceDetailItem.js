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
  <h3 class="conference-detail-item__title">
    ${getTypeEmoji(type)}
    ${title}
  </h3>
`;

const getAuthorName = name => html`
  <span class="conference-detail-item__wrapper">
    👤
    ${name}
  </span>
`;

const getAuthorLink = (title, link, text) => html`
  <span class="conference-detail-item__wrapper">
    ${title}:
    <a href="${link}" target="_blank">${text}</a>
  </span>
`;

const getAuthorTwitter = username => {
  let title = 'Twitter';
  let link = `https://twitter.com/${username}`;
  let text = `@${username}`;

  return getAuthorLink(title, link, text);
};

const getAuthorGithub = username => {
  let title = 'Twitter';
  let link = `https://github.com/${username}`;
  let text = username;

  return getAuthorLink(title, link, text);
};

const getVideo = video => html`
  <p class="conference-detail-item__wrapper">
    📹
    Video:
    <a href="${video}" target="_blank">${video}</a>
  </p>
`;

const getSlides = slides => html`
  <p class="conference-detail-item__wrapper">
    📝
    Slides:
    <a href="${slides}" target="_blank">${slides}</a>
  </p>
`;

const getDescription = descriptioin => html`
  <p class="conference-detail-item__wrapper">
    ${descriptioin}
  </p>
`;

const ConferenceDetailItem = props => html`
  <div class="conference-detail-item">
    ${getTitle(props.title, props.type)}
    ${props.authors && props.authors.map(author => html`
      <p class="conference-detail-item__author">
        ${author.name && getAuthorName(author.name)}
        ${author.twitter && getAuthorTwitter(author.twitter)}
        ${author.github && getAuthorGithub(author.github)}
      </p>
    `)}
    ${props.videos && props.videos.map(video => getVideo(video))}
    ${props.slides && props.slides.map(slides => getSlides(slides))}
    ${props.description && getDescription(props.description)}
  </div>
`;

export default ConferenceDetailItem;
