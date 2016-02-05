import ButtonBehavior from '../Behavior/Button';

const geom = new THREE.BoxGeometry(40, 40, 40);

class GameButton extends THREE.Mesh {
  constructor(x, y, key, host) {
    super(
      geom,
      new THREE.MeshBasicMaterial({ color: '#ffffff' })
    );

    this.addBehaviors(new ButtonBehavior());
    this.key = key;
    this.host = host;

    this.addEventListener('buttondown', this.buttondown.bind(this));
    this.addEventListener('buttonup', this.buttonup.bind(this));
    this.position.set(x, y, 0);
  }

  buttondown() {
    this.host.triggerKey('keydown', this.key);
    this.material.color.set('#ff0000');
  }

  buttonup() {
    this.host.triggerKey('keyup', this.key);
    this.host.triggerKey('keypress', this.key);
    this.material.color.set('#ffffff');
  }
}

export default GameButton;
