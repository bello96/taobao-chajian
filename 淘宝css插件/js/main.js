// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null)
  })
}

function sendMessageToContentScript(message, callback) {
  getCurrentTabId((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (callback) callback(response)
    })
  })
}

class Main {
  constructor() {
    this.init()
  }

  init() {
    // 链接
    this.addBtn = document.getElementById('addCssBtn')
    this.input = document.getElementById('cssInput')
    this.addBtn.addEventListener('click', () => {
      sendMessageToContentScript({value: this.input.value, type: 'link'})
    })

    // css样式
    this.addCssBtn = document.getElementById('cssText')
    this.cssTextarea = document.getElementById('cssTextarea')
    this.addCssBtn.addEventListener('click', () => {
      sendMessageToContentScript({value: this.cssTextarea.value, type: 'file'})
    })

    // 上传文件
    this.fileInput = document.getElementById('fileInput')
    this.fileInput.addEventListener('change', () => {
      const file = this.fileInput.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        sendMessageToContentScript({value: e.target.result, type: 'file'})
      }
      reader.readAsText(file)
    })

    // 清除
    this.clearBtn = document.getElementById('clearBtn')
    this.clearBtn.addEventListener('click', () => {
      sendMessageToContentScript({type: 'clear'})
    })
  }
}

new Main()
