import DS from 'ember-data';

export default DS.Model.extend({
  fName: DS.attr('string'),
  lName: DS.attr('string'),
  email: DS.attr('string'),
  sightings: DS.hasMany('sighting'),
  fullName: Ember.computed('fName', 'lName', function(){
    // return this.get('fName') + ' ' + this.get('lName');
    return this.get('fName') + ' - ' + this.get('email');
  }),
  title: DS.attr('string')
});
