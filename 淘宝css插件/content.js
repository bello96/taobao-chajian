document.addEventListener('DOMContentLoaded', function () {
  // 创建一个link标签
  var link = document.getElementById('testMyStyle')
  if (!link) {
    var updateBtn, linkUrl;
    link = document.createElement('link')
    link.id = 'testMyStyle'
    link.rel = 'stylesheet'
    const style = document.createElement('style')
    document.body.appendChild(style)
    document.head.appendChild(link)
    // 监听谷歌插件发来的消息
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request?.type === 'file') {
        link.href = ''
        style.innerHTML = request.value
        if(updateBtn) {
          document.body.removeChild(updateBtn)
          updateBtn = null
        }
      } else if (request?.type === 'link') {
        style.innerHTML = ''
        linkUrl = request.value
        link.href = request.value
        updateCssLink();
      } else if (request?.type === 'clear') {
        style.innerHTML = ''
        link.href = ''
        if(updateBtn) {
          document.body.removeChild(updateBtn)
          updateBtn = null
        }
      }
    })

    // 添加更新按钮
    function updateCssLink() {
      if(updateBtn) return;
      updateBtn = document.createElement('button')
      updateBtn.innerText = '更新样式'
      updateBtn.style.position = 'fixed'
      updateBtn.style.bottom = '10px'
      updateBtn.style.right = '10px'
      updateBtn.style.zIndex = '9999'
      updateBtn.style.backgroundColor = '#f40'
      updateBtn.style.color = 'white'
      updateBtn.style.border = 'none'
      updateBtn.style.padding = '10px 20px'
      updateBtn.style.cursor = 'pointer'
      updateBtn.style.borderRadius = '5px'
      updateBtn.addEventListener('click', function () {
        link.href = linkUrl + '?t=' + Date.now()
      })
      document.body.appendChild(updateBtn)
    }
  }
})
