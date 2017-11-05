const video = document.querySelector('.js-video')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let localMediaStream

const videoOptions = {
  width: { min: 1024, ideal: 1280, max: 1920 },
  height: { min: 776, ideal: 720, max: 1080 }
}

// MediaDevicesインターフェイスのgetUserMedia()メソッドを利用してカメラへのアクセスを取得
// boolean値以外にも、オプション指定することが可能
// SSLかlocalhostのみ動作
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(mediaStream => {
    // MediaStreamオブジェクトを取得したら、オブジェクトURLを取得し<video>に反映
    video.src = window.URL.createObjectURL(mediaStream)
    localMediaStream = mediaStream
  }).catch(e => {
    alert(JSON.stringify(e))
  })

function takeSnapshot() {
  if (localMediaStream) {
    const w = video.offsetWidth
    const h = video.offsetHeight
    canvas.setAttribute('width', w)
    canvas.setAttribute('height', h)
    ctx.drawImage(video, 0, 0, w, h)
    document.querySelector('img').src = canvas.toDataURL('image/webp')
  }
}
video.addEventListener('click', takeSnapshot, false)
