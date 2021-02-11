;(function () {
  window.addEventListener('load', function () {
    const t = document.createElement('script')
    t.type = 'text/javascript'
    t.async = !0
    t.src = 'https://hellozest.io/widget/' + window.zestSettings.app_id
    document.body.appendChild(t)
  })
})()
