const { h } = window.preact;

const ErrorMessage = () => {
  return (
    h('div', {}, [
      h('mark', { class: 'secondary' }, 'Error:'),
      h('span', {}, ' something nasty happened, please report it as a '),
      h('a', { href: 'https://github.com/confpad/confpad.github.io/issues', }, 'GitHub issue')
    ])
  );
};

export default ErrorMessage;
