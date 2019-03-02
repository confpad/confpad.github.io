import {REGEX_URL_VIMEO, REGEX_URL_YOUTUBE} from "../utils/utils.js";

const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const ConferenceTalkVideo = ({ url }) => {
  let match;

  // YouTube
  match = url.match(REGEX_URL_YOUTUBE);
  if (match) {
    let videoId = match[1];

    return html`
      <div class="mv3 w-100 aspect-ratio aspect-ratio--16x9 bg-light-gray">
        <iframe class="aspect-ratio--object" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
  }

  // Vimeo
  match = url.match(REGEX_URL_VIMEO);
  if (match) {
    let videoId = match[1];

    return html`
      <div class="mv3 w-100 aspect-ratio aspect-ratio--16x9 bg-light-gray">
        <iframe class="aspect-ratio--object" src="https://player.vimeo.com/video/${videoId}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </div>
    `;
  }
};

export default ConferenceTalkVideo;
