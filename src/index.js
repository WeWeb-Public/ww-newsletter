import wwObject from './wwObjectNewsletter.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            content: {
                type: name,
                data: {
                    emailAddress: 'contact@weweb.io',
                    okBtnSendBgC: 'green',
                    nokBtnSendBgC: 'red',
                    okMessage: 'We\'ll get in touch soon!',
                    nokMessage: 'We\'ll get in touch soon!'
                }
            },
            upsales: {
                wwAnalytics: {
                    click: false
                }
            }
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

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