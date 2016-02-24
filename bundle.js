(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button() {
    _classCallCheck(this, Button);
  }

  _createClass(Button, [{
    key: 'awake',
    value: function awake(o) {
      this.object3d = o;
      this.cursordown = this.cursordown.bind(this);
      this.cursorup = this.cursorup.bind(this);
      this.pressed = false;

      this.object3d.addEventListener('cursordown', this.cursordown);
      this.object3d.addEventListener('cursorup', this.cursorup);
    }
  }, {
    key: 'cursordown',
    value: function cursordown() {
      this.object3d.addEventListener('cursorleave', this.cursorup);
      this.object3d.dispatchEvent('buttondown');
      this.pressed = true;
    }
  }, {
    key: 'cursorup',
    value: function cursorup() {
      this.object3d.removeEventListener('cursorleave', this.cursordown);
      this.object3d.addEventListener('cursorenter', this.cursordown);
      this.object3d.dispatchEvent('buttonup');

      if (this.pressed) {
        this.object3d.dispatchEvent('buttonpress');
        this.pressed = false;
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      // Bulk remove even if they're not on the object
      this.object3d.removeEventListener('cursorleave', this.cursorup);
      this.object3d.removeEventListener('cursordown', this.cursordown);
      this.object3d.removeEventListener('cursorup', this.cursorup);
      this.object3d.removeEventListener('cursorenter', this.cursordown);
    }
  }]);

  return Button;
}();

exports.default = Button;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('../Behavior/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var geom = new THREE.BoxGeometry(40, 40, 40);

var GameButton = function (_THREE$Mesh) {
  _inherits(GameButton, _THREE$Mesh);

  function GameButton(x, y, key, host) {
    _classCallCheck(this, GameButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameButton).call(this, geom, new THREE.MeshBasicMaterial({ color: '#ffffff' })));

    _this.addBehaviors(new _Button2.default());
    _this.key = key;
    _this.host = host;

    _this.addEventListener('buttondown', _this.buttondown.bind(_this));
    _this.addEventListener('buttonup', _this.buttonup.bind(_this));
    _this.position.set(x, y, 0);
    return _this;
  }

  _createClass(GameButton, [{
    key: 'buttondown',
    value: function buttondown() {
      this.host.triggerKey('keydown', this.key);
      this.material.color.set('#ff0000');
    }
  }, {
    key: 'buttonup',
    value: function buttonup() {
      this.host.triggerKey('keyup', this.key);
      this.host.triggerKey('keypress', this.key);
      this.material.color.set('#ffffff');
    }
  }]);

  return GameButton;
}(THREE.Mesh);

exports.default = GameButton;

},{"../Behavior/Button":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameButton = require('./GameButton');

var _GameButton2 = _interopRequireDefault(_GameButton);

var _altspacertc = require('../scripts/altspacertc');

var _altspacertc2 = _interopRequireDefault(_altspacertc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttons = [
// coins and widgets
[-500, -500, '1'], [-450, -500, '2'], [-400, -500, '5'], [-350, -500, 'F2'],

// player 1
[0, 0, 'left'], [25, -50, 'down'], [25, 50, 'up'], [50, 0, 'right'], [200, -25, 'ctrl'],
/* Not needed yet
[200, 25, 'z'],
[250, -25, 'x'],
[250, 25, 'c'], */

// player 2
[0 - 500, 0, 'd'], [25 - 500, -50, 'down'], [25 - 500, 50, 'up'], [50 - 500, 0, 'g'], [200 - 500, -25, 'a']];

/* Not needed yet
[200 - 500, 25, 'z'],
[250 - 500, -25, 'x'],
[250 - 500, 25, 'c'] */

var Screen = function (_THREE$Object3D) {
  _inherits(Screen, _THREE$Object3D);

  function Screen() {
    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Screen).call(this));

    buttons.forEach(_this.makeButton.bind(_this));
    _this.position.set(0, -400, 0);
    _this.stream = new _altspacertc2.default();

    // Add a black background
    var box = new THREE.Mesh(new THREE.BoxGeometry(2000, 2000, 10), new THREE.MeshBasicMaterial({ color: '#000000' }));

    box.position.z = -10;
    _this.add(box);
    return _this;
  }

  _createClass(Screen, [{
    key: 'makeButton',
    value: function makeButton(_ref) {
      var _ref2 = _slicedToArray(_ref, 3);

      var x = _ref2[0];
      var y = _ref2[1];
      var key = _ref2[2];

      this.add(new _GameButton2.default(x, y, key));
    }
  }]);

  return Screen;
}(THREE.Object3D);

