
const message = document.querySelector('#message')
const encoder = document.querySelector('#encoder')
const err = document.querySelector('#error')

const results = document.querySelector('#result')
const normTexts = document.querySelector('#normtext')
const encodedMsg = document.querySelector('#encodemsg')
const refresh = document.querySelector('#refresh')

message.placeholder = 'Enter your message....'
encoder.innerHTML = 'Encoder'

encoder.addEventListener('click', function () {
  const msg = message.value
  if (!msg) {
    err.innerHTML =
      '<span class="material-symbols-outlined" style="color: red;">error</span>' +
      'Please Enter the Message'
  } else if (msg.trim().length < 50) {
    err.innerHTML =
      '<span class="material-symbols-outlined" style="color: red;">error</span>' +
      'The  message must be atleast 50 characters'
    return false
  } else {
    function encodeMessage () {
      // check condition of atleast 50 characters and gives out the normalise form

      const word = msg.replace(/[,./?^]/g, ' ').toLowerCase()
      const text = word.split(' ').join('')
      const msgLength = text.length

      const column = Math.ceil(Math.sqrt(msgLength))
      const row = Math.ceil(msgLength / column)

      let rectOne = []
      let read = []
      let resulting = ''
      rectOne = normaliseRectangle(column, row, text)

      read = pattern(rectOne, column)
      read.forEach((cols) => {
        resulting += cols.trim()
      })

      // Display the result

      normTexts.innerHTML = rectOne.join('<br/>')
      results.innerHTML = resulting
      encodedMsg.innerHTML = read.join('<br/>')

      function normaliseRectangle (column, row, text) {
        const array = []
        let firstRec = 0
        for (let i = 0; i < row; i++) {
          if (i !== 0) firstRec += column
          if (text.slice(firstRec, firstRec + column).length === column) {
            array.push(text.slice(firstRec, firstRec + column))
          } else {
            // get the remainder as spaces

            const spaces = column - text.slice(firstRec, firstRec + column).length
            const textI = text.slice(firstRec, firstRec + column)
            const str = textI + new Array(spaces + 1).join(' ')
            array.push(str)
          }
        }
        return array
      }

      function pattern (array, column) {
        const coded = []
        for (let i = 0; i < column; i++) {
          let textMain = ''
          array.forEach((re) => {
            textMain += re.slice(i, i + 1)
          })
          coded.push(textMain)
        }
        return coded
      }
    }
    encodeMessage()
  }
})

refresh.addEventListener('click', () => {
  window.location.reload()
})
