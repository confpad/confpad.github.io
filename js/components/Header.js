const { h } = window.preact;
const htm = window.htm;

const html = htm.bind(h);

const Header = () => {
  return html`
    <div class="header">
      <header>
        <a href="/" class="header__link">
          <h1>
            ⚡️ ConfPad
          </h1>
        </a>
      </header>
      <p>
        🌎 Community-currated list of tech conference talks, videos, slides and the like — from all around the world
      </p>
    </div>
  `;
};

export default Header;
