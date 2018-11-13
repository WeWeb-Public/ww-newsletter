import wwObject from './wwObjectNewsletter.vue'

const name = "ww-newsletter";
const wwEnableMetrics = false;

const addComponent = function () {
    if (window.vm) {
        window.vm.addComponent(name, wwObject);

        wwLib.wwObject.registerContentType(
            name,
            {
                type: name,
                data: {}
            },
            wwEnableMetrics
        );

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}