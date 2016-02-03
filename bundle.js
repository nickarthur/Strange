(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _altmulticanvas = require('altmulticanvas');

var _altmulticanvas2 = _interopRequireDefault(_altmulticanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import SyncPad from '../Behavior/SyncPad';

var geom = new THREE.BoxGeometry(40, 40, 40);
var buttons = [[0, 0, 'a'], [25, -50, 's'], [25, 50, 'w'], [50, 0, 'd'], [200, -25, 'r'], [200, 25, 't'], [250, -25, 'f'], [250, 25, 'g'], [300, -25, 'y'], [300, 25, 'h']];

var host = (0, _altmulticanvas2.default)(document.getElementById('target'));
window.host = host;

var Screen = function (_THREE$Object3D) {
  _inherits(Screen, _THREE$Object3D);

  function Screen() {
    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Screen).call(this));

    buttons.forEach(_this.makeButton.bind(_this));
    // this.addBehaviors(new SyncPad(host));
    _this.position.set(0, -400, 0);
    return _this;
  }

  _createClass(Screen, [{
    key: 'makeButton',
    value: function makeButton(_ref) {
      var _ref2 = _slicedToArray(_ref, 3);

      var x = _ref2[0];
      var y = _ref2[1];
      var key = _ref2[2];

      var button = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: '#ffffff' }));

      button.addEventListener('cursordown', this.cursordown.bind(this, key, button));
      button.addEventListener('cursorup', this.cursorup.bind(this, key, button));
      button.position.set(x, y, 0);

      this.add(button);
    }
  }, {
    key: 'cursordown',
    value: function cursordown(key, button) {
      host.triggerKey('keydown', key);
      button.material.color.set('#ff0000');
    }
  }, {
    key: 'cursorup',
    value: function cursorup(key, button) {
      host.triggerKey('keyup', key);
      host.triggerKey('keypress', key);
      button.material.color.set('#ffffff');
    }
  }]);

  return Screen;
}(THREE.Object3D);

exports.default = Screen;

},{"altmulticanvas":3}],2:[function(require,module,exports){
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

},{"./Entity/Screen":1}],3:[function(require,module,exports){
/* global altspace */

var Chainable = (function() {
    "use strict";
    
    return function unit(value) {
        var chains = {
            bind : function(fn, args) { 
                var results = fn.apply(this, [value].concat(Array.prototype.slice.apply(args || [])));
                if(typeof results === "undefined") {
                    return this;  
                } else {
                    return results;
                }
            },
            wrap : function(fn) {
                var self = this;
                return function() { return self.bind.call(self, fn, arguments) };
            },
            lift : function(property, fn) {
                this[property] = this.wrap(fn);
                return this;
            },
            property : function(property, get, set) {
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: true,
                    get: get ? this.wrap(get) : undefined,
                    set: set ? this.wrap(set) : undefined
                });
                return this;
            }
        };
        
        return Object.create(chains);
    };
} ());

