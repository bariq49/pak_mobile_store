import ContentLoader from "react-content-loader";

const ProductCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 226 320"
    backgroundColor="#F3F6FA"
    foregroundColor="#E7ECF3"
    className="w-full h-full"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="226" height="185" />
    <rect x="0" y="200" rx="2" ry="2" width="224" height="10" />
    <rect x="0" y="235" rx="2" ry="2" width="224" height="5" />
    <rect x="0" y="255" rx="2" ry="2" width="190" height="5" />
    <rect x="0" y="275" rx="2" ry="2" width="224" height="5" />
    <rect x="0" y="295" rx="2" ry="2" width="150" height="5" />
  </ContentLoader>
);

export default ProductCardLoader;
