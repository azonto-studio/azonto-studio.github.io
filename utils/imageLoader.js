
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };
  
  const backgroundImages = importAll(require.context('@/assets/backgrounds', false, /\.(jpg|jpeg|png)$/));
  
  const categoryImages = {
    cununie: importAll(require.context('@/assets/categories/cununie', false, /\.(jpg|jpeg|png|webp)$/)),
    nunta: importAll(require.context('@/assets/categories/nunta', false, /\.(jpg|jpeg|png|webp)$/)),
    familie: importAll(require.context('@/assets/categories/familie', false, /\.(jpg|jpeg|png|webp)$/)),
    botez: importAll(require.context('@/assets/categories/botez', false, /\.(jpg|jpeg|png|webp)$/)),
  };
  
  export { backgroundImages, categoryImages };
  