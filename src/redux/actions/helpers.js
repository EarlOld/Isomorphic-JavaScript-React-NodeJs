const defaultParams = {
  separator: '/',
  successPrefix: 'SUCCESS',
  failPrefix: 'FAIL',
  modulePrefix: '__'
}

const genActionType = (initialParams = {}) => {
  const newInitialParams = Object.assign({}, defaultParams, initialParams)

  return (type, params) => {
    const newParams = Object.assign({}, newInitialParams, params)

    const {
      success,
      prefix,
      postfix,
      module,
      separator,
      successPrefix,
      failPrefix,
      modulePrefix
    } = newParams

    let result = ''

    if (prefix) result += prefix + separator

    if (module) result += modulePrefix + module + separator

    if (success === true) result += successPrefix + separator
    else if (success === false) result += failPrefix + separator

    result += type

    if (postfix) result += postfix

    return result
  }
}

const actionCreatorFn = (type, payload) => {
  const action = { type }

  if (payload !== undefined) action.payload = payload
  return action
}

const genActionCreators = (creators) => {
  const creatorsKeys = Object.keys(creators)

  return creatorsKeys.reduce((acc, curr) => {
    let result = (...args) => actionCreatorFn(creators[curr], ...args)

    const isActionStatefull = typeof creators[curr] === 'object' &&
      !Array.isArray(creators[curr]) &&
      creators[curr].default

    if (isActionStatefull) {
      result = (config) => {
        let payload
        let type = creators[curr].default

        if (typeof config === 'object' && !Array.isArray(config)) {
          payload = config.payload

          if (config.success === true) type = creators[curr].success
          else if (config.success === false) type = creators[curr].failure
        } else payload = config

        const action = { type }

        if (payload !== undefined) action.payload = payload

        return action
      }
    }

    return Object.assign({}, acc, { [curr]: result })
  }, {})
}

const helpers = {
  genActionType,
  genActionCreators
}

export {
  helpers as default,

  genActionType,
  genActionCreators
}