var MultiCanvas = (function() {
    "use strict";
    
    var Simulate = (function() {
            var eventMatchers = {
                    "HTMLEvents": /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
                    "MouseEvents": /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
                    "KeyboardEvents": /^(?:keydown|keyup|keypress)$/
                };

            return function (element, options) {
                var oEvent, 
                    eventType;
                
                // really dislike this part
                // a guard would work here :/
                for (var name in eventMatchers) {
                    if (eventMatchers[name].test(options.type)) { 
                        eventType = name; break; 
                    }
                }
                // TODO: mouse events should be an offset based on where on the canvas they clicked
                switch(eventType) {
                    case "MouseEvents":
                        oEvent = new MouseEvent(options.type, {});
                        break;
                    case "KeyboardEvents":
                        oEvent = new KeyboardEvent(options.type, {});
                        
                        // why
                        Object.defineProperty(oEvent, "keyCode", {
                            get : function() { return options.keyCode; }
                        });
                        
                        Object.defineProperty(oEvent, "which", {
                            get : function() { return options.keyCode; }
                        });
                        break;
                    default:
                        oEvent = new Event(options.type, options);
                }
                element.dispatchEvent(oEvent);

                return element;
            };
        } ());

    return function(canvas) {
        var sync = altspace.utilities.sync.getInstance({
                appId : "MultiCanvas",
                authorId: "Galvus"
            }),
            key = 'ilqzkt5p2dcmcxr',
            peer = new Peer({key: key}),
            userInfo = null,
            userPromise = null,
            hostInt = null,
            isHost = false,
            lossless = false,
            quality = 0.5,
            eventTarget,
            conns = [],
            remote = null,
            ctx = canvas.getContext("2d"),
            hostSetup = function(tickRate) {
                peer = new Peer(userInfo.userId, { key : key });
                window.hostPeer = peer;
                sync.set({ host : userInfo.userId });
                hostInt = setInterval(onTick, tickRate);
                peer.on("connection", function(conn) {
                  conns.push(conn);
                  conn.on("close", function() {
                    conns.splice(conns.indexOf(conn), 1)
                  });
                  conn.on("data", function(data) {
                    Simulate(eventTarget, JSON.parse(data.event));
                  });
                }); 
            },
            onTick = function() {
                var payload = lossless ? 
                    canvas.toDataURL("image/png") :
                    canvas.toDataURL("image/jpeg", quality);
                
                conns.forEach(function(conn) {
                  conn.send({ canvas : payload });
                });
            },
            onEvent = function(e) {
                // I could care about sending only defined data... or I couldn't.
                if(e.preventDefault) {
                    e.preventDefault();
                }
                
                remote.send({ 
                    event : JSON.stringify({
                        type     : e.type,
                        keyCode  : e.keyCode,
                        charCode : e.charCode,
                        screenX  : e.screenX,
                        screenY  : e.screenY,
                        clientX  : e.clientX,
                        clientY  : e.clientY,
                        button   : e.button
                    })
                });
            };
        
        window.clientPeer = peer;
        
        function toKeyCode(key) {
            if(key >= "a" && key <= "z") {
                return key.charCodeAt(0) - 97 + 65;
            }
            
            switch(key) {
                case "enter": return 13;
            }
        }
        
        // grab user info ?
        if(false && altspace.inClient) {    
            userPromise = altspace.getUser().then(function(rUserInfo) {
                userInfo = rUserInfo;
            });
        } else {
            userInfo = {
                userId : "Asdb" + Math.floor(Math.random() * 100)
            };
        }
        
        sync.child("host").on("value", function(data) {
            isHost = data.val() === (userInfo && userInfo.userId);
            if(hostInt && !isHost) {
                clearInterval(hostInt);
            }
            
            if(!isHost) {
              remote = peer.connect(data.val());
              remote.on("data", function(data) {
                var img = new Image();
                img.src = data.canvas;
                img.onload = function() {
                    ctx.drawImage(img, 0, 0);
                };
              });
            }
        });

        return Chainable(canvas)
            .lift("host", function(canvas, tickRate) {
                if(!userInfo) {
                    userPromise.then(hostSetup.bind(null, tickRate));
                } else {
                    hostSetup(tickRate);
                }
            })
            .property("sync", function(canvas) {
                return sync;  
            })
            .property("lossless", function(canvas){
                return lossless;
            }, function(canvas, plossless) {
                lossless = plossless;
            })
            .property("quality", function(canvas) {
                return quality;
            }, function(canvas, pquality) {
                quality = pquality;
            })
            .lift("sim", function(canvas, e) {
                if(isHost) {
                    if(eventTarget) {
                        Simulate(eventTarget, e);
                    }
                } else {
                    onEvent(e);
                }
            })
            .lift("triggerKey", function(canvas, type, key) {
                this.sim({
                    type : type,
                    keyCode : toKeyCode(key)
                });
            })
            .lift("events", function(canvas, target, events) {
                target = target || canvas;
                
                if(!isHost) {
                    events.forEach(function(event) {
                        target.addEventListener(event, onEvent);
                    });
                } else {
                    eventTarget = target;
                }
            });
    };
} ());

