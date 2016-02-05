(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      this.object3d.dispatch('buttondown');
      this.pressed = true;
    }
  }, {
    key: 'cursorup',
    value: function cursorup() {
      this.object3d.removeEventListener('cursorleave', this.cursordown);
      this.object3d.addEventListener('cursorenter', this.cursordown);
      this.object3d.dispatch('buttonup');

      if (this.pressed) {
        this.object3d.dispatch('buttonpress');
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    urls: 'stun:stun.l.google.com:19302'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJCZWhhdmlvclxcQnV0dG9uLmpzIiwiRW50aXR5XFxHYW1lQnV0dG9uLmpzIiwiRW50aXR5XFxTY3JlZW4uanMiLCJhcHAuanMiLCJzY3JpcHRzXFxhbHRzcGFjZXJ0Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTTs7Ozs7OzswQkFDRSxHQUFHO0FBQ1AsV0FBSyxRQUFMLEdBQWdCLENBQWhCLENBRE87QUFFUCxXQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQWxCLENBRk87QUFHUCxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFoQixDQUhPO0FBSVAsV0FBSyxPQUFMLEdBQWUsS0FBZixDQUpPOztBQU1QLFdBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLFlBQS9CLEVBQTZDLEtBQUssVUFBTCxDQUE3QyxDQU5PO0FBT1AsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsVUFBL0IsRUFBMkMsS0FBSyxRQUFMLENBQTNDLENBUE87Ozs7aUNBVUk7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixhQUEvQixFQUE4QyxLQUFLLFFBQUwsQ0FBOUMsQ0FEVztBQUVYLFdBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsWUFBdkIsRUFGVztBQUdYLFdBQUssT0FBTCxHQUFlLElBQWYsQ0FIVzs7OzsrQkFNRjtBQUNULFdBQUssUUFBTCxDQUFjLG1CQUFkLENBQWtDLGFBQWxDLEVBQWlELEtBQUssVUFBTCxDQUFqRCxDQURTO0FBRVQsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsYUFBL0IsRUFBOEMsS0FBSyxVQUFMLENBQTlDLENBRlM7QUFHVCxXQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLFVBQXZCLEVBSFM7O0FBS1QsVUFBSSxLQUFLLE9BQUwsRUFB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QUwsRUFBaUI7QUFDbkIsYUFBSyxTQUFMLENBQWUsS0FBSyxVQUFMLENBQWYsQ0FEbUI7T0FBckI7Ozs7U0E5SkU7OztBQW9LTixJQUFJLFFBQU8sdURBQVAsS0FBa0IsU0FBbEIsRUFBNkI7QUFDL0IsU0FBTyxPQUFQLEdBQWlCLFdBQWpCLENBRCtCO0NBQWpDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIEJ1dHRvbiB7XHJcbiAgYXdha2Uobykge1xyXG4gICAgdGhpcy5vYmplY3QzZCA9IG87XHJcbiAgICB0aGlzLmN1cnNvcmRvd24gPSB0aGlzLmN1cnNvcmRvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuY3Vyc29ydXAgPSB0aGlzLmN1cnNvcnVwLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLm9iamVjdDNkLmFkZEV2ZW50TGlzdGVuZXIoJ2N1cnNvcmRvd24nLCB0aGlzLmN1cnNvcmRvd24pO1xyXG4gICAgdGhpcy5vYmplY3QzZC5hZGRFdmVudExpc3RlbmVyKCdjdXJzb3J1cCcsIHRoaXMuY3Vyc29ydXApO1xyXG4gIH1cclxuXHJcbiAgY3Vyc29yZG93bigpIHtcclxuICAgIHRoaXMub2JqZWN0M2QuYWRkRXZlbnRMaXN0ZW5lcignY3Vyc29ybGVhdmUnLCB0aGlzLmN1cnNvcnVwKTtcclxuICAgIHRoaXMub2JqZWN0M2QuZGlzcGF0Y2goJ2J1dHRvbmRvd24nKTtcclxuICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjdXJzb3J1cCgpIHtcclxuICAgIHRoaXMub2JqZWN0M2QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY3Vyc29ybGVhdmUnLCB0aGlzLmN1cnNvcmRvd24pO1xyXG4gICAgdGhpcy5vYmplY3QzZC5hZGRFdmVudExpc3RlbmVyKCdjdXJzb3JlbnRlcicsIHRoaXMuY3Vyc29yZG93bik7XHJcbiAgICB0aGlzLm9iamVjdDNkLmRpc3BhdGNoKCdidXR0b251cCcpO1xyXG5cclxuICAgIGlmICh0aGlzLnByZXNzZWQpIHtcclxuICAgICAgdGhpcy5vYmplY3QzZC5kaXNwYXRjaCgnYnV0dG9ucHJlc3MnKTtcclxuICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gQnVsayByZW1vdmUgZXZlbiBpZiB0aGV5J3JlIG5vdCBvbiB0aGUgb2JqZWN0XHJcbiAgICB0aGlzLm9iamVjdDNkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2N1cnNvcmxlYXZlJywgdGhpcy5jdXJzb3J1cCk7XHJcbiAgICB0aGlzLm9iamVjdDNkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2N1cnNvcmRvd24nLCB0aGlzLmN1cnNvcmRvd24pO1xyXG4gICAgdGhpcy5vYmplY3QzZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjdXJzb3J1cCcsIHRoaXMuY3Vyc29ydXApO1xyXG4gICAgdGhpcy5vYmplY3QzZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjdXJzb3JlbnRlcicsIHRoaXMuY3Vyc29yZG93bik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247XHJcbiIsImltcG9ydCBCdXR0b25CZWhhdmlvciBmcm9tICcuLi9CZWhhdmlvci9CdXR0b24nO1xyXG5cclxuY29uc3QgZ2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg0MCwgNDAsIDQwKTtcclxuXHJcbmNsYXNzIEdhbWVCdXR0b24gZXh0ZW5kcyBUSFJFRS5NZXNoIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCBrZXksIGhvc3QpIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICBnZW9tLFxyXG4gICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogJyNmZmZmZmYnIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYWRkQmVoYXZpb3JzKG5ldyBCdXR0b25CZWhhdmlvcigpKTtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgdGhpcy5ob3N0ID0gaG9zdDtcclxuXHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2J1dHRvbmRvd24nLCB0aGlzLmJ1dHRvbmRvd24uYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2J1dHRvbnVwJywgdGhpcy5idXR0b251cC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIDApO1xyXG4gIH1cclxuXHJcbiAgYnV0dG9uZG93bigpIHtcclxuICAgIHRoaXMuaG9zdC50cmlnZ2VyS2V5KCdrZXlkb3duJywgdGhpcy5rZXkpO1xyXG4gICAgdGhpcy5tYXRlcmlhbC5jb2xvci5zZXQoJyNmZjAwMDAnKTtcclxuICB9XHJcblxyXG4gIGJ1dHRvbnVwKCkge1xyXG4gICAgdGhpcy5ob3N0LnRyaWdnZXJLZXkoJ2tleXVwJywgdGhpcy5rZXkpO1xyXG4gICAgdGhpcy5ob3N0LnRyaWdnZXJLZXkoJ2tleXByZXNzJywgdGhpcy5rZXkpO1xyXG4gICAgdGhpcy5tYXRlcmlhbC5jb2xvci5zZXQoJyNmZmZmZmYnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVCdXR0b247XHJcbiIsImltcG9ydCBHYW1lQnV0dG9uIGZyb20gJy4vR2FtZUJ1dHRvbic7XHJcbmltcG9ydCBBbHRzcGFjZVJUQyBmcm9tICcuLi9zY3JpcHRzL2FsdHNwYWNlcnRjJztcclxuXHJcbmNvbnN0IGJ1dHRvbnMgPSBbXHJcbiAgLy8gY29pbnMgYW5kIHdpZGdldHNcclxuICBbLTUwMCwgLTUwMCwgJzEnXSxcclxuICBbLTQ1MCwgLTUwMCwgJzInXSxcclxuICBbLTQwMCwgLTUwMCwgJzUnXSxcclxuICBbLTM1MCwgLTUwMCwgJ0YyJ10sXHJcblxyXG4gIC8vIHBsYXllciAxXHJcbiAgWzAsIDAsICdsZWZ0J10sXHJcbiAgWzI1LCAtNTAsICdkb3duJ10sXHJcbiAgWzI1LCA1MCwgJ3VwJ10sXHJcbiAgWzUwLCAwLCAncmlnaHQnXSxcclxuICBbMjAwLCAtMjUsICdjdHJsJ10sXHJcbiAgLyogTm90IG5lZWRlZCB5ZXRcclxuICBbMjAwLCAyNSwgJ3onXSxcclxuICBbMjUwLCAtMjUsICd4J10sXHJcbiAgWzI1MCwgMjUsICdjJ10sICovXHJcblxyXG4gIC8vIHBsYXllciAyXHJcbiAgWzAgLSA1MDAsIDAsICdkJ10sXHJcbiAgWzI1IC0gNTAwLCAtNTAsICdkb3duJ10sXHJcbiAgWzI1IC0gNTAwLCA1MCwgJ3VwJ10sXHJcbiAgWzUwIC0gNTAwLCAwLCAnZyddLFxyXG4gIFsyMDAgLSA1MDAsIC0yNSwgJ2EnXSxcclxuICAvKiBOb3QgbmVlZGVkIHlldFxyXG4gIFsyMDAgLSA1MDAsIDI1LCAneiddLFxyXG4gIFsyNTAgLSA1MDAsIC0yNSwgJ3gnXSxcclxuICBbMjUwIC0gNTAwLCAyNSwgJ2MnXSAqL1xyXG5dO1xyXG5cclxuY2xhc3MgU2NyZWVuIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2godGhpcy5tYWtlQnV0dG9uLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5wb3NpdGlvbi5zZXQoMCwgLTQwMCwgMCk7XHJcbiAgICB0aGlzLnN0cmVhbSA9IG5ldyBBbHRzcGFjZVJUQygpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gQWRkIGEgYmxhY2sgYmFja2dyb3VuZFxyXG4gICAgY29uc3QgYm94ID0gbmV3IFRIUkVFLk1lc2goXHJcbiAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgyMDAwLCAyMDAwLCAxMCksXHJcbiAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAnIzAwMDAwMCcgfSlcclxuICAgICk7XHJcblxyXG4gICAgYm94LnBvc2l0aW9uLnogPSAtMTA7XHJcbiAgICB0aGlzLmFkZChib3gpO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJ1dHRvbihbeCwgeSwga2V5XSkge1xyXG4gICAgdGhpcy5hZGQobmV3IEdhbWVCdXR0b24oeCwgeSwga2V5KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY3JlZW47XHJcbiIsImltcG9ydCBTY3JlZW4gZnJvbSAnLi9FbnRpdHkvU2NyZWVuJztcclxuXHJcbmNvbnN0IHNpbSA9IGFsdHNwYWNlLnV0aWxpdGllcy5TaW11bGF0aW9uKCk7XHJcbmNvbnN0IGluc3RhbmNlQmFzZSA9IGFsdHNwYWNlLnV0aWxpdGllcy5zeW5jLmdldEluc3RhbmNlKHtcclxuICBhdXRob3JJZDogJ2FsdHNwYWNlJyxcclxufSk7XHJcblxyXG5jb25zdCBzY2VuZVN5bmMgPSBhbHRzcGFjZS51dGlsaXRpZXMuYmVoYXZpb3JzLlNjZW5lU3luYyhpbnN0YW5jZUJhc2UsIHtcclxuICByZWFkeSgvKiBmaXJzdEluc3RhbmNlICovKSB7XHJcbiAgICBzaW0uc2NlbmUuYWRkKG5ldyBTY3JlZW4oaW5zdGFuY2VCYXNlKSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5zaW0uc2NlbmUuYWRkQmVoYXZpb3Ioc2NlbmVTeW5jKTtcclxuIiwiLy8gQ29tcGF0XHJcbmNvbnN0IFJUQ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8IHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbiB8fCB3aW5kb3cubXNSVENQZWVyQ29ubmVjdGlvbjtcclxuXHJcbmNvbnN0IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gfHwgd2luZG93Lm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSVENTZXNzaW9uRGVzY3JpcHRpb24gfHwgd2luZG93Lm1zUlRDU2Vzc2lvbkRlc2NyaXB0aW9uO1xyXG5cclxubmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhO1xyXG5cclxuLy8gVGFyZ2V0c1xyXG5jb25zdCBERVNLVE9QX01FRElBID0gWydzY3JlZW4nLCAnd2luZG93J107XHJcbmNvbnN0IFNFUlZFUlMgPSB7XHJcbiAgaWNlU2VydmVyczogW3tcclxuICAgIHVybHM6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJyxcclxuICB9XSxcclxufTtcclxuXHJcbi8vIFRPRE86IFVzZSBhbHRzcGFjZSBpZFxyXG5jb25zdCBpZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMCk7XHJcbmNvbnN0IGNsaWVudFBhdGggPSAnY2xpZW50cy8nLmNvbmNhdChpZCk7XHJcblxyXG4vLyBUT0RPOiBvZmZlciBjb25maWcgc2V0dGluZ1xyXG4vLyBTaWduYWxpbmdcclxuY29uc3Qgc3luYyA9IGFsdHNwYWNlLnV0aWxpdGllcy5zeW5jLmdldEluc3RhbmNlKHtcclxuICBhcHBJZDogJ0FsdHNwYWNlUlRDJyxcclxuICBhdXRob3JJZDogJ0pvc2h1YScsXHJcbn0pO1xyXG5cclxuLy8gVE9ETzogSGFuZGxlIERpc2Nvbm5lY3Rpb24gZ3JhY2VmdWxseVxyXG5jbGFzcyBBbHRzcGFjZVJUQyB7XHJcbiAgY29uc3RydWN0b3IoaXNIb3N0KSB7XHJcbiAgICB0aGlzLnJlbW90ZVZpZGVvID0gbnVsbDtcclxuICAgIHRoaXMubG9jYWxWaWRlbyA9IG51bGw7XHJcbiAgICB0aGlzLmlzSG9zdCA9IGlzSG9zdDtcclxuXHJcbiAgICAvLyBJbXBvcnRhbnQgdG8gc2V0IHRoaXMgdXAgbm93XHJcbiAgICBpZiAoaXNIb3N0KSB7XHJcbiAgICAgIHRoaXMuaG9zdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbGllbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGljZUNhbmRpZGF0ZShyZW1vdGUsIGUpIHtcclxuICAgIC8vIFRPRE86IEVycm9yIGxvZ2dpbmdcclxuICAgIGlmICghZS5jYW5kaWRhdGUpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5pc0hvc3QpIHtcclxuICAgICAgLy8gVGVsbCB0aGUgY2xpZW50IGFib3V0IHVzXHJcbiAgICAgIHJlbW90ZS5zeW5jLmNoaWxkKCdob3N0Jykuc2V0KHtcclxuICAgICAgICBjYW5kaWRhdGU6IEpTT04uc3RyaW5naWZ5KGUuY2FuZGlkYXRlKSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB0ZWxsIGhvc3QgYWJvdXQgdXNcclxuICAgICAgc3luYy5jaGlsZChjbGllbnRQYXRoKS5zZXQoe1xyXG4gICAgICAgIGNhbmRpZGF0ZTogSlNPTi5zdHJpbmdpZnkoZS5jYW5kaWRhdGUpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0cmVhbUFkZGVkKGUpIHtcclxuICAgIHRoaXMucmVtb3RlVmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xyXG4gICAgdGhpcy5yZW1vdGVWaWRlby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGUuc3RyZWFtKTtcclxuICAgIHRoaXMucmVtb3RlVmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY2xpZW50KCkge1xyXG4gICAgY29uc3QgcGVlciA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihTRVJWRVJTKTtcclxuICAgIHBlZXIub25pY2VjYW5kaWRhdGUgPSB0aGlzLmljZUNhbmRpZGF0ZS5iaW5kKHRoaXMsIHBlZXIpO1xyXG4gICAgcGVlci5vbmFkZHN0cmVhbSA9IHRoaXMuc3RyZWFtQWRkZWQuYmluZCh0aGlzKTtcclxuXHJcbiAgICAvLyBvbiBob3N0IGNhbmRpZGFuY3lcclxuICAgIHN5bmMuY2hpbGQoY2xpZW50UGF0aCkuY2hpbGQoJ2hvc3QvY2FuZGlkYXRlJykub24oJ3ZhbHVlJywgKGNhbkRhdGEpID0+IHtcclxuICAgICAgaWYgKCFjYW5EYXRhLnZhbCgpKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IEpTT04ucGFyc2UoY2FuRGF0YS52YWwoKSk7XHJcbiAgICAgIHBlZXIuYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoY2FuZGlkYXRlKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBvbiBob3N0IG9mZmVyXHJcbiAgICBzeW5jLmNoaWxkKGNsaWVudFBhdGgpLmNoaWxkKCdvZmZlcicpLm9uKCd2YWx1ZScsIChvZmZlckRhdGEpID0+IHtcclxuICAgICAgaWYgKCFvZmZlckRhdGEudmFsKCkpIHJldHVybjtcclxuICAgICAgY29uc3Qgb2ZmZXJWYWwgPSBKU09OLnBhcnNlKG9mZmVyRGF0YS52YWwoKSk7XHJcblxyXG4gICAgICBwZWVyLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24ob2ZmZXJWYWwpKTtcclxuICAgICAgcGVlci5jcmVhdGVBbnN3ZXIoKGRlc2MpID0+IHtcclxuICAgICAgICBwZWVyLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYyk7XHJcblxyXG4gICAgICAgIHN5bmMuY2hpbGQoY2xpZW50UGF0aCkudXBkYXRlKHtcclxuICAgICAgICAgIGFuc3dlcjogSlNPTi5zdHJpbmdpZnkoZGVzYyksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIG51bGwsIHtcclxuICAgICAgICBtYW5kYXRvcnk6IHtcclxuICAgICAgICAgIE9mZmVyVG9SZWNlaXZlQXVkaW86IHRydWUsXHJcbiAgICAgICAgICBPZmZlclRvUmVjZWl2ZVZpZGVvOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVGVsbCB0aGUgaG9zdCB3ZSdyZSBoZXJlLlxyXG4gICAgc3luYy5jaGlsZChjbGllbnRQYXRoKS5zZXQoe1xyXG4gICAgICBpZCwgLy8gTmVlZCB0byBzZXQgc29tZXRoaW5nIG9yIGl0IGRvZXNuJ3QgdHJpZ2dlciBhbnl0aGluZ1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBjYW4gb25seSBob3N0IG9uIGEgY2hyb21lIGFwcCBBVE1cclxuICBob3N0KCkge1xyXG4gICAgdGhpcy5jbGllbnRzID0ge307XHJcblxyXG4gICAgLy8gY2xlYXIgb3V0IG9sZCBkYXRhXHJcbiAgICBzeW5jLnJlbW92ZSgpO1xyXG4gICAgLy8gaGFuZGxlIGEgY2xpZW50IGJlaW5nIGFkZGVkLlxyXG4gICAgc3luYy5jaGlsZCgnY2xpZW50cycpLm9uKCdjaGlsZF9hZGRlZCcsIHRoaXMuY2xpZW50QWRkZWQuYmluZCh0aGlzKSk7XHJcbiAgICBjaHJvbWUuZGVza3RvcENhcHR1cmUuY2hvb3NlRGVza3RvcE1lZGlhKERFU0tUT1BfTUVESUEsIChzdHJlYW1JZCkgPT4ge1xyXG4gICAgICBpZiAoIXN0cmVhbUlkKSByZXR1cm47XHJcblxyXG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKHtcclxuICAgICAgICBhdWRpbzoge1xyXG4gICAgICAgICAgbWFuZGF0b3J5OiB7XHJcbiAgICAgICAgICAgIGNocm9tZU1lZGlhU291cmNlOiAnZGVza3RvcCcsXHJcbiAgICAgICAgICAgIGNocm9tZU1lZGlhU291cmNlSWQ6IHN0cmVhbUlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZGVvOiB7XHJcbiAgICAgICAgICBtYW5kYXRvcnk6IHtcclxuICAgICAgICAgICAgY2hyb21lTWVkaWFTb3VyY2U6ICdkZXNrdG9wJyxcclxuICAgICAgICAgICAgY2hyb21lTWVkaWFTb3VyY2VJZDogc3RyZWFtSWQsXHJcbiAgICAgICAgICAgIG1heFdpZHRoOiA4MDAsXHJcbiAgICAgICAgICAgIG1heEhlaWdodDogNjAwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LCAoc3RyZWFtKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2NhbFZpZGVvID0gc3RyZWFtO1xyXG4gICAgICAgIHRoaXMuYWRkU3RyZWFtKCk7XHJcbiAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAvLyBUT0RPOiBlcnJvciBsb2dnaW5nXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgc3RyZWFtIHRvIGV4aXN0aW5nIGNsaWVudHNcclxuICBhZGRTdHJlYW0oKSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNsaWVudHMpLmZvckVhY2goKGNsaWVudEtleSkgPT4ge1xyXG4gICAgICB0aGlzLmNsaWVudHNbY2xpZW50S2V5XS5wZWVyLmFkZFN0cmVhbSh0aGlzLmxvY2FsVmlkZW8pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGllbnRBZGRlZChjbGllbnREYXRhKSB7XHJcbiAgICBjb25zdCBjbGllbnQgPSBjbGllbnREYXRhLnZhbCgpO1xyXG4gICAgY29uc3QgY2xpZW50S2V5ID0gY2xpZW50RGF0YS5rZXkoKTtcclxuXHJcbiAgICBjb25zdCBwZWVyID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKFNFUlZFUlMpO1xyXG4gICAgcGVlci5vbmljZWNhbmRpZGF0ZSA9IHRoaXMuaWNlQ2FuZGlkYXRlLmJpbmQodGhpcywgY2xpZW50KTtcclxuXHJcbiAgICBjbGllbnQucGVlciA9IHBlZXI7XHJcbiAgICBjbGllbnQuc3luYyA9IHN5bmMuY2hpbGQoJ2NsaWVudHMvJy5jb25jYXQoY2xpZW50S2V5KSk7XHJcbiAgICB0aGlzLmNsaWVudHNbY2xpZW50S2V5XSA9IGNsaWVudDtcclxuXHJcbiAgICBwZWVyLm9ubmVnb3RpYXRpb25uZWVkZWQgPSAoKSA9PiB7XHJcbiAgICAgIHBlZXIuY3JlYXRlT2ZmZXIoKGRlc2MpID0+IHtcclxuICAgICAgICBwZWVyLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYyk7XHJcblxyXG4gICAgICAgIC8vIGdpdmUgY2xpZW50IG91ciBvZmZlclxyXG4gICAgICAgIGNsaWVudC5zeW5jLnVwZGF0ZSh7XHJcbiAgICAgICAgICBvZmZlcjogSlNPTi5zdHJpbmdpZnkoZGVzYyksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGljZSBkYXRhXHJcbiAgICAgICAgY2xpZW50LnN5bmMuY2hpbGQoJ2NhbmRpZGF0ZScpLm9uKCd2YWx1ZScsIChjYW5kaWRhdGVEYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWNhbmRpZGF0ZURhdGEudmFsKCkpIHJldHVybjtcclxuICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IEpTT04ucGFyc2UoY2FuZGlkYXRlRGF0YS52YWwoKSk7XHJcbiAgICAgICAgICBwZWVyLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjbGllbnQgdG9sZCB1cyBpdHMgYW5zd2VyXHJcbiAgICAgICAgY2xpZW50LnN5bmMuY2hpbGQoJ2Fuc3dlcicpLm9uKCd2YWx1ZScsIChhbnN3ZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWFuc3dlckRhdGEudmFsKCkpIHJldHVybjtcclxuICAgICAgICAgIHBlZXIuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihKU09OLnBhcnNlKGFuc3dlckRhdGEudmFsKCkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIG51bGwsIHtcclxuICAgICAgICBtYW5kYXRvcnk6IHtcclxuICAgICAgICAgIE9mZmVyVG9SZWNlaXZlQXVkaW86IHRydWUsXHJcbiAgICAgICAgICBPZmZlclRvUmVjZWl2ZVZpZGVvOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBpZiB0aGUgc3RyZWFtIGlzIGVzdGFibGlzaGVkIGFkZCBpdFxyXG4gICAgaWYgKHRoaXMubG9jYWxWaWRlbykge1xyXG4gICAgICBwZWVyLmFkZFN0cmVhbSh0aGlzLmxvY2FsVmlkZW8pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gQWx0c3BhY2VSVEM7XHJcbn1cclxuIl19
