ko.bindingHandlers.date = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).datepicker();
        ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor);
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor);
    }
};