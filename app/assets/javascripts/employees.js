Vue.component('employee-row', {
  template: '#employee-row',
  props: {
    employee: Object
  },
  data: function() {
    return {
      editMode: false,
      errors: {}
    }
  },
  methods: {
    toggleManagerStatus: function() {
      this.employee.manager = !this.employee.manager;
      this.updateEmployee();
    },
    updateEmployee: function() {
      var that = this;
      $.ajax({
        method: 'PUT',
        data: {
          employee: that.employee
        },
        url: '/employees/'+that.employee.id+'.json',
        success: function(resp) {
          that.errors = {};
          that.employee = resp;
          that.editMode = false;
        },
        errors: function(resp) {
          that.errors = resp.responseJSON.errors;
        }
      });
    },
    fireEmployee: function() {
      var that = this;
      $.ajax({
        method: 'DELETE',
        url: '/employees/'+that.employee.id+'.json',
        success: function(resp) {
          that.$remove();
        }
      });
    }
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
          that.errors = resp.responseJSON.errors;
        }
      });
    }
  }
});
