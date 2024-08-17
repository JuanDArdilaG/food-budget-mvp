export class Food {
  constructor(
    public id: number,
    public name: string,
    public brand: string,
    public price: number,
    public quantity: number,
    public unit: string
  ) {}

  get pricePerUnit() {
    return this.price / this.quantity;
  }

  static fromType(food: TFood) {
    return new Food(
      food.id,
      food.name,
      food.brand,
      food.price,
      food.quantity,
      food.unit
    );
  }
}

export type TFood = {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  unit: string;
};
