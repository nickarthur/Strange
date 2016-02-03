import Behavior from './Behavior';

class ChangeColor extends Behavior {
  awake(o) {
    super.awake(o);

  }

  cursordown() {

  }

  cursorup() {

  }

  update(/* deltaTime */) {
    if (this.syncData.color !== this.lastColor) {
      this.lastColor = this.syncData.color;
      this.o3d.material.color = new THREE.Color(this.syncData.color);
      this.o3d.material.needsUpdate = true;
    }
  }
}

export default ChangeColor;
