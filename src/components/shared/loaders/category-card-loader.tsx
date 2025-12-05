import ContentLoader from 'react-content-loader';

const CategoryCardLoader = (props: any) => (
    <ContentLoader
        speed={2}
        width={260}
        height={260}
        viewBox="0 0 260 260"
        backgroundColor="#f9f9f9"
        foregroundColor="#ecebeb"
        {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="255" height="180" />
      <rect x="2" y="192" rx="3" ry="3" width="255" height="12" />
      <rect x="2" y="217" rx="3" ry="3" width="255" height="6" />
      <rect x="2" y="233" rx="3" ry="3" width="255" height="6" />
      <rect x="2" y="249" rx="3" ry="3" width="178" height="6" />
      <circle cx="2" cy="2" r="2" />
    </ContentLoader>
);

export default CategoryCardLoader;
