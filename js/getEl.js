define(function() {
    function $(el) {
        return document.querySelector(el)
    }

    function $s(el) {
        return document.querySelectorAll(el)
    }
    return {
        $: $,
        $s: $s
    }
})