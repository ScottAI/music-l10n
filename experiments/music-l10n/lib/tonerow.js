// tone row experiments

/**

  MODEL

  ToneRow is an ordered collection of the pitches of a given tuning.

  @see http://www.musictheory.net/calculators/matrix
  @see http://composertools.com/Tools/matrix/MatrixCalc.html

**/

export function ToneRow(prime, tuning) {
  this.prime = prime;
  this.tuning = tuning;
}

ToneRow.prototype._transpose = function(delta) {
  return function(pitch) {
    return (pitch + delta).mod(this.tuning.pitches.length);
  }.bind(this);
}

ToneRow.prototype._invert = function(delta) {
  return function(pitch) {
    return (delta - pitch).mod(this.tuning.pitches.length);
  }.bind(this);
}

ToneRow.prototype.transpose = function(delta) {
  return this.prime.map(this._transpose(delta));
}

ToneRow.prototype.invert = function(delta) {
  return this.prime.map(this._invert(delta));
}

ToneRow.prototype.retrograde = function(delta) {
  return this.prime.slice().reverse().map(this._transpose(delta));
}

ToneRow.prototype.rotate = function(cycle, delta) {
  var pitches = this.prime.slice();
  var head = pitches.splice(0, cycle.mod(pitches.length));
  pitches.push.apply(pitches, head);
  return pitches.map(this._transpose(delta));
}

ToneRow.prototype.matrix = function() {
  return this.prime.map(function(pitch) {
    return this.transpose( this._invert(0)(pitch) );
  }.bind(this));
}