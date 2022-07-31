function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {

  const NORMAL_QUALITY  = 1;
  const MAX_QUALITY     = 50;
  const MIN_QUALITY     = 0;

  const SULFURAS        = 'Sulfuras, Hand of Ragnaros';
  const CONJURED        = 'Conjured Mana Cake';
  const BACKSTAGE       = 'Backstage passes to a TAFKAL80ETC concert';
  const AGED_BRIE       = 'Aged Brie';

  for (var i = 0; i < items.length; i++) {

    let item = items[i];
    let newItemQuality = item.quality;

    // "Sulfuras", being a legendary item, never has to be sold or decreases in quality
    if (item.name == SULFURAS) continue;

    // "Conjured" items degrade in quality twice as fast as normal items
    let quality = item.name == CONJURED ? 2 : NORMAL_QUALITY;

    // "Backstage passes", like aged brie, increases in quality as its sell-in value approaches; quality increases by 2
    // when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert
    if (item.name == BACKSTAGE) {
      if (item.sell_in <= 10) quality = 2;
      if (item.sell_in <= 5) quality  = 3;
    }

    // Once the sell by date has passed, quality degrades twice as fast
    if(item.sell_in < 0) quality *= 2;

    // "Aged Brie" actually increases in quality the older it gets
    if ([AGED_BRIE, BACKSTAGE].includes(item.name)) {
      newItemQuality += quality;
    } else {
      newItemQuality -= quality;
    }

    // The quality of an item is never negative
    if (newItemQuality < MIN_QUALITY) newItemQuality = MIN_QUALITY;

    // The quality of an item is never more than 50
    if (newItemQuality > MAX_QUALITY) newItemQuality = MAX_QUALITY;

    // At the end of each day our system lowers both values for every item
    item.sell_in -= 1;
    item.quality = newItemQuality;

    items[i] = item;

  }

}
