<template>
    <div class="ww-newsletter">
        <div class="input-email-container">
            <input type="text" placeholder="Email" v-model="email">
            <div v-bind:id="'btn-send-'+wwObject.uniqueId" v-bind:style="{'background-color': btnSendBgC}" class="btn-send" v-on:click="saveAddress()">
                <i v-show="!loading" class="fa fa-paper-plane" aria-hidden="true"></i>
                <i v-show="loading" class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                <div v-show="showAfterMessage" id="after-text">{{afterMessage}}</div>
            </div>
        </div>
        <div v-if="invalidEmailAddress" class="invalid-email input-email-container">Please enter a valid email address</div>
    </div>
</template>


<script>
export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
    },
    data() {
        return {
            loading: false,
            showAfterMessage: false,
            invalidEmailAddress: false,
            email: '',
            wwLang: wwLib.wwLang
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        afterMessage() {
            return this.wwObject.content.data.nokMessage;
        },
        btnSendBgC() {
            return this.wwObject.content.data.btnSendBgC;
        },
    },
    methods: {
        async sendFormInfo (designId, data) {
            return axios.post(
                'https://weweb.herokuapp.com/api/v1/design/' + designId + '/send_form_info',
                // wwApiSource + '/design/' + designId + '/send_form_info',
                //'localhost:3000/design/' + designId + '/send_form_info',
                data
            );
        },
        async saveAddress () {
            console.log(this.wwObject);
            var element = "btn-send-" + this.wwObject.uniqueId;
            var btnSendElement = document.getElementById(element);
            var afterTextElement = btnSendElement.querySelector('#after-text');

            if (this.showAfterMessage) {
                this.reset();
                return;
            }

            this.loading = true;

            this.invalidEmailAddress = false;

            var mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!this.email || !mailRegex.test(this.email)) {
                this.invalidEmailAddress = true;
                this.loading = false;
                return;
            }

            var request = {
                to: this.wwObject.content.data.emailAddress,
                lang: wwLib.wwLang.lang,
                type: 'newsletter',
                form: {
                    email: this.email
                }
            };

            try {
                await this.sendFormInfo(wwLib.wwWebsiteData.getInfo().id, request)
                this.loading = false;
                this.btnSendBgC = this.wwObject.content.data.okBtnSendBgC || 'green';
                btnSendElement.classList.add('after-click');
                afterTextElement.classList.add('after-text-anim');
                setTimeout(function () {
                    afterTextElement.classList.add('after-text');
                }, 1800);
                this.showAfterMessage = true;
                this.afterMessage = this.wwObject.content.data.okMessage;
            } catch (err) {
                console.log(err);
                this.loading = false;
                this.btnSendBgC = this.wwObject.content.data.nokBtnSendBgC || 'red';
                btnSendElement.classList.add('after-click');
                afterTextElement.classList.add('after-text-anim');
                setTimeout(function () {
                    afterTextElement.classList.add('after-text');
                }, 1800);
                this.showAfterMessage = true;
                this.afterMessage = this.wwObject.content.data.nokMessage;
            }
        },
        reset () {
            var element = "btn-send-" + this.wwObject.uniqueId;
            var btnSendElement = document.getElementById(element);
            var afterTextElement = btnSendElement.querySelector('#after-text');
            this.showAfterMessage = false;
            btnSendElement.classList.remove('after-click');
            afterTextElement.classList.remove('after-text-anim');
            afterTextElement.classList.remove('after-text');
            this.btnSendBgC = this.wwObject.content.data.btnSendBgC || '#CBCBCB';
            return;
        }
    },
    mounted () { }
};
</script>

<style scoped>
.ww-newsletter {
    height: 100%;
    width: 100%;
}

.ww-newsletter .input-email-container {
    width: 100%;
    display: inline-block;
    position: relative;
}

.ww-newsletter .input-email-container input {
    padding: 10px 60px 10px 20px;
    width: 100%;
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    border: none;
}

.ww-newsletter .input-email-container input::placeholder {
    color: #b0b0b0;
}

.ww-newsletter .btn-send {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50px;
    background-color: #cbcbcb;
    color: white;
    text-align: center;
    font-size: 20px;
    padding-top: 7px;
    cursor: pointer;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    transition: all 1s ease;
}

.ww-newsletter .input-email-container .btn-send.after-click {
    width: 100%;
}

.ww-newsletter .input-email-container .btn-send.after-click i {
    display: none;
}

.ww-newsletter .input-email-container .btn-send .after-text {
    opacity: 1 !important;
}

.ww-newsletter .input-email-container .btn-send .after-text-anim {
    opacity: 0;
    animation: fadeIn ease 1s;
    animation-iteration-count: 1;
    animation-delay: 0.8s;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}

.ww-newsletter input {
    font-size: 100%;
    border: 1px solid #757575;
    outline: none;
    padding: 5px 10px;
}

.ww-newsletter input::placeholder {
    color: #757575;
}

.ww-newsletter .send-text {
    padding: 5px 10px;
    display: inline-block;
}

.ww-newsletter .invalid-email {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    width: 100%;
    text-align: center;
}

@media (min-width: 768px) {
    .ww-newsletter .center-text {
        width: 100%;
    }
    .ww-newsletter .input-email-container {
        width: 100%;
    }
    .ww-newsletter .editing-title {
        width: 150px;
    }
}

@media (min-width: 992px) {
    .ww-newsletter .center-text {
        width: 100%;
    }
    .ww-newsletter .input-email-container {
        width: 100%;
    }
}

@media (min-width: 1200px) {
    .ww-newsletter .center-text {
        width: 100%;
    }
    .ww-newsletter .input-email-container {
        width: 100%;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-o-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-ms-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
