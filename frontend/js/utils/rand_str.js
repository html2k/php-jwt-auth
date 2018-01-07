export { rand_str }

function rand_str(len) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#€%&/()=?`©@£$∞§|[]≈±¶©^¨*',
      rand_str = ''

  for (var i = 0; i < len; i++) {
    var rand_poz = Math.floor(Math.random() * chars.length)
    rand_str += chars.substring(rand_poz, rand_poz + 1)
  }

  return rand_str
}