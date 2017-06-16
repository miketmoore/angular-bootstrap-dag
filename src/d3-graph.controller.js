D3GraphCtrl.$inject = ['dataService'];

function D3GraphCtrl(dataService) {
    var vm = this;

    function init() {
        vm.model = {};
        dataService.get()
            .then(function (data) {
                console.log('D3GraphCtrl resolve ', data);
                vm.model.data = data;
            });
    }

    init();
};

module.exports = D3GraphCtrl;
