export default (url) => {
    // 创建blob对象，解析流数据

    const a = document.createElement('a')
    // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载

    const herf = url
    // 下载链接
    a.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    a.download = '导出.svg'
    document.body.appendChild(a)
    // 点击a标签，进行下载 
    a.click()
    // 收尾工作，在内存中移除URL 对象
    document.body.removeChild(a)
   }
