interface PageHeadProps {
  title: string;
  description?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
}

const PageHead = ({
  title,
  description,
  keywords = [],
  type = 'website',
  image,
  noindex = false,
}: PageHeadProps) => {
  const siteTitle = 'Movie Explorer';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} data-react-helmet="true" />
      {/* Basic metadata */}
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Search engine directives */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph metadata */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
};

export default PageHead;
