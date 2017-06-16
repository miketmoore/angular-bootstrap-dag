CyGraphCtrl.$inject = ['dataService'];

function CyGraphCtrl(dataService) {
    var vm = this;

    function init() {
        vm.model = {};
        dataService.get()
            .then(function (data) {
                vm.model.data = data;
            });
    }

    init();
};

module.exports = CyGraphCtrl;
