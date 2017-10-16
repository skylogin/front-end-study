import DS from 'ember-data';

export default DS.Model.extend({
  location: DS.attr('string'),
  createdAt: DS.attr('date'),
  sightedAt: DS.attr('date'),
  isNew: DS.attr('boolean', {defaultValue: false}),
  cryptid: DS.belongsTo('cryptid'),
  witnesses: DS.hasMany('witness')
});