exports.default = Screen;

},{"../scripts/altspacertc":5,"./GameButton":2}],4:[function(require,module,exports){
'use strict';

var _Screen = require('./Entity/Screen');

var _Screen2 = _interopRequireDefault(_Screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sim = altspace.utilities.Simulation();
var instanceBase = altspace.utilities.sync.getInstance({
  authorId: 'altspace'
});

var sceneSync = altspace.utilities.behaviors.SceneSync(instanceBase, {
  ready: function ready() /* firstInstance */{
    sim.scene.add(new _Screen2.default(instanceBase));
  }
});

sim.scene.addBehavior(sceneSync);

},{"./Entity/Screen":3}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Compat
var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;

var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

// Targets
var DESKTOP_MEDIA = ['screen', 'window'];
var SERVERS = {
  iceServers: [{
    url: 'stun:stun.l.google.com:19302'
  }]
};

// TODO: Use altspace id
var id = Math.floor(Math.random() * 100000);
var clientPath = 'clients/'.concat(id);

// TODO: offer config setting
// Signaling
var sync = altspace.utilities.sync.getInstance({
  appId: 'AltspaceRTC',
  authorId: 'Joshua'
});

// TODO: Handle Disconnection gracefully

var AltspaceRTC = function () {
  function AltspaceRTC(isHost) {
    _classCallCheck(this, AltspaceRTC);

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

  _createClass(AltspaceRTC, [{
    key: 'iceCandidate',
    value: function iceCandidate(remote, e) {
      // TODO: Error logging
      if (!e.candidate) return;

      if (this.isHost) {
        // Tell the client about us
        remote.sync.child('host').set({
          candidate: JSON.stringify(e.candidate)
        });
      } else {
        // tell host about us
        sync.child(clientPath).set({
          candidate: JSON.stringify(e.candidate)
        });
      }
    }
  }, {
    key: 'streamAdded',
    value: function streamAdded(e) {
      this.remoteVideo = document.querySelector('video');
      this.remoteVideo.src = URL.createObjectURL(e.stream);
      this.remoteVideo.autoplay = true;
    }
  }, {
    key: 'client',
    value: function client() {
      var peer = new RTCPeerConnection(SERVERS);
      peer.onicecandidate = this.iceCandidate.bind(this, peer);
      peer.onaddstream = this.streamAdded.bind(this);

      // on host candidancy
      sync.child(clientPath).child('host/candidate').on('value', function (canData) {
        if (!canData.val()) return;
        var candidate = JSON.parse(canData.val());
        peer.addIceCandidate(new RTCIceCandidate(candidate));
      });

      // on host offer
      sync.child(clientPath).child('offer').on('value', function (offerData) {
        if (!offerData.val()) return;
        var offerVal = JSON.parse(offerData.val());

        peer.setRemoteDescription(new RTCSessionDescription(offerVal));
        peer.createAnswer(function (desc) {
          peer.setLocalDescription(desc);

          sync.child(clientPath).update({
            answer: JSON.stringify(desc)
          });
        }, null, {
          mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
          }
        });
      });

      // Tell the host we're here.
      sync.child(clientPath).set({
        id: id });
    }

    // can only host on a chrome app ATM

  }, {
    key: 'host',
    // Need to set something or it doesn't trigger anything
    value: function host() {
      var _this = this;

      this.clients = {};

      // clear out old data
      sync.remove();
      // handle a client being added.
      sync.child('clients').on('child_added', this.clientAdded.bind(this));
      chrome.desktopCapture.chooseDesktopMedia(DESKTOP_MEDIA, function (streamId) {
        if (!streamId) return;

        navigator.getUserMedia({
          audio: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: streamId
            }
          },
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: streamId,
              maxWidth: 800,
              maxHeight: 600
            }
          }
        }, function (stream) {
          _this.localVideo = stream;
          _this.addStream();
        }, function (err) {
          // TODO: error logging
        });
      });
    }

    // Add stream to existing clients

  }, {
    key: 'addStream',
    value: function addStream() {
      var _this2 = this;

      Object.keys(this.clients).forEach(function (clientKey) {
        _this2.clients[clientKey].peer.addStream(_this2.localVideo);
      });
    }
  }, {
    key: 'clientAdded',
    value: function clientAdded(clientData) {
      var client = clientData.val();
      var clientKey = clientData.key();

      var peer = new RTCPeerConnection(SERVERS);
      peer.onicecandidate = this.iceCandidate.bind(this, client);

      client.peer = peer;
      client.sync = sync.child('clients/'.concat(clientKey));
      this.clients[clientKey] = client;

      peer.onnegotiationneeded = function () {
        peer.createOffer(function (desc) {
          peer.setLocalDescription(desc);

          // give client our offer
          client.sync.update({
            offer: JSON.stringify(desc)
          });

          // ice data
          client.sync.child('candidate').on('value', function (candidateData) {
            if (!candidateData.val()) return;
            var candidate = JSON.parse(candidateData.val());
            peer.addIceCandidate(new RTCIceCandidate(candidate));
          });

          // client told us its answer
          client.sync.child('answer').on('value', function (answerData) {
            if (!answerData.val()) return;
            peer.setRemoteDescription(new RTCSessionDescription(JSON.parse(answerData.val())));
          });
        }, null, {
          mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
          }
        });
      };

      // if the stream is established add it
      if (this.localVideo) {
        peer.addStream(this.localVideo);
      }
    }
  }]);

  return AltspaceRTC;
}();

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) !== undefined) {
  module.exports = AltspaceRTC;
}

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJCZWhhdmlvclxcQnV0dG9uLmpzIiwiRW50aXR5XFxHYW1lQnV0dG9uLmpzIiwiRW50aXR5XFxTY3JlZW4uanMiLCJhcHAuanMiLCJzY3JpcHRzXFxhbHRzcGFjZXJ0Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTTs7Ozs7OzswQkFDRSxHQUFHO0FBQ1AsV0FBSyxRQUFMLEdBQWdCLENBQWhCLENBRE87QUFFUCxXQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQWxCLENBRk87QUFHUCxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFoQixDQUhPO0FBSVAsV0FBSyxPQUFMLEdBQWUsS0FBZixDQUpPOztBQU1QLFdBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLFlBQS9CLEVBQTZDLEtBQUssVUFBTCxDQUE3QyxDQU5PO0FBT1AsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsVUFBL0IsRUFBMkMsS0FBSyxRQUFMLENBQTNDLENBUE87Ozs7aUNBVUk7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixhQUEvQixFQUE4QyxLQUFLLFFBQUwsQ0FBOUMsQ0FEVztBQUVYLFdBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsWUFBNUIsRUFGVztBQUdYLFdBQUssT0FBTCxHQUFlLElBQWYsQ0FIVzs7OzsrQkFNRjtBQUNULFdBQUssUUFBTCxDQUFjLG1CQUFkLENBQWtDLGFBQWxDLEVBQWlELEtBQUssVUFBTCxDQUFqRCxDQURTO0FBRVQsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsYUFBL0IsRUFBOEMsS0FBSyxVQUFMLENBQTlDLENBRlM7QUFHVCxXQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLFVBQTVCLEVBSFM7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Ozs7QUFYTCxVQXlDbEIsS0FBSyxVQUFMLEVBQWlCO0FBQ25CLGFBQUssU0FBTCxDQUFlLEtBQUssVUFBTCxDQUFmLENBRG1CO09BQXJCOzs7O1NBOUpFOzs7QUFvS04sSUFBSSxRQUFPLHVEQUFQLEtBQWtCLFNBQWxCLEVBQTZCO0FBQy9CLFNBQU8sT0FBUCxHQUFpQixXQUFqQixDQUQrQjtDQUFqQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBCdXR0b24ge1xyXG4gIGF3YWtlKG8pIHtcclxuICAgIHRoaXMub2JqZWN0M2QgPSBvO1xyXG4gICAgdGhpcy5jdXJzb3Jkb3duID0gdGhpcy5jdXJzb3Jkb3duLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmN1cnNvcnVwID0gdGhpcy5jdXJzb3J1cC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5vYmplY3QzZC5hZGRFdmVudExpc3RlbmVyKCdjdXJzb3Jkb3duJywgdGhpcy5jdXJzb3Jkb3duKTtcclxuICAgIHRoaXMub2JqZWN0M2QuYWRkRXZlbnRMaXN0ZW5lcignY3Vyc29ydXAnLCB0aGlzLmN1cnNvcnVwKTtcclxuICB9XHJcblxyXG4gIGN1cnNvcmRvd24oKSB7XHJcbiAgICB0aGlzLm9iamVjdDNkLmFkZEV2ZW50TGlzdGVuZXIoJ2N1cnNvcmxlYXZlJywgdGhpcy5jdXJzb3J1cCk7XHJcbiAgICB0aGlzLm9iamVjdDNkLmRpc3BhdGNoRXZlbnQoJ2J1dHRvbmRvd24nKTtcclxuICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjdXJzb3J1cCgpIHtcclxuICAgIHRoaXMub2JqZWN0M2QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY3Vyc29ybGVhdmUnLCB0aGlzLmN1cnNvcmRvd24pO1xyXG4gICAgdGhpcy5vYmplY3QzZC5hZGRFdmVudExpc3RlbmVyKCdjdXJzb3JlbnRlcicsIHRoaXMuY3Vyc29yZG93bik7XHJcbiAgICB0aGlzLm9iamVjdDNkLmRpc3BhdGNoRXZlbnQoJ2J1dHRvbnVwJyk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJlc3NlZCkge1xyXG4gICAgICB0aGlzLm9iamVjdDNkLmRpc3BhdGNoRXZlbnQoJ2J1dHRvbnByZXNzJyk7XHJcbiAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIEJ1bGsgcmVtb3ZlIGV2ZW4gaWYgdGhleSdyZSBub3Qgb24gdGhlIG9iamVjdFxyXG4gICAgdGhpcy5vYmplY3QzZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjdXJzb3JsZWF2ZScsIHRoaXMuY3Vyc29ydXApO1xyXG4gICAgdGhpcy5vYmplY3QzZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjdXJzb3Jkb3duJywgdGhpcy5jdXJzb3Jkb3duKTtcclxuICAgIHRoaXMub2JqZWN0M2QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY3Vyc29ydXAnLCB0aGlzLmN1cnNvcnVwKTtcclxuICAgIHRoaXMub2JqZWN0M2QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY3Vyc29yZW50ZXInLCB0aGlzLmN1cnNvcmRvd24pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uO1xyXG4iLCJpbXBvcnQgQnV0dG9uQmVoYXZpb3IgZnJvbSAnLi4vQmVoYXZpb3IvQnV0dG9uJztcclxuXHJcbmNvbnN0IGdlb20gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNDAsIDQwLCA0MCk7XHJcblxyXG5jbGFzcyBHYW1lQnV0dG9uIGV4dGVuZHMgVEhSRUUuTWVzaCB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwga2V5LCBob3N0KSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgZ2VvbSxcclxuICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6ICcjZmZmZmZmJyB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmFkZEJlaGF2aW9ycyhuZXcgQnV0dG9uQmVoYXZpb3IoKSk7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIHRoaXMuaG9zdCA9IGhvc3Q7XHJcblxyXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdidXR0b25kb3duJywgdGhpcy5idXR0b25kb3duLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdidXR0b251cCcsIHRoaXMuYnV0dG9udXAuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnNldCh4LCB5LCAwKTtcclxuICB9XHJcblxyXG4gIGJ1dHRvbmRvd24oKSB7XHJcbiAgICB0aGlzLmhvc3QudHJpZ2dlcktleSgna2V5ZG93bicsIHRoaXMua2V5KTtcclxuICAgIHRoaXMubWF0ZXJpYWwuY29sb3Iuc2V0KCcjZmYwMDAwJyk7XHJcbiAgfVxyXG5cclxuICBidXR0b251cCgpIHtcclxuICAgIHRoaXMuaG9zdC50cmlnZ2VyS2V5KCdrZXl1cCcsIHRoaXMua2V5KTtcclxuICAgIHRoaXMuaG9zdC50cmlnZ2VyS2V5KCdrZXlwcmVzcycsIHRoaXMua2V5KTtcclxuICAgIHRoaXMubWF0ZXJpYWwuY29sb3Iuc2V0KCcjZmZmZmZmJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lQnV0dG9uO1xyXG4iLCJpbXBvcnQgR2FtZUJ1dHRvbiBmcm9tICcuL0dhbWVCdXR0b24nO1xyXG5pbXBvcnQgQWx0c3BhY2VSVEMgZnJvbSAnLi4vc2NyaXB0cy9hbHRzcGFjZXJ0Yyc7XHJcblxyXG5jb25zdCBidXR0b25zID0gW1xyXG4gIC8vIGNvaW5zIGFuZCB3aWRnZXRzXHJcbiAgWy01MDAsIC01MDAsICcxJ10sXHJcbiAgWy00NTAsIC01MDAsICcyJ10sXHJcbiAgWy00MDAsIC01MDAsICc1J10sXHJcbiAgWy0zNTAsIC01MDAsICdGMiddLFxyXG5cclxuICAvLyBwbGF5ZXIgMVxyXG4gIFswLCAwLCAnbGVmdCddLFxyXG4gIFsyNSwgLTUwLCAnZG93biddLFxyXG4gIFsyNSwgNTAsICd1cCddLFxyXG4gIFs1MCwgMCwgJ3JpZ2h0J10sXHJcbiAgWzIwMCwgLTI1LCAnY3RybCddLFxyXG4gIC8qIE5vdCBuZWVkZWQgeWV0XHJcbiAgWzIwMCwgMjUsICd6J10sXHJcbiAgWzI1MCwgLTI1LCAneCddLFxyXG4gIFsyNTAsIDI1LCAnYyddLCAqL1xyXG5cclxuICAvLyBwbGF5ZXIgMlxyXG4gIFswIC0gNTAwLCAwLCAnZCddLFxyXG4gIFsyNSAtIDUwMCwgLTUwLCAnZG93biddLFxyXG4gIFsyNSAtIDUwMCwgNTAsICd1cCddLFxyXG4gIFs1MCAtIDUwMCwgMCwgJ2cnXSxcclxuICBbMjAwIC0gNTAwLCAtMjUsICdhJ10sXHJcbiAgLyogTm90IG5lZWRlZCB5ZXRcclxuICBbMjAwIC0gNTAwLCAyNSwgJ3onXSxcclxuICBbMjUwIC0gNTAwLCAtMjUsICd4J10sXHJcbiAgWzI1MCAtIDUwMCwgMjUsICdjJ10gKi9cclxuXTtcclxuXHJcbmNsYXNzIFNjcmVlbiBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgYnV0dG9ucy5mb3JFYWNoKHRoaXMubWFrZUJ1dHRvbi5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMucG9zaXRpb24uc2V0KDAsIC00MDAsIDApO1xyXG4gICAgdGhpcy5zdHJlYW0gPSBuZXcgQWx0c3BhY2VSVEMoKTtcclxuXHJcbiAgICAvLyBBZGQgYSBibGFjayBiYWNrZ3JvdW5kXHJcbiAgICBjb25zdCBib3ggPSBuZXcgVEhSRUUuTWVzaChcclxuICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDIwMDAsIDIwMDAsIDEwKSxcclxuICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6ICcjMDAwMDAwJyB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBib3gucG9zaXRpb24ueiA9IC0xMDtcclxuICAgIHRoaXMuYWRkKGJveCk7XHJcbiAgfVxyXG5cclxuICBtYWtlQnV0dG9uKFt4LCB5LCBrZXldKSB7XHJcbiAgICB0aGlzLmFkZChuZXcgR2FtZUJ1dHRvbih4LCB5LCBrZXkpKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjcmVlbjtcclxuIiwiaW1wb3J0IFNjcmVlbiBmcm9tICcuL0VudGl0eS9TY3JlZW4nO1xyXG5cclxuY29uc3Qgc2ltID0gYWx0c3BhY2UudXRpbGl0aWVzLlNpbXVsYXRpb24oKTtcclxuY29uc3QgaW5zdGFuY2VCYXNlID0gYWx0c3BhY2UudXRpbGl0aWVzLnN5bmMuZ2V0SW5zdGFuY2Uoe1xyXG4gIGF1dGhvcklkOiAnYWx0c3BhY2UnLFxyXG59KTtcclxuXHJcbmNvbnN0IHNjZW5lU3luYyA9IGFsdHNwYWNlLnV0aWxpdGllcy5iZWhhdmlvcnMuU2NlbmVTeW5jKGluc3RhbmNlQmFzZSwge1xyXG4gIHJlYWR5KC8qIGZpcnN0SW5zdGFuY2UgKi8pIHtcclxuICAgIHNpbS5zY2VuZS5hZGQobmV3IFNjcmVlbihpbnN0YW5jZUJhc2UpKTtcclxuICB9LFxyXG59KTtcclxuXHJcbnNpbS5zY2VuZS5hZGRCZWhhdmlvcihzY2VuZVN5bmMpO1xyXG4iLCIvLyBDb21wYXRcclxuY29uc3QgUlRDUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHwgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIHx8IHdpbmRvdy5tc1JUQ1BlZXJDb25uZWN0aW9uO1xyXG5cclxuY29uc3QgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiB8fCB3aW5kb3cubW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJUQ1Nlc3Npb25EZXNjcmlwdGlvbiB8fCB3aW5kb3cubXNSVENTZXNzaW9uRGVzY3JpcHRpb247XHJcblxyXG5uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWE7XHJcblxyXG4vLyBUYXJnZXRzXHJcbmNvbnN0IERFU0tUT1BfTUVESUEgPSBbJ3NjcmVlbicsICd3aW5kb3cnXTtcclxuY29uc3QgU0VSVkVSUyA9IHtcclxuICBpY2VTZXJ2ZXJzOiBbe1xyXG4gICAgdXJsOiAnc3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMicsXHJcbiAgfV0sXHJcbn07XHJcblxyXG4vLyBUT0RPOiBVc2UgYWx0c3BhY2UgaWRcclxuY29uc3QgaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApO1xyXG5jb25zdCBjbGllbnRQYXRoID0gJ2NsaWVudHMvJy5jb25jYXQoaWQpO1xyXG5cclxuLy8gVE9ETzogb2ZmZXIgY29uZmlnIHNldHRpbmdcclxuLy8gU2lnbmFsaW5nXHJcbmNvbnN0IHN5bmMgPSBhbHRzcGFjZS51dGlsaXRpZXMuc3luYy5nZXRJbnN0YW5jZSh7XHJcbiAgYXBwSWQ6ICdBbHRzcGFjZVJUQycsXHJcbiAgYXV0aG9ySWQ6ICdKb3NodWEnLFxyXG59KTtcclxuXHJcbi8vIFRPRE86IEhhbmRsZSBEaXNjb25uZWN0aW9uIGdyYWNlZnVsbHlcclxuY2xhc3MgQWx0c3BhY2VSVEMge1xyXG4gIGNvbnN0cnVjdG9yKGlzSG9zdCkge1xyXG4gICAgdGhpcy5yZW1vdGVWaWRlbyA9IG51bGw7XHJcbiAgICB0aGlzLmxvY2FsVmlkZW8gPSBudWxsO1xyXG4gICAgdGhpcy5pc0hvc3QgPSBpc0hvc3Q7XHJcblxyXG4gICAgLy8gSW1wb3J0YW50IHRvIHNldCB0aGlzIHVwIG5vd1xyXG4gICAgaWYgKGlzSG9zdCkge1xyXG4gICAgICB0aGlzLmhvc3QoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xpZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpY2VDYW5kaWRhdGUocmVtb3RlLCBlKSB7XHJcbiAgICAvLyBUT0RPOiBFcnJvciBsb2dnaW5nXHJcbiAgICBpZiAoIWUuY2FuZGlkYXRlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuaXNIb3N0KSB7XHJcbiAgICAgIC8vIFRlbGwgdGhlIGNsaWVudCBhYm91dCB1c1xyXG4gICAgICByZW1vdGUuc3luYy5jaGlsZCgnaG9zdCcpLnNldCh7XHJcbiAgICAgICAgY2FuZGlkYXRlOiBKU09OLnN0cmluZ2lmeShlLmNhbmRpZGF0ZSksXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdGVsbCBob3N0IGFib3V0IHVzXHJcbiAgICAgIHN5bmMuY2hpbGQoY2xpZW50UGF0aCkuc2V0KHtcclxuICAgICAgICBjYW5kaWRhdGU6IEpTT04uc3RyaW5naWZ5KGUuY2FuZGlkYXRlKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdHJlYW1BZGRlZChlKSB7XHJcbiAgICB0aGlzLnJlbW90ZVZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcclxuICAgIHRoaXMucmVtb3RlVmlkZW8uc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChlLnN0cmVhbSk7XHJcbiAgICB0aGlzLnJlbW90ZVZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNsaWVudCgpIHtcclxuICAgIGNvbnN0IHBlZXIgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oU0VSVkVSUyk7XHJcbiAgICBwZWVyLm9uaWNlY2FuZGlkYXRlID0gdGhpcy5pY2VDYW5kaWRhdGUuYmluZCh0aGlzLCBwZWVyKTtcclxuICAgIHBlZXIub25hZGRzdHJlYW0gPSB0aGlzLnN0cmVhbUFkZGVkLmJpbmQodGhpcyk7XHJcblxyXG4gICAgLy8gb24gaG9zdCBjYW5kaWRhbmN5XHJcbiAgICBzeW5jLmNoaWxkKGNsaWVudFBhdGgpLmNoaWxkKCdob3N0L2NhbmRpZGF0ZScpLm9uKCd2YWx1ZScsIChjYW5EYXRhKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRGF0YS52YWwoKSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjYW5kaWRhdGUgPSBKU09OLnBhcnNlKGNhbkRhdGEudmFsKCkpO1xyXG4gICAgICBwZWVyLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gb24gaG9zdCBvZmZlclxyXG4gICAgc3luYy5jaGlsZChjbGllbnRQYXRoKS5jaGlsZCgnb2ZmZXInKS5vbigndmFsdWUnLCAob2ZmZXJEYXRhKSA9PiB7XHJcbiAgICAgIGlmICghb2ZmZXJEYXRhLnZhbCgpKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IG9mZmVyVmFsID0gSlNPTi5wYXJzZShvZmZlckRhdGEudmFsKCkpO1xyXG5cclxuICAgICAgcGVlci5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG9mZmVyVmFsKSk7XHJcbiAgICAgIHBlZXIuY3JlYXRlQW5zd2VyKChkZXNjKSA9PiB7XHJcbiAgICAgICAgcGVlci5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpO1xyXG5cclxuICAgICAgICBzeW5jLmNoaWxkKGNsaWVudFBhdGgpLnVwZGF0ZSh7XHJcbiAgICAgICAgICBhbnN3ZXI6IEpTT04uc3RyaW5naWZ5KGRlc2MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCBudWxsLCB7XHJcbiAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlLFxyXG4gICAgICAgICAgT2ZmZXJUb1JlY2VpdmVWaWRlbzogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRlbGwgdGhlIGhvc3Qgd2UncmUgaGVyZS5cclxuICAgIHN5bmMuY2hpbGQoY2xpZW50UGF0aCkuc2V0KHtcclxuICAgICAgaWQsIC8vIE5lZWQgdG8gc2V0IHNvbWV0aGluZyBvciBpdCBkb2Vzbid0IHRyaWdnZXIgYW55dGhpbmdcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gY2FuIG9ubHkgaG9zdCBvbiBhIGNocm9tZSBhcHAgQVRNXHJcbiAgaG9zdCgpIHtcclxuICAgIHRoaXMuY2xpZW50cyA9IHt9O1xyXG5cclxuICAgIC8vIGNsZWFyIG91dCBvbGQgZGF0YVxyXG4gICAgc3luYy5yZW1vdmUoKTtcclxuICAgIC8vIGhhbmRsZSBhIGNsaWVudCBiZWluZyBhZGRlZC5cclxuICAgIHN5bmMuY2hpbGQoJ2NsaWVudHMnKS5vbignY2hpbGRfYWRkZWQnLCB0aGlzLmNsaWVudEFkZGVkLmJpbmQodGhpcykpO1xyXG4gICAgY2hyb21lLmRlc2t0b3BDYXB0dXJlLmNob29zZURlc2t0b3BNZWRpYShERVNLVE9QX01FRElBLCAoc3RyZWFtSWQpID0+IHtcclxuICAgICAgaWYgKCFzdHJlYW1JZCkgcmV0dXJuO1xyXG5cclxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XHJcbiAgICAgICAgYXVkaW86IHtcclxuICAgICAgICAgIG1hbmRhdG9yeToge1xyXG4gICAgICAgICAgICBjaHJvbWVNZWRpYVNvdXJjZTogJ2Rlc2t0b3AnLFxyXG4gICAgICAgICAgICBjaHJvbWVNZWRpYVNvdXJjZUlkOiBzdHJlYW1JZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWRlbzoge1xyXG4gICAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICAgIGNocm9tZU1lZGlhU291cmNlOiAnZGVza3RvcCcsXHJcbiAgICAgICAgICAgIGNocm9tZU1lZGlhU291cmNlSWQ6IHN0cmVhbUlkLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogODAwLFxyXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IDYwMCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwgKHN0cmVhbSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9jYWxWaWRlbyA9IHN0cmVhbTtcclxuICAgICAgICB0aGlzLmFkZFN0cmVhbSgpO1xyXG4gICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgLy8gVE9ETzogZXJyb3IgbG9nZ2luZ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gQWRkIHN0cmVhbSB0byBleGlzdGluZyBjbGllbnRzXHJcbiAgYWRkU3RyZWFtKCkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5jbGllbnRzKS5mb3JFYWNoKChjbGllbnRLZXkpID0+IHtcclxuICAgICAgdGhpcy5jbGllbnRzW2NsaWVudEtleV0ucGVlci5hZGRTdHJlYW0odGhpcy5sb2NhbFZpZGVvKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xpZW50QWRkZWQoY2xpZW50RGF0YSkge1xyXG4gICAgY29uc3QgY2xpZW50ID0gY2xpZW50RGF0YS52YWwoKTtcclxuICAgIGNvbnN0IGNsaWVudEtleSA9IGNsaWVudERhdGEua2V5KCk7XHJcblxyXG4gICAgY29uc3QgcGVlciA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihTRVJWRVJTKTtcclxuICAgIHBlZXIub25pY2VjYW5kaWRhdGUgPSB0aGlzLmljZUNhbmRpZGF0ZS5iaW5kKHRoaXMsIGNsaWVudCk7XHJcblxyXG4gICAgY2xpZW50LnBlZXIgPSBwZWVyO1xyXG4gICAgY2xpZW50LnN5bmMgPSBzeW5jLmNoaWxkKCdjbGllbnRzLycuY29uY2F0KGNsaWVudEtleSkpO1xyXG4gICAgdGhpcy5jbGllbnRzW2NsaWVudEtleV0gPSBjbGllbnQ7XHJcblxyXG4gICAgcGVlci5vbm5lZ290aWF0aW9ubmVlZGVkID0gKCkgPT4ge1xyXG4gICAgICBwZWVyLmNyZWF0ZU9mZmVyKChkZXNjKSA9PiB7XHJcbiAgICAgICAgcGVlci5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpO1xyXG5cclxuICAgICAgICAvLyBnaXZlIGNsaWVudCBvdXIgb2ZmZXJcclxuICAgICAgICBjbGllbnQuc3luYy51cGRhdGUoe1xyXG4gICAgICAgICAgb2ZmZXI6IEpTT04uc3RyaW5naWZ5KGRlc2MpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBpY2UgZGF0YVxyXG4gICAgICAgIGNsaWVudC5zeW5jLmNoaWxkKCdjYW5kaWRhdGUnKS5vbigndmFsdWUnLCAoY2FuZGlkYXRlRGF0YSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFjYW5kaWRhdGVEYXRhLnZhbCgpKSByZXR1cm47XHJcbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBKU09OLnBhcnNlKGNhbmRpZGF0ZURhdGEudmFsKCkpO1xyXG4gICAgICAgICAgcGVlci5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjYW5kaWRhdGUpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY2xpZW50IHRvbGQgdXMgaXRzIGFuc3dlclxyXG4gICAgICAgIGNsaWVudC5zeW5jLmNoaWxkKCdhbnN3ZXInKS5vbigndmFsdWUnLCAoYW5zd2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFhbnN3ZXJEYXRhLnZhbCgpKSByZXR1cm47XHJcbiAgICAgICAgICBwZWVyLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oSlNPTi5wYXJzZShhbnN3ZXJEYXRhLnZhbCgpKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCBudWxsLCB7XHJcbiAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlLFxyXG4gICAgICAgICAgT2ZmZXJUb1JlY2VpdmVWaWRlbzogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gaWYgdGhlIHN0cmVhbSBpcyBlc3RhYmxpc2hlZCBhZGQgaXRcclxuICAgIGlmICh0aGlzLmxvY2FsVmlkZW8pIHtcclxuICAgICAgcGVlci5hZGRTdHJlYW0odGhpcy5sb2NhbFZpZGVvKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSB1bmRlZmluZWQpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEFsdHNwYWNlUlRDO1xyXG59XHJcbiJdfQ==
