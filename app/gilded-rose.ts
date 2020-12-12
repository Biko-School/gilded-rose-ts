
export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items; 
    }

    isBackStage(item: Item): Boolean {
        return item.name == 'Backstage passes to a TAFKAL80ETC concert'
    }

    isAgedBrie(item: Item): Boolean {
        return item.name == 'Aged Brie'
    }

    isSulfuras(item: Item): Boolean {
        return item.name == 'Sulfuras, Hand of Ragnaros'
    }

    isConjured(item: Item): Boolean{
        return item.name.includes('Conjured')
    }

    updateItemSellIn(item: Item): Item{
        item.sellIn -= 1
        return item
    }

    calculateQualityDrop(item: Item): number{
        if(item.sellIn < 0){
            return -2
        }else{
            return -1
        }
    }
    
    capMaxItemQuality(item: Item): Item {
        let updatedItem = item

        if(updatedItem.quality >= 50){
            updatedItem.quality = 50
        }
        return updatedItem
    }
    
    capMinItemQuality(item: Item): Item {
        let updatedItem = item

        if(updatedItem.quality < 0){
            updatedItem.quality = 0
        }
        return updatedItem
    }

    updateBackstageItem(item: Item): Item{
        let updatedItem = item
        item = this.updateItemSellIn(item)

        if(item.sellIn <= 5){
            updatedItem.quality += 3

        }else if(item.sellIn <= 10){
            updatedItem.quality += 2
        }

        if(item.sellIn < 0){
            updatedItem.quality = 0
        }
        return updatedItem
    }

    updateAgedBrie(item: Item): Item {
        let updatedBrie = item
        updatedBrie = this.updateItemSellIn(updatedBrie)
        if(updatedBrie.sellIn < 0){
            updatedBrie.quality += 2
        } else{
            updatedBrie.quality += 1
        }
        return updatedBrie
    }

    updateSulfuras(item: Item): Item {
        let updatedItem = item
        return updatedItem
    }   

    updateDefaultItem(item: Item): Item {
        let updatedItem = item
        updatedItem = this.updateItemSellIn(updatedItem)
        updatedItem.quality += this.calculateQualityDrop(updatedItem)
        return updatedItem
    }

    updateConjuredItem(item: Item): Item {
        let updatedItem = item
        updatedItem = this.updateItemSellIn(updatedItem)
        updatedItem.quality += this.calculateQualityDrop(updatedItem) * 2
        return updatedItem
    }


    updateQuality() {

        let updatedItems = this.items.map(currentItem => {
            let updatedItem = currentItem

            if(this.isBackStage(updatedItem)){
                updatedItem = this.updateBackstageItem(updatedItem)

            }else if (this.isAgedBrie(updatedItem)){
                updatedItem = this.updateAgedBrie(updatedItem)

            }else if (this.isSulfuras(updatedItem)){
                updatedItem = this.updateSulfuras(updatedItem)
                
            }else if (this.isConjured(updatedItem)){
                updatedItem = this.updateConjuredItem(updatedItem)

            }else {
                updatedItem = this.updateDefaultItem(updatedItem)
            }
            
            if(!this.isSulfuras(updatedItem)){
                updatedItem = this.capMaxItemQuality(updatedItem)
            }
            updatedItem = this.capMinItemQuality(updatedItem)
            return updatedItem
        })

        this.items = updatedItems
        return this.items;
    }
}
