import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://parkett-pflege.ch';

  const staticPages = [
    '',
    '/leistungen',
    '/problemfaelle',
    '/kosten',
    '/ratgeber',
    '/zuerich',
    '/faelle',
    '/faq',
    '/blog',
    '/kontakt',
    '/tools/fotoanalyse-parkett',
    '/tools/parkett-kostenrechner',
    '/quiz/muss-mein-parkett-geschliffen-werden',
    '/quiz/welche-parkettpflege-brauche-ich',
    '/impressum',
    '/datenschutz',
  ];

  const serviceSlugs = [
    'parkett-reinigen-zuerich',
    'parkett-oelen-zuerich',
    'parkett-schleifen-zuerich',
    'parkett-reparieren-zuerich',
    'parkett-versiegeln-zuerich',
    'parkett-auffrischen-zuerich',
  ];

  const problemSlugs = [
    'wasserflecken-parkett',
    'hundekratzer-parkett',
    'schwarze-flecken-parkett',
    'parkett-grau-und-stumpf',
    'parkett-quillt-auf',
    'tiefe-kratzer-parkett',
    'laufstrassen-parkett',
    'parkett-nach-falscher-reinigung',
  ];

  const costSlugs = [
    'parkett-schleifen-kosten',
    'parkett-oelen-kosten',
    'parkett-reparatur-kosten',
    'parkett-reinigung-kosten',
  ];

  const guideSlugs = [
    'geoeltes-parkett-richtig-pflegen',
    'lackiertes-parkett-pflegen',
    'parkett-oelen-oder-versiegeln',
    'parkett-schleifen-oder-reinigen',
    'dampfreiniger-auf-parkett',
    'parkettpflege-im-winter',
  ];

  const locationSlugs = [
    'parkettpflege-zuerich',
    'parkett-schleifen-zuerich',
    'parkett-reparieren-zuerich',
    'parkettpflege-winterthur',
    'parkettpflege-uster',
    'parkettpflege-duebendorf',
  ];

  const caseSlugs = [
    'wasserfleck-parkett-zuerich-seefeld',
    'hundekratzer-parkett-zuerich-wiedikon',
    'laufstrasse-parkett-zuerich-enge',
    'graues-parkett-zuerich-altstetten',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages
  staticPages.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Add dynamic services
  serviceSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/leistungen/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add dynamic problems
  problemSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/problemfaelle/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add dynamic costs
  costSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/kosten/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  // Add dynamic guides
  guideSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/ratgeber/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add dynamic locations
  locationSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/zuerich/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  // Add dynamic cases
  caseSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/faelle/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  return sitemapEntries;
}
