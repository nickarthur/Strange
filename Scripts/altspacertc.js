// Compat
const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection ||
                       window.webkitRTCPeerConnection || window.msRTCPeerConnection;

const RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription ||
                       window.webkitRTCSessionDescription || window.msRTCSessionDescription;

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia ||
                       navigator.webkitGetUserMedia || navigator.msGetUserMedia;

// Targets
const DESKTOP_MEDIA = ['screen', 'window'];
const SERVERS = {
  iceServers: [{
    url: 'stun:stun.l.google.com:19302',
  }],
};

// TODO: Use altspace id
const id = Math.floor(Math.random() * 100000);
const clientPath = 'clients/'.concat(id);

// TODO: offer config setting
// Signaling
const sync = altspace.utilities.sync.getInstance({
  appId: 'AltspaceRTC',
  authorId: 'Joshua',
});

// TODO: Handle Disconnection gracefully
class AltspaceRTC {
  constructor(isHost) {
    this.remoteVideo = null;
    this.localVideo = null;
    this.isHost = isHost;

    // Important to set this up now
    if (isHost) {
      this.host();
    } else {
      this.client();
    }
  }

  iceCandidate(remote, e) {
    // TODO: Error logging
    if (!e.candidate) return;

    if (this.isHost) {
      // Tell the client about us
      remote.sync.child('host').set({
        candidate: JSON.stringify(e.candidate),
      });
    } else {
      // tell host about us
      sync.child(clientPath).set({
        candidate: JSON.stringify(e.candidate),
      });
    }
  }

  streamAdded(e) {
    this.remoteVideo = document.querySelector('video');
    this.remoteVideo.src = URL.createObjectURL(e.stream);
    this.remoteVideo.autoplay = true;
  }

  client() {
    const peer = new RTCPeerConnection(SERVERS);
    peer.onicecandidate = this.iceCandidate.bind(this, peer);
    peer.onaddstream = this.streamAdded.bind(this);

    // on host candidancy
    sync.child(clientPath).child('host/candidate').on('value', (canData) => {
      if (!canData.val()) return;
      const candidate = JSON.parse(canData.val());
      peer.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // on host offer
    sync.child(clientPath).child('offer').on('value', (offerData) => {
      if (!offerData.val()) return;
      const offerVal = JSON.parse(offerData.val());

      peer.setRemoteDescription(new RTCSessionDescription(offerVal));
      peer.createAnswer((desc) => {
        peer.setLocalDescription(desc);

        sync.child(clientPath).update({
          answer: JSON.stringify(desc),
        });
      }, null, {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true,
        },
      });
    });

    // Tell the host we're here.
    sync.child(clientPath).set({
      id, // Need to set something or it doesn't trigger anything
    });
  }

  // can only host on a chrome app ATM
  host() {
    this.clients = {};

    // clear out old data
    sync.remove();
    // handle a client being added.
    sync.child('clients').on('child_added', this.clientAdded.bind(this));
    chrome.desktopCapture.chooseDesktopMedia(DESKTOP_MEDIA, (streamId) => {
      if (!streamId) return;

      navigator.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: streamId,
          },
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: streamId,
            maxWidth: 800,
            maxHeight: 600,
          },
        },
      }, (stream) => {
        this.localVideo = stream;
        this.addStream();
      }, (err) => {
        // TODO: error logging
      });
    });
  }

  // Add stream to existing clients
  addStream() {
    Object.keys(this.clients).forEach((clientKey) => {
      this.clients[clientKey].peer.addStream(this.localVideo);
    });
  }

  clientAdded(clientData) {
    const client = clientData.val();
    const clientKey = clientData.key();

    const peer = new RTCPeerConnection(SERVERS);
    peer.onicecandidate = this.iceCandidate.bind(this, client);

    client.peer = peer;
    client.sync = sync.child('clients/'.concat(clientKey));
    this.clients[clientKey] = client;

    peer.onnegotiationneeded = () => {
      peer.createOffer((desc) => {
        peer.setLocalDescription(desc);

        // give client our offer
        client.sync.update({
          offer: JSON.stringify(desc),
        });

        // ice data
        client.sync.child('candidate').on('value', (candidateData) => {
          if (!candidateData.val()) return;
          const candidate = JSON.parse(candidateData.val());
          peer.addIceCandidate(new RTCIceCandidate(candidate));
        });

        // client told us its answer
        client.sync.child('answer').on('value', (answerData) => {
          if (!answerData.val()) return;
          peer.setRemoteDescription(new RTCSessionDescription(JSON.parse(answerData.val())));
        });
      }, null, {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true,
        },
      });
    };

    // if the stream is established add it
    if (this.localVideo) {
      peer.addStream(this.localVideo);
    }
  }
}

if (typeof module !== undefined) {
  module.exports = AltspaceRTC;
}
