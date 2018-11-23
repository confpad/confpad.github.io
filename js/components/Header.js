const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const Header = () => {
  return html`
    <header class="header u-quarter-spacing">
      <a href="/" class="header__link e-link">
        <h1 class="e-heading u-gamma">
          ⚡️ ConfPad
        </h1>
      </a>
      <div>
        🌎 Community-currated list of tech conference talks, videos, slides and the like — from all around the world
      </div>
    </header>
  `;
};

export default Header;
