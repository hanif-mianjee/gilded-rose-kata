describe("Gilded Rose", function() {

  it("should foo", function() {
    items = [ new Item("foo", 0, 0) ];
    update_quality();
    expect(items[0].name).toEqual("foo");
  });

  it("At the end of each day our system lowers both values for every item", function() {
    items = [ new Item('Elixir of the Mongoose', 5, 5) ];
    update_quality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(4);
  });

  it("Once the sell by date has passed, quality degrades twice as fast", function() {
    items = [ new Item('Conjured Mana Cake', -1, 6) ];
    update_quality();
    expect(items[0].quality).toEqual(2);
  });

  it("The quality of an item is never negative", function() {
    items = [ new Item('Elixir of the Mongoose', 5, 0) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
  });

  it("Aged Brie and Backstage passes actually increases in quality the older it gets", function() {
    items = [
      new Item('Aged Brie', 2, 0),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
    ];
    update_quality();
    expect(items[0].quality).toEqual(1);
    expect(items[1].quality).toEqual(21);
  });

  it("The quality of an item is never more than 50", function() {
    items = [ new Item('Aged Brie', 2, 50) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  it("Sulfuras, being a legendary item, never has to be sold or decreases in quality", function() {
    items = [ new Item('Sulfuras, Hand of Ragnaros', 0, 80) ];
    update_quality();
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it("Backstage passes quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert", function() {
    items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 4, 20),
    ];
    update_quality();
    expect(items[0].quality).toEqual(22);
    expect(items[1].quality).toEqual(23);
  });

  it("Conjured items degrade in quality twice as fast as normal items", function() {
    items = [ new Item('Conjured Mana Cake', 3, 6) ];
    update_quality();
    expect(items[0].quality).toEqual(4);
  });

});
