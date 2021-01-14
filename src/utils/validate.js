/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validPassword(rule, value, callback, _this) {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (value && (value.length < 3 || value.length > 16)) {
    callback(new Error('请输入3~16位长度的密码'))
  } else {
    callback()
  }
}

export function validCheckPass(rule, value, callback, _this) {
  if (!value) {
    callback(new Error('请再次输入密码'))
  } else if (value !== _this.userForm.new_password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
