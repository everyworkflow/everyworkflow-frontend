class CommonUtility {
  constructor() {}

  public static formatPrice(price: string) {
    return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default CommonUtility;
