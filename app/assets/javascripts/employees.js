Vue.component('employee-row', {
  template: '#employee-row',
  props: {
    employee: Object
  }
})

var employees = new Vue({
  el: '#employees',
  data: {
    employees: [],
    employee: {
      name: '',
      email: '',
      manager: false
    },
    errors: {}
  },
  ready: function() {
    var that;
    that = this;
    $.ajax({
      url: '/employees.json',
      success: function(resp) {
        that.employees = resp;
      }
    });
  },
  methods: {
    hireEmployee: function() {
      var that = this;
      $.ajax({
        method: 'POST',
        data: {
          employee: that.employee
        },
        url: '/employees.json',
        success: function(resp) {
          that.errors = {};
          that.employees.push(resp);
        },
        error: function(resp) {
          that.errors = resp.responseJSON.errors
        }
      });
    }
  }
});
