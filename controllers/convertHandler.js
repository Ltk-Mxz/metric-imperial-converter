function ConvertHandler() {
  const unitsMap = {
    gal: { returnUnit: 'L', spellOut: 'gallons', conversion: 3.78541 },
    L:   { returnUnit: 'gal', spellOut: 'liters', conversion: 1 / 3.78541 },
    mi:  { returnUnit: 'km', spellOut: 'miles', conversion: 1.60934 },
    km:  { returnUnit: 'mi', spellOut: 'kilometers', conversion: 1 / 1.60934 },
    lbs: { returnUnit: 'kg', spellOut: 'pounds', conversion: 0.453592 },
    kg:  { returnUnit: 'lbs', spellOut: 'kilograms', conversion: 1 / 0.453592 }
  };

  this.getNum = function(input) {
    let result = input.match(/^[\d\.\/]+/);
    if (!result) return 1;

    const numStr = result[0];
    const parts = numStr.split('/');

    if (parts.length > 2) return 'invalid number';

    let num;
    if (parts.length === 2) {
      num = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      num = parseFloat(parts[0]);
    }

    return isNaN(num) ? 'invalid number' : num;
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    const unit = result[0].toLowerCase();
    if (unit === 'l') return 'L';

    return unitsMap[unit] ? unit : 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    if (initUnit === 'L') return unitsMap['L'].returnUnit;
    return unitsMap[initUnit.toLowerCase()].returnUnit;
  };

  this.spellOutUnit = function(unit) {
    if (unit === 'L') return unitsMap['L'].spellOut;
    return unitsMap[unit.toLowerCase()].spellOut;
  };

  this.convert = function(initNum, initUnit) {
    if (initUnit === 'L') return parseFloat((initNum * unitsMap['L'].conversion).toFixed(5));
    return parseFloat((initNum * unitsMap[initUnit.toLowerCase()].conversion).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initSpelled = this.spellOutUnit(initUnit);
    const returnSpelled = this.spellOutUnit(returnUnit);
    return `${initNum} ${initSpelled} converts to ${returnNum} ${returnSpelled}`;
  };
}

module.exports = ConvertHandler;
