var data = {
  '/': {
    title: 'Dev',
    links: [
      {
        text: 'Work',
        link: '/work'
      },
      {
        text: 'Ideas',
        link: '/ideas'
      },
      {
        text: 'Connect',
        link: '/connect'
      }
    ]
  },
  '/work': {
    title: 'Work',
    prev: '/',
    links: [
      {
        text: 'Edusight',
        link: 'https://www.edusight.co'
      }
    ]
  },
  '/ideas': {
    title: 'Ideas',
    prev: '/',
    links: [
      {
        text: 'Optimize Aid',
        link: 'https://www.medium.com'
      }
    ]
  },
  '/connect': {
    title: 'Connect',
    prev: '/',
    links: [
      {
        text: 'LinkedIn',
        link: 'https://linkedin.com/in/chakrabortydev'
      }
    ]
  }
};

var routes = [];
for (var key in data) {
  routes.push(key);
}

routes = routes.sort();

module.exports = {
  routes: routes,
  attributes: data
};
