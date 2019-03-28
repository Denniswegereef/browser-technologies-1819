var supportsES6 = (function() {
  try {
    new Function('(a = 0) => a')
    return true
  } catch (err) {
    return false
  }
})()

if (supportsES6) {
  let inputs = document.getElementsByTagName('input')
  let answers = document.getElementsByClassName('form-answers')[0]

  for (input of inputs) {
    input.placeholder = input.value
    input.value = ''
  }

  // Clone first node
  let cloneInput = inputs[1].cloneNode(true)

  // Get last node
  lastNode = document.getElementsByTagName('input')[inputs.length - 1]
  lastNode.addEventListener('keydown', append)

  function append() {
    this.removeEventListener('keydown', append)
    document.getElementsByClassName('form-answers')[0].appendChild(cloneInput)

    createNewListener()
  }

  function createNewListener() {
    lastNode = document.getElementsByTagName('input')[inputs.length - 1]
    lastNode.addEventListener('keydown', append)
    cloneInput = lastNode.cloneNode(true)
  }
} else {
  var inputs = document.getElementsByTagName('input')
  var answers = document.getElementsByClassName('form-answers')[0]
  var _iteratorNormalCompletion = true
  var _didIteratorError = false
  var _iteratorError = undefined

  try {
    for (
      var _iterator = inputs[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      input = _step.value
      input.placeholder = input.value
      input.value = ''
    } // Clone first node
  } catch (err) {
    _didIteratorError = true
    _iteratorError = err
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return()
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError
      }
    }
  }

  var cloneInput = inputs[1].cloneNode(true) // Get last node

  lastNode = document.getElementsByTagName('input')[inputs.length - 1]
  lastNode.addEventListener('keydown', append)

  function append() {
    this.removeEventListener('keydown', append)
    document.getElementsByClassName('form-answers')[0].appendChild(cloneInput)
    createNewListener()
  }

  function createNewListener() {
    lastNode = document.getElementsByTagName('input')[inputs.length - 1]
    lastNode.addEventListener('keydown', append)
    cloneInput
  }
}
