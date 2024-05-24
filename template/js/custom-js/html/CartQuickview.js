import {
  i19checkout,
  i19close,
  i19continueShopping,
  i19emptyCart,
  i19myShoppingCart,
  i19seeCart,
  i19subtotal
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import ALink from '@ecomplus/storefront-components/src/ALink.vue'
import ABackdrop from '@ecomplus/storefront-components/src/ABackdrop.vue'
import APrices from '@ecomplus/storefront-components/src/APrices.vue'
import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'
import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'

export default {
  name: 'CartQuickview',

  components: {
    ALink,
    ABackdrop,
    APrices,
    CartItem,
    ShippingCalculator
  },

  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    hasShippingCalculator: Boolean,
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    },
    canOpenOnNewItem: {
      type: Boolean,
      default: true
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    }
  },

  data () {
    return {
      selectedShippingPrice: 0
    }
  },

  computed: {
    i19checkout: () => i18n(i19checkout),
    i19close: () => i18n(i19close),
    i19continueShopping: () => i18n(i19continueShopping),
    i19emptyCart: () => i18n(i19emptyCart),
    i19myShoppingCart: () => i18n(i19myShoppingCart),
    i19seeCart: () => i18n(i19seeCart),
    i19subtotal: () => i18n(i19subtotal),

    cart () {
      return this.ecomCart.data
    },

    total () {
      return this.cart.subtotal + this.selectedShippingPrice
    },

    uniqueKitProducts(){
      const uniqueKitIds = new Set();
      let i = this.cart.items.filter(item => {
        if (item.kit_product) {
          if (!uniqueKitIds.has(item.kit_product._id)) {
            uniqueKitIds.add(item.kit_product._id);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      return i
    },
    nonKitProducts(){
       return this.cart.items.filter(item => !item.kit_product);    }
  },

  methods: {
    formatMoney,
    

    toggle (isVisible) {
      this.$emit(
        'update:is-visible',
        typeof isVisible === 'boolean' ? isVisible : !this.isVisible
      )
    },

    selectShippingService (service) {
      this.selectedShippingPrice = service.shipping_line
        ? service.shipping_line.total_price
        : 0
    },

    
  },

  created () {
    if (this.canOpenOnNewItem) {
      this.ecomCart.on('addItem', ({ data }) => {
        this.$set(this.ecomCart, 'data', data)
        this.$nextTick(() => {
          this.toggle(true)
        })
      })
    }

    
    
   
    
  }
}