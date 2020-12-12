import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should decrease sellIn one day", function () {
    const gildedRose = new GildedRose([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
  });

  it("should decrease quality one day", function () {
    const gildedRose = new GildedRose([new Item("foo", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
    const secondItems = new GildedRose(items).updateQuality()
    expect(secondItems[0].quality).toEqual(7)
  });

  it("quality should never be negative", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  
  
  it("Aged Brie actually increases in Quality the older it gets", function () {
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("Aged Brie increases double in quality after sell date", function () {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });
  
  it("Item quality is never more than 50", function () {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });
    
  it("If item is Sulfuras quality and sellin date should not change", function () {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(5)
  });
    
  it("Backstage passes' quality increases by 2 when there are 10 days or less left for the concert", function () {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(7)
  });
    
  it("Backstage passes' quality increases by 3 when there are 5 days or less left for the concert", function () {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8)
  });

  it("Backstage passes' quality is 0 when sellin date is due", function () {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0)
  });    
   
  it("Conjured items lose quality twice as fast", function () {
    const gildedRose = new GildedRose([new Item("Conjured foo", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3)
    const secondItems = new GildedRose(items).updateQuality()
    expect(secondItems[0].quality).toEqual(0)
  }); 
 
});
