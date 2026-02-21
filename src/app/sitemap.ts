import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://web3toolkit.app';

  const routes = [
    '',
    '/about',
    '/automator',
    '/tools',
    '/tools/genseedphrase',
    '/tools/genkeypair',
    '/tools/getaddrfromseed',
    '/tools/getaddrkeysfromseed',
    '/tools/getaddrfromkey',
    '/tools/weiconverter',
    '/tools/isvalidseed',
    '/tools/isvalidaddress',
    '/tools/getbalances',
    '/tools/getbalancesperblock',
    '/tools/drainfunds',
    '/tools/getblock',
    '/tools/gettransaction',
    '/tools/tokeninfo',
    '/tools/ensresolver',
    '/tools/exportwallet',
    '/tools/importwallet',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/tools' ? 0.9 : 0.7,
  }));
}
