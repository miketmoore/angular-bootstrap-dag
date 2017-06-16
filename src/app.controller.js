module.exports = function AppCtrl(dataService) {
    var vm = this;
    vm.model = {
        title: 'Horizontal Graph Theory Visualization'
    };
    
    function init() {
        _getData();
    }

    function _getData() {
        dataService.get()
            .then(function(data) {
                console.log('AppCtrl _getData resolve ', data);
                vm.model.data = data;
            });
    }

    init();
};
