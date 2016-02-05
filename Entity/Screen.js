import GameButton from './GameButton';
import AltspaceRTC from '../scripts/altspacertc';

const buttons = [
  // coins and widgets
  [-500, -500, '1'],
  [-450, -500, '2'],
  [-400, -500, '5'],
  [-350, -500, 'F2'],

  // player 1
  [0, 0, 'left'],
  [25, -50, 'down'],
  [25, 50, 'up'],
  [50, 0, 'right'],
  [200, -25, 'ctrl'],
  /* Not needed yet
  [200, 25, 'z'],
  [250, -25, 'x'],
  [250, 25, 'c'], */

  // player 2
  [0 - 500, 0, 'd'],
  [25 - 500, -50, 'down'],
  [25 - 500, 50, 'up'],
  [50 - 500, 0, 'g'],
  [200 - 500, -25, 'a'],
  /* Not needed yet
  [200 - 500, 25, 'z'],
  [250 - 500, -25, 'x'],
  [250 - 500, 25, 'c'] */
];

class Screen extends THREE.Object3D {
  constructor() {
    super();

    buttons.forEach(this.makeButton.bind(this));
    this.position.set(0, -400, 0);
    this.stream = new AltspaceRTC();

    // Add a black background
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 2000, 10),
      new THREE.MeshBasicMaterial({ color: '#000000' })
    );

    box.position.z = -10;
    this.add(box);
  }

  makeButton([x, y, key]) {
    this.add(new GameButton(x, y, key));
  }
}

export default Screen;
