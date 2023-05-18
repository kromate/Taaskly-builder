export default {
  minLen: 3,
  wait: 500,
  timeout: null as any,

  isUpdateItems (text:any) {
    if (text.length >= this.minLen) {
      return true
    }
  },

  callUpdateItems (text:any, cb:any) {
    clearTimeout(this.timeout)
    if (this.isUpdateItems(text)) {
      this.timeout = setTimeout(cb, this.wait)
    }
  },

  findItem (items:any, text:any, autoSelectOneResult:any) {
    if (!text) return
    if (autoSelectOneResult && items.length === 1) {
      return items[0]
    }
  }

}
