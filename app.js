import Screen from './Entity/Screen';

const sim = altspace.utilities.Simulation();
const instanceBase = altspace.utilities.sync.getInstance({
  authorId: 'altspace',
});

const sceneSync = altspace.utilities.behaviors.SceneSync(instanceBase, {
  ready(/* firstInstance */) {
    sim.scene.add(new Screen(instanceBase));
  },
});

sim.scene.addBehavior(sceneSync);
