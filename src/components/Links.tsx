export interface Link {
  id: number;
  name: string;
  url: string;
}

const links: Link[] = [
  // github https://github.com/frontend-is-fun/montecarlo-pi
  // others
  {
    id: 1,
    name: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Monte_Carlo_integration',
  },
  {
    id: 2,
    name: 'GitHub',
    url: 'https://github.com/frontend-is-fun/montecarlo-pi',
  },
];

const LinksComponent = () => (
  <div className='flex flex-row items-center justify-around h-16'>
    {links.map((link) => (
      <a
        key={link.id}
        href={link.url}
        target='_blank'
        rel='noreferrer'
        className='flex flex-row items-center justify-around px-2 hover:underline'
      >
        {/* {link.icon && (
        <img
          src={link.icon}
          alt={link.name}
          className='w-6 h-6 mr-2'
        />
        )} */}
        <span>{link.name}</span>
      </a>

    ))}
  </div>
);

export default LinksComponent;
