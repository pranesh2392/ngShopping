import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {

    items:ShoppingCartItem[]=[];
    constructor(public itemsMap:{[productId: string] :ShoppingCartItem}){
        for(let productId in itemsMap)
            {
                // converting object into array
                let item = itemsMap[productId];
                this.items.push(new ShoppingCartItem(item.product, item.quantity));
            }
    }

    getQuantity(product:Product)
    {
    
      let quantity = this.itemsMap[product.key].quantity;
      return (quantity) ? quantity : 0;
  
    }

    get totalQuantity()
    {
        let sum = 0;
        for (let productId in this.itemsMap)
            sum += this.itemsMap[productId].quantity; 

        return sum
    }

    get grandTotal()
    {
        // console.log(this.items);
        let sum = 0;
        for(let productId in this.items)
            {
                sum+=this.items[productId].totalPrice
            }
            return sum
    }


}