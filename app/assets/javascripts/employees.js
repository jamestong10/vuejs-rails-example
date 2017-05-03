Vue.http.interceptors.push({
  request: function (request) {
    Vue.http.headers.common['X-CSRF-Token'] = $('[name="csrf-token"]').attr('content');
    return request;
  },
  response: function (response) {
    return response;
  }
});

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
      let update_url = '/employees/'+this.employee.id+'.json'
      this.$http.put(update_url, { employee: this.employee }).then(
        (resp) => {
          that.errors = {};
          that.employee = resp.data;
          that.editMode = false;
        },
        (resp) => {
          that.errors = resp.data.errors;
        }
      );
    },
    fireEmployee: function() {
      var that = this;
      let delete_url = '/employees/'+this.employee.id+'.json';
      this.$http.delete(delete_url).then(
        (resp) => {
          that.$remove();
        }
      );
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
    this.$http.get('/employees.json').then(
      (resp) => {
        that.employees = resp.data;
      }
    );
  },
  methods: {
    hireEmployee: function() {
      var that = this;
      this.$http.post('/employees.json', { employee: this.employee }).then(
        (resp) => {
          that.errors = {},
          that.employee = {},
          that.employees.push(resp.data);
        },
        (resp) => {
          that.errors = resp.data.errors;
        }
      );
    }
  }
});
