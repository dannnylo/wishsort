var WishSort = {
  priceToInteger: function(text){
    text = text.replace('BRL','').replace('Gratuito','0').replace('R$','');
    text = text.replace('USD','').replace('Free','0').replace('$','');
    return parseInt(text, 10);
  },

  sortProducts: function (){
    var items = document.querySelectorAll("[class*=ProductGrid__FeedTileWidthWrapper]")
    var sorted = Array.prototype.slice.call(items).sort(function(prodA, prodB){
      var priceA = WishSort.priceToInteger(prodA.querySelectorAll("[class*=FeedTile__ActualPrice]")[0].innerText);
      var priceB = WishSort.priceToInteger(prodB.querySelectorAll("[class*=FeedTile__ActualPrice]")[0].innerText);
      return ((priceA < priceB) ? -1 : ((priceA > priceB) ? 1 : 0));
    });

    for (var item in sorted) {
      var itemIndex = parseInt(item, 10)

      if (!isNaN(itemIndex)){
        item.style = "border: 1px solid red";
        grid = WishSort.findRow(parseInt(itemIndex / 4))
        grid.append(sorted[item])
      }
    }
  },
  findRow(i) {
    return WishSort.findByClass('ProductGrid__ProductGridRow')[i]
    // return WishSort.findByClass('TabBarWrapper__Wrapper')[0]
  },
  findByClass(name){
    return document.querySelectorAll("[class*=" + name + "]")
  }
}

var button = document.createElement('button');
button.innerText = 'Sort';
button.onclick = function() { WishSort.sortProducts(); }
WishSort.findByClass('Navbar__Right')[0].append(button)
