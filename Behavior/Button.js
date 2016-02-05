class Button {
  awake(o) {
    this.object3d = o;
    this.cursordown = this.cursordown.bind(this);
    this.cursorup = this.cursorup.bind(this);
    this.pressed = false;

    this.object3d.addEventListener('cursordown', this.cursordown);
    this.object3d.addEventListener('cursorup', this.cursorup);
  }

  cursordown() {
    this.object3d.addEventListener('cursorleave', this.cursorup);
    this.object3d.dispatch('buttondown');
    this.pressed = true;
  }

  cursorup() {
    this.object3d.removeEventListener('cursorleave', this.cursordown);
    this.object3d.addEventListener('cursorenter', this.cursordown);
    this.object3d.dispatch('buttonup');

    if (this.pressed) {
      this.object3d.dispatch('buttonpress');
      this.pressed = false;
    }
  }

  dispose() {
    // Bulk remove even if they're not on the object
    this.object3d.removeEventListener('cursorleave', this.cursorup);
    this.object3d.removeEventListener('cursordown', this.cursordown);
    this.object3d.removeEventListener('cursorup', this.cursorup);
    this.object3d.removeEventListener('cursorenter', this.cursordown);
  }
}

export default Button;
