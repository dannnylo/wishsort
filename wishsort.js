var WishSort = {
  ajaxPages: 0,
  priceToInteger: function(text){
    text = text.replace('BRL','').replace('Gratuito','0').replace('R$','');
    text = text.replace('USD','').replace('Free','0').replace('$','');
    return parseInt(text, 10);
  },

  allProductsListed: function(){
    var noMoreItens = document.querySelectorAll("[class*=ProductGrid__NoItems]")
    return noMoreItens.length > 0
  },

  sortProducts: function (){
    var items = document.querySelectorAll("[class*=ProductGrid__FeedTileWidthWrapper]")
    var sorted = Array.prototype.slice.call(items).sort(function(prodA, prodB){
      var priceA = WishSort.priceToInteger(prodA.querySelectorAll("[class*=FeedTile__ActualPrice]")[0].innerText);
      var priceB = WishSort.priceToInteger(prodB.querySelectorAll("[class*=FeedTile__ActualPrice]")[0].innerText);
      return ((priceA < priceB) ? -1 : ((priceA > priceB) ? 1 : 0));
    });

    var itemsByRow = 4

    for (var item in sorted) {
      var itemIndex = parseInt(item, 10)
      if (!isNaN(itemIndex)){
        var row = parseInt(itemIndex / itemsByRow)
        grid = WishSort.findRow(row)
        grid.append(sorted[item])
      }
    }

    window.scrollTo(0,0);

  },
  findRow(i) {
    return document.querySelectorAll("[class*=ProductGrid__ProductGridRow]")[i]
  },

  getPages: function(limit){
    WishSort.ajaxPages += 1;
    window.scrollTo(0,99999);
    if (limit > WishSort.ajaxPages){
      setTimeout(function(){
        if (WishSort.allProductsListed()){
          setTimeout(WishSort.sortProducts, 1000);
        } else{
          WishSort.getPages(limit);
        }
      }, 1000);
    } else {
      setTimeout(WishSort.sortProducts, 1000);
    }
    return true;
  },

  sort: function(limit){
    WishSort.ajaxPages = 0;
    if (this.allProductsListed()){
      this.sortProducts();
    } else {
      this.getPages(limit);
    }
  }
}
WishSort.sortProducts()
