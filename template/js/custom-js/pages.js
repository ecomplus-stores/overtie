// Add your custom JavaScript for storefront pages here.
document.addEventListener("DOMContentLoaded", function() {
  $(`#mobile-search-btn`).click(function(){
    $(`.header__search-input`).focus()
  })
});