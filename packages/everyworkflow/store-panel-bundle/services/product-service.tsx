import data from "./mock-product.json";

// this is just for demo ...this will be deleted later
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getMockProducts = async (length = 10) => {
  return shuffleArray(data.products).slice(0, length);
};

export default getMockProducts;
