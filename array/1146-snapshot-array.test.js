/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.arr = new Array(length).fill(0);
  this.snaps = 0;
  this.snapshots = new Map();
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  this.arr[index] = val;
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  this.snaps++;
  const snap_id = this.snaps - 1;
  this.snapshots.set(snap_id, JSON.stringify(this.arr));
  return snap_id;
};

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  if (!this.snapshots.has(snap_id)) return null;

  const snap = JSON.parse(this.snapshots.get(snap_id))[index];

  return snap;
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
