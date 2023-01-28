import LinkedList from "./LinkedList.js"

const ll = new LinkedList()
const stack = []
const queue = []
const sendButton = document.querySelector("button.send")
const restartButton = document.querySelector("button.restart")
const input = document.querySelector("input")
const ulElement = document.querySelector("ul")
const noDataMessage = "Няма данни"

function handleSubmitNumber(number) {
  ll.insertAtHead(number)
}

restartButton.addEventListener('click', function(){
    window.location.reload()
})

sendButton.addEventListener("click", function () {
  const { valueAsNumber } = input

  if (!checkInputPattern(valueAsNumber)) return

  handleSubmitNumber(valueAsNumber)
  input.value = ""

  checkForZero()
})

function checkForZero() {
  const head = ll.getByIndex(0)

  if (ll.search(head, 0)) {
    sendButton.setAttribute("disabled", true)
    restartButton.removeAttribute("disabled")
    pushNumberSendingWithSevenInStack()
    pushPrimeNumbersInQueue()
  }
}

function pushNumberSendingWithSevenInStack() {
  //Този броят се слага, защото при премахване от списъка, елементите на масива и на списъка вече са разлиен брой, т.е с различни индекси за един и същи елемент.
  let removedNumbersCounter = 0
  linkedListToArray(ll.getHead()).map((n, i) => {
    if (n % 10 === 7) {
      ll.removeAtIndex(i - removedNumbersCounter)
      stack.push(n)
      removedNumbersCounter++
    }
  })
}

function pushPrimeNumbersInQueue() {
  linkedListToArray(ll.getHead()).map((n, i) => {
    if (isPrime(n)) queue.push(n)
  })

  appendData("queue", queue.length ? queue : noDataMessage)
  appendData("stack", stack.length ? stack : noDataMessage)
  appendData("linked-list", ll.get())
}

function appendData(name, data) {
  ulElement.querySelector(`[data-name="${name}"] b`).innerHTML = data
}

function checkInputPattern(value) {
  if (value === 0) {
    return true
  }
  if (isFloat(value)) {
    alert("Моля, въведете цяло число.")
    return false
  }
  if (!value) {
    alert("Моля, въведете стойност.")
    return false
  }
  if (!String(value).length) {
    alert("Моля, въведете стойност.")
    return false
  }
  if (value < 0) {
    alert("Моля, въведете положително число.")
    return false
  }

  return true
}

function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false
  }

  return num > 1
}

function isFloat(num) {
  return num === +num && num !== (num | 0)
}

function linkedListToArray(list) {
  let current = list
  const array = []

  while (!!current) {
    array.push(current.value)
    current = current.next
  }

  return array
}
