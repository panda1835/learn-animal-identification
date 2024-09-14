export const createImageSlides = (imageUrls) => {
  const breakpoints = [3840, 1920, 1080];

  function assetLink(asset, width) {
    return `https://demo.flyimg.io/upload/w_${width}/${asset}`;
  }

  const singleSlides = imageUrls.map((image) => {
    return {
      asset: image.url,
      width: image.width,
      height: image.height,
    };
  });

  const multipleSlides = singleSlides.map(({ asset, width, height }) => ({
    src: assetLink(asset, width),
    width: width,
    height: height,
    srcSet: breakpoints.map((breakpoint) => ({
      src: assetLink(asset, breakpoint),
      width: breakpoint,
      height: Math.round((height / width) * breakpoint),
    })),
  }));

  return multipleSlides;
};
