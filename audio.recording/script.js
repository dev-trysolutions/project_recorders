var mediaRecorder;
var recordedBlobs;

var gummAudio = document.querySelector('audio#voiceRecorder');
var recordedAudio = document.querySelector('audio#recordedVoice');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
var downloadButton = document.querySelector('button#download');
var uploadButton = document.querySelector('button#upload');

recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;
uploadButton.onclick = upload;

// get stream using getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then((stream) => {
    recordButton.disabled = false;
    console.log('getUserMedia() got stream: ', stream);
    window.stream = stream;
    gummAudio.srcObject = stream;
  })
  .catch((error) => {
    console.log('navigator.getUserMedia error: ', error);
  });

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
    uploadButton.disabled = false;
  }
}

// create the media recorder
function startRecording() {
  recordedBlobs = [];

  try {
    mediaRecorder = new MediaRecorder(window.stream);
  } catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    return;
  }
  console.log('Created MediaRecorder', mediaRecorder);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  uploadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  recordedAudio.controls = true;
}

function play() {
  var superBuffer = new Blob(recordedBlobs, { type: 'audio/mp3' });
  recordedAudio.src = window.URL.createObjectURL(superBuffer);
}

function download() {
  var blob = new Blob(recordedBlobs, { type: 'audio/mp3' });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.mp3';
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);

}

function upload() {

  var blob = new Blob(recordedBlobs, { type: 'audio/mp3' });

  var formData = new FormData();
  formData.append('audio', blob);

  xhr('upload.php', formData, function (fName) {
    console.log('uploaded')
    alert('Uploaded!')
    location.reload(true)
  });

  function xhr(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        callback(location.href + request.responseText);
      }
    };
    request.open('POST', url);
    request.send(data);
  }
}