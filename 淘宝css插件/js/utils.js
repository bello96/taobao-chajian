/** 添加缓存 */ 
function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify({data: value}));
  } catch (error) {
    
  }
}

// 获取缓存
function getStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value)?.data : null
  } catch (error) {
    return null
  }
}

// 清除缓存
function clearStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {

  }
}