if((window.module || module) && module.exports) {
  module.exports = MultiCanvas;
}
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFbnRpdHlcXFNjcmVlbi5qcyIsImFwcC5qcyIsIm5vZGVfbW9kdWxlcy9hbHRtdWx0aWNhbnZhcy9tdWx0aWNhbnZhcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBLElBQU0sT0FBTyxJQUFJLE1BQU0sV0FBTixDQUFrQixFQUF0QixFQUEwQixFQUExQixFQUE4QixFQUE5QixDQUFQO0FBQ04sSUFBTSxVQUFVLENBQ2QsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLEdBQVAsQ0FEYyxFQUVkLENBQUMsRUFBRCxFQUFLLENBQUMsRUFBRCxFQUFLLEdBQVYsQ0FGYyxFQUdkLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxHQUFULENBSGMsRUFJZCxDQUFDLEVBQUQsRUFBSyxDQUFMLEVBQVEsR0FBUixDQUpjLEVBS2QsQ0FBQyxHQUFELEVBQU0sQ0FBQyxFQUFELEVBQUssR0FBWCxDQUxjLEVBTWQsQ0FBQyxHQUFELEVBQU0sRUFBTixFQUFVLEdBQVYsQ0FOYyxFQU9kLENBQUMsR0FBRCxFQUFNLENBQUMsRUFBRCxFQUFLLEdBQVgsQ0FQYyxFQVFkLENBQUMsR0FBRCxFQUFNLEVBQU4sRUFBVSxHQUFWLENBUmMsRUFTZCxDQUFDLEdBQUQsRUFBTSxDQUFDLEVBQUQsRUFBSyxHQUFYLENBVGMsRUFVZCxDQUFDLEdBQUQsRUFBTSxFQUFOLEVBQVUsR0FBVixDQVZjLENBQVY7O0FBYU4sSUFBTSxPQUFPLDhCQUFZLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFaLENBQVA7QUFDTixPQUFPLElBQVAsR0FBYyxJQUFkOztJQUNNOzs7QUFDSixXQURJLE1BQ0osR0FBYzswQkFEVixRQUNVOzt1RUFEVixvQkFDVTs7QUFHWixZQUFRLE9BQVIsQ0FBZ0IsTUFBSyxVQUFMLENBQWdCLElBQWhCLE9BQWhCOztBQUhZLFNBS1osQ0FBSyxR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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNdWx0aUNhbnZhcyBmcm9tICdhbHRtdWx0aWNhbnZhcyc7XHJcbi8vIGltcG9ydCBTeW5jUGFkIGZyb20gJy4uL0JlaGF2aW9yL1N5bmNQYWQnO1xyXG5cclxuY29uc3QgZ2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg0MCwgNDAsIDQwKTtcclxuY29uc3QgYnV0dG9ucyA9IFtcclxuICBbMCwgMCwgJ2EnXSxcclxuICBbMjUsIC01MCwgJ3MnXSxcclxuICBbMjUsIDUwLCAndyddLFxyXG4gIFs1MCwgMCwgJ2QnXSxcclxuICBbMjAwLCAtMjUsICdyJ10sXHJcbiAgWzIwMCwgMjUsICd0J10sXHJcbiAgWzI1MCwgLTI1LCAnZiddLFxyXG4gIFsyNTAsIDI1LCAnZyddLFxyXG4gIFszMDAsIC0yNSwgJ3knXSxcclxuICBbMzAwLCAyNSwgJ2gnXVxyXG5dO1xyXG5cclxuY29uc3QgaG9zdCA9IE11bHRpQ2FudmFzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXJnZXQnKSk7XHJcbndpbmRvdy5ob3N0ID0gaG9zdDtcclxuY2xhc3MgU2NyZWVuIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2godGhpcy5tYWtlQnV0dG9uLmJpbmQodGhpcykpO1xyXG4gICAgLy8gdGhpcy5hZGRCZWhhdmlvcnMobmV3IFN5bmNQYWQoaG9zdCkpO1xyXG4gICAgdGhpcy5wb3NpdGlvbi5zZXQoMCwgLTQwMCwgMCk7XHJcbiAgfVxyXG5cclxuICBtYWtlQnV0dG9uKFt4LCB5LCBrZXldKSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBuZXcgVEhSRUUuTWVzaChcclxuICAgICAgZ2VvbSxcclxuICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6ICcjZmZmZmZmJyB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY3Vyc29yZG93bicsIHRoaXMuY3Vyc29yZG93bi5iaW5kKHRoaXMsIGtleSwgYnV0dG9uKSk7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY3Vyc29ydXAnLCB0aGlzLmN1cnNvcnVwLmJpbmQodGhpcywga2V5LCBidXR0b24pKTtcclxuICAgIGJ1dHRvbi5wb3NpdGlvbi5zZXQoeCwgeSwgMCk7XHJcblxyXG4gICAgdGhpcy5hZGQoYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIGN1cnNvcmRvd24oa2V5LCBidXR0b24pIHtcclxuICAgIGhvc3QudHJpZ2dlcktleSgna2V5ZG93bicsIGtleSk7XHJcbiAgICBidXR0b24ubWF0ZXJpYWwuY29sb3Iuc2V0KCcjZmYwMDAwJyk7XHJcbiAgfVxyXG5cclxuICBjdXJzb3J1cChrZXksIGJ1dHRvbikge1xyXG4gICAgaG9zdC50cmlnZ2VyS2V5KCdrZXl1cCcsIGtleSk7XHJcbiAgICBob3N0LnRyaWdnZXJLZXkoJ2tleXByZXNzJywga2V5KTtcclxuICAgIGJ1dHRvbi5tYXRlcmlhbC5jb2xvci5zZXQoJyNmZmZmZmYnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjcmVlbjtcclxuIiwiaW1wb3J0IFNjcmVlbiBmcm9tICcuL0VudGl0eS9TY3JlZW4nO1xyXG5cclxuY29uc3Qgc2ltID0gYWx0c3BhY2UudXRpbGl0aWVzLlNpbXVsYXRpb24oKTtcclxuY29uc3QgaW5zdGFuY2VCYXNlID0gYWx0c3BhY2UudXRpbGl0aWVzLnN5bmMuZ2V0SW5zdGFuY2Uoe1xyXG4gIGF1dGhvcklkOiAnYWx0c3BhY2UnXHJcbn0pO1xyXG5cclxuY29uc3Qgc2NlbmVTeW5jID0gYWx0c3BhY2UudXRpbGl0aWVzLmJlaGF2aW9ycy5TY2VuZVN5bmMoaW5zdGFuY2VCYXNlLCB7XHJcbiAgcmVhZHkoLyogZmlyc3RJbnN0YW5jZSAqLykge1xyXG4gICAgc2ltLnNjZW5lLmFkZChuZXcgU2NyZWVuKGluc3RhbmNlQmFzZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG5zaW0uc2NlbmUuYWRkQmVoYXZpb3Ioc2NlbmVTeW5jKTtcclxuIiwiLyogZ2xvYmFsIGFsdHNwYWNlICovXHJcblxyXG52YXIgQ2hhaW5hYmxlID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBcclxuICAgIHJldHVybiBmdW5jdGlvbiB1bml0KHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNoYWlucyA9IHtcclxuICAgICAgICAgICAgYmluZCA6IGZ1bmN0aW9uKGZuLCBhcmdzKSB7IFxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBmbi5hcHBseSh0aGlzLCBbdmFsdWVdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJncyB8fCBbXSkpKTtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiByZXN1bHRzID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7ICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdyYXAgOiBmdW5jdGlvbihmbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2VsZi5iaW5kLmNhbGwoc2VsZiwgZm4sIGFyZ3VtZW50cykgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGlmdCA6IGZ1bmN0aW9uKHByb3BlcnR5LCBmbikge1xyXG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eV0gPSB0aGlzLndyYXAoZm4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb3BlcnR5IDogZnVuY3Rpb24ocHJvcGVydHksIGdldCwgc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHksIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldCA/IHRoaXMud3JhcChnZXQpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldDogc2V0ID8gdGhpcy53cmFwKHNldCkgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKGNoYWlucyk7XHJcbiAgICB9O1xyXG59ICgpKTtcclxuXHJcbnZhciBNdWx0aUNhbnZhcyA9IChmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgXHJcbiAgICB2YXIgU2ltdWxhdGUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudE1hdGNoZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiSFRNTEV2ZW50c1wiOiAvXig/OmxvYWR8dW5sb2FkfGFib3J0fGVycm9yfHNlbGVjdHxjaGFuZ2V8c3VibWl0fHJlc2V0fGZvY3VzfGJsdXJ8cmVzaXplfHNjcm9sbCkkLyxcclxuICAgICAgICAgICAgICAgICAgICBcIk1vdXNlRXZlbnRzXCI6IC9eKD86Y2xpY2t8ZGJsY2xpY2t8bW91c2UoPzpkb3dufHVwfG92ZXJ8bW92ZXxvdXQpKSQvLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiS2V5Ym9hcmRFdmVudHNcIjogL14oPzprZXlkb3dufGtleXVwfGtleXByZXNzKSQvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb0V2ZW50LCBcclxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHJlYWxseSBkaXNsaWtlIHRoaXMgcGFydFxyXG4gICAgICAgICAgICAgICAgLy8gYSBndWFyZCB3b3VsZCB3b3JrIGhlcmUgOi9cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZXZlbnRNYXRjaGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudE1hdGNoZXJzW25hbWVdLnRlc3Qob3B0aW9ucy50eXBlKSkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gbmFtZTsgYnJlYWs7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IG1vdXNlIGV2ZW50cyBzaG91bGQgYmUgYW4gb2Zmc2V0IGJhc2VkIG9uIHdoZXJlIG9uIHRoZSBjYW52YXMgdGhleSBjbGlja2VkXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goZXZlbnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1vdXNlRXZlbnRzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9FdmVudCA9IG5ldyBNb3VzZUV2ZW50KG9wdGlvbnMudHlwZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiS2V5Ym9hcmRFdmVudHNcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb0V2ZW50ID0gbmV3IEtleWJvYXJkRXZlbnQob3B0aW9ucy50eXBlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9FdmVudCwgXCJrZXlDb2RlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldCA6IGZ1bmN0aW9uKCkgeyByZXR1cm4gb3B0aW9ucy5rZXlDb2RlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9FdmVudCwgXCJ3aGljaFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQgOiBmdW5jdGlvbigpIHsgcmV0dXJuIG9wdGlvbnMua2V5Q29kZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb0V2ZW50ID0gbmV3IEV2ZW50KG9wdGlvbnMudHlwZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQob0V2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9ICgpKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oY2FudmFzKSB7XHJcbiAgICAgICAgdmFyIHN5bmMgPSBhbHRzcGFjZS51dGlsaXRpZXMuc3luYy5nZXRJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgICAgICBhcHBJZCA6IFwiTXVsdGlDYW52YXNcIixcclxuICAgICAgICAgICAgICAgIGF1dGhvcklkOiBcIkdhbHZ1c1wiXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBrZXkgPSAnaWxxemt0NXAyZGNtY3hyJyxcclxuICAgICAgICAgICAgcGVlciA9IG5ldyBQZWVyKHtrZXk6IGtleX0pLFxyXG4gICAgICAgICAgICB1c2VySW5mbyA9IG51bGwsXHJcbiAgICAgICAgICAgIHVzZXJQcm9taXNlID0gbnVsbCxcclxuICAgICAgICAgICAgaG9zdEludCA9IG51bGwsXHJcbiAgICAgICAgICAgIGlzSG9zdCA9IGZhbHNlLFxyXG4gICAgICAgICAgICBsb3NzbGVzcyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBxdWFsaXR5ID0gMC41LFxyXG4gICAgICAgICAgICBldmVudFRhcmdldCxcclxuICAgICAgICAgICAgY29ubnMgPSBbXSxcclxuICAgICAgICAgICAgcmVtb3RlID0gbnVsbCxcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgaG9zdFNldHVwID0gZnVuY3Rpb24odGlja1JhdGUpIHtcclxuICAgICAgICAgICAgICAgIHBlZXIgPSBuZXcgUGVlcih1c2VySW5mby51c2VySWQsIHsga2V5IDoga2V5IH0pO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhvc3RQZWVyID0gcGVlcjtcclxuICAgICAgICAgICAgICAgIHN5bmMuc2V0KHsgaG9zdCA6IHVzZXJJbmZvLnVzZXJJZCB9KTtcclxuICAgICAgICAgICAgICAgIGhvc3RJbnQgPSBzZXRJbnRlcnZhbChvblRpY2ssIHRpY2tSYXRlKTtcclxuICAgICAgICAgICAgICAgIHBlZXIub24oXCJjb25uZWN0aW9uXCIsIGZ1bmN0aW9uKGNvbm4pIHtcclxuICAgICAgICAgICAgICAgICAgY29ubnMucHVzaChjb25uKTtcclxuICAgICAgICAgICAgICAgICAgY29ubi5vbihcImNsb3NlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5zLnNwbGljZShjb25ucy5pbmRleE9mKGNvbm4pLCAxKVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgY29ubi5vbihcImRhdGFcIiwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFNpbXVsYXRlKGV2ZW50VGFyZ2V0LCBKU09OLnBhcnNlKGRhdGEuZXZlbnQpKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSBsb3NzbGVzcyA/IFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIikgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIsIHF1YWxpdHkpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm4pIHtcclxuICAgICAgICAgICAgICAgICAgY29ubi5zZW5kKHsgY2FudmFzIDogcGF5bG9hZCB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkV2ZW50ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSSBjb3VsZCBjYXJlIGFib3V0IHNlbmRpbmcgb25seSBkZWZpbmVkIGRhdGEuLi4gb3IgSSBjb3VsZG4ndC5cclxuICAgICAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlbW90ZS5zZW5kKHsgXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgIDogZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlDb2RlICA6IGUua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgOiBlLmNoYXJDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5YICA6IGUuc2NyZWVuWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuWSAgOiBlLnNjcmVlblksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFggIDogZS5jbGllbnRYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRZICA6IGUuY2xpZW50WSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uICAgOiBlLmJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cuY2xpZW50UGVlciA9IHBlZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdG9LZXlDb2RlKGtleSkge1xyXG4gICAgICAgICAgICBpZihrZXkgPj0gXCJhXCIgJiYga2V5IDw9IFwielwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmNoYXJDb2RlQXQoMCkgLSA5NyArIDY1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2goa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW50ZXJcIjogcmV0dXJuIDEzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdyYWIgdXNlciBpbmZvID9cclxuICAgICAgICBpZihmYWxzZSAmJiBhbHRzcGFjZS5pbkNsaWVudCkgeyAgICBcclxuICAgICAgICAgICAgdXNlclByb21pc2UgPSBhbHRzcGFjZS5nZXRVc2VyKCkudGhlbihmdW5jdGlvbihyVXNlckluZm8pIHtcclxuICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gclVzZXJJbmZvO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1c2VySW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZCA6IFwiQXNkYlwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzeW5jLmNoaWxkKFwiaG9zdFwiKS5vbihcInZhbHVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaXNIb3N0ID0gZGF0YS52YWwoKSA9PT0gKHVzZXJJbmZvICYmIHVzZXJJbmZvLnVzZXJJZCk7XHJcbiAgICAgICAgICAgIGlmKGhvc3RJbnQgJiYgIWlzSG9zdCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChob3N0SW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWlzSG9zdCkge1xyXG4gICAgICAgICAgICAgIHJlbW90ZSA9IHBlZXIuY29ubmVjdChkYXRhLnZhbCgpKTtcclxuICAgICAgICAgICAgICByZW1vdGUub24oXCJkYXRhXCIsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBkYXRhLmNhbnZhcztcclxuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBDaGFpbmFibGUoY2FudmFzKVxyXG4gICAgICAgICAgICAubGlmdChcImhvc3RcIiwgZnVuY3Rpb24oY2FudmFzLCB0aWNrUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIXVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlclByb21pc2UudGhlbihob3N0U2V0dXAuYmluZChudWxsLCB0aWNrUmF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBob3N0U2V0dXAodGlja1JhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucHJvcGVydHkoXCJzeW5jXCIsIGZ1bmN0aW9uKGNhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5bmM7ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnByb3BlcnR5KFwibG9zc2xlc3NcIiwgZnVuY3Rpb24oY2FudmFzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb3NzbGVzcztcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oY2FudmFzLCBwbG9zc2xlc3MpIHtcclxuICAgICAgICAgICAgICAgIGxvc3NsZXNzID0gcGxvc3NsZXNzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucHJvcGVydHkoXCJxdWFsaXR5XCIsIGZ1bmN0aW9uKGNhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGNhbnZhcywgcHF1YWxpdHkpIHtcclxuICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBwcXVhbGl0eTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmxpZnQoXCJzaW1cIiwgZnVuY3Rpb24oY2FudmFzLCBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpc0hvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihldmVudFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTaW11bGF0ZShldmVudFRhcmdldCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkV2ZW50KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAubGlmdChcInRyaWdnZXJLZXlcIiwgZnVuY3Rpb24oY2FudmFzLCB0eXBlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2ltKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlIDogdG9LZXlDb2RlKGtleSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAubGlmdChcImV2ZW50c1wiLCBmdW5jdGlvbihjYW52YXMsIHRhcmdldCwgZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgY2FudmFzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighaXNIb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59ICgpKTtcclxuXHJcbmlmKCh3aW5kb3cubW9kdWxlIHx8IG1vZHVsZSkgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IE11bHRpQ2FudmFzO1xyXG59Il19
