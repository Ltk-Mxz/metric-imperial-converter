const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('Whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Decimal input', function() {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('Fractional input', function() {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  test('Fractional input with decimal', function() {
    assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.01);
  });

  test('Invalid input (double fraction)', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('No numerical input', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Valid unit input', function() {
    const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    input.forEach(function(ele) {
      assert.notEqual(convertHandler.getUnit(ele), 'invalid unit');
    });
  });

  test('Unknown unit input', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Return correct unit', function() {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expect = ['L','gal','km','mi','kg','lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
  });

  test('Correct spelling of each unit', function() {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
  });

  test('Gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 1 / 3.78541, 0.1);
  });

  test('Mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 1 / 1.60934, 0.1);
  });

  test('Lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('Kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 1 / 0.453592, 0.1);
  });
});
