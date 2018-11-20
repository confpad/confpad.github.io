const { h } = window.preact;

const getTitle = (id, name, isDetail) => {
  return h('h2', {}, [
      isDetail && h('span', {}, [
        h('a', { href: `/` }, 'ConfPad'),
        h('span', { class: 'conference-list-item__separator'}, ' > '),
        h('span', {}, name),
      ]),
      !isDetail && h('a', { href: `/${id}` }, name),
    ]
  );
};

const getLink = url => {
  return h('a',
    {
      href: url,
      target: '_blank',
      class: 'conference-list-item__wrapper',
    },
    `🔗 ${url}`
  );
};

const getDate = (from, to) => h('span', { class: 'conference-list-item__wrapper' }, `📅 ${from.toISOString().split('T')[0]} - ${to.toISOString().split('T')[0]}`);

const getLocation = location => h('span', { class: 'conference-list-item__wrapper' }, `🌎 ${Object.values(location).join(', ')}`);

const getDescription = description => h('div', { class: 'conference-list-item__description' }, description);

const ConferenceListItem = (props) => {
  return (
    h('div', { class: 'conference-list-item' },
      [
        getTitle(props.id, props.name, props.isDetail),
        h('p', {}, [
          h('div', { class: 'conference-list-item__infoline' },
            [
              getDate(props.date.from, props.date.to),
              getLocation(props.location),
              getLink(props.url)
            ],
          ),
          h('div', {}, getDescription(props.description)),
        ]),
      ]
    )
  );
};

export default ConferenceListItem;
