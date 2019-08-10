require.config({
    baseUrl: './js/',
    paths: {
        'get': './getEl',
        'dialog': './dialog',
        'V': './velocity.min'
    }

})
require(['get', 'dialog'], function(get, Dialog) {

    get.$('#alert').onclick = function() {
        // Dialog.init();
        Dialog.init({
            title: 'title',
            text: '树立健康观念的时间偶家的风格',
            btnArray: ['取消', '确认'],
            isMark: true,
            isDrag: true,
            // copy: function() {

            // }
        });
    }


    // Dialog.init();
    // new Dialog({
    //     title: 'title',
    //     text: '树立健康观念的时间偶家的风格',
    //     btnArray: ['OK', 'NO'],
    //     isMark: true,
    //     isDrag: true,
    //     copy: function() {

    //     }
    // })

})