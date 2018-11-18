const { h } = window.preact;

const getTitle = () => {
  return h('div', { class: 'header' },
    [
      h('header', {},
        h('a', { class: 'header__link', href: '/' },
          h('h1', { class: 'header__title' }, '🎤 ⚡️ ConfPad')
        )
      ),
      h('p', { class: 'info' }, '🌎 Community-currated list of tech conference talks, videos, slides etc. from all around the world')
    ]
  );
};

const Header = () => {
  return (
    h('div', {}, getTitle())
  );
};

export default Header;
