import MultiCanvas from 'altmulticanvas';
// import SyncPad from '../Behavior/SyncPad';

const geom = new THREE.BoxGeometry(40, 40, 40);
const buttons = [
  [0, 0, 'a'],
  [25, -50, 's'],
  [25, 50, 'w'],
  [50, 0, 'd'],
  [200, -25, 'r'],
  [200, 25, 't'],
  [250, -25, 'f'],
  [250, 25, 'g'],
  [300, -25, 'y'],
  [300, 25, 'h']
];

const host = MultiCanvas(document.getElementById('target'));
window.host = host;
class Screen extends THREE.Object3D {
  constructor() {
    super();

    buttons.forEach(this.makeButton.bind(this));
    // this.addBehaviors(new SyncPad(host));
    this.position.set(0, -400, 0);
  }

  makeButton([x, y, key]) {
    const button = new THREE.Mesh(
      geom,
      new THREE.MeshBasicMaterial({ color: '#ffffff' })
    );

    button.addEventListener('cursordown', this.cursordown.bind(this, key, button));
    button.addEventListener('cursorup', this.cursorup.bind(this, key, button));
    button.position.set(x, y, 0);

    this.add(button);
  }

  cursordown(key, button) {
    host.triggerKey('keydown', key);
    button.material.color.set('#ff0000');
  }

  cursorup(key, button) {
    host.triggerKey('keyup', key);
    host.triggerKey('keypress', key);
    button.material.color.set('#ffffff');
  }
}

export default Screen;
