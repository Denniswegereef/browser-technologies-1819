if (window.WebSocket) {
  let results = document.getElementsByClassName('result')[0]
  console.log(results)

  const socket = io()
  console.log('websocket avaliable')

  // LISTEN!!!!@:@:!@!@!@!@!@
  socket.on('updateData', data => {
    console.log('CHANGE')

    results.innerHTML = data.html
  })
} else {
  console.log('Websockets are not supported')
}
